import db from '../config/db.js';
import upload from '../middleware/uploadMiddleware.js'; // Assuming this handles image uploads
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllDiseases = (req, res) => {
  const lang = ['id', 'en'].includes(req.query.lang) ? req.query.lang : 'id';
  const diseaseNameCol = `disease_name_${lang}`;
  const descriptionCol = `description_${lang}`;
  const preventionCol = `prevention_${lang}`;
  const symptomsCol = `symptoms_${lang}`;
  const treatmentRecommendationsCol = `treatment_recommendations_${lang}`;
  const geminiInformasiDetailCol = `gemini_informasi_detail_${lang}`;
  const geminiSolusiPenyembuhanCol = `gemini_solusi_penyembuhan_${lang}`;
  const geminiRekomendasiProdukJsonCol = `gemini_rekomendasi_produk_json_${lang}`;

  const query = `
    SELECT 
      id,
      ${lang === 'en' ? 'disease_name_en' : 'disease_name_id'} AS disease_name,
      scientific_name,
      ${lang === 'en' ? 'description_en' : 'description_id'} AS description,
      ${lang === 'en' ? 'prevention_en' : 'prevention_id'} AS prevention,
      ${lang === 'en' ? 'symptoms_en' : 'symptoms_id'} AS symptoms,
      ${lang === 'en' ? 'treatment_recommendations_en' : 'treatment_recommendations_id'} AS treatment_recommendations,
      image_url_example,
      gemini_informasi_detail AS gemini_informasi_detail,
      gemini_solusi_penyembuhan AS gemini_solusi_penyembuhan,
      gemini_rekomendasi_produk_json AS gemini_rekomendasi_produk_json
    FROM diseases 
    ORDER BY disease_name ASC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get diseases", error: err });

    const diseasesWithParsedGemini = results.map(disease => {
      let parsedGeminiRekomendasiProduk = [];
      try {
        if (disease.gemini_rekomendasi_produk_json) {
          parsedGeminiRekomendasiProduk = JSON.parse(disease.gemini_rekomendasi_produk_json);
        }
      } catch (parseError) {
        console.error("Error parsing gemini_rekomendasi_produk_json:", parseError);
      }
      return {
        ...disease,
        gemini_rekomendasi_produk: parsedGeminiRekomendasiProduk,
        gemini_rekomendasi_produk_json: undefined // Remove original JSON string
      };
    });
    res.json(diseasesWithParsedGemini);
  });
};

export const getDiseasesCount = async (req, res) => {
  try {
    const [results] = await db.promise().query('SELECT COUNT(*) AS count FROM diseases');
    res.json({ count: results[0].count });
  } catch (error) {
    console.error('Error getting diseases count:', error);
    res.status(500).json({ message: 'Failed to get diseases count', error: error.message });
  }
};

import { getGenerativeInfo } from '../services/detectionService.js';

// ... (existing code for getAllDiseases) ...

export const getDiseaseById = async (req, res) => {
  const { id } = req.params;
  const lang = ['id', 'en'].includes(req.query.lang) ? req.query.lang : 'id';

  try {
    const diseaseQuery = `SELECT * FROM diseases WHERE id = ?`;
    const [diseaseResults] = await db.promise().query(diseaseQuery, [id]);

    if (diseaseResults.length === 0) {
      return res.status(404).json({ message: "Disease not found" });
    }
    const diseaseData = diseaseResults[0];

    const solutionsQuery = `
      SELECT ar.id, ar.name, ar.category, ar.image, ar.description 
      FROM agricultural_resources ar
      JOIN disease_solutions ds ON ar.id = ds.resource_id
      WHERE ds.disease_id = ?
    `;
    const [solutionsResults] = await db.promise().query(solutionsQuery, [id]);

    // Use the disease name for the current language for the Gemini call
    const currentDiseaseName = diseaseData[`disease_name_${lang}`] || diseaseData.disease_name_id; 

    let geminiResponse = null;
    if (currentDiseaseName) {
      geminiResponse = await getGenerativeInfo(currentDiseaseName, lang);
    }
    
    // Helper to safely extract string from Gemini response or fallback
    const getSummaryOrDefault = (geminiObj, key, originalText, defaultMessage) => {
      if (geminiObj && geminiObj[key] && typeof geminiObj[key] === 'string') {
        return geminiObj[key];
      }
      return originalText || defaultMessage;
    };
    
    // Extract original texts based on language
    const symptomsOriginal = diseaseData[`symptoms_${lang}`];
    const preventionOriginal = diseaseData[`prevention_${lang}`];
    const treatmentOriginal = diseaseData[`treatment_recommendations_${lang}`];

    const geminiSummary = {
      symptoms: getSummaryOrDefault(geminiResponse, 'informasi_detail', symptomsOriginal, "Informasi gejala tidak dapat dimuat dari AI."),
      prevention: getSummaryOrDefault(geminiResponse, 'solusi_penyembuhan', preventionOriginal, "Informasi pencegahan tidak dapat dimuat dari AI."),
      treatment: getSummaryOrDefault(geminiResponse, 'solusi_penyembuhan', treatmentOriginal, "Informasi pengobatan tidak dapat dimuat dari AI."), // Assuming 'solusi_penyembuhan' also covers treatment
      solutions: (geminiResponse && geminiResponse.rekomendasi_produk && Array.isArray(geminiResponse.rekomendasi_produk) && geminiResponse.rekomendasi_produk.length > 0)
        ? geminiResponse.rekomendasi_produk.map(p => `${p.nama_produk}: ${p.deskripsi_singkat}`).join('\n')
        : (lang === 'id' ? "Rekomendasi solusi tidak dapat dimuat dari AI." : "Solution recommendations could not be loaded from AI.")
    };
    
    // If Gemini generation failed (e.g., geminiResponse has an error property), fallback to original data
    if (geminiResponse && geminiResponse.error) {
      geminiSummary.symptoms = symptomsOriginal || (lang === 'id' ? "Informasi gejala tidak dapat dimuat dari AI." : "Symptoms information could not be loaded from AI.");
      geminiSummary.prevention = preventionOriginal || (lang === 'id' ? "Informasi pencegahan tidak dapat dimuat dari AI." : "Prevention information could not be loaded from AI.");
      geminiSummary.treatment = treatmentOriginal || (lang === 'id' ? "Informasi pengobatan tidak dapat dimuat dari AI." : "Treatment information could not be loaded from AI.");
      geminiSummary.solutions = (lang === 'id' ? "Rekomendasi solusi tidak dapat dimuat dari AI." : "Solution recommendations could not be loaded from AI.");
    }

    const response = {
      disease: {
        id: diseaseData.id,
        disease_name: diseaseData[`disease_name_${lang}`],
        scientific_name: diseaseData.scientific_name,
        image_url_example: diseaseData.image_url_example,
        
        // Original data from admin
        symptoms_original: symptomsOriginal,
        prevention_original: preventionOriginal,
        treatment_original: treatmentOriginal,

        // Gemini-generated summaries
        gemini_summary: geminiSummary,
        // Include parsed product recommendations directly
        gemini_rekomendasi_produk_json: (geminiResponse && geminiResponse.rekomendasi_produk) ? geminiResponse.rekomendasi_produk : []
      },
      recommendedSolutions: solutionsResults.map(resource => ({
        ...resource,
        image: resource.image ? `${req.protocol}://${req.get('host')}/images/agricultural_resources/${resource.image}` : null
      }))
    };

    res.json(response);

  } catch (error) {
    console.error("Error in getDiseaseById:", error);
    res.status(500).json({ message: "Failed to process request for disease details.", error: error.message });
  }
};


export const addDisease = async (req, res) => {
  const {
    disease_name_id,
    disease_name_en,
    scientific_name,
    description_id,
    description_en,
    prevention_id,
    prevention_en,
    symptoms_id,
    symptoms_en,
    treatment_recommendations_id,
    treatment_recommendations_en
  } = req.body;

  const imageUrl = req.file ? `/images/diseases/${req.file.filename}` : null;

  // --- Generate Gemini Info ---
  let geminiInformasiDetailId = null;
  let geminiSolusiPenyembuhanId = null;
  let geminiRekomendasiProdukJsonId = null;
  
  let geminiInformasiDetailEn = null;
  let geminiSolusiPenyembuhanEn = null;
  let geminiRekomendasiProdukJsonEn = null;

  try {
    const geminiInfoId = await getGenerativeInfo(disease_name_id, 'id');
    if (geminiInfoId && !geminiInfoId.error) {
      geminiInformasiDetailId = geminiInfoId.informasi_detail;
      geminiSolusiPenyembuhanId = geminiInfoId.solusi_penyembuhan;
      if (geminiInfoId.rekomendasi_produk) {
        geminiRekomendasiProdukJsonId = JSON.stringify(geminiInfoId.rekomendasi_produk);
      }
    }
  } catch (geminiError) {
    console.error("Error generating Gemini info for ID:", geminiError);
  }

  try {
    const geminiInfoEn = await getGenerativeInfo(disease_name_en, 'en');
    if (geminiInfoEn && !geminiInfoEn.error) {
      geminiInformasiDetailEn = geminiInfoEn.informasi_detail;
      geminiSolusiPenyembuhanEn = geminiInfoEn.solusi_penyembuhan;
      if (geminiInfoEn.rekomendasi_produk) {
        geminiRekomendasiProdukJsonEn = JSON.stringify(geminiInfoEn.rekomendasi_produk);
      }
    }
  } catch (geminiError) {
    console.error("Error generating Gemini info for EN:", geminiError);
  }
  // --- End Gemini Info Generation ---

  const query = `
    INSERT INTO diseases (
      disease_name_id, disease_name_en, scientific_name,
      description_id, description_en, prevention_id, prevention_en,
      symptoms_id, symptoms_en, treatment_recommendations_id, treatment_recommendations_en,
      image_url_example,
      gemini_informasi_detail_id, gemini_solusi_penyembuhan_id, gemini_rekomendasi_produk_json_id,
      gemini_informasi_detail_en, gemini_solusi_penyembuhan_en, gemini_rekomendasi_produk_json_en
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    disease_name_id,
    disease_name_en,
    scientific_name,
    description_id,
    description_en,
    prevention_id,
    prevention_en,
    symptoms_id,
    symptoms_en,
    treatment_recommendations_id,
    treatment_recommendations_en,
    imageUrl,
    geminiInformasiDetailId,
    geminiSolusiPenyembuhanId,
    geminiRekomendasiProdukJsonId,
    geminiInformasiDetailEn,
    geminiSolusiPenyembuhanEn,
    geminiRekomendasiProdukJsonEn
  ];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error adding disease:", err);
      // If image was uploaded, delete it on error
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(500).json({ message: "Failed to add disease", error: err });
    }
    res.status(201).json({ message: "Disease added successfully", diseaseId: result.insertId });
  });
};

export const updateDisease = async (req, res) => {
  const { id } = req.params;
  const {
    disease_name_id,
    disease_name_en,
    scientific_name,
    description_id,
    description_en,
    prevention_id,
    prevention_en,
    symptoms_id,
    symptoms_en,
    treatment_recommendations_id,
    treatment_recommendations_en,
    current_image_url // To handle existing image
  } = req.body;

  let imageUrl = current_image_url;
  // If a new file is uploaded, use its path. Otherwise, retain the current one.
  if (req.file) {
    imageUrl = `/images/diseases/${req.file.filename}`;
    // Optionally, delete the old image if a new one is uploaded
    // (This requires fetching the old image path first)
  }

  // --- Generate Gemini Info (re-generate if disease name changes) ---
  let geminiInformasiDetailId = null;
  let geminiSolusiPenyembuhanId = null;
  let geminiRekomendasiProdukJsonId = null;
  
  let geminiInformasiDetailEn = null;
  let geminiSolusiPenyembuhanEn = null;
  let geminiRekomendasiProdukJsonEn = null;

  // Fetch current disease data to check if names changed or if Gemini info exists
  const currentDiseaseQuery = `SELECT disease_name_id, disease_name_en, gemini_informasi_detail_id, gemini_solusi_penyembuhan_id, gemini_rekomendasi_produk_json_id, gemini_informasi_detail_en, gemini_solusi_penyembuhan_en, gemini_rekomendasi_produk_json_en, image_url_example FROM diseases WHERE id = ?`;
  const [currentDiseaseResult] = await new Promise((resolve, reject) => {
    db.query(currentDiseaseQuery, [id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

  const idNameChanged = currentDiseaseResult && currentDiseaseResult.disease_name_id !== disease_name_id;
  const enNameChanged = currentDiseaseResult && currentDiseaseResult.disease_name_en !== disease_name_en;
  const oldImageUrl = currentDiseaseResult ? currentDiseaseResult.image_url_example : null;

  // Use existing Gemini info if names didn't change and info already exists
  if (currentDiseaseResult && !idNameChanged && currentDiseaseResult.gemini_informasi_detail_id) {
    geminiInformasiDetailId = currentDiseaseResult.gemini_informasi_detail_id;
    geminiSolusiPenyembuhanId = currentDiseaseResult.gemini_solusi_penyembuhan_id;
    geminiRekomendasiProdukJsonId = currentDiseaseResult.gemini_rekomendasi_produk_json_id;
  }
  if (currentDiseaseResult && !enNameChanged && currentDiseaseResult.gemini_informasi_detail_en) {
    geminiInformasiDetailEn = currentDiseaseResult.gemini_informasi_detail_en;
    geminiSolusiPenyembuhanEn = currentDiseaseResult.gemini_solusi_penyembuhan_en;
    geminiRekomendasiProdukJsonEn = currentDiseaseResult.gemini_rekomendasi_produk_json_en;
  }


  // Re-generate if ID name changed or no existing Gemini info (or explicitly force re-generation if needed)
  if (idNameChanged || !geminiInformasiDetailId) {
    try {
      const geminiInfoId = await getGenerativeInfo(disease_name_id, 'id');
      if (geminiInfoId && !geminiInfoId.error) {
        geminiInformasiDetailId = geminiInfoId.informasi_detail;
        geminiSolusiPenyembuhanId = geminiInfoId.solusi_penyembuhan;
        if (geminiInfoId.rekomendasi_produk) {
          geminiRekomendasiProdukJsonId = JSON.stringify(geminiInfoId.rekomendasi_produk);
        }
      } else {
         // If generation fails, retain old info if it exists
         geminiInformasiDetailId = currentDiseaseResult ? currentDiseaseResult.gemini_informasi_detail_id : null;
         geminiSolusiPenyembuhanId = currentDiseaseResult ? currentDiseaseResult.gemini_solusi_penyembuhan_id : null;
         geminiRekomendasiProdukJsonId = currentDiseaseResult ? currentDiseaseResult.gemini_rekomendasi_produk_json_id : null;
      }
    } catch (geminiError) {
      console.error("Error re-generating Gemini info for ID:", geminiError);
      // On error, retain old info
      geminiInformasiDetailId = currentDiseaseResult ? currentDiseaseResult.gemini_informasi_detail_id : null;
      geminiSolusiPenyembuhanId = currentDiseaseResult ? currentDiseaseResult.gemini_solusi_penyembuhan_id : null;
      geminiRekomendasiProdukJsonId = currentDiseaseResult ? currentDiseaseResult.gemini_rekomendasi_produk_json_id : null;
    }
  }

  // Re-generate if EN name changed or no existing Gemini info
  if (enNameChanged || !geminiInformasiDetailEn) {
    try {
      const geminiInfoEn = await getGenerativeInfo(disease_name_en, 'en');
      if (geminiInfoEn && !geminiInfoEn.error) {
        geminiInformasiDetailEn = geminiInfoEn.informasi_detail;
        geminiSolusiPenyembuhanEn = geminiInfoEn.solusi_penyembuhan;
        if (geminiInfoEn.rekomendasi_produk) {
          geminiRekomendasiProdukJsonEn = JSON.stringify(geminiInfoEn.rekomendasi_produk);
        }
      } else {
          // If generation fails, retain old info if it exists
         geminiInformasiDetailEn = currentDiseaseResult ? currentDiseaseResult.gemini_informasi_detail_en : null;
         geminiSolusiPenyembuhanEn = currentDiseaseResult ? currentDiseaseResult.gemini_solusi_penyembuhan_en : null;
         geminiRekomendasiProdukJsonEn = currentDiseaseResult ? currentDiseaseResult.gemini_rekomendasi_produk_json_en : null;
      }
    } catch (geminiError) {
      console.error("Error re-generating Gemini info for EN:", geminiError);
      // On error, retain old info
      geminiInformasiDetailEn = currentDiseaseResult ? currentDiseaseResult.gemini_informasi_detail_en : null;
      geminiSolusiPenyembuhanEn = currentDiseaseResult ? currentDiseaseResult.gemini_solusi_penyembuhan_en : null;
      geminiRekomendasiProdukJsonEn = currentDiseaseResult ? currentDiseaseResult.gemini_rekomendasi_produk_json_en : null;
    }
  }
  // --- End Gemini Info Generation ---

  const query = `
    UPDATE diseases SET
      disease_name_id = ?, disease_name_en = ?, scientific_name = ?,
      description_id = ?, description_en = ?, prevention_id = ?, prevention_en = ?,
      symptoms_id = ?, symptoms_en = ?, treatment_recommendations_id = ?, treatment_recommendations_en = ?,
      image_url_example = ?,
      gemini_informasi_detail_id = ?, gemini_solusi_penyembuhan_id = ?, gemini_rekomendasi_produk_json_id = ?,
      gemini_informasi_detail_en = ?, gemini_solusi_penyembuhan_en = ?, gemini_rekomendasi_produk_json_en = ?
    WHERE id = ?
  `;

  const params = [
    disease_name_id,
    disease_name_en,
    scientific_name,
    description_id,
    description_en,
    prevention_id,
    prevention_en,
    symptoms_id,
    symptoms_en,
    treatment_recommendations_id,
    treatment_recommendations_en,
    imageUrl,
    geminiInformasiDetailId,
    geminiSolusiPenyembuhanId,
    geminiRekomendasiProdukJsonId,
    geminiInformasiDetailEn,
    geminiSolusiPenyembuhanEn,
    geminiRekomendasiProdukJsonEn,
    id
  ];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error updating disease:", err);
      // If a new image was uploaded and there's an error, delete the new image
      if (req.file && imageUrl !== oldImageUrl) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({ message: "Failed to update disease", error: err });
    }
    // If a new image was uploaded and replaced an old one, delete the old image
    if (req.file && oldImageUrl && imageUrl !== oldImageUrl) {
      fs.unlinkSync(path.join(__dirname, '..', oldImageUrl)); // Adjust path as needed
    }
    res.status(200).json({ message: "Disease updated successfully" });
  });
};

export const deleteDisease = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Get image path before deleting the disease record
    const [diseaseResults] = await db.promise().query('SELECT image_url_example FROM diseases WHERE id = ?', [id]);
    const imageUrlExample = diseaseResults.length > 0 ? diseaseResults[0].image_url_example : null;

    // 2. Delete associated solutions first (due to foreign key constraints)
    await db.promise().query('DELETE FROM disease_solutions WHERE disease_id = ?', [id]);

    // 3. Delete the disease record
    const [deleteResult] = await db.promise().query('DELETE FROM diseases WHERE id = ?', [id]);

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Disease not found' });
    }

    // 4. Delete the associated image file if it exists
    if (imageUrlExample) {
      // The image_url_example comes in the format /images/diseases/filename.jpg
      // We need to construct the absolute path to the file on the server.
      // Assuming 'public' is the root for static files, and images are in public/images/diseases
      const relativeImagePath = imageUrlExample.startsWith('/') ? imageUrlExample.substring(1) : imageUrlExample;
      const imagePath = path.join(__dirname, '..', '..', 'backend', 'public', relativeImagePath);
      
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error deleting image file ${imagePath}:`, err);
          // Log error but don't prevent disease deletion from succeeding
        } else {
          console.log(`Successfully deleted image file: ${imagePath}`);
        }
      });
    }

    res.status(200).json({ message: 'Disease deleted successfully' });
  } catch (error) {
    console.error('Error deleting disease:', error);
    res.status(500).json({ message: 'Failed to delete disease', error: error.message });
  }
};