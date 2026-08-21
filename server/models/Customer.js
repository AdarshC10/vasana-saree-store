import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['customer'],
    default: 'customer'
  },
  failedLoginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  },
  addresses: [{
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' },
    isDefault: { type: Boolean, default: false }
  }]
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);
