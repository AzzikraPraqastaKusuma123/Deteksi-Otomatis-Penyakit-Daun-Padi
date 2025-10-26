import db from "../config/db.js";

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
