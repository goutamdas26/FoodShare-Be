const Food = require("../models/Food");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const claimTemplate = require("../utils/templates/claimTemplate");
exports.addFood = async (req, res) => {
  try {
    const {
      foodName,
      category,
      quantity,
      location,
      phone,
      expiry,
      description,
      images
    } = req.body;
    const { userId, name } = req.user;

  

    const foodData = {
      name: foodName,
      category,
      quantity: quantity || 1, // Default to 1 if not provided
      location,
      donorDetails: {
        name,
        phone: phone, // Updated field name
      },
      donor: userId,
      // expiry: expiry ? new Date(expiry) : undefined, // Ensuring expiry is a Date object
      expiry: expiry,
      description,
      images
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

    const user = await User.findById(userId).populate({
      path: "claimed.foodItemId",
      model: "Food",

      populate: {
        path: "donor",
        model: "Users",
        // Select only required fields
        select: "name _id",
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.claimed);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableFood = async (req, res) => {
  try {
    const {userId}=req.user
    const foodItems = await Food.find({ status: "Available" }).populate("donor" ,"kycStatus");

    const filteredFood=foodItems.filter((item)=>item.donor._id!=userId)
   
    res.json(filteredFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ensure you import the Food model

exports.claimFood = async (req, res) => {
  try {
    const foodId = req.params.id;

    const userId = req.user.userId;

    const food = await Food.findById(foodId).populate("donor");

    if (!food || food.status !== "Available") {
      return res.status(404).json({ message: "Food not available" });
    }
    // Update food status
    food.status = "Claimed";
    food.claimedBy = userId;
    await food.save();

    // Update user's claimed history
    await User.findByIdAndUpdate(userId, {
      $push: { claimed: { foodItemId: foodId, claimedAt: new Date() } },
    });
    
    const user=await User.findById(userId).select("name email phone address")
    // Add a debug log to verify data before sending
console.log("Sending claim email to:", food?.donor?.email);
console.log("Claimer Info:", user);


    await sendEmail({
      from:`"Food Share App" <${process.env.EMAIL_USER}>`,
      to: food?.donor?.email,
      subject: "Your food has been claimed!",
      html: claimTemplate(user,food.name),
    });
    res.json({ message: "Food claimed successfully" });
  } catch (error) {
    console.log(error)
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
      populate: {
        path: "claimedBy",
        model: "Users",
        // Select only required fields
        select: "name phone",
      },
   
    });
console.log("donated..",JSON.stringify(user.donated,null,2))
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.donated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

