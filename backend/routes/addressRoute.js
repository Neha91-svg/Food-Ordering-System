import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addAddress,
  getUserAddresses,
} from "../controllers/addressController.js";

const router = express.Router();

router.post("/add", authMiddleware, addAddress);
router.get("/list", authMiddleware, getUserAddresses);

export default router;
