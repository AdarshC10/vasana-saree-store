import mongoose from 'mongoose';

const adminLoginLogSchema = new mongoose.Schema({
  adminEmail: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['success', 'failed', '2fa_pending', '2fa_failed'],
    required: true
  },
  ipAddress: {
    type: String,
    default: '127.0.0.1'
  },
  userAgent: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('AdminLoginLog', adminLoginLogSchema);
