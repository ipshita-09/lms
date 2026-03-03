import express from "express";
import { updateMembership } from "../controllers/membershipController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, updateMembership);

export default router;
