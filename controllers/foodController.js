const Food = require('../models/Food');

exports.addFood = async (req, res) => {
  try {
    const { name, category, quantity, expiryDate } = req.body;
    const donor = req.user.userId;

    const food = new Food({ name, category, quantity, expiryDate, donor });
    await food.save();

    res.status(201).json({ message: 'Food added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableFood = async (req, res) => {
  try {
    const foodItems = await Food.find({ status: 'available' }).populate('donor', 'name');
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.claimFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const userId = req.user.userId;

    const food = await Food.findById(foodId);

    if (!food || food.status !== 'available') {
      return res.status(404).json({ message: 'Food not available' });
    }

    food.status = 'claimed';
    food.claimedBy = userId;
    await food.save();

    res.json({ message: 'Food claimed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
