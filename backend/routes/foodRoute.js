import express from "express";
import multer from "multer";
import {
  addFood,
  updateFood,
  removeFood,
  listFoodByRestaurant,
} from "../controllers/foodController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ---------- User ----------
router.get("/", listFoodByRestaurant); // ?restaurantId=<id>&page=1&limit=20

// ---------- Admin ----------
router.post("/", upload.single("image"), addFood);
router.put("/:id", upload.single("image"), updateFood);
router.delete("/", removeFood);

export default router;
