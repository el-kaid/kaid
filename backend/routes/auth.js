const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sendOtpToUser } = require('../utils/sendMail');

// Ensure uploads directory exists
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Get JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';

// Validation middleware
// Updated validation middleware for simplified registration
const validateRegistrationInput = (req, res, next) => {
  const { name, email, password, confirmPassword, phone, dateOfBirth, country } = req.body;
  
  // Required fields validation for simplified registration
  if (!name || !email || !password || !phone || !dateOfBirth || !country) {
    return res.status(400).json({ 
      success: false,
      message: 'All required fields must be filled' 
    });
  }

  // Password validation
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long'
    });
  }

  // Password confirmation
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
  }

  // Phone validation (basic)
  const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid phone number'
    });
  }

  // Country validation
  if (!['India', 'UAE'].includes(country)) {
    return res.status(400).json({
      success: false,
      message: 'Please select a valid country'
    });
  }

  // Date of birth validation
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  if (age < 18 || age > 100) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid date of birth'
    });
  }

  next();
};


// Register New User
router.post('/register', 
  // Remove file upload middleware for simplified registration
  validateRegistrationInput,
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        dateOfBirth,
        country,
        password
      } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [
          { email: email.toLowerCase() },
          { phone: phone }
        ]
      });

      if (existingUser) {
        let message = 'User already exists';
        if (existingUser.email === email.toLowerCase()) {
          message = 'Email is already registered';
        } else if (existingUser.phone === phone) {
          message = 'Phone number is already registered';
        }
        
        return res.status(409).json({ 
          success: false, 
          message: message 
        });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user with simplified fields
      const user = new User({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        dateOfBirth: new Date(dateOfBirth),
        country: country.trim(),
        password: hashedPassword,
        // consultancy will be set later in step 2
      });

      await user.save();

      console.log(`New user registered: ${user.email}`);

      res.status(201).json({
        success: true,
        message: 'Registration successful! Please choose your experience.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          country: user.country
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle mongoose validation errors
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
          success: false,
          message: messages.join(', ')
        });
      }

      // Handle mongoose duplicate key errors
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return res.status(409).json({
          success: false,
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} is already registered`
        });
      }

      res.status(500).json({
        success: false,
        message: 'Registration failed. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// Update consultancy preference (Step 2 of registration)
router.put('/update-consultancy/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { consultancy } = req.body;

    if (!consultancy || !['with', 'without'].includes(consultancy)) {
      return res.status(400).json({
        success: false,
        message: 'Valid consultancy preference is required'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { consultancy },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Consultancy preference updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        consultancy: user.consultancy
      }
    });

  } catch (error) {
    console.error('Update consultancy error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update consultancy preference'
    });
  }
});




// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    console.log(`User logged in: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        consultancy: user.consultancy
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

const crypto = require('crypto');
const nodemailer = require('nodemailer');

router.post('/forgot-password', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  try {
    const user = await User.findOne({ phone: phone.trim() });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No user with that phone number found' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    console.log('📲 Password reset link (for SMS or testing):', resetUrl);

    // TODO: Use SMS API like Twilio to send the link to user's phone

    return res.json({ success: true, message: 'Password reset link sent to your phone number' });
  } catch (err) {
    console.error('Forgot Password error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    const hashed = await bcrypt.hash(password, 12);
    user.password = hashed;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ success: true, message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Reset Password error:', err);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
});


// Get user profile (protected route)
router.get('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: user
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Add this to your existing auth.js file, after your existing routes

// Verify user details and generate OTP
router.post('/verify-user-details', async (req, res) => {
  try {
    const { email, documentType, documentNumber } = req.body;

    console.log('🔍 Received:', { email, documentType, documentNumber });

    if (!email || !documentNumber) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanPanOrCitizenship = documentNumber.toUpperCase().trim();

    console.log('🔍 Looking for user with:', { 
      email: cleanEmail, 
      panOrCitizenship: cleanPanOrCitizenship 
    });

    const user = await User.findOne({
      email: cleanEmail,
      panOrCitizenship: cleanPanOrCitizenship,
      isActive: true
    });

    console.log('🔍 User found:', user ? 'YES' : 'NO');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found. Please check your details and try again." 
      });
    }

    // Generate 6-digit OTP
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    console.log('✅ OTP generated for user:', user.email, 'OTP:', otp);

    // Use the utility function instead of inline nodemailer code
    const emailResult = await sendOtpToUser(user.email, otp);
    
    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Please try again."
      });
    }

    res.status(200).json({
      success: true,
      message: "Details verified successfully! OTP sent to your registered email.",
      debugInfo: process.env.NODE_ENV === 'development' ? { otp } : undefined
    });

  } catch (error) {
    console.error('❌ Verify user details error:', error);
    res.status(500).json({
      success: false,
      message: "Verification failed. Please try again."
    });
  }
});



// Reset password with OTP verification
router.post('/reset-password-with-otp', async (req, res) => {
  try {
    const { email, documentNumber, otp, newPassword, confirmPassword } = req.body;

    if (!email || !documentNumber || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanDocument = documentNumber.toUpperCase().trim();
    const cleanOtp = otp.toString().trim();

    const user = await User.findOne({
      email: cleanEmail,
      panOrCitizenship: cleanDocument,
      isActive: true
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.otp || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    if (user.otp !== cleanOtp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please check and try again.'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpVerified = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully! You can now login with your new password.'
    });

  } catch (error) {
    console.error('❌ Reset password with OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset failed. Please try again.'
    });
  }
});


// Optional: Resend OTP endpoint
router.post('/resend-otp', async (req, res) => {
  try {
    const { phoneNumber, documentNumber } = req.body;

    if (!phoneNumber || !documentNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and document number are required'
      });
    }

    const cleanPhone = phoneNumber.trim();
    const cleanDocument = documentNumber.toUpperCase().trim();

    const user = await User.findOne({
      phone: cleanPhone,
      panOrCitizenship: cleanDocument,
      isActive: true
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpiry;
    user.otpVerified = false;
    await user.save();

    console.log(`📱 OTP resent for user ${user.email}: ${otp}`);

    // TODO: Send SMS with new OTP
    console.log(`📲 SMS to ${cleanPhone}: Your new KAID-B1 password reset OTP is: ${otp}`);

    res.status(200).json({
      success: true,
      message: 'New OTP has been sent to your phone number.',
      debugInfo: process.env.NODE_ENV === 'development' ? { otp: otp } : undefined
    });

  } catch (error) {
    console.error('❌ Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resend OTP. Please try again.'
    });
  }
});

module.exports = router;