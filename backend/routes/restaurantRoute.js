import express from "express";
import {
  addRestaurant,
  listRestaurants,
  getRestaurantById,
} from "../controllers/restaurantController.js";

const router = express.Router();

// Admin
router.post("/add", addRestaurant);

// Public
router.get("/list", listRestaurants);
router.get("/:id", getRestaurantById);

export default router;
