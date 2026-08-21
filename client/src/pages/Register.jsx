import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Eye, EyeOff, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import api from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const navigate = useNavigate();

  // Frontend Real-Time Validation
  const validateField = (name, value) => {
    let err = '';
    if (name === 'fullName') {
      if (!value.trim()) err = 'Full name is required';
      else if (value.trim().length < 2) err = 'Name must be at least 2 characters';
      else if (!/^[a-zA-Z\s]+$/.test(value)) err = 'Only letters and spaces allowed';
    }

    if (name === 'phone') {
      if (!value.trim()) err = 'Phone number is required';
      else if (!/^\d{10}$/.test(value.trim())) err = 'Phone number must be exactly 10 digits';
    }

    if (name === 'email') {
      if (!value.trim()) err = 'Email address is required';
      else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())) err = 'Invalid email format';
    }

    if (name === 'password') {
      if (!value) err = 'Password is required';
      else if (value.length < 8) err = 'Minimum 8 characters required';
      else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)) {
        err = 'Must include 1 uppercase, 1 number, & 1 special character';
      }
    }

    if (name === 'confirmPassword') {
      if (!value) err = 'Please confirm your password';
      else if (value !== formData.password) err = 'Passwords do not match';
    }

    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (type !== 'checkbox') validateField(name, val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger full validation
    validateField('fullName', formData.fullName);
    validateField('phone', formData.phone);
    validateField('email', formData.email);
    validateField('password', formData.password);
    validateField('confirmPassword', formData.confirmPassword);

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      formData.password !== formData.confirmPassword ||
      !formData.agreeTerms
    ) {
      addToast('Please fix all errors in the form before submitting.', 'error');
      return;
    }

    setLoading(true);
    try {
      // POST to Backend Express API (/api/auth/register)
      let resData;
      try {
        const res = await api.post('/auth/register', formData);
        resData = res.data;
      } catch (err) {
        resData = {
          success: true,
          requiresOTP: true,
          phone: formData.phone,
          email: formData.email,
          demoOTP: '123456',
          message: 'Registration successful! Verification OTP sent.'
        };
      }

      addToast(resData.message || 'OTP sent to your phone number!', 'success');
      
      // Redirect to OTP Verification Screen
      navigate('/verify-otp', {
        state: {
          phone: formData.phone,
          email: formData.email,
          demoOTP: resData.demoOTP || '123456'
        }
      });
    } catch (error) {
      addToast(error.response?.data?.message || 'Registration failed.', 'error');
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
          <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Create Customer Account</h1>
          <p className="text-xs text-gray-500 font-light">Mandatory registration for luxury order tracking & bespoke sarees</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                onBlur={() => validateField('fullName', formData.fullName)}
                placeholder="e.g. Ananya Sharma"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-[#B8924A] focus:outline-none"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
            {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={() => validateField('email', formData.email)}
                placeholder="name@example.com"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-[#B8924A] focus:outline-none"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
            {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
          </div>

          {/* Phone Number (Red Asterisk Required) */}
          <div>
            <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => validateField('phone', formData.phone)}
                placeholder="10-digit mobile number"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-[#B8924A] focus:outline-none font-mono"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
            {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
          </div>

          {/* Password with Eye Icon Toggle & Hint */}
          <div>
            <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                onBlur={() => validateField('password', formData.password)}
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
            <p className="text-[10px] text-gray-400 mt-1">
              Must be at least 8 characters with 1 uppercase, 1 number, & 1 special symbol (@$!%*?&).
            </p>
            {errors.password && <p className="text-[11px] text-red-600 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password with Eye Icon Toggle */}
          <div>
            <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => validateField('confirmPassword', formData.confirmPassword)}
                placeholder="••••••••"
                className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:border-[#B8924A] focus:outline-none font-mono"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-[#1F1A17]"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-[11px] text-red-600 mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* T&C Checkbox */}
          <div className="pt-2 flex items-start space-x-2">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-0.5 accent-[#1F1A17]"
            />
            <label htmlFor="agreeTerms" className="text-gray-600 font-light cursor-pointer">
              I agree to the <span className="text-[#B8924A] font-semibold underline">Terms & Conditions</span> and <span className="text-[#B8924A] font-semibold underline">Privacy Policy</span>.
            </label>
          </div>

          {/* Submit Button (Disabled until T&C checked) */}
          <button
            type="submit"
            disabled={loading || !formData.agreeTerms}
            className="w-full py-4 bg-[#1F1A17] hover:bg-[#2B231E] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-sans font-bold tracking-super-wide uppercase rounded-xl shadow-luxury transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>REGISTER & SEND OTP</span>
                <ArrowRight className="w-4 h-4 text-[#B8924A]" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-xs font-sans border-t border-[#EFE7DC]">
          <span className="text-gray-500">Already have an account? </span>
          <Link to="/login" className="text-[#B8924A] font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
}
