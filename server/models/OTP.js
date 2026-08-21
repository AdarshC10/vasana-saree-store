import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true, // phone number or email address
    index: true
  },
  otpHash: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 } // TTL index automatically deletes expired records
  },
  attempts: {
    type: Number,
    default: 0
  },
  purpose: {
    type: String,
    enum: ['registration', 'login-reset', 'admin-2fa'],
    default: 'registration'
  }
}, { timestamps: true });

export default mongoose.model('OTP', otpSchema);
