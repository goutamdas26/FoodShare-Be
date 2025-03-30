
const User = require("../models/User");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      phone,
      address,
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
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
   const { userId } = req.user;
    const { name, email, phone, address } = req.body;

    const user = await User.findById(userId);
    user.address=address
    user.name=name
user.email=email
user.phone=phone
user.save()
if (!user) {
    return res.status(404).json({ message: "User not found" });
}
console.log(user)

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
