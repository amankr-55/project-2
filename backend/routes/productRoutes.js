import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes to browse & view products
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin-only routes to add & delete products
router.post('/', protect, admin, createProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
