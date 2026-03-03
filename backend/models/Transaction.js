import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  issueDate: Date,
  returnDate: Date,
  actualReturnDate: Date,
  fine: { type: Number, default: 0 },
  status: { type: String, enum: ["issued", "returned"], default: "issued" }
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
