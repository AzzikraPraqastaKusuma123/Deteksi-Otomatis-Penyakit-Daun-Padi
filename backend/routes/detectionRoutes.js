import express from "express";
import { getAllDetections, addDetection } from "../controllers/detectionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllDetections);
router.post("/", verifyToken, addDetection);

export default router;
