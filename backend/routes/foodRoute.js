import express from "express";
import multer from "multer";
import {
  addFood,
  listFoodByRestaurant,
  removeFood,
} from "../controllers/foodController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Admin
router.post("/add", upload.single("image"), addFood);
router.post("/remove", removeFood);

// User
router.get("/restaurant/:id", listFoodByRestaurant);

export default router;
