import User from "../models/User.js";

/**
 * Add User (Admin)
 */
export const addUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};


export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(user);
};
