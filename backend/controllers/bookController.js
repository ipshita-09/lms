import Book from "../models/Book.js";
import User from "../models/User.js";

export const issueBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book)
      return res.status(404).json({ message: "Book not found" });

    if (!book.isAvailable)
      return res.status(400).json({ message: "Book already issued" });

    book.isAvailable = false;
    book.issuedTo = req.user.id;
    book.issuedAt = new Date();

    await book.save();

    res.json({ message: "Book issued successfully" });
  } catch (err) {
    res.status(500).json({ message: "Issue failed" });
  }
};
export const addBook = async (req, res) => {
  const { title, author, serialNo,type } = req.body;

  if (!title || !author || !serialNo) {
    return res.status(400).json({ message: "All fields mandatory" });
  }

  const book = await Book.create({ title, author, serialNo, type });
  res.json(book);
};

export const getAvailableBooks = async (req, res) => {
  try {
    const books = await Book.find({ isAvailable: true });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
};
export const searchBooks = async (req, res) => {
  const books = await Book.find({ isAvailable: true });
  res.json(books);
};

export const returnBook = async (req, res) => {
  try {
    const { bookId, returnDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book || book.isAvailable)
      return res.status(400).json({ message: "Invalid return" });

    const issueDate = new Date(book.issuedAt);
    const actualReturnDate = new Date(returnDate);

    // Calculate days difference
    const daysDiff = Math.ceil(
      (actualReturnDate - issueDate) / (1000 * 60 * 60 * 24)
    );

    let fine = 0;
    if (daysDiff > 10) {
      fine = (daysDiff - 10) * 5;
    }

    // Update user fine
    if (fine > 0) {
      const user = await User.findById(book.issuedTo);
      if (!user.findDue){
        user.fineDue = 0;
      }
      user.fineDue += fine;
      await user.save();
    }

    // Reset book
    book.isAvailable = true;
    book.issuedTo = null;
    book.issuedAt = null;
    book.returnDate = null;
    book.remarks = null;

    await book.save();

    res.json({
      message: "Book returned successfully",
      fine,
    });
  } catch (err) {
    res.status(500).json({ message: "Return failed" });
  }
};
