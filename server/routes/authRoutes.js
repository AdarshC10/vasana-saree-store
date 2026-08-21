import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  registerCustomer,
  verifyOTP,
  resendOTP,
  loginCustomer,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Rate Limiter: Brute-force protection for Customer Login (5 attempts per 15 mins)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' }
});

// Rate Limiter: Forgot Password link requests (3 per hour)
const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, message: 'Too many password reset requests. Please try again after 1 hour.' }
});

// Rate Limiter: Customer Registration (10 per hour)
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Registration rate limit exceeded. Please try again later.' }
});

// B. CUSTOMER REGISTRATION & OTP VERIFICATION
router.post('/register', registerLimiter, registerCustomer);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

// C. CUSTOMER LOGIN
router.post('/login', loginLimiter, loginCustomer);

// D. FORGOT & RESET PASSWORD FLOW
router.post('/forgot-password', forgotPasswordLimiter, forgotPassword);
router.post('/reset-password', resetPassword);

// Get Current User Endpoint
router.get('/me', protect, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.fullName || req.user.name,
    email: req.user.email,
    phone: req.user.phone,
    role: req.user.role,
    addresses: req.user.addresses || []
  });
});

export default router;
