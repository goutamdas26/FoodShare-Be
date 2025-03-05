const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addFood,
  getAvailableFood,
  claimFood,
  getDonatedFood,
} = require("../controllers/foodController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = multer();
router.post("/add",authMiddleware,upload.none(), addFood);
router.get("/available", getAvailableFood);
router.post("/claim/:id", authMiddleware,claimFood);
router.post("/getDonatedFood", authMiddleware, getDonatedFood);

module.exports = router;

