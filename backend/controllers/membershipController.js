import User from "../models/User.js";

export const updateMembership = async (req, res) => {
  const { type } = req.body;

  const user = await User.findById(req.user.id);

  const expiry = new Date();
  if (type === "6months") expiry.setMonth(expiry.getMonth() + 6);
  if (type === "1year") expiry.setFullYear(expiry.getFullYear() + 1);
  if (type === "2years") expiry.setFullYear(expiry.getFullYear() + 2);

  user.membershipType = type;
  user.membershipExpiry = expiry;
  await user.save();

  res.json({ message: "Membership updated", expiry });
};
