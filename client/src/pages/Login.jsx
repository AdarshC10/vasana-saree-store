import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import api from '../services/api';

export default function Login() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password.', 'error');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      if (err.response?.data?.requiresOTP) {
        addToast('Account not verified yet. Please enter the OTP sent to your phone.', 'warning');
        navigate('/verify-otp', { state: { phone: err.response.data.phone, email } });
        return;
      }
      const errorMessage = err.response?.data?.message || err.message || 'Invalid email or password.';
      addToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] pt-32 pb-20 font-sans selection:bg-[#241C18] selection:text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-[#EFE7DC] p-8 sm:p-10 rounded-2xl shadow-luxury space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-sans font-bold tracking-super-wide text-[#B8924A] uppercase">
            VASANA ATELIER
          </span>
          <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Customer Sign In</h1>
          <p className="text-xs text-gray-500 font-light">Access your saved sarees, wishlists, and bespoke orders</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-[#B8924A] focus:outline-none"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Password with Eye Toggle & Forgot Password Link */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-gray-700 font-bold uppercase tracking-wider">
                Password *
              </label>
              <Link to="/forgot-password" className="text-[11px] text-[#B8924A] font-bold hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:border-[#B8924A] focus:outline-none font-mono"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-[#1F1A17]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#1F1A17] hover:bg-[#2B231E] disabled:bg-gray-300 text-white text-xs font-sans font-bold tracking-super-wide uppercase rounded-xl shadow-luxury transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>SIGN IN TO ACCOUNT</span>
                <ArrowRight className="w-4 h-4 text-[#B8924A]" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-xs font-sans border-t border-[#EFE7DC]">
          <span className="text-gray-500">Don't have an account yet? </span>
          <Link to="/register" className="text-[#B8924A] font-bold hover:underline">
            Register Now
          </Link>
        </div>

      </div>
    </div>
  );
}
