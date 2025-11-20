// backend/routes/agriculturalResourceRoutes.js
import express from 'express';
import {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
} from '../controllers/agriculturalResourceController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Middleware to check for admin role
const isAdmin = (req, res, next) => {
  // verifyToken should have already run and attached user data to req.user
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Akses ditolak. Peran admin diperlukan.' });
  }
};

// Public routes
router.get('/', getAllResources);
router.get('/:id', getResourceById);

// Admin-only routes
router.post(
  '/', 
  verifyToken, 
  isAdmin, 
  upload.single('image'), 
  createResource
);

router.put(
  '/:id', 
  verifyToken, 
  isAdmin, 
  upload.single('image'), 
  updateResource
);

router.delete(
  '/:id', 
  verifyToken, 
  isAdmin, 
  deleteResource
);

export default router;
