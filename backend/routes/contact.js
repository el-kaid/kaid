const express = require('express');
const Contact = require('../models/Contact');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
const router = express.Router();

// Rate limiting for contact form submissions
const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions. Please try again later.',
    retryAfter: 15 * 60 * 1000
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation middleware
const validateContactForm = (req, res, next) => {
  const { name, email, subject, message, inquiryType } = req.body;
  const errors = [];

  // Name validation
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  if (name && name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  // Email validation
  if (!email || !validator.isEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  // Subject validation
  if (!subject || subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters long');
  }
  if (subject && subject.length > 200) {
    errors.push('Subject must be less than 200 characters');
  }

  // Message validation
  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  if (message && message.length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }

  // Inquiry type validation
  const validInquiryTypes = ['general', 'technical', 'sales', 'enterprise', 'billing', 'partnership'];
  if (!inquiryType || !validInquiryTypes.includes(inquiryType)) {
    errors.push('Please select a valid inquiry type');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

// POST /api/contact - Submit contact form
router.post('/', contactRateLimit, validateContactForm, async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      phone,
      subject,
      message,
      inquiryType
    } = req.body;

    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';

    // Create new contact inquiry
    const contactInquiry = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : '',
      phone: phone ? phone.trim() : '',
      subject: subject.trim(),
      message: message.trim(),
      inquiryType,
      ipAddress,
      userAgent,
      source: 'website'
    });

    // Save to database
    const savedInquiry = await contactInquiry.save();

    // Log for monitoring
    console.log(`New contact inquiry: ${savedInquiry._id} from ${email}`);

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you soon.',
      inquiryId: savedInquiry._id,
      estimatedResponseTime: getEstimatedResponseTime(inquiryType)
    });

    // Here you could also trigger email notifications, Slack notifications, etc.
    // await sendNotificationEmail(savedInquiry);

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Check if it's a duplicate email within short time
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A recent inquiry from this email already exists. Please wait before submitting another.',
        error: 'duplicate_submission'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit your inquiry. Please try again later.',
      error: 'server_error'
    });
  }
});

// GET /api/contact/stats - Get inquiry statistics (for admin dashboard)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Contact.getInquiryStats();
    const totalInquiries = await Contact.countDocuments();
    const recentInquiries = await Contact.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      success: true,
      data: {
        totalInquiries,
        recentInquiries,
        inquiryTypeStats: stats
      }
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

// GET /api/contact - Get all inquiries (for admin dashboard with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    const inquiryType = req.query.inquiryType;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (inquiryType) filter.inquiryType = inquiryType;

    const inquiries = await Contact.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-userAgent -ipAddress') // Exclude sensitive data
      .exec();

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: {
        inquiries,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalInquiries: total
      }
    });
  } catch (error) {
    console.error('Inquiries fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries'
    });
  }
});

// PUT /api/contact/:id - Update inquiry status (for admin)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, priority, notes } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (assignedTo) updateData.assignedTo = assignedTo;
    if (priority) updateData.priority = priority;

    const inquiry = await Contact.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Add note if provided
    if (notes) {
      await inquiry.addNote(notes, req.body.updatedBy || 'admin');
    }

    res.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: inquiry
    });
  } catch (error) {
    console.error('Inquiry update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update inquiry'
    });
  }
});

// Helper function to estimate response time based on inquiry type
function getEstimatedResponseTime(inquiryType) {
  const responseTimes = {
    sales: '< 30 minutes',
    technical: '< 1 hour',
    general: '< 2 hours',
    enterprise: 'Same day',
    billing: '< 2 hours',
    partnership: '< 24 hours'
  };
  return responseTimes[inquiryType] || '< 2 hours';
}

module.exports = router;