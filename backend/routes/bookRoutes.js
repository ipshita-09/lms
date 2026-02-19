import express from "express";
import { addBook, searchBooks } from "../controllers/bookController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), addBook);
router.get("/", protect, searchBooks);

export default router;
