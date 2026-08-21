import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  blouseOption: { type: String, default: 'Unstitched Standard' }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [orderItemSchema],
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' }
  },
  paymentMethod: { type: String, default: 'Razorpay' },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'payment_failed'], 
    default: 'pending' 
  },
  // Razorpay Specific Fields
  razorpayOrderId: { type: String, default: '' },
  razorpayPaymentId: { type: String, default: '' },
  razorpaySignature: { type: String, default: '' },

  // Server-Calculated Pricing (never trust frontend prices)
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  amountInPaise: { type: Number, required: true },
  
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'payment_failed', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'pending' 
  },
  trackingCode: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
