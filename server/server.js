import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Security Hardening Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Connect DB
connectDB();

// Separate Express Routers for Customer and Admin Auth
app.use('/api/auth', authRoutes);
app.use('/api/admin/auth', adminAuthRoutes);

// Admin Suite & Business API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/payment', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'VASANA AI', time: new Date().toISOString() });
});

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`VASANA Luxury Saree Server running on port ${PORT}`);
});
