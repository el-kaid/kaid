const express = require("express");

// 🧹 Clear cache to remove old model definition
delete require.cache[require.resolve("../models/Seller")];
const Seller = require("../models/Seller");

const router = express.Router();


// ➕ Create new seller
router.post("/", async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // debug log
    const { email, phone, pancard } = req.body;

    // Pre-check for existing records on any of the unique fields
    const conflict = await Seller.findOne({
      $or: [
        email ? { email } : null,
        phone ? { phone } : null,
        pancard ? { pancard } : null,
      ].filter(Boolean),
    }).lean();

    if (conflict) {
      const conflicts = [];
      if (email && conflict.email === email) conflicts.push("email");
      if (phone && conflict.phone === phone) conflicts.push("phone");
      if (pancard && conflict.pancard === pancard) conflicts.push("pancard");
      return res.status(409).json({
        success: false,
        message: `Already exists with the same ${conflicts.join(", ")}. Please use different details.`,
        fields: conflicts,
      });
    }

    const seller = await Seller.create(req.body);
    res.status(201).json({ success: true, seller });
  } catch (error) {
    console.error("❌ Error saving seller:", error);
    if (error && error.code === 11000 && error.keyPattern) {
      const fields = Object.keys(error.keyPattern);
      return res.status(409).json({
        success: false,
        message: `Already exists with the same ${fields.join(", ")}. Please use different details.`,
        fields,
      });
    }
    res.status(500).json({ success: false, message: error.message });
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
