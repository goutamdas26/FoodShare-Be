const mongoose = require("mongoose");

const FoodCharityEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    postedBy:{type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    description: { type: String, required: true },
    startDate: { type: Date, required: true }, // Event start date
    endDate: { type: Date, required: true }, // Event end date
    time: { type: String, required: true }, // Example: "10:00 AM - 2:00 PM"
    location: { type: String, required: true },
    contact: { type: String, required: true },
    images: [{ type: String }], // URLs of event images
    status: { type: String, enum: ["Upcoming", "Ongoing", "Completed"], default: "Upcoming" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodCharityEvent", FoodCharityEventSchema);
