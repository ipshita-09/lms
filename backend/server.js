import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";

import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
