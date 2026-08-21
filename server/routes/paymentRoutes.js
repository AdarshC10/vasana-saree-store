import express from 'express';
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  razorpayWebhookHandler
} from '../controllers/paymentController.js';

const router = express.Router();

// STEP 2: Create Razorpay Order (Server-Calculated Price)
router.post('/create-order', createRazorpayOrder);

// STEP 4 & 5: Verify Razorpay HMAC-SHA256 Payment Signature (Server-Side)
router.post('/verify', verifyRazorpayPayment);

// STEP 4 WEBHOOK: Razorpay Webhook Event Listener (payment.captured)
router.post('/webhook', razorpayWebhookHandler);

export default router;
