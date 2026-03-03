import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  fineDue: { type: Number, default: 0,},
  membershipType: {type: String},
  membershipStartDate: {type:Date},
  membershipExpiry: {type:Date},
  firstName: {type:String},
  lastName: {type:String},
  contactNumber: {type:String},
  contactAddress: {type:String},
  aadhaar: {type:String},

}, { timestamps: true });

export default mongoose.model("User", userSchema);
