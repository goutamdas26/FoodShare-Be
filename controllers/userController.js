
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address,profileImage } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      phone,
      address,
      profileImage
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const {userId} = req.user;
    const user = await User.findById(userId).select("name address email phone profileImage kycStatus");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getUserByID = async (req, res) => {
     const { userId } = req.body;
     console.log("userId");
  try {
 
    const user = await User.findById(userId).select("name address email phone profileImage kycStatus");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
   const { userId } = req.user;
    const { name, email, phone, address,profileImage } = req.body;
console.log(req.body)
    const user = await User.findById(userId);
    user.address=address
    user.name=name
user.email=email
user.phone=phone
user.profileImage=profileImage
user.save()
if (!user) {
    return res.status(404).json({ message: "User not found" });
}

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.contactUs = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate input
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Set up the email transporter


    // Email options
    await sendEmail({
      from:`"Food Share App" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Your email where you want to receive messages
      subject: `Contact Us Message from ${name}`,
      text: `You have received a new message from the contact form:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    })

    // Send the email

    // Send a response back to the client
    res.status(200).json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


