import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "restaurant",
            required: true,
        },

        items: [
            {
                foodId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "food",
                    required: true,
                },
                name: String,
                price: Number,
                quantity: Number,
            },
        ],

        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "address",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        deliveryFee: {
            type: Number,
            default: 0,
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "ONLINE"],
            default: "COD",
        },

        paymentStatus: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED"],
            default: "PENDING",
        },

        orderStatus: {
            type: String,
            enum: [
                "PLACED",
                "CONFIRMED",
                "PREPARING",
                "OUT_FOR_DELIVERY",
                "DELIVERED",
                "CANCELLED",
            ],
            default: "PLACED",
        },

        deliveryPartner: {
            name: String,
            phone: String,
        },

        estimatedDeliveryTime: {
            type: Date,
        },

        notes: {
            type: String,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

const orderModel =
    mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
