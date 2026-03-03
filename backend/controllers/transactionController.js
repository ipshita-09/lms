import Transaction from "../models/Transaction.js";
import Book from "../models/Book.js";
import User from "../models/User.js";

export const issueBook = async (req, res) => {
  const { bookId } = req.body;

  const book = await Book.findById(bookId);
  if (!book || !book.available) {
    return res.status(400).json({ message: "Book not available" });
  }

  const user = await User.findById(req.user.id);
  if (!user.membershipExpiry || user.membershipExpiry < new Date()) {
    return res.status(400).json({ message: "Membership expired" });
  }

  const issueDate = new Date();
  const returnDate = new Date();
  returnDate.setDate(issueDate.getDate() + 15);

  const transaction = await Transaction.create({
    user: user._id,
    book: book._id,
    issueDate,
    returnDate
  });

  book.available = false;
  await book.save();

  res.json(transaction);
};
export const payFine = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.fineDue = 0;
  await user.save();
  res.json({ message: "Fine paid successfully" });
};


export const returnBook = async (req, res) => {
  const { transactionId } = req.body;

  const transaction = await Transaction.findById(transactionId)
    .populate("book")
    .populate("user");

  const today = new Date();
  let fine = 0;

  if (today > transaction.returnDate) {
    const lateDays = Math.ceil(
      (today - transaction.returnDate) / (1000 * 60 * 60 * 24)
    );
    fine = lateDays * 10;
  }

  transaction.actualReturnDate = today;
  transaction.fine = fine;
  transaction.status = "returned";
  await transaction.save();

  transaction.book.available = true;
  await transaction.book.save();

  if (fine > 0) {
    transaction.user.fineDue += fine;
    await transaction.user.save();
  }

  res.json({ message: "Returned successfully", fine });
};
