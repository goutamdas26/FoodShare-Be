const express = require("express");
const { sendOtp, resetpassword, verifyOtp } = require("../controllers/resetController");
const router = express.Router();



router.post("/forgot-password", sendOtp);
router.post("/reset-password", resetpassword);
router.post("/verify-otp",verifyOtp)

module.exports = router;
