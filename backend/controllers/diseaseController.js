// backend/controllers/diseaseController.js
import db from "../config/db.js";

export const getAllDiseases = (req, res) => {
  const query = "SELECT * FROM diseases ORDER BY disease_name ASC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get diseases", error: err });
    res.json(results);
  });
};

export const getDiseaseById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM diseases WHERE id = ?";
  
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get disease", error: err });
    if (results.length === 0) {
      return res.status(404).json({ message: "Disease not found" });
    }
    res.json(results[0]); 
  });
};

export const addDisease = (req, res) => {

  const { 
    disease_name, 
    scientific_name, 
    description, 
    prevention, 
    symptoms, 
    treatment_recommendations,
    image_url_example 
  } = req.body;

  // Pastikan kolom 'disease_name' ada
  if (!disease_name) {
    return res.status(400).json({ message: "disease_name is required" });
  }

  const query = `
    INSERT INTO diseases (
      disease_name, scientific_name, description, 
      prevention, symptoms, treatment_recommendations, image_url_example
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    disease_name,
    scientific_name || null,
    description || null,
    prevention || null,
    symptoms || null,
    treatment_recommendations || null,
    image_url_example || null
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Failed to add disease:", err);
      return res.status(500).json({ message: "Failed to add disease", error: err });
    }
    res.status(201).json({ message: "Disease added successfully", id: results.insertId });
  });
};

export const getDiseasesCount = (req, res) => {
  const query = "SELECT COUNT(*) as count FROM diseases";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get diseases count", error: err });
    res.json(results[0]);
  });
};