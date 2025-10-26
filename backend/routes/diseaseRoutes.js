import express from "express";
import { getAllDiseases, addDisease, getDiseasesCount } from "../controllers/diseaseController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/count", verifyToken, getDiseasesCount);
router.get("/", verifyToken, getAllDiseases);
router.post("/", verifyToken, addDisease);

export default router;
