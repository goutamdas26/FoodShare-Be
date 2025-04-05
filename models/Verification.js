const mongoose = require("mongoose");

const VerificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
      unique: true,
    },
    idType: {
      type: String,
      enum: ["AADHAR", "VOTER ID"],
      required: true,
    },
    frontImage: {
      type: String, // Store the image URL (cloud storage preferred)
      required: true,
    },
    backImage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Approved",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Verification", VerificationSchema);
