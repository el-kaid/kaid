const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  company: {
    type: String,
    trim: true,
    maxlength: 100
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  inquiryType: {
    type: String,
    required: true,
    enum: ['general', 'technical', 'sales', 'enterprise', 'billing', 'partnership'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'resolved', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: String,
    default: null
  },
  responseTime: {
    type: Date,
    default: null
  },
  resolvedAt: {
    type: Date,
    default: null
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  source: {
    type: String,
    default: 'website'
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: [{
    content: String,
    addedBy: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true, // This adds createdAt and updatedAt automatically
  collection: 'contacts' // Explicitly set collection name
});

// Index for faster queries
ContactSchema.index({ email: 1 });
ContactSchema.index({ inquiryType: 1 });
ContactSchema.index({ status: 1 });
ContactSchema.index({ createdAt: -1 });

// Virtual for response time calculation
ContactSchema.virtual('responseTimeHours').get(function() {
  if (this.responseTime) {
    return Math.round((this.responseTime - this.createdAt) / (1000 * 60 * 60) * 100) / 100;
  }
  return null;
});

// Method to mark as responded
ContactSchema.methods.markAsResponded = function() {
  this.responseTime = new Date();
  this.status = 'in_progress';
  return this.save();
};

// Method to add notes
ContactSchema.methods.addNote = function(content, addedBy) {
  this.notes.push({
    content: content,
    addedBy: addedBy
  });
  return this.save();
};

// Static method to get inquiry stats
ContactSchema.statics.getInquiryStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$inquiryType',
        count: { $sum: 1 },
        avgResponseTime: { 
          $avg: { 
            $subtract: ['$responseTime', '$createdAt'] 
          } 
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Contact', ContactSchema);