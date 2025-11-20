// backend/controllers/agriculturalResourceController.js
import db from "../config/db.js";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), 'backend', 'public', 'images', 'agricultural_resources');

// Ensure the upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Function to get the full public path for an image
const getImagePath = (imageName) => `/images/agricultural_resources/${imageName}`;

// Get all agricultural resources
export const getAllResources = (req, res) => {
  const query = "SELECT * FROM agricultural_resources ORDER BY category, name ASC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get resources", error: err });
    
    // Prepend backend public URL to image paths
    const resources = results.map(resource => ({
      ...resource,
      image: resource.image ? `${req.protocol}://${req.get('host')}/images/agricultural_resources/${resource.image}` : null
    }));
    
    res.json(resources);
  });
};

// Get a single agricultural resource by ID, now including related diseases
export const getResourceById = (req, res) => {
  const { id } = req.params;
  const resourceQuery = "SELECT * FROM agricultural_resources WHERE id = ?";
  
  db.query(resourceQuery, [id], (err, resourceResults) => {
    if (err) return res.status(500).json({ message: "Failed to get resource", error: err });
    if (resourceResults.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    
    const resource = resourceResults[0];
    // Prepend backend public URL to the main resource image path
    resource.image = resource.image ? `${req.protocol}://${req.get('host')}/images/agricultural_resources/${resource.image}` : null;

    // Now, find related diseases
    const diseasesQuery = `
      SELECT d.* 
      FROM diseases d
      JOIN disease_solutions ds ON d.id = ds.disease_id
      WHERE ds.resource_id = ?
    `;

    db.query(diseasesQuery, [id], (diseaseErr, diseaseResults) => {
      if (diseaseErr) {
        console.error("Failed to get related diseases:", diseaseErr);
        return res.json({ resource, relatedDiseases: [] });
      }
      
      // Prepend backend public URL to the related disease image paths
      const relatedDiseases = diseaseResults.map(disease => ({
        ...disease,
        image_url_example: disease.image_url_example ? `${req.protocol}://${req.get('host')}${disease.image_url_example}` : null
      }));

      res.json({ resource, relatedDiseases });
    });
  });
};

// Create a new agricultural resource
export const createResource = (req, res) => {
  const { name, category, description } = req.body;

  if (!name || !category || !description) {
    return res.status(400).json({ message: "Name, category, and description are required" });
  }

  let imageName = null;
  if (req.file) {
    const imageBuffer = req.file.buffer;
    const filename = `resource_${Date.now()}${path.extname(req.file.originalname)}`;
    const imagePath = path.join(UPLOAD_DIR, filename);
    
    fs.writeFileSync(imagePath, imageBuffer);
    imageName = filename;
  }

  const query = `
    INSERT INTO agricultural_resources (name, category, description, image) 
    VALUES (?, ?, ?, ?)
  `;
  
  const values = [name, category, description, imageName];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Failed to add resource:", err);
      return res.status(500).json({ message: "Failed to add resource", error: err });
    }
    res.status(201).json({ message: "Resource added successfully", id: results.insertId });
  });
};

// Update an existing agricultural resource
export const updateResource = (req, res) => {
  const { id } = req.params;
  const { name, category, description } = req.body;

  if (!name || !category || !description) {
    return res.status(400).json({ message: "Name, category, and description are required" });
  }

  // First, get the old image name to delete it if a new one is uploaded
  db.query("SELECT image FROM agricultural_resources WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error fetching old resource.", error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Resource not found to update." });
    }

    const oldImageName = results[0].image;
    let newImageName = oldImageName;

    if (req.file) {
      // A new file is uploaded, so we process it
      const imageBuffer = req.file.buffer;
      const filename = `resource_${Date.now()}${path.extname(req.file.originalname)}`;
      const imagePath = path.join(UPLOAD_DIR, filename);
      
      fs.writeFileSync(imagePath, imageBuffer);
      newImageName = filename;

      // And delete the old file if it existed
      if (oldImageName) {
        const oldImagePath = path.join(UPLOAD_DIR, oldImageName);
        fs.unlink(oldImagePath, (unlinkErr) => {
          if (unlinkErr) console.error("Error deleting old image:", unlinkErr);
        });
      }
    }

    const query = `
      UPDATE agricultural_resources SET
        name = ?,
        category = ?,
        description = ?,
        image = ?
      WHERE id = ?
    `;

    const values = [name, category, description, newImageName, id];

    db.query(query, values, (err, updateResult) => {
      if (err) {
        console.error("Failed to update resource:", err);
        return res.status(500).json({ message: "Failed to update resource", error: err });
      }
      res.json({ message: "Resource updated successfully" });
    });
  });
};

// Delete an agricultural resource
export const deleteResource = (req, res) => {
  const { id } = req.params;

  // First, get the image name to delete the file
  db.query("SELECT image FROM agricultural_resources WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching resource for deletion", error: err });
    }
    
    if (results.length > 0 && results[0].image) {
      const imageName = results[0].image;
      const imagePath = path.join(UPLOAD_DIR, imageName);
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting image file:", unlinkErr);
        }
      });
    }

    // Now, delete the database record
    db.query("DELETE FROM agricultural_resources WHERE id = ?", [id], (deleteErr, deleteResults) => {
      if (deleteErr) {
        return res.status(500).json({ message: "Failed to delete resource", error: deleteErr });
      }
      if (deleteResults.affectedRows === 0) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.json({ message: "Resource deleted successfully" });
    });
  });
};
