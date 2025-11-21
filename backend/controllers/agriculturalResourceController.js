// backend/controllers/agriculturalResourceController.js
import db from "../config/db.js";
import fs from "fs";
import path from "path";
import { getGenerativeAgriculturalResourceInfo } from "../services/detectionService.js";

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
export const getResourceById = async (req, res) => {
  const { id } = req.params;
  const lang = ['id', 'en'].includes(req.query.lang) ? req.query.lang : 'id';

  try {
    const resourceQuery = "SELECT * FROM agricultural_resources WHERE id = ?";
    const [resourceResults] = await db.promise().query(resourceQuery, [id]);

    if (resourceResults.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    
    const resourceData = resourceResults[0];
    // Prepend backend public URL to the main resource image path
    resourceData.image = resourceData.image ? `${req.protocol}://${req.get('host')}/images/agricultural_resources/${resourceData.image}` : null;

    // Now, find related diseases
    const diseasesQuery = `
      SELECT d.* 
      FROM diseases d
      JOIN disease_solutions ds ON d.id = ds.disease_id
      WHERE ds.resource_id = ?
    `;

    const [diseaseResults] = await db.promise().query(diseasesQuery, [id]);
    
    const relatedDiseases = diseaseResults.map(disease => ({
      ...disease,
      image_url_example: disease.image_url_example ? `${req.protocol}://${req.get('host')}${disease.image_url_example}` : null
    }));

    // Construct Gemini Summary for the response
    const geminiSummary = {
      overview: resourceData[`gemini_overview_${lang}`] || resourceData.description, // Fallback to original description
      usage_tips: resourceData[`gemini_usage_tips_${lang}`] || null
    };

    let geminiBenefits = [];
    try {
      if (resourceData.gemini_benefits_json) {
        geminiBenefits = JSON.parse(resourceData.gemini_benefits_json);
      }
    } catch (parseError) {
      console.error("Error parsing gemini_benefits_json:", parseError);
    }

    let geminiAdditionalRecommendations = [];
    try {
      if (resourceData.gemini_rekomendasi_tambahan_json) {
        geminiAdditionalRecommendations = JSON.parse(resourceData.gemini_rekomendasi_tambahan_json);
      }
    } catch (parseError) {
      console.error("Error parsing gemini_rekomendasi_tambahan_json:", parseError);
    }

    res.json({ 
      resource: {
        ...resourceData,
        gemini_summary: geminiSummary,
        gemini_benefits: geminiBenefits,
        gemini_additional_recommendations: geminiAdditionalRecommendations
      }, 
      relatedDiseases 
    });
  } catch (err) {
    console.error("Failed to get resource or related diseases:", err);
    return res.status(500).json({ message: "Failed to get resource details", error: err.message });
  }
};

// Create a new agricultural resource
export const createResource = async (req, res) => {
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

  // --- Generate Gemini Info ---
  let geminiOverviewId = null;
  let geminiUsageTipsId = null;
  let geminiBenefitsJson = null; // Stored as JSON string
  let geminiRekomendasiTambahanJson = null; // Stored as JSON string

  // For English
  let geminiOverviewEn = null;
  let geminiUsageTipsEn = null;


  try {
    const geminiInfoId = await getGenerativeAgriculturalResourceInfo(name, 'id');
    if (geminiInfoId && !geminiInfoId.error) {
      geminiOverviewId = geminiInfoId.overview;
      geminiUsageTipsId = geminiInfoId.usage_tips;
      if (geminiInfoId.benefits) {
        geminiBenefitsJson = JSON.stringify(geminiInfoId.benefits);
      }
      if (geminiInfoId.additional_recommendations) {
        geminiRekomendasiTambahanJson = JSON.stringify(geminiInfoId.additional_recommendations);
      }
    }
  } catch (geminiError) {
    console.error("Error generating Gemini info for agricultural resource (ID):", geminiError);
  }

  try {
    const geminiInfoEn = await getGenerativeAgriculturalResourceInfo(name, 'en');
    if (geminiInfoEn && !geminiInfoEn.error) {
      geminiOverviewEn = geminiInfoEn.overview;
      geminiUsageTipsEn = geminiInfoEn.usage_tips;
      // Note: benefits and recommendations are language-agnostic for now,
      // so we use the ID version for the shared JSON fields.
    }
  } catch (geminiError) {
    console.error("Error generating Gemini info for agricultural resource (EN):", geminiError);
  }
  // --- End Gemini Info Generation ---

  const query = `
    INSERT INTO agricultural_resources (
      name, category, description, image,
      gemini_overview_id, gemini_overview_en,
      gemini_usage_tips_id, gemini_usage_tips_en,
      gemini_benefits_json, gemini_rekomendasi_tambahan_json
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    name, category, description, imageName,
    geminiOverviewId, geminiOverviewEn,
    geminiUsageTipsId, geminiUsageTipsEn,
    geminiBenefitsJson, geminiRekomendasiTambahanJson
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Failed to add resource:", err);
      return res.status(500).json({ message: "Failed to add resource", error: err });
    }
    res.status(201).json({ message: "Resource added successfully", id: results.insertId });
  });
};

// Update an existing agricultural resource
export const updateResource = async (req, res) => {
  const { id } = req.params;
  const { name, category, description } = req.body;

  if (!name || !category || !description) {
    return res.status(400).json({ message: "Name, category, and description are required" });
  }

  // First, get the old image name and current Gemini info to potentially re-generate or retain
  const [currentResourceResults] = await db.promise().query("SELECT image, name, gemini_overview_id, gemini_overview_en, gemini_usage_tips_id, gemini_usage_tips_en, gemini_benefits_json, gemini_rekomendasi_tambahan_json FROM agricultural_resources WHERE id = ?", [id]);

  if (currentResourceResults.length === 0) {
    return res.status(404).json({ message: "Resource not found to update." });
  }

  const currentResource = currentResourceResults[0];
  const oldImageName = currentResource.image;
  let newImageName = oldImageName;

  if (req.file) {
    const imageBuffer = req.file.buffer;
    const filename = `resource_${Date.now()}${path.extname(req.file.originalname)}`;
    const imagePath = path.join(UPLOAD_DIR, filename);
    
    fs.writeFileSync(imagePath, imageBuffer);
    newImageName = filename;

    if (oldImageName) {
      const oldImagePath = path.join(UPLOAD_DIR, oldImageName);
      fs.unlink(oldImagePath, (unlinkErr) => {
        if (unlinkErr) console.error("Error deleting old image:", unlinkErr);
      });
    }
  }

  // --- Generate Gemini Info ---
  let geminiOverviewId = currentResource.gemini_overview_id;
  let geminiUsageTipsId = currentResource.gemini_usage_tips_id;
  let geminiBenefitsJson = currentResource.gemini_benefits_json; 
  let geminiRekomendasiTambahanJson = currentResource.gemini_rekomendasi_tambahan_json; 

  let geminiOverviewEn = currentResource.gemini_overview_en;
  let geminiUsageTipsEn = currentResource.gemini_usage_tips_en;

  const nameChanged = currentResource.name !== name;

  // Re-generate if name changed or if any Gemini info is missing
  if (nameChanged || !geminiOverviewId || !geminiUsageTipsId || !geminiBenefitsJson || !geminiRekomendasiTambahanJson) {
    try {
      const geminiInfoId = await getGenerativeAgriculturalResourceInfo(name, 'id');
      if (geminiInfoId && !geminiInfoId.error) {
        geminiOverviewId = geminiInfoId.overview;
        geminiUsageTipsId = geminiInfoId.usage_tips;
        if (geminiInfoId.benefits) {
          geminiBenefitsJson = JSON.stringify(geminiInfoId.benefits);
        }
        if (geminiInfoId.additional_recommendations) {
          geminiRekomendasiTambahanJson = JSON.stringify(geminiInfoId.additional_recommendations);
        }
      } else {
        console.warn("Gemini ID generation failed or returned error. Retaining old ID info.");
      }
    } catch (geminiError) {
      console.error("Error re-generating Gemini info for agricultural resource (ID):", geminiError);
    }
  }

  // Re-generate if name changed or if any Gemini info is missing for EN
  if (nameChanged || !geminiOverviewEn || !geminiUsageTipsEn) {
    try {
      const geminiInfoEn = await getGenerativeAgriculturalResourceInfo(name, 'en');
      if (geminiInfoEn && !geminiInfoEn.error) {
        geminiOverviewEn = geminiInfoEn.overview;
        geminiUsageTipsEn = geminiInfoEn.usage_tips;
        // Shared JSON fields (benefits, recommendations) are already handled by ID call
      } else {
        console.warn("Gemini EN generation failed or returned error. Retaining old EN info.");
      }
    } catch (geminiError) {
      console.error("Error re-generating Gemini info for agricultural resource (EN):", geminiError);
    }
  }
  // --- End Gemini Info Generation ---

  const query = `
      UPDATE agricultural_resources SET
        name = ?,
        category = ?,
        description = ?,
        image = ?,
        gemini_overview_id = ?,
        gemini_overview_en = ?,
        gemini_usage_tips_id = ?,
        gemini_usage_tips_en = ?,
        gemini_benefits_json = ?,
        gemini_rekomendasi_tambahan_json = ?
      WHERE id = ?
    `;

  const values = [
    name, category, description, newImageName,
    geminiOverviewId, geminiOverviewEn,
    geminiUsageTipsId, geminiUsageTipsEn,
    geminiBenefitsJson, geminiRekomendasiTambahanJson,
    id
  ];

  db.query(query, values, (err, updateResult) => {
    if (err) {
      console.error("Failed to update resource:", err);
      return res.status(500).json({ message: "Failed to update resource", error: err });
    }
    res.json({ message: "Resource updated successfully" });
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
