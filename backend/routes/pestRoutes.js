import express from "express";
import {
  getAllPests,
  getPestById,
} from "../controllers/pestController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllPests);
router.get("/:id", verifyToken, getPestById);

export default router;
