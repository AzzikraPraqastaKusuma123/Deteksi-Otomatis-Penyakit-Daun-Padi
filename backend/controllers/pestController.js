import db from '../config/db.js';

export const getAllPests = (req, res) => {
  const lang = ['id', 'en'].includes(req.query.lang) ? req.query.lang : 'id';
  const nameCol = `name_${lang}`;
  const descriptionCol = `description_${lang}`;
  const symptomsCol = `symptoms_${lang}`;
  const preventionCol = `prevention_${lang}`;
  const treatmentCol = `treatment_${lang}`;

  const query = `
    SELECT 
      id,
      ${nameCol} AS name,
      scientific_name,
      ${descriptionCol} AS description,
      ${symptomsCol} AS symptoms,
      ${preventionCol} AS prevention,
      ${treatmentCol} AS treatment,
      image_url
    FROM pests
    ORDER BY name ASC
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

    const response = {
      id: pestData.id,
      name: pestData[`name_${lang}`],
      scientific_name: pestData.scientific_name,
      description: pestData[`description_${lang}`],
      symptoms: pestData[`symptoms_${lang}`],
      prevention: pestData[`prevention_${lang}`],
      treatment: pestData[`treatment_${lang}`],
      image_url: pestData.image_url,
    };

    res.json(response);

  } catch (error) {
    console.error("Error in getPestById:", error);
    res.status(500).json({ message: "Failed to process request for pest details.", error: error.message });
  }
};
