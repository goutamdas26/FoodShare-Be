const mongoose = require('mongoose');
const User = require('./User'); // Ensure User model is required

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Human', 'Pet'], required: true },
  quantity: { type: String, required: false },
  location: { type: String, required: true },
  image: { type: String, required: false, default: "sdfsdf" },
  donorDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: false }, // Fixed model name
  donorName: { type: String, required: false },
  postedAt: { 
    type: String, 
    default: () => {
      const now = new Date();
      return now.toISOString().slice(0, 16).replace("T", " ");
    }
  },
  donorContact: {type:Number,required:false},
  status: { type: String, enum: ['available', 'claimed'], default: 'available' },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, // Fixed model name
  claimedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
