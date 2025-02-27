const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('NGO', ngoSchema);
