const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  // Personal Information
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  
  // Resume/CV
  resumeFileName: { type: String },
  resumePath: { type: String },
  
  // Professional Information
  yearsOfExperience: { type: String },
  currentCompany: { type: String },
  noticePeriod: { type: String },
  expectedSalary: { type: String },
  availabilityDate: { type: String },
  
  // Additional Links
  linkedIn: { type: String },
  portfolio: { type: String },
  
  // Cover Letter
  motivation: { type: String },
  
  // Optional fields
  pancard: { type: String, uppercase: true, trim: true },
  
  createdAt: { type: Date, default: Date.now },
});

// Indexes - removed unique constraints to allow multiple applications
SellerSchema.index({ email: 1 });
SellerSchema.index({ createdAt: -1 });

// 🧨 Force delete old cached model before redefining
const Seller = mongoose.models.Seller || mongoose.model("Seller", SellerSchema);

module.exports = Seller;
