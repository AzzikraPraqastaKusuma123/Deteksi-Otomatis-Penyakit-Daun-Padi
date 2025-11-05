import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import detectionRoutes from "./routes/detectionRoutes.js";
import diseaseRoutes from "./routes/diseaseRoutes.js";
import { loadModel } from "./services/detectionService.js";

dotenv.config();

// Load the ONNX model at startup
loadModel().catch(error => {
  console.error("Failed to load the model on startup:", error);
  process.exit(1); // Stop the server if the model fails to load
});

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase payload limit for images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/uploads', express.static('uploads'));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/detections", detectionRoutes);
app.use("/api/diseases", diseaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
