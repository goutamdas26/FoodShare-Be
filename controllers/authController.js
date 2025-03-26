const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    console.log("object")
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user1 = await User.findOne({ email }).select("name email ");

    const token = jwt.sign({ userId: user._id ,name:user.name,email:user.email}, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
