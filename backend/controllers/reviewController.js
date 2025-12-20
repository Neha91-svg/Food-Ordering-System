import Review from "../models/Review.js";
import FoodModel from "../models/Food.js";

export const addReview = async (req, res) => {
    const { foodId, rating, comment } = req.body;

    const review = await Review.create({
        foodId,
        // auth middleware
        rating,
        comment,
    });

    // update food rating
    await FoodModel.findByIdAndUpdate(foodId, {
        $inc: { totalRatings: 1 },
    });

    res.json({ success: true, data: review });
};

export const getReviewsByFood = async (req, res) => {
    const reviews = await Review.find({
        foodId: req.params.foodId,
    }).populate("userId", "name");

    res.json({ success: true, data: reviews });
};
