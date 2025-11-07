// backend/controllers/detectionController.js
import db from "../config/db.js";
import { runInference } from "../services/detectionService.js";
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

    // Simpan gambar hasil upload di folder /uploads/
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    const filename = `detection_${Date.now()}.jpg`;
    const imagePath = path.join(uploadDir, filename);
    fs.writeFileSync(imagePath, imageBuffer);

    const imageUrl = `/uploads/${filename}`;

    console.log("SQL:");
    console.log(`
      INSERT INTO detections (user_id, disease_name, confidence, image_url, description, prevention)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const params = [
      userId,
      prediction.disease,
      prediction.confidence,
      imageUrl,
      prediction.description,
      prediction.prevention
    ];
    console.log("PARAMS:", params);

    db.query(
      `
      INSERT INTO detections (user_id, disease_name, confidence, image_url, description, prevention)
      VALUES (?, ?, ?, ?, ?, ?)
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
          disease: prediction.disease,
          confidence: prediction.confidence,
          description: prediction.description,
          prevention: prediction.prevention,
          image_url: imageUrl
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

  const query = "SELECT * FROM detections WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get detections", error: err });
    res.json(results);
  });
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
