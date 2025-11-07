// backend/routes/detectionRoutes.js
import express from "express";
import { getAllDetections, getDetectionsCount, detectDisease } from "../controllers/detectionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// 🔍 Jalankan deteksi penyakit daun (otomatis tersimpan)
router.post("/detect", verifyToken, upload.single('image'), detectDisease);

// 📊 Hitung total deteksi per user
router.get("/count", verifyToken, getDetectionsCount);

// 📋 Ambil semua deteksi milik user
router.get("/", verifyToken, getAllDetections);

export default router;
