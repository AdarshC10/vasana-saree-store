import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  coverImage: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Style Guide', 'Craft & Culture', 'Saree Care', 'Weddings & Festive', 'Trends'] 
  },
  author: { type: String, default: 'VASANA Editorial Team' },
  readTime: { type: String, default: '4 min read' },
  published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
