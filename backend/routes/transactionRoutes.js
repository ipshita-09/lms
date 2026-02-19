import express from "express";
import { issueBook, returnBook } from "../controllers/transactionController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/issue", protect, issueBook);
router.post("/return", protect, returnBook);
router.post("/payfine", protect, payFine);

export default router;
