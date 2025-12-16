import mongoose from "mongoose";
import FoodModel from "../models/Food.js";
import fs from "fs";

// ---------------- Admin -----------------
export const addFood = async (req, res) => {
  try {
    const food = await FoodModel.create({
      ...req.body,
      image: req.file.filename,
    });

    res.status(201).json({ success: true, data: food });
  } catch (error) {
    console.error("Add food error:", error);
    res.status(500).json({ success: false, message: "Failed to add food" });
  }
};

export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid food ID" });

    const food = await FoodModel.findById(id);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });

    // Update image if file uploaded
    if (req.file) {
      const oldPath = `uploads/${food.image}`;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      req.body.image = req.file.filename;
    }

    const updatedFood = await FoodModel.findByIdAndUpdate(id, req.body, { new: true });

    res.json({ success: true, data: updatedFood });
  } catch (error) {
    console.error("Update food error:", error);
    res.status(500).json({ success: false, message: "Failed to update food" });
  }
};

export const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "Food ID required" });

    const food = await FoodModel.findById(id);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });

    const filePath = `uploads/${food.image}`;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await FoodModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error("Remove food error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- User -----------------
export const listFoodByRestaurant = async (req, res) => {
  try {
    const { restaurantId, page = 1, limit = 20 } = req.query;

    if (!restaurantId || !mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ success: false, message: "Valid restaurantId required" });
    }

    const foods = await FoodModel.find({
      restaurantId,
      isAvailable: true,
    })
      .sort({ isPopular: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await FoodModel.countDocuments({ restaurantId, isAvailable: true });

    res.json({ success: true, data: foods, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Fetch foods error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch foods" });
  }
};
