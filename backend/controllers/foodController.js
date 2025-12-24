import mongoose from "mongoose";
import FoodModel from "../models/Food.js";
import fs from "fs";

export const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Food image is required",
      });
    }

    const food = await FoodModel.create({
      restaurantId: req.body.restaurantId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      foodType: req.body.foodType,
      image: req.file.filename, // ✅ REQUIRED
      preparationTime: req.body.preparationTime,
      discount: req.body.discount,
    });

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      data: food,
    });
  } catch (error) {
    console.error("addFood error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✏️ Update food (ADMIN)
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid ID" });

    const food = await FoodModel.findById(id);
    if (!food) return res.status(404).json({ success: false });

    if (req.file) {
      const oldImg = `uploads/${food.image}`;
      if (fs.existsSync(oldImg)) fs.unlinkSync(oldImg);
      req.body.image = req.file.filename;
    }

    const updated = await FoodModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("updateFood error:", error);
    res.status(500).json({ success: false });
  }
};

// ❌ Delete food (ADMIN)
export const deleteFood = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.params.id);
    if (!food) return res.status(404).json({ success: false });

    const img = `uploads/${food.image}`;
    if (fs.existsSync(img)) fs.unlinkSync(img);

    await food.deleteOne();
    res.json({ success: true, message: "Food deleted" });
  } catch (error) {
    console.error("deleteFood error:", error);
    res.status(500).json({ success: false });
  }
};

// 🍽️ Foods by restaurant (USER)
export const listFoodByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid restaurant ID" });
    }

    const foods = await FoodModel.find({
      restaurantId: id,
      isAvailable: true,
    });

    res.json({ success: true, data: foods });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch foods",
    });
  }
};
