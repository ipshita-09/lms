import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  membershipType: {
    type: String,
    enum: ["6months", "1year", "2years"]
  },
  membershipExpiry: Date,
  fineDue: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
