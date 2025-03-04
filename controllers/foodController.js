const Food = require('../models/Food');
const user = require('../models/User');
exports.addFood = async (req, res) => {
  try {
    const { foodName, category, quantity, location,phone } = req.body;
    
  console.log(req.user,"ghhg")
    const donarName="RAJ ";
    const donor = "67c1bf319d2d86b28e9ce78a";
    const foodData={
      name:foodName,
      category:category,
      quantity:quantity,
      location:location,
      donorDetails:donor,
      donorName:donarName,
      donorContact:phone
  }
    const food = new Food(foodData);
    await food.save();

    res.status(201).json({ message: 'Food added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableFood = async (req, res) => {
  try {
    const foodItems = await Food.find({ status: 'available' }).populate("donorDetails","name");
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
