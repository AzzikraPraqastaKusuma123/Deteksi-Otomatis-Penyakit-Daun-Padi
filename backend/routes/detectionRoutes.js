// backend/routes/detectionRoutes.js
import express from "express";
import { getAllDetections, getDetectionsCount, detectDisease, detectRealtime } from "../controllers/detectionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();
router.post("/detect", verifyToken, upload.single('image'), detectDisease);
router.post("/realtime", verifyToken, upload.single('image'), detectRealtime);
router.get("/count", verifyToken, getDetectionsCount);
router.get("/", verifyToken, getAllDetections);

export default router;
