require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const kycRoutes = require("./routes/kycRoutes");
const userRoutes = require("./routes/userRoutes");
const EventRoutes = require("./routes/eventRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "*" })); // Adjust if needed
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses form data

// Morgan for logging HTTP requests
app.use(morgan('dev'));

// Custom Logging Middleware (optional, for additional logs)
// app.use((req, res, next) => {
//   const start = Date.now();
//   console.log("🔥 Incoming Request:");
//   console.log("➡️ Method:", req.method);
//   console.log("➡️ URL:", req.originalUrl);
//   console.log("➡️ Body:", req.body);
//   console.log("➡️ Query:", req.query);
//   console.log("➡️ Params:", req.params);

//   res.on('finish', () => {
//     const duration = Date.now() - start;
//     console.log(`⏱️ ${req.method} ${req.originalUrl} took ${duration}ms`);
//   });

//   next();
// });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/user", userRoutes);
app.use("/api/events", EventRoutes);

app.get('/', (req, res) => {
  res.send("Hello World");
});

// Database Connection
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
