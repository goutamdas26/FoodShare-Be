

const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ["Human", "Pet"], required: true },
    quantity: { type: Number, default: 1 }, // Default to 1 if not provided
    location: { type: String, required: true },
    image: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    donorDetails: {
      name: { type: String },
      phone: { type: String },
    },
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    postedAt: { type: Date, default: Date.now }, // Use Date object for consistency
    status: {
      type: String,
      enum: ["Available", "Claimed"],
      default: "Available",
    },
    expiry: { type: String }, // Expiry should be a Date type for easy comparisons
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    claimedAt: { type: Date },
    description:String,
    images: { type: [String], required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
