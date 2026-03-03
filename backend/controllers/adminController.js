import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {
  try {
    const { name, email, role, fineDue } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = new User({
      name,
      email,
      role,
      fineDue,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email fineDue role");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


/* UPDATE fine */
export const updateFine = async (req, res) => {
  try {
    const { fineDue } = req.body;
    await User.findByIdAndUpdate(req.params.id, { fineDue });
    res.json({ message: "Fine updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update fine" });
  }
};