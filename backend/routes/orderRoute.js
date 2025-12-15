import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  placeOrder,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// User
router.post("/place", authMiddleware, placeOrder);
router.get("/my-orders", authMiddleware, userOrders);

// Admin
router.post("/status", updateStatus);

export default router;
