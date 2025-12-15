import foodModel from "../models/Food.js";
import fs from "fs";

export const addFood = async (req, res) => {
  try {
    const food = await foodModel.create({
      ...req.body,
      image: req.file.filename,
    });

    res.json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const listFoodByRestaurant = async (req, res) => {
  try {
    const food = await foodModel.find({
      restaurantId: req.params.id,
      isAvailable: true,
    });
    res.json({ success: true, data: food });
  } catch {
    res.status(500).json({ success: false });
  }
};

export const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Food ID required" });
    }

    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Delete image file safely
    const filePath = `uploads/${food.image}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete food from DB
    await foodModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
