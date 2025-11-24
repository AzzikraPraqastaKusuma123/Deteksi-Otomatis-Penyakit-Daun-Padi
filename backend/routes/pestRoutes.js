import express from "express";
import {
  getAllPests,
  getPestById,
  updatePest,
  getPestsCount,
  addPest,
} from "../controllers/pestController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllPests);
router.get("/count", verifyToken, getPestsCount);
router.get("/:id", verifyToken, getPestById);
router.put("/:id", verifyToken, upload.single("image"), updatePest);
router.post("/", verifyToken, addPest);

export default router;
