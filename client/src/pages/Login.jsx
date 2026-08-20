import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, ArrowRight, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, loginDemoAdmin, loginDemoCustomer } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/account');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdmin = async () => {
    setLoading(true);
    try {
      await loginDemoAdmin();
      navigate('/admin');
    } catch (error) {}
    finally { setLoading(false); }
  };

  const handleQuickCustomer = async () => {
    setLoading(true);
    try {
      await loginDemoCustomer();
      navigate('/account');
    } catch (error) {}
    finally { setLoading(false); }
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

          {/* Quick Demo Login Bar */}
          <div className="p-3 bg-vasana-rose/20 border border-vasana-rose/50 rounded-none space-y-2 text-center">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-vasana-gold block">
              ⚡ ONE-CLICK DEMO LOGIN ACCOUNTS
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickCustomer}
                className="py-2 px-2 bg-white border border-vasana-gold hover:bg-vasana-gold hover:text-white text-vasana-dark text-[11px] font-sans font-bold uppercase transition-colors"
              >
                Customer Demo
              </button>
              <button
                type="button"
                onClick={handleQuickAdmin}
                className="py-2 px-2 bg-vasana-burgundy text-white text-[11px] font-sans font-bold uppercase hover:bg-vasana-burgundyDark transition-colors flex items-center justify-center space-x-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-vasana-gold" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-gray-700 font-bold uppercase mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@example.com"
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
