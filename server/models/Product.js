import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 }, // percentage
  category: { 
    type: String, 
    required: true, 
    enum: ['Banarasi', 'Kanjeevaram', 'Chanderi', 'Organza', 'Linen', 'Georgette', 'Tussar Silk', 'Velvet', 'Handloom Cotton'] 
  },
  fabric: { type: String, required: true },
  color: { type: String, required: true },
  occasion: { 
    type: String, 
    required: true, 
    enum: ['Wedding', 'Festive', 'Everyday', 'Party', 'Bridal', 'Formal'] 
  },
  collectionType: { 
    type: String, 
    default: 'Silk Stories', 
    enum: ['Silk Stories', 'Wedding Edit', 'Festive Collection', 'Everyday Grace', 'Royalty'] 
  },
  images: [{ type: String, required: true }],
  stock: { type: Number, required: true, default: 10 },
  sku: { type: String, required: true, unique: true },
  sareeLength: { type: String, default: '5.5 meters' },
  blouseLength: { type: String, default: '0.8 meters unstitched' },
  rating: { type: Number, default: 4.8 },
  reviewCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  craftStory: { type: String, default: '' },
  careInstructions: { type: String, default: 'Dry clean only. Store wrapped in clean muslin cloth.' }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
