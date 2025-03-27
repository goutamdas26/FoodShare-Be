const express = require("express");
const multer = require("multer");
const KYCVerification = require("../models/Verification");
const router = express.Router();

// Configure multer for image uploads (Use cloud storage in production)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Submit KYC Verification
router.post(
  "/submit",
  upload.fields([{ name: "frontImage" }, { name: "backImage" }]),
  async (req, res) => {
    try {
      const { userId, fullName, idNumber, idType } = req.body;
console.log(userId, fullName, idNumber, idType)
      if (!userId || !fullName || !idNumber || !idType || !req.files.frontImage || !req.files.backImage) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingKYC = await KYCVerification.findOne({ idNumber });
      if (existingKYC) {
        return res.status(400).json({ message: "KYC already submitted with this ID" });
      }

      // In production, upload images to cloud storage (e.g., AWS S3, Firebase, Cloudinary)
      const frontImageURL = `data:image/png;base64,${req.files.frontImage[0].buffer.toString("base64")}`;
      const backImageURL = `data:image/png;base64,${req.files.backImage[0].buffer.toString("base64")}`;

      const newKYC = new KYCVerification({
        userId,
        fullName,
        idNumber,
        idType,
        frontImage: frontImageURL,
        backImage: backImageURL,
        status: "Pending",
      });

      await newKYC.save();
      res.status(201).json({ message: "KYC submitted successfully", kyc: newKYC });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Get KYC Status for a user
router.get("/status/:userId", async (req, res) => {
  try {
    const kyc = await KYCVerification.findOne({ userId: req.params.userId });
    if (!kyc) {
      return res.status(404).json({ message: "KYC not found" });
    }
    res.json({ status: kyc.status, kyc });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
