import express from "express";
import multer from "multer";

import {
  addFood,
  updateFood,
  deleteFood,
  listFoodByRestaurant,
} from "../controllers/foodController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ---------- User ----------
router.get("/restaurant/:id", listFoodByRestaurant); // ?restaurantId=<id>&page=1&limit=20

// ---------- ADMIN ----------
router.post(
  "/admin/foods",
  
  upload.single("image"),
  addFood
);

router.put(
  "/admin/foods/:id",
 
  upload.single("image"),
  updateFood
);

router.delete(
  "/admin/foods/:id",
 
  deleteFood
);


export default router;
