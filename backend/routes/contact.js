const express = require('express');
const Contact = require('../models/Contact');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
const { sendContactConfirmationEmail, sendInquiryNotificationToSupport } = require('../utils/sendMail');
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
  const validInquiryTypes = ['general', 'technical', 'sales', 'enterprise', 'billing', 'partnership', 'bookkeeping', 'taxation', 'banking', 'B1M', 'asset management'];
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

    const estimatedResponseTime = getEstimatedResponseTime(inquiryType);

    // Send confirmation email to customer (non-blocking)
    sendContactConfirmationEmail({
      name: savedInquiry.name,
      email: savedInquiry.email,
      subject: savedInquiry.subject,
      message: savedInquiry.message,
      inquiryType: savedInquiry.inquiryType,
      company: savedInquiry.company,
      phone: savedInquiry.phone,
      estimatedResponseTime: estimatedResponseTime
    }).then(result => {
      if (result.success) {
        console.log(`✅ Confirmation email sent successfully to ${savedInquiry.email}`);
      } else {
        console.error(`❌ Confirmation email failed to send to ${savedInquiry.email}:`, result.error);
      }
    }).catch(emailError => {
      console.error('❌ Failed to send confirmation email (non-blocking):', emailError);
      // Email failure doesn't affect the response
    });

    // Send inquiry notification to support@elkaid.com (non-blocking)
    sendInquiryNotificationToSupport({
      name: savedInquiry.name,
      email: savedInquiry.email,
      subject: savedInquiry.subject,
      message: savedInquiry.message,
      inquiryType: savedInquiry.inquiryType,
      company: savedInquiry.company,
      phone: savedInquiry.phone,
      estimatedResponseTime: estimatedResponseTime
    }).then(result => {
      if (result.success) {
        console.log(`✅ Inquiry notification sent successfully to support@elkaid.com`);
      } else {
        console.error(`❌ Inquiry notification failed to send to support@elkaid.com:`, result.error);
      }
    }).catch(emailError => {
      console.error('❌ Failed to send inquiry notification (non-blocking):', emailError);
      // Email failure doesn't affect the response
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you soon.',
      inquiryId: savedInquiry._id,
      estimatedResponseTime: estimatedResponseTime
    });

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

// GET /api/contact/test-email - Test email configuration
router.get('/test-email', async (req, res) => {
  try {
    const { sendContactConfirmationEmail } = require('../utils/sendMail');

    const testEmail = req.query.email || process.env.EMAIL_USER;

    if (!testEmail) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address as query parameter: /api/contact/test-email?email=your@email.com'
      });
    }

    console.log(`🧪 Testing email configuration to: ${testEmail}`);

    const result = await sendContactConfirmationEmail({
      name: 'Test User',
      email: testEmail,
      subject: 'Test Email from EL KAID',
      message: 'This is a test email to verify your email configuration is working correctly.',
      inquiryType: 'general',
      company: 'Test Company',
      estimatedResponseTime: '< 2 hours'
    });

    if (result.success) {
      res.json({
        success: true,
        message: `Test email sent successfully to ${testEmail}. Please check your inbox (and spam folder).`,
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send test email',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      message: 'Error testing email configuration',
      error: error.message
    });
  }
});

// POST /api/contact/demo - Schedule a demo
router.post('/demo', contactRateLimit, async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      phone,
      preferredDate,
      preferredTime,
      timezone,
      message
    } = req.body;

    // Validation
    const errors = [];
    if (!name || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    if (!email || !validator.isEmail(email)) {
      errors.push('Please provide a valid email address');
    }
    if (!preferredDate) {
      errors.push('Please select a preferred date');
    }
    if (!preferredTime) {
      errors.push('Please select a preferred time');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';

    // Create contact inquiry with demo type
    const demoInquiry = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : '',
      phone: phone ? phone.trim() : '',
      subject: `Demo Request - ${preferredDate} at ${preferredTime}`,
      message: `Demo Request Details:\n\nPreferred Date: ${preferredDate}\nPreferred Time: ${preferredTime}\nTimezone: ${timezone || 'Not specified'}\n\nAdditional Notes: ${message || 'None'}`,
      inquiryType: 'sales', // Demo requests are sales inquiries
      ipAddress,
      userAgent,
      source: 'website-demo'
    });

    // Save to database
    const savedDemo = await demoInquiry.save();

    console.log(`New demo request: ${savedDemo._id} from ${email}`);

    // Send notification to support@elkaid.com
    sendInquiryNotificationToSupport({
      name: savedDemo.name,
      email: savedDemo.email,
      subject: `Demo Request: ${preferredDate} at ${preferredTime}`,
      message: `Demo Request Details:\n\nPreferred Date: ${preferredDate}\nPreferred Time: ${preferredTime}\nTimezone: ${timezone || 'Not specified'}\nCompany: ${company || 'Not provided'}\nPhone: ${phone || 'Not provided'}\n\nAdditional Notes: ${message || 'None'}`,
      inquiryType: 'sales',
      company: savedDemo.company,
      phone: savedDemo.phone,
      estimatedResponseTime: '< 30 minutes'
    }).then(result => {
      if (result.success) {
        console.log(`✅ Demo request notification sent to support@elkaid.com`);
      } else {
        console.error(`❌ Demo notification failed:`, result.error);
      }
    }).catch(emailError => {
      console.error('❌ Failed to send demo notification:', emailError);
    });

    // Send confirmation email to customer
    sendContactConfirmationEmail({
      name: savedDemo.name,
      email: savedDemo.email,
      subject: `Demo Request Received - ${preferredDate}`,
      message: `Thank you for requesting a demo! We've received your request for ${preferredDate} at ${preferredTime}. Our team will contact you soon to confirm the schedule.`,
      inquiryType: 'sales',
      company: savedDemo.company,
      phone: savedDemo.phone,
      estimatedResponseTime: '< 30 minutes'
    }).catch(emailError => {
      console.error('❌ Failed to send demo confirmation email:', emailError);
    });

    res.status(201).json({
      success: true,
      message: 'Demo request submitted successfully! We will contact you soon to confirm your schedule.',
      demoId: savedDemo._id
    });

  } catch (error) {
    console.error('Demo request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit demo request. Please try again later.',
      error: 'server_error'
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
    partnership: '< 24 hours',
    bookkeeping: '< 2 hours',
    taxation: '< 2 hours',
    banking: '< 2 hours',
    'B1M': '< 2 hours',
    'asset management': '< 2 hours'
  };
  return responseTimes[inquiryType] || '< 2 hours';
}

module.exports = router;