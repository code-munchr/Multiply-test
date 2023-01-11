import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Category must have title.",
  },
});

export default mongoose.model("Category", CategorySchema);
