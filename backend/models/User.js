import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true, // 🔥 fast lookup
        },

        password: {
            type: String,
            required: true,
            select: false, // 🔐 never return password
        },

        role: {
            type: String,
            enum: ["user", "admin", "restaurantOwner"],
            default: "user",
            index: true,
        },

        phone: {
            type: String,
            match: [/^[6-9]\d{9}$/, "Invalid Indian phone number"],
        },

        addresses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Address",
            },
        ],

        cartData: {
            type: Map,
            of: Number, // 🔥 foodId -> quantity
            default: {},
        },

        isBlocked: {
            type: Boolean,
            default: false,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        profileImage: {
            type: String,
            default: "",
        },

        lastLogin: {
            type: Date,
        },

        deletedAt: {
            type: Date, // soft delete support
            default: null,
        },
    },
    {
        timestamps: true,
        minimize: false,
        versionKey: false,
    }
);


const userModel =
    mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
