const express = require("express");
const router = express.Router();
const {
  addFood,
  getAvailableFood,
  claimFood,
} = require("../controllers/foodController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", addFood);
router.get("/available", getAvailableFood);
router.post("/claim/:id", claimFood);

module.exports = router;

