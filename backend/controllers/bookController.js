import Book from "../models/Book.js";

export const addBook = async (req, res) => {
  const { title, author, serialNo, type } = req.body;

  if (!title || !author || !serialNo) {
    return res.status(400).json({ message: "All fields mandatory" });
  }

  const book = await Book.create({ title, author, serialNo, type });
  res.json(book);
};

export const searchBooks = async (req, res) => {
  const books = await Book.find({ available: true });
  res.json(books);
};
