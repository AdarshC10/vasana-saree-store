import express from 'express';
import {
  getAdminStats,
  getAdminOrders,
  getCustomers,
  getAdminPayments
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Middleware: Authenticated Admin Protection
router.get('/stats', protect, adminOnly, getAdminStats);
router.get('/orders', protect, adminOnly, getAdminOrders);
router.get('/customers', protect, adminOnly, getCustomers);
router.get('/payments', protect, adminOnly, getAdminPayments);

export default router;
