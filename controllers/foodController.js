const Food = require("../models/Food");
const User = require("../models/User");
exports.addFood = async (req, res) => {
  try {
    const { foodName, category, quantity, location, phone } = req.body;

    const { userId, name } = req.user;

    const foodData = {
      name: foodName,
      category: category,
      quantity: quantity,
      location: location,
      donorDetails: userId,
      donorName: name,
      donorContact: phone,
    };

    const food = new Food(foodData);
    await food.save();
    await User.findByIdAndUpdate(userId, {
      $push: { donated: { foodItemId: food._id } },
    });
    res.status(201).json({ message: "Food added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getClaimedFood = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the user and populate the donated food items
    const user = await User.findById(userId).populate({
      path: "claimed.foodItemId",
      model: "Food",
      select:
        "name category quantity location status image donorName donorContact",
    });
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.claimed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableFood = async (req, res) => {
  try {
    const foodItems = await Food.find({ status: "available" }).populate(
      "donorDetails",
      "name"
    );
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ensure you import the Food model

exports.claimFood = async (req, res) => {
  try {
    const foodId = req.params.id;

    const userId = req.user.userId;

    const food = await Food.findById(foodId);

    if (!food || food.status !== "available") {
      return res.status(404).json({ message: "Food not available" });
    }
    // Update food status
    food.status = "claimed";
    food.claimedBy = userId;
    await food.save();

    // Update user's claimed history
    await User.findByIdAndUpdate(userId, {
      $push: { claimed: { foodItemId: foodId, claimedAt: new Date() } },
    });

    res.json({ message: "Food claimed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getDonatedFood = async (req, res) => {
  try {
    const userId = req.user.userId;


    // Find the user and populate the donated food items
    const user = await User.findById(userId).populate({
      path: "donated.foodItemId",
      model: "Food",
      select:
        "name category quantity location status image donorName donorContact",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
