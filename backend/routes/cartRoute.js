import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);
router.get("/get", authMiddleware, getCart);

export default router;
