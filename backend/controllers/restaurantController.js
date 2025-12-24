import restaurantModel from "../models/Restaurant.js";

// ➕ Add Restaurant (ADMIN)
export const addRestaurant = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Restaurant image is required",
      });
    }

    const restaurant = await restaurantModel.create({
      name: req.body.name,
      description: req.body.description,
      image: req.file.filename, // ✅ REQUIRED
      location: req.body.location,
      cuisines: req.body.cuisines,
      averageCost: req.body.averageCost,
      deliveryTime: req.body.deliveryTime,
      ownerId: req.user?._id, // optional
    });

    res.status(201).json({
      success: true,
      message: "Restaurant added successfully",
      data: restaurant,
    });
  } catch (error) {
    console.error("addRestaurant error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📋 Get all restaurants (ADMIN)
export const adminListRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantModel
      .find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    console.error("adminListRestaurants error:", error);
    res.status(500).json({ success: false });
  }
};

// 🌍 Public
export const listRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({ isOpen: true });
    res.json({ success: true, data: restaurants });
  } catch {
    res.status(500).json({ success: false });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findById(req.params.id);
    res.json({ success: true, data: restaurant });
  } catch {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
