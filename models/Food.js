const mongoose = require('mongoose');
const User = require('./User'); // Ensure User model is required

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['human', 'pet'], required: true },
  quantity: { type: String, required: false },
  location: { type: String, required: true },
  image: { type: String, required: false, default: "sdfsdf" },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: false }, // Fixed model name
  donarName: { type: String, required: false },
  postedAt: { 
    type: String, 
    default: () => {
      const now = new Date();
      return now.toISOString().slice(0, 16).replace("T", " ");
    }
  },
  status: { type: String, enum: ['available', 'claimed'], default: 'available' },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, // Fixed model name
  claimedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
