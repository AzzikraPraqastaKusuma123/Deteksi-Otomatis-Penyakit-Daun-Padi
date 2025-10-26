// backend/controllers/userController.js
import db from "../config/db.js";

// GET semua user
export const getAllUsers = (req, res) => {
  const sql = `SELECT id AS user_id, username, email, full_name, location 
               FROM users`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// GET detail user + deteksi terkait
export const getUserById = (req, res) => {
  const userId = req.params.id;

  const userSql = `SELECT id AS user_id, username, email, full_name, location 
                   FROM users WHERE id = ?`;

  const detectionSql = `
    SELECT id AS detection_id, detected_disease, image_path, confidence_score, 
           is_healthy, llm_generated_response, detection_timestamp 
    FROM users 
    WHERE id = ?`;

  db.query(userSql, [userId], (err, userResult) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult[0];

    // ambil deteksi user
    db.query(detectionSql, [userId], (err, detectionsResult) => {
      if (err) {
        console.error("Error fetching detections:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({
        user,
        detections: detectionsResult.map((d) => ({
          detection_id: d.detection_id,
          detected_disease: d.detected_disease,
          image_path: d.image_path,
          confidence_score: d.confidence_score,
          is_healthy: d.is_healthy,
          llm_generated_response: d.llm_generated_response,
          detection_timestamp: d.detection_timestamp,
        })),
      });
    });
  });
};
