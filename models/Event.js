// const mongoose = require("mongoose");

// const FoodCharityEventSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     postedBy:{type: mongoose.Schema.Types.ObjectId, ref: "Users"},
//     description: { type: String, required: true },
//     startDate: { type: Date, required: true }, // Event start date
//     endDate: { type: Date, required: true }, // Event end date
//     startTime: { type: String, required: true }, // Example: "10:00 AM - 2:00 PM"
//     endTime: { type: String, required: true }, // Example: "10:00 AM - 2:00 PM"
//     location: { type: String, required: true },
//     contact: { type: String, required: true },
//     // images: [{ type: String }], // URLs of event images
//     status: { type: String, enum: ["Upcoming", "Ongoing", "Completed"], default: "Upcoming" },
//     imageUrl:String
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("FoodCharityEvent", FoodCharityEventSchema);
const mongoose = require("mongoose");

const FoodCharityEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    description: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true }, // Or Date if preferred
    endTime: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    contact: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // 10-digit phone number validation
    },
    imageUrl: { type: String, required: false },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodCharityEvent", FoodCharityEventSchema);
