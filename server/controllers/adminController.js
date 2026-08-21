import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

/**
 * GET /api/admin/stats
 * Single source of truth: Aggregates live MongoDB analytics for Admin Dashboard
 */
export const getAdminStats = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'Pending' || o.status === 'Confirmed' || o.status === 'Processing').length;

    const lowStockProducts = await Product.find({ stock: { $lte: 5 } }).select('name stock price images category');

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email');

    res.json({
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      pendingOrders,
      lowStockProducts,
      recentOrders
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/orders
 * Returns all MongoDB orders sorted by newest first
 */
export const getAdminOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email phone');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/customers
 * Returns all registered MongoDB customers
 */
export const getCustomers = async (req, res, next) => {
  try {
    const customers = await User.find({ role: 'customer' }).select('-password').sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/payments
 * Returns all MongoDB payment transaction logs
 */
export const getAdminPayments = async (req, res, next) => {
  try {
    const ordersWithPayment = await Order.find({ razorpayOrderId: { $ne: '' } })
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
    res.json(ordersWithPayment);
  } catch (error) {
    next(error);
  }
};
