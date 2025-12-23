import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import detectionRoutes from "./routes/detectionRoutes.js";
import diseaseRoutes from "./routes/diseaseRoutes.js";
import agriculturalResourceRoutes from "./routes/agriculturalResourceRoutes.js";
import pestRoutes from "./routes/pestRoutes.js";
import path from "path";
import { loadModel } from "./services/detectionService.js";
import mime from 'mime-types';
import fs from 'fs';

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
// Define specific upload directories
const AGRICULTURAL_RESOURCES_DIR = path.join(process.cwd(), 'public', 'images', 'agricultural_resources');
const DISEASES_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'diseases');
const PESTS_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'pests');

// Explicit route for agricultural_resources images (bypassing express.static for full control)
app.get('/images/agricultural_resources/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(AGRICULTURAL_RESOURCES_DIR, imageName);

    fs.readFile(imagePath, (err, data) => { // Manually read the file
        if (err) {
            console.error('Error reading agricultural resource image:', err);
            if (err.code === 'ENOENT') {
                res.status(404).send('Image not found');
            } else {
                res.status(500).send('Internal server error');
            }
            return;
        }

        const contentType = mime.lookup(imageName);
        if (contentType) {
            res.setHeader('Content-Type', contentType);
        }
        res.setHeader('Content-Length', data.length);
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); 

        console.log(`Serving image: ${imageName}, Content-Type: ${contentType}, Content-Length: ${data.length}`);

        res.end(data); // Use res.end() instead of res.send()
    });
});

// Serve disease images using express.static, with cors explicitly applied
app.use('/images/diseases', cors(), express.static(DISEASES_IMAGES_DIR));

// Serve pest images using express.static, with cors explicitly applied
app.use('/images/pests', cors(), express.static(PESTS_IMAGES_DIR));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/detections", detectionRoutes);
app.use("/api/diseases", diseaseRoutes);
app.use("/api/agricultural-resources", agriculturalResourceRoutes);
app.use("/api/pests", pestRoutes);

const PORT = process.env.PORT || 5002;
console.log("Attempting to start server on port:", PORT);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
