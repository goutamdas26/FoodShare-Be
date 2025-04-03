const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Import nodemailer for sending emails
const otpGenerator = require('otp-generator'); // Import otp-generator for generating OTPs
const jwt = require("jsonwebtoken");
const Otp = require("../models/Otp");
exports.register = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
console.log(email,password)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user1 = await User.findOne({ email }).select("name email phone kycStatus");
console.log("object")
    const token = jwt.sign({ userId: user._id ,name:user.name,email:user.email}, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token ,user:user1});
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// OTP Sending Controller
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

const otp = otpGenerator.generate(4, {
  upperCaseAlphabets: false,
  specialChars: false,
  lowerCaseAlphabets: false,
});
    await Otp.deleteMany({ email }); // Remove previous OTPs
    await new Otp({ email, otp }).save(); // Save new OTP
    // Send email with OTP
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: "Error sending email" });
      }
      res.status(200).json({ message: "OTP sent to your email" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reset Password Controller
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null; // Clear OTP after successful reset
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.verifyOtp=async(req,res)=>{
  console.log(req.body)
   const { email, otp } = req.body;
   const otpRecord = await Otp.findOne({ email, otp });

   if (!otpRecord)
     return res.status(400).json({ message: "Invalid or expired OTP" });

   await Otp.deleteMany({ email }); // Remove OTP after verification
   res.status(200).json({ message: "OTP verified successfully" });
}
exports.resetpassword=async(req,res)=>{
    const { email, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    res.status(200).json({ message: "Password updated successfully" });
}