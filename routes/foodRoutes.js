const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addFood,
  getAvailableFood,
  claimFood,
  getDonatedFood,
  getClaimedFood,
 
} = require("../controllers/foodController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = multer();
router.post("/add",authMiddleware,upload.single(), addFood);
router.post("/available", authMiddleware,getAvailableFood);
router.post("/claim/:id", authMiddleware,claimFood);
router.post("/getDonatedFood", authMiddleware, getDonatedFood);
router.post("/getClaimedFood", authMiddleware, getClaimedFood);

module.exports = router;

