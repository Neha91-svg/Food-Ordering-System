import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // ek user ka ek hi cart
        },
        items: [
            {
                foodId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const cartModel = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default cartModel;
