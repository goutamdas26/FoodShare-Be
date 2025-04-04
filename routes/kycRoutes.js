// const express = require("express");
// const multer = require("multer");
// const KYCVerification = require("../models/Verification");
// const router = express.Router();

// // Configure multer for image uploads (Use cloud storage in production)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Submit KYC Verification
// router.post(
//   "/submit",
//   upload.fields([{ name: "frontImage" }, { name: "backImage" }]),
//   async (req, res) => {
//     try {
//       const { userId, fullName, idNumber, idType } = req.body;
// console.log(userId, fullName, idNumber, idType)
//       if (!userId || !fullName || !idNumber || !idType || !req.files.frontImage || !req.files.backImage) {
//         return res.status(400).json({ message: "All fields are required" });
//       }

//       const existingKYC = await KYCVerification.findOne({ idNumber });
//       if (existingKYC) {
//         return res.status(400).json({ message: "KYC already submitted with this ID" });
//       }

//       // In production, upload images to cloud storage (e.g., AWS S3, Firebase, Cloudinary)
//       const frontImageURL = `data:image/png;base64,${req.files.frontImage[0].buffer.toString("base64")}`;
//       const backImageURL = `data:image/png;base64,${req.files.backImage[0].buffer.toString("base64")}`;

//       const newKYC = new KYCVerification({
//         userId,
//         fullName,
//         idNumber,
//         idType,
//         frontImage: frontImageURL,
//         backImage: backImageURL,
//         status: "Pending",
//       });

//       await newKYC.save();
//       res.status(201).json({ message: "KYC submitted successfully", kyc: newKYC });
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   }
// );

// // Get KYC Status for a user
// router.get("/status/:userId", async (req, res) => {
//   try {
//     const kyc = await KYCVerification.findOne({ userId: req.params.userId });
//     if (!kyc) {
//       return res.status(404).json({ message: "KYC not found" });
//     }
//     res.json({ status: kyc.status, kyc });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const KYCVerification = require("../models/Verification");
const router = express.Router();
const User=require("../models/User")
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to upload image to Cloudinary
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer); // Ensure file buffer is uploaded
  });
};

// Submit KYC Verification
router.post(
  "/submit",
  upload.fields([{ name: "frontImage" }, { name: "backImage" }]),
  async (req, res) => {
    try {
      const { userId, fullName, idNumber, idType } = req.body;

      // Validate input
      if (!userId || !fullName || !idNumber || !idType || !req.files?.frontImage || !req.files?.backImage) {
        return res.status(400).json({ message: "All fields are required" });
      }

      console.log("Received KYC Submission for User:");

      // Check if KYC already exists
      const existingKYC = await KYCVerification.findOne({userId:userId});
 
      if (existingKYC) {
        return res.status(400).json({ message: "KYC already submitted with this ID" });
      }

      console.log("Uploading images to Cloudinary...");
      
      // Upload images to Cloudinary in parallel
      const [frontImageURL, backImageURL] = await Promise.all([
        uploadToCloudinary(req.files.frontImage[0].buffer, "kyc_verifications"),
        uploadToCloudinary(req.files.backImage[0].buffer, "kyc_verifications"),
      ]);

   

      // Save KYC details in the database
      const newKYC = new KYCVerification({
        userId,
        fullName,
        idNumber,
        idType,
        frontImage: frontImageURL,
        backImage: backImageURL,
        status: "Pending",
      });
  const user=await User.findOne({_id:userId})
  user.kycStatus="Verified"
  await user.save()

      await newKYC.save();
      res.status(201).json({ message: "KYC submitted successfully", kyc: newKYC });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

);

// Get KYC Status for a user
router.post("/status", async (req, res) => {
  const {id}=req.body
console.log(id)
  try {
    const kyc = await KYCVerification.findOne({ userId: id });
    if (!kyc) {
      return res.status(404).json({ message: "KYC not found" });
    }
    res.json({ status: kyc.status, kyc });
  } catch (error) {
    console.error("Error fetching KYC status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
