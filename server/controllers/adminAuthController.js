import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import OTP from '../models/OTP.js';
import AdminLoginLog from '../models/AdminLoginLog.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'vasana_secret_key_luxury_fashion_2026_jwt_token_auth';

/**
 * ============================================================================
 * E. RESTRICTED ADMIN ACCESS & MANDATORY 2FA
 * ============================================================================
 * Endpoint: POST /api/admin/auth/login
 */
export const adminLogin = async (req, res) => {
  const ipAddress = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || '';
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      // Audit log failed attempt
      await AdminLoginLog.create({ adminEmail: email, status: 'failed', ipAddress, userAgent });
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      await AdminLoginLog.create({ adminEmail: email, status: 'failed', ipAddress, userAgent });
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    // MANDATORY 2FA STEP: Generate & Send Email 2FA OTP
    const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpSalt = await bcrypt.genSalt(8);
    const otpHash = await bcrypt.hash(rawOtp, otpSalt);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.deleteMany({ identifier: admin.email, purpose: 'admin-2fa' });
    await OTP.create({
      identifier: admin.email,
      otpHash,
      expiresAt,
      attempts: 0,
      purpose: 'admin-2fa'
    });

    await AdminLoginLog.create({ adminEmail: email, status: '2fa_pending', ipAddress, userAgent });
    console.log(`[ADMIN 2FA OTP SIMULATION] Sent 2FA OTP [ ${rawOtp} ] to Admin Email: ${admin.email}`);

    return res.status(200).json({
      success: true,
      message: 'Password correct. Mandatory 2FA code sent to your registered admin email.',
      requires2FA: true,
      email: admin.email,
      demo2FAOTP: rawOtp
    });
  } catch (error) {
    console.error('Admin Login Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during admin login.' });
  }
};

/**
 * Endpoint: POST /api/admin/auth/verify-2fa
 */
export const verifyAdmin2FA = async (req, res) => {
  const ipAddress = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and 2FA OTP are required.' });
    }

    const otpRecord = await OTP.findOne({ identifier: email, purpose: 'admin-2fa' });
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: '2FA code expired or not found. Please login again.' });
    }

    if (otpRecord.attempts >= 5) {
      await OTP.deleteOne({ _id: otpRecord._id });
      await AdminLoginLog.create({ adminEmail: email, status: '2fa_failed', ipAddress });
      return res.status(400).json({ success: false, message: 'Too many failed 2FA attempts. Access locked.' });
    }

    if (new Date() > otpRecord.expiresAt) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ success: false, message: '2FA code expired. Please login again.' });
    }

    const isOtpValid = await bcrypt.compare(otp.trim(), otpRecord.otpHash);
    if (!isOtpValid) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      await AdminLoginLog.create({ adminEmail: email, status: '2fa_failed', ipAddress });
      return res.status(400).json({ success: false, message: 'Incorrect 2FA code.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Admin account not found.' });
    }

    // Invalidate 2FA record & log success
    await OTP.deleteOne({ _id: otpRecord._id });
    await AdminLoginLog.create({ adminEmail: email, status: 'success', ipAddress });

    // Issue separate Admin JWT (4 hours short expiry)
    const token = jwt.sign(
      { id: admin._id, role: admin.role, email: admin.email, isAdmin: true },
      JWT_SECRET,
      { expiresIn: '4h' }
    );

    // Set httpOnly secure cookie under admin_token
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 4 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: 'Admin 2FA Verified. Welcome to VASANA Administration Suite.',
      adminToken: token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin 2FA Error:', error);
    return res.status(500).json({ success: false, message: 'Server error verifying 2FA.' });
  }
};

/**
 * Express Middleware: verifyAdmin
 * Enforces admin_token JWT and role claim on every /api/admin/* route
 */
export const verifyAdmin = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Admin access denied. No admin_token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin' && decoded.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Access denied: Requires Admin privileges.' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Admin session expired or token invalid.' });
  }
};
