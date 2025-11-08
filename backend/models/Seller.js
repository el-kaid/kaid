const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  // Align field names with frontend payload
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  phone: { type: String, required: true, trim: true, unique: true },
  dob: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  pancard: { type: String, required: true, uppercase: true, trim: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Ensure indexes are created (unique on email, phone, pancard)
SellerSchema.index({ email: 1 }, { unique: true });
SellerSchema.index({ phone: 1 }, { unique: true });
SellerSchema.index({ pancard: 1 }, { unique: true });

// 🧨 Force delete old cached model before redefining
const Seller = mongoose.models.Seller || mongoose.model("Seller", SellerSchema);

module.exports = Seller;
