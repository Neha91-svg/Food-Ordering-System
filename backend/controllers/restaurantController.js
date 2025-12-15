import restaurantModel from "../models/Restaurant.js";

export const addRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurantModel.create(req.body);
        res.json({ success: true, data: restaurant });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add restaurant" });
    }
};

export const listRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({ isOpen: true });
        res.json({ success: true, data: restaurants });
    } catch (error) {
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
