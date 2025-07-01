const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
const validateRegistrationInput = (req, res, next) => {
  const { name, email, password, confirmPassword, panOrCitizenship, phone, consultancy } = req.body;
  
  // Required fields validation
  if (!name || !email || !password || !panOrCitizenship || !phone || !consultancy) {
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

  next();
};

// Register New User
router.post('/register', 
  upload.fields([
    { name: 'personPhoto', maxCount: 1 },
    { name: 'placePhoto', maxCount: 1 }
  ]),
  validateRegistrationInput,
  async (req, res) => {
    try {
      const {
        name,
        panOrCitizenship,
        phone,
        email,
        homeAddress,
        state,
        pincode,
        businessType,
        goodsOrService,
        exactBusiness,
        customBusiness,
        businessName,
        businessPlace,
        businessPincode,
        password,
        consultancy
      } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [
          { email: email.toLowerCase() },
          { panOrCitizenship: panOrCitizenship.toUpperCase() },
          { phone: phone }
        ]
      });

      if (existingUser) {
        let message = 'User already exists';
        if (existingUser.email === email.toLowerCase()) {
          message = 'Email is already registered';
        } else if (existingUser.panOrCitizenship === panOrCitizenship.toUpperCase()) {
          message = 'PAN/Citizenship number is already registered';
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

      // Get file paths
      const personPhotoPath = req.files?.personPhoto?.[0]?.path || null;
      const placePhotoPath = req.files?.placePhoto?.[0]?.path || null;

      // Create new user
      const user = new User({
        name: name.trim(),
        panOrCitizenship: panOrCitizenship.toUpperCase().trim(),
        phone: phone.trim(),
        email: email.toLowerCase().trim(),
        homeAddress: homeAddress?.trim() || '',
        state: state?.trim() || '',
        pincode: pincode?.trim() || '',
        businessType: businessType?.trim() || '',
        goodsOrService: goodsOrService?.trim() || '',
        exactBusiness: exactBusiness?.trim() || '',
        customBusiness: customBusiness?.trim() || '',
        businessName: businessName?.trim() || '',
        businessPlace: businessPlace?.trim() || '',
        businessPincode: businessPincode?.trim() || '',
        personPhoto: personPhotoPath,
        placePhoto: placePhotoPath,
        password: hashedPassword,
        consultancy
      });

      await user.save();

      console.log(`New user registered: ${user.email}`);

      res.status(201).json({
        success: true,
        message: 'Registration successful! You can now login.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          consultancy: user.consultancy
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

module.exports = router;