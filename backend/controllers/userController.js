import db from "../config/db.js";
import bcrypt from "bcryptjs";

// GET semua user
export const getAllUsers = (req, res) => {
  const sql = `SELECT id, username, email, full_name, location, role 
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

  const userSql = `SELECT id, username, email, full_name, location, role 
                   FROM users WHERE id = ?`;

  const detectionSql = `
    SELECT d.id AS detection_id, dis.disease_name, d.image_path, d.confidence_score, 
           d.is_healthy, d.llm_generated_response, d.timestamp as detection_timestamp 
    FROM detections d
    LEFT JOIN diseases dis ON d.disease_id = dis.id
    WHERE d.user_id = ?`;

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
        detections: detectionsResult,
      });
    });
  });
};

// CREATE user
export const createUser = (req, res) => {
  const { username, email, password, full_name, location, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "Username, email, password, and role are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `INSERT INTO users (username, email, password, full_name, location, role) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [username, email, hashedPassword, full_name, location, role], (err, result) => {
    if (err) {
      console.error("Error creating user:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "User created successfully", userId: result.insertId });
  });
};

// UPDATE user
export const updateUser = (req, res) => {
  const userId = req.params.id;
  const { username, email, password, full_name, location, role } = req.body;

  let hashedPassword = null;
  if (password) {
    hashedPassword = bcrypt.hashSync(password, 10);
  }

  const sql = `UPDATE users SET 
                 username = ?,
                 email = ?,
                 ${password ? "password = ?," : ""}
                 full_name = ?,
                 location = ?,
                 role = ? 
               WHERE id = ?`;

  const params = [username, email];
  if (password) params.push(hashedPassword);
  params.push(full_name, location, role, userId);

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  });
};

// DELETE user
export const deleteUser = (req, res) => {
  const userId = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  });
};
