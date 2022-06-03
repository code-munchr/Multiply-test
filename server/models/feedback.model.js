import mongoose from "mongoose";
const FeedbackSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: "Content of feedback is required",
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  author: { type: mongoose.Schema.ObjectId, ref: "User" },
});

export default mongoose.model("Feedback", FeedbackSchema);
