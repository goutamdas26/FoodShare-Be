const Otp = require("../models/Otp");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const otpGenerator = require('otp-generator'); // Import otp-generator for generating OTPs
const bcrypt = require('bcryptjs');

exports.sendOtp = async (req, res) => {
    try {
      const { email } = req.body;
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
  
      // Use the extracted utility
      await sendEmail({
        from:`"Food Share App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`,
    
      });
  
      res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
console.log(error)
      res.status(500).json({ error: error.message });
    }
  };

  exports.verifyOtp=async(req,res)=>{
  
    const { email, otp } = req.body;
    const otpRecord = await Otp.findOne({ email, otp });
 
    if (!otpRecord)
      return res.status(400).json({ message: "Invalid or expired OTP" });
 
    await Otp.deleteMany({ email }); // Remove OTP after verification
    res.status(200).json({ message: "OTP verified successfully" });
 }

 exports.resetpassword = async (req, res) => {
    console.log("object")
    try {
        const { email, newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const user = await User.findOneAndUpdate({ email }, { password: hashedPassword });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}