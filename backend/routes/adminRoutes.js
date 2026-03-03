
import express from "express";
import { addUser, getAllUsers, updateFine } from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import User from "../models/User.js";
const router = express.Router();

router.post("/add-user", authMiddleware, adminMiddleware, addUser);
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.put("/update-fine/:id", authMiddleware, adminMiddleware, updateFine);
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.delete("/users/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;