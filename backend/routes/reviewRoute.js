import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addReview,
  getReviewsByFood,
} from "../controllers/reviewController.js";

const router = express.Router();

/**
 * USER
 * Add review to a food
 */
router.post("/", addReview);

/**
 * PUBLIC / USER
 * Get all reviews of a food
 * /api/review/food/:foodId
 */
router.get("/food/:foodId", getReviewsByFood);

export default router;
