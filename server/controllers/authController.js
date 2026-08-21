import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Customer from '../models/Customer.js';
import Admin from '../models/Admin.js';
import OTP from '../models/OTP.js';
import PasswordResetToken from '../models/PasswordResetToken.js';
import AdminLoginLog from '../models/AdminLoginLog.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'vasana_secret_key_luxury_fashion_2026_jwt_token_auth';
const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

/**
 * Helper to generate a 6-digit numeric OTP
 */
const generate6DigitOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * ============================================================================
 * B. CUSTOMER REGISTRATION & OTP VERIFICATION
 * ============================================================================
 * Endpoint: POST /api/auth/register
 */
export const registerCustomer = async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body;

    // --- SERVER-SIDE RE-VALIDATION ---
    if (!fullName || fullName.trim().length < 2 || !/^[a-zA-Z\s]+$/.test(fullName)) {
      return res.status(400).json({ success: false, message: 'Full name must contain at least 2 letters.' });
    }

    if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    if (!phone || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Phone number must be exactly 10 digits.' });
    }

    if (!password || password.length < 8 || !/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters with 1 uppercase letter, 1 number, and 1 special character.'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }

    // --- EMAIL & PHONE UNIQUENESS CHECK ---
    const existingEmail = await Customer.findOne({ email: email.toLowerCase().trim() });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
    }

    const existingPhone = await Customer.findOne({ phone: phone.trim() });
    if (existingPhone) {
      return res.status(400).json({ success: false, message: 'An account with this phone number already exists.' });
    }

    // --- BCRYPT PASSWORD HASHING ---
    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create Customer with isVerified: false
    const customer = new Customer({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      passwordHash,
      isVerified: false,
      role: 'customer'
    });

    await customer.save();

    // --- GENERATE & STORE 6-DIGIT OTP ---
    const rawOtp = generate6DigitOTP();
    const otpSalt = await bcrypt.genSalt(8);
    const otpHash = await bcrypt.hash(rawOtp, otpSalt);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    // Save to OTP collection
    await OTP.deleteMany({ identifier: customer.phone });
    await OTP.create({
      identifier: customer.phone,
      otpHash,
      expiresAt,
      attempts: 0,
      purpose: 'registration'
    });

    console.log(`[SMS OTP SIMULATION] Sent OTP [ ${rawOtp} ] to Phone: ${customer.phone}`);

    return res.status(201).json({
      success: true,
      message: 'Customer registered successfully. Please verify your OTP sent via SMS.',
      requiresOTP: true,
      phone: customer.phone,
      email: customer.email,
      demoOTP: rawOtp // Exposed in demo response for effortless testing
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

/**
 * Endpoint: POST /api/auth/verify-otp
 */
export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: 'Phone number and 6-digit OTP are required.' });
    }

    const otpRecord = await OTP.findOne({ identifier: phone, purpose: 'registration' });
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'OTP expired or not found. Please click Resend OTP.' });
    }

    // Check rate limit on verification attempts (max 5 attempts)
    if (otpRecord.attempts >= 5) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ success: false, message: 'Too many incorrect attempts. Please request a new OTP.' });
    }

    // Check expiry
    if (new Date() > otpRecord.expiresAt) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new OTP.' });
    }

    // Compare OTP hash
    const isOtpValid = await bcrypt.compare(otp.trim(), otpRecord.otpHash);
    if (!isOtpValid) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return res.status(400).json({ success: false, message: `Incorrect OTP. ${5 - otpRecord.attempts} attempts remaining.` });
    }

    // On Success: Set isVerified: true on Customer
    const customer = await Customer.findOne({ phone });
    if (customer) {
      customer.isVerified = true;
      await customer.save();
    }

    // Invalidate OTP record
    await OTP.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({
      success: true,
      message: 'Account verified successfully! You may now sign in.'
    });
  } catch (error) {
    console.error('OTP Verification Error:', error);
    return res.status(500).json({ success: false, message: 'Server error verifying OTP.' });
  }
};

/**
 * Endpoint: POST /api/auth/resend-otp
 */
export const resendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    const rawOtp = generate6DigitOTP();
    const otpSalt = await bcrypt.genSalt(8);
    const otpHash = await bcrypt.hash(rawOtp, otpSalt);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.deleteMany({ identifier: phone });
    await OTP.create({
      identifier: phone,
      otpHash,
      expiresAt,
      attempts: 0,
      purpose: 'registration'
    });

    console.log(`[SMS RESEND OTP] Sent new OTP [ ${rawOtp} ] to Phone: ${phone}`);

    return res.status(200).json({
      success: true,
      message: 'A new 6-digit OTP has been sent to your phone number.',
      demoOTP: rawOtp
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error resending OTP.' });
  }
};

/**
 * ============================================================================
 * C. UNIFIED LOGIN (SUPPORTING BOTH CUSTOMER & ADMIN ACCOUNTS FROM 1 PAGE)
 * ============================================================================
 * Endpoint: POST /api/auth/login
 */
export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. CHECK IF EMAIL MATCHES AN AUTHORIZED ADMIN IN MONGODB
    const admin = await Admin.findOne({ email: cleanEmail });
    if (admin) {
      const isAdminMatch = await bcrypt.compare(password, admin.passwordHash);
      if (!isAdminMatch) {
        return res.status(400).json({ success: false, message: 'Invalid email or password.' });
      }

      // Issue Admin JWT (4 hours expiry)
      const token = jwt.sign(
        { id: admin._id, role: admin.role, email: admin.email, isAdmin: true },
        JWT_SECRET,
        { expiresIn: '4h' }
      );

      res.cookie('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 4 * 60 * 60 * 1000
      });

      return res.status(200).json({
        success: true,
        message: 'Admin logged in successfully.',
        token,
        user: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          isAdmin: true
        }
      });
    }

    // 2. CHECK IF EMAIL MATCHES A REGISTERED CUSTOMER IN MONGODB
    const customer = await Customer.findOne({ email: cleanEmail });
    if (!customer) {
      return res.status(400).json({
        success: false,
        notRegistered: true,
        message: 'No account found. Please register first.'
      });
    }

    // Check password hash for customer
    const isPasswordMatch = await bcrypt.compare(password, customer.passwordHash);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // Check verification status for customer
    if (!customer.isVerified) {
      return res.status(403).json({
        success: false,
        requiresOTP: true,
        phone: customer.phone,
        message: 'Your account is not verified yet. Please complete OTP verification.'
      });
    }

    // Issue Customer JWT (7 days expiry)
    const token = jwt.sign(
      { id: customer._id, role: 'customer', email: customer.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set httpOnly secure cookie
    res.cookie('customer_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: {
        _id: customer._id,
        name: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        role: customer.role
      }
    });
  } catch (error) {
    console.error('Unified Login Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

/**
 * ============================================================================
 * D. FORGOT & RESET PASSWORD FLOW
 * ============================================================================
 * Endpoint: POST /api/auth/forgot-password
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const customer = await Customer.findOne({ email: email.toLowerCase().trim() });
    if (!customer) {
      return res.status(200).json({
        success: true,
        message: 'If an account exists for this email, a password reset link has been sent.'
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await PasswordResetToken.deleteMany({ userId: customer._id });
    await PasswordResetToken.create({
      userId: customer._id,
      tokenHash,
      expiresAt,
      used: false
    });

    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    console.log(`[EMAIL SIMULATION] Sent Password Reset Link to ${customer.email}: ${resetUrl}`);

    return res.status(200).json({
      success: true,
      message: 'If an account exists for this email, a password reset link has been sent.',
      demoResetUrl: resetUrl
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error processing forgot password.' });
  }
};

/**
 * Endpoint: POST /api/auth/reset-password
 */
export const resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password) {
      return res.status(400).json({ success: false, message: 'Token and new password are required.' });
    }

    if (password.length < 8 || !/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters with 1 uppercase letter, 1 number, and 1 special character.'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const resetRecord = await PasswordResetToken.findOne({ tokenHash, used: false });

    if (!resetRecord || new Date() > resetRecord.expiresAt) {
      return res.status(400).json({ success: false, message: 'Password reset link is invalid or has expired.' });
    }

    const customer = await Customer.findById(resetRecord.userId);
    if (!customer) {
      return res.status(400).json({ success: false, message: 'Customer account not found.' });
    }

    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    customer.passwordHash = await bcrypt.hash(password, salt);
    await customer.save();

    resetRecord.used = true;
    await resetRecord.save();

    return res.status(200).json({
      success: true,
      message: 'Your password has been reset successfully. You may now sign in with your new password.'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error resetting password.' });
  }
};
