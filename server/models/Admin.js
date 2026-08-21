import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Admin email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required']
  },
  name: {
    type: String,
    default: 'VASANA Master Admin'
  },
  role: {
    type: String,
    enum: ['admin', 'super_admin'],
    default: 'admin'
  }
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);
