import Transaction from "../models/Transaction.js";
import Book from "../models/Book.js";
import User from "../models/User.js";

export const activeIssues = async (req, res) => {
  const data = await Transaction.find({ status: "issued" })
    .populate("user")
    .populate("book");
  res.json(data);
};

export const overdueReturns = async (req, res) => {
  const today = new Date();
  const data = await Transaction.find({
    status: "issued",
    returnDate: { $lt: today }
  }).populate("user book");

  res.json(data);
};

export const masterBooks = async (req, res) => {
  const books = await Book.find({ type: "book" });
  res.json(books);
};

export const memberships = async (req, res) => {
  const users = await User.find({ membershipType: { $ne: null } });
  res.json(users);
  
};
export const membershipReport = async (req, res) => {
  const users = await User.find({ membershipType: { $ne: null } });
  res.json(users);
};
export const pendingRequests = async (req, res) => {
  const pending = await Transaction.find({ status: "pending" })
    .populate("user", "name")
    .populate("book", "title");

  res.json(pending);
};
