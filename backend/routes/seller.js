const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 🧹 Clear cache to remove old model definition
delete require.cache[require.resolve("../models/Seller")];
const Seller = require("../models/Seller");
const { sendJobApplicationNotification } = require("../utils/sendMail");

const router = express.Router();

// Ensure uploads/resumes directory exists
const resumesDir = './uploads/resumes';
if (!fs.existsSync(resumesDir)) {
  fs.mkdirSync(resumesDir, { recursive: true });
}

// Setup multer for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resumesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `resume-${uniqueSuffix}${ext}`);
  }
});

// File filter for resumes
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and Word documents are allowed (.pdf, .doc, .docx)'));
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});


// ➕ Create new job application
router.post("/", upload.single('resume'), async (req, res) => {
  try {
    console.log("📝 New job application received");
    console.log("Form data:", req.body);
    console.log("Resume file:", req.file ? req.file.filename : "No file");

    // Prepare application data
    const applicationData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      country: req.body.country,
      yearsOfExperience: req.body.yearsOfExperience || '',
      currentCompany: req.body.currentCompany || '',
      noticePeriod: req.body.noticePeriod || '',
      expectedSalary: req.body.expectedSalary || '',
      availabilityDate: req.body.availabilityDate || '',
      linkedIn: req.body.linkedIn || '',
      portfolio: req.body.portfolio || '',
      motivation: req.body.motivation || '',
      pancard: req.body.pancard || '',
    };

    // Add resume information if file was uploaded
    if (req.file) {
      applicationData.resumeFileName = req.file.originalname;
      applicationData.resumePath = req.file.path; // Full path for email attachment
    }

    // Save application to database
    const application = await Seller.create(applicationData);
    console.log(`✅ Application saved: ${application._id}`);

    // Send email notification to hello@elkaid.com (non-blocking)
    sendJobApplicationNotification({
      applicationId: application._id,
      name: application.name,
      email: application.email,
      phone: application.phone,
      address: application.address,
      country: application.country,
      yearsOfExperience: application.yearsOfExperience,
      currentCompany: application.currentCompany,
      noticePeriod: application.noticePeriod,
      expectedSalary: application.expectedSalary,
      availabilityDate: application.availabilityDate,
      linkedIn: application.linkedIn,
      portfolio: application.portfolio,
      motivation: application.motivation,
      pancard: application.pancard,
      resumeFileName: application.resumeFileName,
      resumePath: application.resumePath
    }).then(result => {
      if (result.success) {
        console.log(`✅ Job application notification sent to hello@elkaid.com`);
      } else {
        console.error(`❌ Failed to send notification:`, result.error);
      }
    }).catch(emailError => {
      console.error('❌ Error sending job application notification:', emailError);
    });

    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully!',
      application 
    });
  } catch (error) {
    console.error("❌ Error saving application:", error);
    
    // Clean up uploaded file if there was an error
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to submit application. Please try again.' 
    });
  }
});

// 📋 Optional: Get all sellers
router.get("/", async (req, res) => {
  try {
    const sellers = await Seller.find().sort({ createdAt: -1 });
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
