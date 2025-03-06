const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ["Human", "Pet"], required: true },
    quantity: { type: Number, required: false },
    location: { type: String, required: true },
    image: {
      type: String,
      required: false,
      default: "https://via.placeholder.com/150",
    },
    donorDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
    donorName: { type: String, required: false },
    postedAt: {
      type: String,
      default: function () {
        return new Date().toLocaleString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
    donorContactNo: { type: String, required: false },
    status: {
      type: String,
      enum: ["Available", "Claimed"],
      default: "Available",
    },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    claimedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
