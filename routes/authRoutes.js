const express = require("express");
const router = express.Router();
const { register, login,  } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
// router.post("/forgot-password", sendOtp);
// router.post("/reset-password", resetpassword);
// router.post("/verify-otp",verifyOtp)

module.exports = router;
