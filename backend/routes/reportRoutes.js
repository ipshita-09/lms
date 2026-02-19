import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  activeIssues,
  overdueReturns,
  masterBooks,
  pendingRequests,
  memberships,
  membershipReport
} from "../controllers/reportController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/active", protect, activeIssues);
router.get("/overdue", protect, overdueReturns);
router.get("/books", protect, masterBooks);
router.get("/memberships", protect, memberships);
router.get("/pending", protect, pendingRequests);
router.get("/membershipReport", protect, membershipReport);

export default router;
