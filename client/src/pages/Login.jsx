import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/account', { replace: true });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleAdminQuickLogin = async () => {
    setLoading(true);
    try {
      const user = await login('admin@example.com', 'admin123');
      navigate('/admin', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerQuickLogin = async () => {
    setLoading(true);
    try {
      const user = await login('customer@example.com', 'customer123');
      navigate('/account', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        
        <div className="bg-white p-8 sm:p-10 border border-vasana-rose/60 shadow-luxury space-y-6 text-vasana-dark">
          
          <div className="text-center space-y-2">
            <span className="font-serif text-3xl font-bold tracking-widest text-vasana-burgundy uppercase block">
              VASANA
            </span>
            <h2 className="font-serif text-2xl font-light">Sign In to Your Account</h2>
            <p className="text-xs font-sans text-gray-500">Access saved sarees, orders, and trousseau wishlists</p>
          </div>

          {/* Quick Demo Login Buttons (0ms Instant Loading) */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleAdminQuickLogin}
              className="w-full py-2.5 bg-[#1F1A17] text-[#D4B26A] text-xs font-sans font-bold tracking-wider uppercase rounded shadow-sm hover:bg-[#2B231E] transition-all flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#B8924A]" />
              <span>Instant Sign In as Admin</span>
            </button>

            <button
              type="button"
              onClick={handleCustomerQuickLogin}
              className="w-full py-2 border border-[#241C18] text-[#241C18] text-xs font-sans font-semibold tracking-wider uppercase rounded hover:bg-[#FAF6F0] transition-all flex items-center justify-center space-x-2"
            >
              <User className="w-4 h-4 text-[#B4975A]" />
              <span>Instant Sign In as Customer</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 my-4">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-[10px] uppercase font-sans text-gray-400 font-bold">OR USE CREDENTIALS</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-gray-700 font-bold uppercase mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold uppercase mb-1">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-vasana-burgundy hover:bg-vasana-burgundyDark text-white text-xs font-bold tracking-super-wide uppercase shadow-luxury transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'SIGNING IN...' : 'SIGN IN'}</span>
              <ArrowRight className="w-4 h-4 text-vasana-gold" />
            </button>
          </form>

          <div className="text-center pt-4 border-t border-vasana-rose/30 text-xs font-sans">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/register" className="text-vasana-burgundy font-bold hover:underline">
              Create an Account
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
