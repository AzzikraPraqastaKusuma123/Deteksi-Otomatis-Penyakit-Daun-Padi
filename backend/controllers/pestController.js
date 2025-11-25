import db from '../config/db.js';
import fs from 'fs';
import path from 'path';

export const getAllPests = (req, res) => {
  const query = `
    SELECT *
    FROM pests
    ORDER BY name_id ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error in getAllPests:", err); // Add this line
      return res.status(500).json({ message: "Failed to get pests", error: err });
    }
    res.json(results);
  });
};

export const getPestById = async (req, res) => {
  const { id } = req.params;
  const lang = ['id', 'en'].includes(req.query.lang) ? req.query.lang : 'id';

  try {
    const pestQuery = `SELECT * FROM pests WHERE id = ?`;
    const [pestResults] = await db.promise().query(pestQuery, [id]);

    if (pestResults.length === 0) {
      return res.status(404).json({ message: "Pest not found" });
    }
    const pestData = pestResults[0];

    res.json(pestData);

  } catch (error) {
    console.error("Error in getPestById:", error);
    res.status(500).json({ message: "Failed to process request for pest details.", error: error.message });
  }
};

export const updatePest = async (req, res) => {
  const { id } = req.params;
  const { name_id, name_en, scientific_name, description_id, description_en, symptoms_id, symptoms_en, prevention_id, prevention_en, treatment_id, treatment_en } = req.body;

  let imageUrl = req.body.image_url;

  if (req.file) {
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'pests');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `pest_${Date.now()}.jpg`;
    const imagePath = path.join(uploadDir, filename);
    fs.writeFileSync(imagePath, req.file.buffer);
    imageUrl = `/images/pests/${filename}`;
  }

  const query = `
    UPDATE pests SET
      name_id = ?,
      name_en = ?,
      scientific_name = ?,
      description_id = ?,
      description_en = ?,
      symptoms_id = ?,
      symptoms_en = ?,
      prevention_id = ?,
      prevention_en = ?,
      treatment_id = ?,
      treatment_en = ?,
      image_url = ?
    WHERE id = ?
  `;

  const params = [name_id, name_en, scientific_name, description_id, description_en, symptoms_id, symptoms_en, prevention_id, prevention_en, treatment_id, treatment_en, imageUrl, id];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error in updatePest:", err);
      return res.status(500).json({ message: "Failed to update pest", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Pest not found" });
    }
    res.json({ message: "Pest updated successfully", image_url: imageUrl });
  });
};

export const getPestsCount = (req, res) => {
  const query = "SELECT COUNT(*) as count FROM pests";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error in getPestsCount:", err);
      return res.status(500).json({ message: "Failed to get pests count", error: err });
    }
    res.json(results[0]);
  });
};

export const addPest = (req, res) => {
  const { name_id, name_en, scientific_name, description_id, description_en, symptoms_id, symptoms_en, prevention_id, prevention_en, treatment_id, treatment_en } = req.body;

  const query = `
    INSERT INTO pests (name_id, name_en, scientific_name, description_id, description_en, symptoms_id, symptoms_en, prevention_id, prevention_en, treatment_id, treatment_en)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [name_id, name_en, scientific_name, description_id, description_en, symptoms_id, symptoms_en, prevention_id, prevention_en, treatment_id, treatment_en];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error in addPest:", err);
      return res.status(500).json({ message: "Failed to add pest", error: err });
    }
    res.status(201).json({ message: "Pest added successfully", pestId: results.insertId });
  });
};
