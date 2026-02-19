import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  serialNo: { type: String, required: true, unique: true },
  type: { type: String, enum: ["book",], default: "book" },
  available: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
