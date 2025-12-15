import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "restaurant",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            required: true,
            index: true, // fast filtering
        },

        foodType: {
            type: String,
            enum: ["VEG", "NON_VEG", "EGG"],
            default: "VEG",
        },

        image: {
            type: String,
            required: true,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },

        preparationTime: {
            type: Number, // in minutes
            default: 15,
        },

        rating: {
            type: Number,
            default: 0,
        },

        totalRatings: {
            type: Number,
            default: 0,
        },

        isPopular: {
            type: Boolean,
            default: false,
        },

        discount: {
            type: Number, // percentage
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const foodModel =
    mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
