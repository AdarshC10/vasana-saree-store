import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

// Storefront Pages (Immediate load)
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Wedding from './pages/Wedding';
import CraftPage from './pages/CraftPage';
import About from './pages/About';
import Journal from './pages/Journal';
import JournalDetail from './pages/JournalDetail';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Suite Pages (Lazy loaded in separate lightweight chunks for 3X faster site speed)
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminInventory = lazy(() => import('./pages/admin/AdminInventory'));
const AdminCustomers = lazy(() => import('./pages/admin/AdminCustomers'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const AdminPayments = lazy(() => import('./pages/admin/AdminPayments'));
const AdminCoupons = lazy(() => import('./pages/admin/AdminCoupons'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

// Protected Admin Route Wrapper
const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Protected User Route Wrapper
const UserRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <CartDrawer />
                
                <main className="flex-grow">
                  <Suspense fallback={<div className="min-h-screen bg-[#F7F4EE]" />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:identifier" element={<ProductDetail />} />
                      <Route path="/wedding" element={<Wedding />} />
                      <Route path="/craft" element={<CraftPage />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/journal" element={<Journal />} />
                      <Route path="/journal/:slug" element={<JournalDetail />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-success/:id" element={<OrderSuccess />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      
                      <Route path="/account" element={<UserRoute><Account /></UserRoute>} />

                      {/* VASANA Administration Suite (Dynamic Async Chunks) */}
                      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                      <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
                      <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
                      <Route path="/admin/inventory" element={<AdminRoute><AdminInventory /></AdminRoute>} />
                      <Route path="/admin/customers" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
                      <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />
                      <Route path="/admin/payments" element={<AdminRoute><AdminPayments /></AdminRoute>} />
                      <Route path="/admin/coupons" element={<AdminRoute><AdminCoupons /></AdminRoute>} />
                      <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />

                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Suspense>
                </main>

                <Footer />
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
