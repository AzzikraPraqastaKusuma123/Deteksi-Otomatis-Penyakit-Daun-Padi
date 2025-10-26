import db from "../config/db.js";

export const getAllDiseases = (req, res) => {
  const query = "SELECT * FROM diseases";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get diseases", error: err });
    res.json(results);
  });
};

export const addDisease = (req, res) => {
  const { name, description, prevention } = req.body;
  const query = "INSERT INTO diseases (name, description, prevention) VALUES (?, ?, ?)";
  db.query(query, [name, description, prevention], (err) => {
    if (err) return res.status(500).json({ message: "Failed to add disease", error: err });
    res.status(201).json({ message: "Disease added successfully" });
  });
};

export const getDiseasesCount = (req, res) => {
  const query = "SELECT COUNT(*) as count FROM diseases";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to get diseases count", error: err });
    res.json(results[0]);
  });
};
