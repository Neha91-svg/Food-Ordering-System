import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        houseNo: { type: String, required: true },
        area: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
        landmark: { type: String },
    },
    { timestamps: true }
);

const addressModel = mongoose.model("Address", addressSchema);

export default addressModel;
