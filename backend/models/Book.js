import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  serialNo: String,
  isAvailable: {
    type: Boolean,
    default: true,
  },
  issuedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  issuedAt: {
    type: Date,
    default: null,
  },
  returnDate: {
  type: Date,
  default: null,
},
remarks: {
  type: String,
}
});

export default mongoose.model("Book", bookSchema);