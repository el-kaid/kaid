require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


const app = express();

// Security middleware
app.use(helmet());

app.use('/uploads', express.static('uploads')); // Add this line

// Logging middleware
app.use(morgan('combined'));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'development' ? true : [
    'http://localhost:3000',      // Frontend web app
    'http://127.0.0.1:3000',      // Frontend web app (alternative)
    'http://localhost:8080',      // Mobile app dev server
    'http://127.0.0.1:8080',      // Mobile app dev server (alternative)
    'http://localhost:19000',     // Expo dev server default
    'http://localhost:19001',     // Expo dev server alternative
    'http://127.0.0.1:19000',     // Expo dev server (IPv4)
    'exp://localhost:19000',      // Expo protocol
    'exp://127.0.0.1:19000',      // Expo protocol (IPv4)
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// MongoDB connection with better configuration
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kaid_db')
.then(() => {
  console.log("✅ MongoDB Connected successfully");
  console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('👋 MongoDB connection closed through app termination');
  process.exit(0);
});

// Routes
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'KAID Backend is running',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'KAID Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      contact: '/api/contact',
      contactStats: '/api/contact/stats'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`🔗 Server listening on all interfaces (0.0.0.0:${PORT})`);
});