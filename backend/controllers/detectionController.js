// backend/controllers/detectionController.js
import db from "../config/db.js";
import { runInference, getGenerativeInfo } from "../services/detectionService.js";
import fs from "fs";
import path from "path";

export const detectDisease = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file uploaded.' });
  }

  try {
    // ✅ Ambil user_id dari token yang diverifikasi
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const imageBuffer = req.file.buffer;
    const prediction = await runInference(imageBuffer);

    // Get additional info from Gemini
    let generativeInfo = null;
    try {
      generativeInfo = await getGenerativeInfo(prediction.disease);
    } catch (geminiError) {
      console.error("Error getting Gemini details during detection:", geminiError);
      generativeInfo = {
        error: true,
        message: "Failed to get AI details for detection." // Simplified message
      };
    }

    // Simpan gambar hasil upload di folder /uploads/
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    const filename = `detection_${Date.now()}.jpg`;
    const imagePath = path.join(uploadDir, filename);
    fs.writeFileSync(imagePath, imageBuffer);

    const imageUrl = `/uploads/${filename}`;

    let geminiInformasiDetail = null;
    let geminiSolusiPenyembuhan = null;
    let geminiRekomendasiProdukJson = null;

    if (generativeInfo && !generativeInfo.error) {
      geminiInformasiDetail = generativeInfo.informasi_detail;
      geminiSolusiPenyembuhan = generativeInfo.solusi_penyembuhan;
      if (generativeInfo.rekomendasi_produk) {
        geminiRekomendasiProdukJson = JSON.stringify(generativeInfo.rekomendasi_produk);
      }
    }

    // Use Gemini info for saving, if available. Otherwise, use prediction (from DB).
    // Note: 'description' and 'prevention' columns in DB will now store Gemini info,
    // or fallback to original prediction.description/prevention if Gemini failed or was not available.
    const descriptionToSave = geminiInformasiDetail || prediction.description;
    const preventionToSave = geminiSolusiPenyembuhan || prediction.prevention;
    
    const params = [
      userId,
      prediction.disease,
      prediction.confidence,
      imageUrl,
      descriptionToSave,
      preventionToSave,
      prediction.treatment_recommendations, // Still saving this from prediction (DB)
    ];

    // Find the disease_id based on prediction.disease
    let diseaseId = null;
    let diseaseNameFromDb = prediction.disease; // Default to prediction.disease

    try {
      const [diseaseRow] = await db.promise().query(
        'SELECT id, disease_name_id FROM diseases WHERE disease_name_id = ? OR disease_name_en = ?',
        [prediction.disease, prediction.disease]
      );
      if (diseaseRow.length > 0) {
        diseaseId = diseaseRow[0].id;
        diseaseNameFromDb = diseaseRow[0].disease_name_id; // Use the localized name from DB if available
      }
    } catch (dbError) {
      console.error("Error finding disease ID for prediction:", dbError);
    }
    
    let recommendedSolutions = [];
    if (diseaseId) {
      try {
        const [solutionsResults] = await db.promise().query(`
          SELECT ar.id, ar.name, ar.category, ar.image, ar.description 
          FROM agricultural_resources ar
          JOIN disease_solutions ds ON ar.id = ds.resource_id
          WHERE ds.disease_id = ?
        `, [diseaseId]);

        recommendedSolutions = solutionsResults.map(resource => ({
          ...resource,
          image: resource.image ? `${req.protocol}://${req.get('host')}/images/agricultural_resources/${resource.image}` : null
        }));
      } catch (solutionsError) {
        console.error("Error fetching recommended solutions during detection:", solutionsError);
      }
    }

    db.query(
      `
      INSERT INTO detections (user_id, disease_name, confidence, image_url, description, prevention, treatment_recommendations)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      params,
      (err, results) => {
        if (err) {
          console.error("❌ Failed to save detection:", err);
          return res.status(500).json({ message: "Failed to save detection", error: err });
        }
        console.log("✅ Detection saved successfully!");
        res.json({
          message: "Detection success",
          disease: diseaseNameFromDb, // Use localized name if found, otherwise prediction.disease
          confidence: prediction.confidence,
          description: descriptionToSave, // Reflect what was saved
          prevention: preventionToSave,   // Reflect what was saved
          treatment_recommendations: prediction.treatment_recommendations, // From DB
          image_url: imageUrl,
          generativeInfo: generativeInfo, // Still sending the direct Gemini response
          recommendedSolutions: recommendedSolutions // Include fetched agricultural resources
        });
      }
    );
  } catch (error) {
    console.error("Error during inference:", error);
    res.status(500).json({ message: "Failed to process image", error: error.message });
  }
};

export const getAllDetections = (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const query = `
    SELECT
      id,
      user_id,
      disease_name,
      confidence,
      image_url,
      description,
      prevention,
      treatment_recommendations,
      detected_at
    FROM detections
    WHERE user_id = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get detections", error: err });
    res.json(results);
  });
};

export const getDetectionById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const lang = ['id', 'en'].includes(req.query.lang) ? req.query.lang : 'id'; // Assuming language can be passed

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    // 1. Get basic detection details
    const detectionQuery = `
      SELECT
        id,
        user_id,
        disease_name,
        confidence,
        image_url,
        description,
        prevention,
        treatment_recommendations,
        detected_at
      FROM detections
      WHERE id = ? AND user_id = ?
    `;
    const [detectionResults] = await db.promise().query(detectionQuery, [id, userId]);

    if (detectionResults.length === 0) {
      return res.status(404).json({ message: "Detection not found or not authorized." });
    }
    const detectionData = detectionResults[0];

    // 2. Get additional info from Gemini (re-generate)
    let generativeInfo = null;
    try {
      generativeInfo = await getGenerativeInfo(detectionData.disease_name, lang);
    } catch (geminiError) {
      console.error("Error getting Gemini details for detection ID:", id, geminiError);
      generativeInfo = {
        error: true,
        message: "Failed to get AI details for detection."
      };
    }

    // 3. Find the disease_id based on detectionData.disease_name
    let diseaseId = null;
    try {
      const [diseaseRow] = await db.promise().query(
        'SELECT id FROM diseases WHERE disease_name_id = ? OR disease_name_en = ?',
        [detectionData.disease_name, detectionData.disease_name]
      );
      if (diseaseRow.length > 0) {
        diseaseId = diseaseRow[0].id;
      }
    } catch (dbError) {
      console.error("Error finding disease ID for detected disease:", detectionData.disease_name, dbError);
    }

    // 4. Fetch recommended solutions if diseaseId found
    let recommendedSolutions = [];
    if (diseaseId) {
      try {
        const [solutionsResults] = await db.promise().query(`
          SELECT ar.id, ar.name, ar.category, ar.image, ar.description 
          FROM agricultural_resources ar
          JOIN disease_solutions ds ON ar.id = ds.resource_id
          WHERE ds.disease_id = ?
        `, [diseaseId]);

        recommendedSolutions = solutionsResults.map(resource => ({
          ...resource,
          // Ensure image URL is absolute
          image: resource.image ? `${req.protocol}://${req.get('host')}/images/agricultural_resources/${resource.image}` : null
        }));
      } catch (solutionsError) {
        console.error("Error fetching recommended solutions for disease ID:", diseaseId, solutionsError);
      }
    }

    // Combine all info into a single object, mimicking detectDisease response structure
    res.json({
      message: "Detection details fetched successfully",
      disease: detectionData.disease_name,
      confidence: detectionData.confidence,
      image_url: detectionData.image_url,
      detected_at: detectionData.detected_at, // Include detected_at
      description: detectionData.description, // Original description from detection record
      prevention: detectionData.prevention,   // Original prevention from detection record
      treatment_recommendations: detectionData.treatment_recommendations, // Original treatment from detection record
      generativeInfo: generativeInfo,
      recommendedSolutions: recommendedSolutions,
    });

  } catch (error) {
    console.error("Error in getDetectionById:", error);
    res.status(500).json({ message: "Failed to fetch detection details", error: error.message });
  }
};

export const getDetectionsCount = (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const query = "SELECT COUNT(*) as count FROM detections WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get detections count", error: err });
    res.json(results[0]);
  });
};

export const detectRealtime = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file uploaded.' });
  }

  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const imageBuffer = req.file.buffer;
    const prediction = await runInference(imageBuffer); // Run inference

    // Return only disease and confidence for real-time
    res.json({
      disease: prediction.disease,
      confidence: prediction.confidence,
    });

  } catch (error) {
    console.error("Error during real-time inference:", error);
    res.status(500).json({ message: "Failed to process image in real-time", error: error.message });
  }
};
