require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

/* ===========================
  🔒 Security & Middleware
=========================== */
app.use(helmet());
app.use(morgan("combined"));
app.use("/uploads", express.static("uploads"));

/* ===========================
  🌐 CORS Configuration
=========================== */
app.use(
  cors({
    origin: [
      "https://elkaid.com",
      "https://www.elkaid.com",
      "https://kaid-zeta.vercel.app",
      "http://localhost:3000", // React local dev
      "http://127.0.0.1:3000",
      process.env.FRONTEND_URL, // optional .env override
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Explicit preflight
app.options(/^\/.*$/, cors());

/* ===========================
  📦 Body Parsing
=========================== */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ===========================
  💾 MongoDB Connection
=========================== */
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/kaid_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected successfully");
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Mongo connection events
mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("🔌 Mongoose disconnected");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("👋 MongoDB connection closed through app termination");
  process.exit(0);
});

/* ===========================
  🚏 Routes
=========================== */
const contactRoutes = require("./routes/contact");
const authRoutes = require("./routes/auth");
const sellerRoutes = require("./routes/seller"); // ✅ new route for Become a Seller form

app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sellers", sellerRoutes); // ✅ register the route

/* ===========================
  💓 Health & Root Routes
=========================== */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "KAID Backend is running",
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "KAID Backend API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      contact: "/api/contact",
      sellers: "/api/sellers", // ✅ added endpoint reference
      auth: "/api/auth",
    },
  });
});

/* ===========================
  ⚠️ Error Handling
=========================== */
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ===========================
  🚀 Start Server
=========================== */
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`🛍 Seller API: http://localhost:${PORT}/api/sellers`); // ✅ log seller route
  console.log(`🔗 Server listening on all interfaces (0.0.0.0:${PORT})`);
});
