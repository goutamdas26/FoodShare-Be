require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const multer = require("multer");
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const kycRoutes = require("./routes/kycRoutes");
const app = express();

// Middleware
app.use(cors({ origin: "*" })); // Adjust this if needed
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses form data (important for `FormData` from frontend)
app.use((req, res, next) => {
  console.log("🔥 Incoming Request:");
  console.log("➡️ Headers:", req.headers);
  console.log("➡️ Method:", req.method);
  console.log("➡️ URL:", req.originalUrl);
  console.log("➡️ Body:", req.body);
  console.log("➡️ Query:", req.query);
  console.log("➡️ Params:", req.params);
  next();
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use("/api/kyc", kycRoutes);
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Database Connection
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
