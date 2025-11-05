import express from "express";
import { getAllDetections, addDetection, getDetectionsCount, detectDisease } from "../controllers/detectionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/detect", verifyToken, upload.single('image'), detectDisease);
router.get("/count", verifyToken, getDetectionsCount);
router.get("/", verifyToken, getAllDetections);
router.post("/", verifyToken, addDetection);

export default router;
