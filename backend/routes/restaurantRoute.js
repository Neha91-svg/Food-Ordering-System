import express from "express";
import upload  from "../middleware/upload.js";
import {
  addRestaurant,
  listRestaurants,
  getRestaurantById,
  adminListRestaurants,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.post(
  "/admin/restaurants",
  upload.single("image"), // 🔥 MUST
  addRestaurant
);

router.get("/admin/restaurants", adminListRestaurants);

// Public
router.get("/list", listRestaurants);
router.get("/:id", getRestaurantById);

export default router;
