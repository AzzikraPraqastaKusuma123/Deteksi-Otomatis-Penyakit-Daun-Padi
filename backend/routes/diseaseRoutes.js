import express from "express";
import { getAllDiseases, addDisease } from "../controllers/diseaseController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllDiseases);
router.post("/", verifyToken, addDisease);

export default router;
