import User from "../models/User.js";

export const updateMembership = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      contactAddress,
      aadhaar,
      startDate,
      endDate,
      membershipType,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If endDate is not provided, calculate automatically
    let expiryDate;

    if (endDate) {
      expiryDate = new Date(endDate);
    } else {
      expiryDate = new Date(startDate);

      if (membershipType === "6months") {
        expiryDate.setMonth(expiryDate.getMonth() + 6);
      }

      if (membershipType === "1year") {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      }

      if (membershipType === "2years") {
        expiryDate.setFullYear(expiryDate.getFullYear() + 2);
      }
    }

    // Update user fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.contactNumber = contactNumber;
    user.contactAddress = contactAddress;
    user.aadhaar = aadhaar;
    user.membershipType = membershipType;
    user.membershipStartDate = new Date(startDate);
    user.membershipExpiry = expiryDate;

    await user.save();

    res.json({
      message: "Membership updated successfully",
      membershipType,
      startDate: user.membershipStartDate,
      expiryDate: user.membershipExpiry,
    });

  } catch (error) {
    res.status(500).json({ message: "Membership update failed" });
  }
};