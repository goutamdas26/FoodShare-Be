const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number },
    image: { type: String, default: "https://via.placeholder.com/150" },
    donated: [
      {
        foodItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" }, // Reference to claimed food item
         // Timestamp when claimed
      },
    ], // List of donated food items
    claimed: [
      {
        foodItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" }, // Reference to claimed food item
        claimedAt: { type: Date, default: Date.now }, // Timestamp when claimed
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
