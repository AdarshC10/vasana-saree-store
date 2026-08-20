import express from 'express';
import { getAdminStats, getCustomers } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, adminOnly, getAdminStats);
router.get('/customers', protect, adminOnly, getCustomers);

export default router;
