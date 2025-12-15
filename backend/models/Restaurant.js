import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
        },

        image: {
            type: String, // restaurant banner image
            required: true,
        },

        location: {
            address: String,
            city: String,
            pincode: String,
            latitude: Number,
            longitude: Number,
        },

        cuisines: [
            {
                type: String, // North Indian, Chinese, Italian
            },
        ],

        averageCost: {
            type: Number, // cost for two
            required: true,
        },

        rating: {
            type: Number,
            default: 0,
        },

        totalReviews: {
            type: Number,
            default: 0,
        },

        isOpen: {
            type: Boolean,
            default: true,
        },

        deliveryTime: {
            type: Number, // in minutes
        },

        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // restaurant owner
        },
    },
    { timestamps: true }
);

const restaurantModel =
    mongoose.models.restaurant ||
    mongoose.model("restaurant", restaurantSchema);

export default restaurantModel;
