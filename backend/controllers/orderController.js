import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

/**
 * PLACE ORDER (COD)
 */
export const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentMethod: "COD",      // 👈 added
            payment: false,            // 👈 unpaid initially
            status: "Pending",
        });

        await newOrder.save();

        // Clear user cart
        await userModel.findByIdAndUpdate(req.body.userId, {
            cartData: {},
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully (Cash on Delivery)",
            orderId: newOrder._id,
        });
    } catch (error) {
        console.log("Error placing order:", error);
        res.status(500).json({
            success: false,
            message: "Failed to place order",
        });
    }
};

/**
 * USER ORDERS
 */
export const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

/**
 * ADMIN – LIST ALL ORDERS
 */
export const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error listing orders:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

/**
 * ADMIN – UPDATE ORDER STATUS
 */
export const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {
            status: req.body.status,
        });

        res.json({
            success: true,
            message: "Order status updated",
        });
    } catch (error) {
        console.log("Error updating order status:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
};


export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    if (!orderId) {
        return res.status(400).json({
            success: false,
            message: "Order ID is required",
        });
    }

    try {
        if (success === true || success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {
                payment: false,          // COD → payment on delivery
                status: "Confirmed",
            });

            return res.json({
                success: true,
                message: "Order confirmed (Cash on Delivery)",
            });
        } else {
            await orderModel.findByIdAndDelete(orderId);

            return res.json({
                success: false,
                message: "Order cancelled",
            });
        }
    } catch (error) {
        console.log("Error verifying order:", error);
        res.status(500).json({
            success: false,
            message: "Order verification failed",
        });
    }
};
