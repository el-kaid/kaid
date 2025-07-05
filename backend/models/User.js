const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Personal Information
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true 
  },
  panOrCitizenship: { 
    type: String, 
    required: [true, 'PAN/Citizenship is required'],
    unique: true,
    trim: true,
    uppercase: true,
    index: true
  },
  phone: { 
    type: String, 
    required: [true, 'Phone is required'],
    unique: true,
    trim: true,
    index: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  homeAddress: { 
    type: String,
    trim: true
  },
  state: { 
    type: String,
    trim: true
  },
  pincode: { 
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^\d{6}$/.test(v);
      },
      message: 'Pincode must be 6 digits'
    }
  },

  // Business Information
  businessType: { 
    type: String,
    trim: true
  },
  goodsOrService: { 
    type: String,
    trim: true
  },
  exactBusiness: { 
    type: String,
    trim: true
  },
  customBusiness: { 
    type: String,
    trim: true
  },
  businessName: { 
    type: String,
    trim: true
  },
  businessPlace: { 
    type: String,
    trim: true
  },
  businessPincode: { 
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^\d{6}$/.test(v);
      },
      message: 'Business pincode must be 6 digits'
    }
  },

  // File uploads (store file paths)
  personPhoto: { 
    type: String 
  },
  placePhoto: { 
    type: String 
  },

  // Authentication
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },

  // Consultation preference
  consultancy: { 
    type: String, 
    enum: ['with', 'without'],
    required: [true, 'Consultancy preference is required']
  },

  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },

  // Timestamps
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Additional compound indexes for better query performance
userSchema.index({ email: 1, isActive: 1 });
userSchema.index({ createdAt: -1 });

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);