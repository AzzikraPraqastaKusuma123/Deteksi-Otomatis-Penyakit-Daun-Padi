// backend/routes/detectionRoutes.js
import express from "express";
import { getAllDetections, getDetectionsCount, detectDisease, detectRealtime, getDetectionById } from "../controllers/detectionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();
router.post("/detect", verifyToken, upload.single('image'), detectDisease);
router.post("/realtime", verifyToken, upload.single('image'), detectRealtime);
router.get("/count", verifyToken, getDetectionsCount);
router.get("/:id", verifyToken, getDetectionById); // New route for single detection details
router.get("/", verifyToken, getAllDetections);

export default router;
