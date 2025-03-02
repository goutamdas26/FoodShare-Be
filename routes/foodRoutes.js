const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addFood,
  getAvailableFood,
  claimFood,
} = require("../controllers/foodController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = multer();
router.post("/add",upload.none(), addFood);
router.get("/available", getAvailableFood);
router.post("/claim/:id", claimFood);

module.exports = router;

