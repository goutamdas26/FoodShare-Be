const mongoose = require("mongoose");
const User = require("./User"); // Ensure User model is required

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ["Human", "Pet"], required: true },
    quantity: { type: Number, required: false }, // Changed from String to Number
    location: { type: String, required: true },
    image: {
      type: String,
      required: false,
      default: "https://via.placeholder.com/150",
    }, // Default image URL
    donorDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    }, // Consistent model name
    donorName: { type: String, required: false },
    postedAt: { type: Date, default: Date.now }, // Changed to Date type
    donorContact: { type: String, required: false }, // Changed to String to allow flexibility
    status: {
      type: String,
      enum: ["available", "claimed"],
      default: "available",
    },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, // Consistent model name
    claimedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
