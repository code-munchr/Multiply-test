import mongoose from "mongoose";
const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name of feedback is required",
  },
  regNo: String,
  variant: String,
  make: Number,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  category: { type: mongoose.Schema.ObjectId, ref: "Category" },
});

export default mongoose.model("Car", CarSchema);
