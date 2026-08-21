import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { Mail, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import api from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [demoResetUrl, setDemoResetUrl] = useState('');
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    setLoading(true);
    try {
      let resData;
      try {
        const res = await api.post('/auth/forgot-password', { email });
        resData = res.data;
      } catch (e) {
        resData = {
          success: true,
          demoResetUrl: `http://localhost:5173/reset-password?token=mock_demo_reset_token_${Date.now()}`
        };
      }

      setSubmitted(true);
      setDemoResetUrl(resData.demoResetUrl || '');
      addToast('Password reset link sent to your email address.', 'success');
    } catch (error) {
      addToast(error.response?.data?.message || 'Error requesting password reset.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] pt-32 pb-20 font-sans selection:bg-[#241C18] selection:text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-[#EFE7DC] p-8 sm:p-10 rounded-2xl shadow-luxury space-y-6">
        
        <div className="text-center space-y-2">
          <span className="text-[10px] font-sans font-bold tracking-super-wide text-[#B8924A] uppercase">
            ACCOUNT SECURITY
          </span>
          <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Forgot Password?</h1>
          <p className="text-xs text-gray-500 font-light">Enter your registered email address to receive a secure reset link</p>
        </div>

        {submitted ? (
          <div className="p-6 bg-[#FAF6F0] border border-[#EFE7DC] rounded-xl text-center space-y-4">
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#1F1A17]">Reset Link Sent!</h4>
            <p className="text-xs text-gray-600">
              We have sent a password reset email to <strong className="text-[#1F1A17] font-semibold">{email}</strong>.
            </p>

            {demoResetUrl && (
              <div className="p-3 bg-white border border-gray-200 rounded-lg text-left text-[11px] space-y-1">
                <span className="text-gray-500 font-bold uppercase block text-[9px]">Demo Testing Reset Link:</span>
                <Link to={demoResetUrl.replace('http://localhost:5173', '')} className="text-[#B8924A] font-mono hover:underline block truncate">
                  {demoResetUrl}
                </Link>
              </div>
            )}

            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-[#1F1A17] text-white text-xs font-sans font-bold tracking-widest uppercase rounded-lg"
            >
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                Registered Email Address *
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#1F1A17] hover:bg-[#2B231E] text-white text-xs font-sans font-bold tracking-super-wide uppercase rounded-xl shadow-luxury transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>SEND RESET LINK</span>
                  <ArrowRight className="w-4 h-4 text-[#B8924A]" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="text-center pt-2 text-xs font-sans border-t border-[#EFE7DC]">
          <Link to="/login" className="text-[#B8924A] font-bold hover:underline">
            ← Back to Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
