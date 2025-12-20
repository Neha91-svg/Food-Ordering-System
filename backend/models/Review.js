import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "food",
            required: true,
            index: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",

        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        comment: String,
    },
    { timestamps: true }
);

export default mongoose.model("review", reviewSchema);
