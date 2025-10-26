import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { username, email, password, full_name, location } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = "INSERT INTO users (username, email, password, full_name, location) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [username, email, hashedPassword, full_name, location], (err) => {
    if (err) return res.status(500).json({ message: "Registration failed", error: err });
    res.status(201).json({ message: "User registered successfully" });
  });
};

export const login = (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (err) return res.status(500).json({ message: "Login failed", error: err });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });

    const user = result[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login success", token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  });
};
