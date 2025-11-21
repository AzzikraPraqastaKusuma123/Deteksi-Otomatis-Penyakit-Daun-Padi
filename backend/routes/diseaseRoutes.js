// backend/routes/diseaseRoutes.js
import express from "express";
import {
  getAllDiseases,
  addDisease,
  getDiseasesCount,
  getDiseaseById,
  updateDisease,
  deleteDisease
} from "../controllers/diseaseController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
                                                                               
const router = express.Router();
                                                                               
router.get("/count", verifyToken, getDiseasesCount);
router.get("/", verifyToken, getAllDiseases);
router.post("/", verifyToken, upload.single('image'), addDisease);
router.get("/:id", verifyToken, getDiseaseById);
router.put("/:id", verifyToken, upload.single('image'), updateDisease);
router.delete("/:id", verifyToken, deleteDisease);
                                                                               
export default router;