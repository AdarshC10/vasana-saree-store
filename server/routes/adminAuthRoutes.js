import express from 'express';
import rateLimit from 'express-rate-limit';
import { adminLogin, verifyAdmin2FA } from '../controllers/adminAuthController.js';

const router = express.Router();

// Rate Limiter for Admin Authentication (5 attempts per 15 minutes)
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many admin authentication attempts. Access locked for 15 minutes.' }
});

// E. RESTRICTED ADMIN LOGIN & MANDATORY 2FA
router.post('/login', adminLoginLimiter, adminLogin);
router.post('/verify-2fa', verifyAdmin2FA);

export default router;
