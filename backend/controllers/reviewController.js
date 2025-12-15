import reviewModel from "../models/Review.js";
import foodModel from "../models/Food.js";

export const addReview = async (req, res) => {
    try {
        const review = await reviewModel.create(req.body);

        const reviews = await reviewModel.find({ foodId: req.body.foodId });
        const avg =
            reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;

        await foodModel.findByIdAndUpdate(req.body.foodId, {
            rating: avg,
            totalRatings: reviews.length,
        });

        res.json({ success: true });
    } catch {
        res.status(500).json({ success: false });
    }
};
