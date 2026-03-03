import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {
  try {
    const { name, email, password, role, fineDue } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      fineDue,
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ message: "User creation failed" });
  }
};


export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(user);
};
