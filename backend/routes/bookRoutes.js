import express from "express";
import Book from "../models/Book.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {addBook, searchBooks, getAvailableBooks, issueBook, returnBook} from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, authorize("admin"), addBook);
router.get("/", protect, searchBooks);
router.get("/available", authMiddleware, getAvailableBooks);
router.post("/issue", authMiddleware, issueBook);
router.post("/return", authMiddleware, returnBook);
router.get("/issued", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({
      issuedTo: req.user.id,
      isAvailable: false,
    });
    res.json(books);
  } catch {
    res.status(500).json({ message: "Failed to fetch issued books" });
  }
});


export default router;
