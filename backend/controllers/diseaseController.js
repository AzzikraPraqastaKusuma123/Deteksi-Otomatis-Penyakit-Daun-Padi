// backend/controllers/diseaseController.js
import db from "../config/db.js";
import fs from "fs";
import path from "path";

export const getAllDiseases = (req, res) => {
  const query = `
    SELECT 
      id,
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
      image_url_example
    FROM diseases 
    ORDER BY disease_name_id ASC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get diseases", error: err });
    res.json(results);
  });
};

export const getDiseaseById = (req, res) => {
  const { id } = req.params;

  const diseaseQuery = `
    SELECT
      id,
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
      image_url_example
    FROM diseases 
    WHERE id = ?
  `;
  
  db.query(diseaseQuery, [id], (err, diseaseResults) => {
    if (err) {
      return res.status(500).json({ message: "Failed to get disease", error: err });
    }
    if (diseaseResults.length === 0) {
      return res.status(404).json({ message: "Disease not found" });
    }
    
    const disease = diseaseResults[0];
    
    // Query for all recommended solutions (pupuk, obat, pestisida)
    const solutionsQuery = `
      SELECT ar.* 
      FROM agricultural_resources ar
      JOIN disease_solutions ds ON ar.id = ds.resource_id
      WHERE ds.disease_id = ?
    `;
    
    db.query(solutionsQuery, [id], (solutionsErr, solutionsResults) => {
      if (solutionsErr) {
        console.error("Failed to get recommended solutions:", solutionsErr);
        return res.json({ disease, recommendedSolutions: [] });
      }
      
      const recommendedSolutions = solutionsResults.map(resource => ({
        ...resource,
        image: resource.image ? `${req.protocol}://${req.get('host')}/images/agricultural_resources/${resource.image}` : null
      }));

      res.json({ disease, recommendedSolutions });
    });
  });
};

export const addDisease = (req, res) => {
  const { 
    disease_name_id, disease_name_en,
    scientific_name, // scientific_name is assumed to be language-agnostic
    description_id, description_en, 
    prevention_id, prevention_en,
    symptoms_id, symptoms_en,
    treatment_recommendations_id, treatment_recommendations_en,
    image_url_example 
  } = req.body;

  // Validate required fields for at least one language
  if (!disease_name_id && !disease_name_en) {
    return res.status(400).json({ message: "Disease name (ID or EN) is required" });
  }

  const query = `
    INSERT INTO diseases (
      disease_name_id, disease_name_en, scientific_name, 
      description_id, description_en, prevention_id, prevention_en,
      symptoms_id, symptoms_en, treatment_recommendations_id, treatment_recommendations_en, 
      image_url_example
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    disease_name_id || null, disease_name_en || null,
    scientific_name || null,
    description_id || null, description_en || null,
    prevention_id || null, prevention_en || null,
    symptoms_id || null, symptoms_en || null,
    treatment_recommendations_id || null, treatment_recommendations_en || null,
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

export const updateDisease = async (req, res) => {
  const { id } = req.params;
  const { 
    disease_name_id, disease_name_en,
    scientific_name, 
    description_id, description_en, 
    prevention_id, prevention_en,
    symptoms_id, symptoms_en,
    treatment_recommendations_id, treatment_recommendations_en
  } = req.body;
  let imageUrl = req.body.image_url_example; // Keep existing image by default

  // Check if a new file is uploaded
  if (req.file) {
    const imageBuffer = req.file.buffer;
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'diseases');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // First, get the old image path to delete it
    db.query("SELECT image_url_example FROM diseases WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error("Error fetching old image path:", err);
        // Continue without deleting old file if not found
      }
      if (results && results.length > 0 && results[0].image_url_example) {
        const oldImagePath = path.join(process.cwd(), 'public', results[0].image_url_example);
        fs.unlink(oldImagePath, (unlinkErr) => {
          if (unlinkErr) console.error("Error deleting old image:", unlinkErr);
        });
      }
    });

    const filename = `disease_${Date.now()}.jpg`;
    const imagePath = path.join(uploadDir, filename);
    fs.writeFileSync(imagePath, imageBuffer);
    imageUrl = `/images/diseases/${filename}`;
  }

  const query = `
    UPDATE diseases SET
      disease_name_id = ?, disease_name_en = ?,
      scientific_name = ?,
      description_id = ?, description_en = ?,
      prevention_id = ?, prevention_en = ?,
      symptoms_id = ?, symptoms_en = ?,
      treatment_recommendations_id = ?, treatment_recommendations_en = ?,
      image_url_example = ?
    WHERE id = ?
  `;

  const values = [
    disease_name_id || null, disease_name_en || null,
    scientific_name || null,
    description_id || null, description_en || null,
    prevention_id || null, prevention_en || null,
    symptoms_id || null, symptoms_en || null,
    treatment_recommendations_id || null, treatment_recommendations_en || null,
    imageUrl,
    id
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Failed to update disease:", err);
      return res.status(500).json({ message: "Failed to update disease", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Disease not found" });
    }
    res.json({ message: "Disease updated successfully" });
  });
};

export const deleteDisease = (req, res) => {
  const { id } = req.params;

  // First, get the image path to delete the file
  db.query("SELECT image_url_example FROM diseases WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching disease for deletion", error: err });
    }
    
    if (results.length > 0 && results[0].image_url_example) {
      const imagePath = path.join(process.cwd(), 'public', results[0].image_url_example);
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          // Log error but continue to delete DB record
          console.error("Error deleting image file:", unlinkErr);
        }
      });
    }

    // Now, delete the database record
    db.query("DELETE FROM diseases WHERE id = ?", [id], (deleteErr, deleteResults) => {
      if (deleteErr) {
        return res.status(500).json({ message: "Failed to delete disease", error: deleteErr });
      }
      if (deleteResults.affectedRows === 0) {
        return res.status(404).json({ message: "Disease not found" });
      }
      res.json({ message: "Disease deleted successfully" });
    });
  });
};


export const getDiseasesCount = (req, res) => {
  const query = "SELECT COUNT(*) as count FROM diseases";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get diseases count", error: err });
    res.json(results[0]);
  });
};