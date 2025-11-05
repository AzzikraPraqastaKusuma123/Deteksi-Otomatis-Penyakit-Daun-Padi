import db from "../config/db.js";
import { runInference } from '../services/detectionService.js';

export const detectDisease = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file uploaded.' });
  }

  try {
    const imageBuffer = req.file.buffer;
    const prediction = await runInference(imageBuffer);
    res.json(prediction);
  } catch (error) {
    console.error('Error during inference:', error);
    res.status(500).json({ message: 'Failed to process image', error: error.message });
  }
};

export const getAllDetections = (req, res) => {
  const query = "SELECT * FROM detections";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get detections", error: err });
    res.json(results);
  });
};

export const addDetection = (req, res) => {
  const { user_id, disease_name, confidence, image_url } = req.body;
  const query = "INSERT INTO detections (user_id, disease_name, confidence, image_url) VALUES (?, ?, ?, ?)";
  db.query(query, [user_id, disease_name, confidence, image_url], (err) => {
    if (err) return res.status(500).json({ message: "Failed to add detection", error: err });
    res.status(201).json({ message: "Detection added successfully" });
  });
};

export const getDetectionsCount = (req, res) => {
  const query = "SELECT COUNT(*) as count FROM detections";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get detections count", error: err });
    res.json(results[0]);
  });
};
