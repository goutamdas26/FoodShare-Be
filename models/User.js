const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String },
  image: { type: String, default: "https://via.placeholder.com/150" },
}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema); // Ensure it's 'Users'
