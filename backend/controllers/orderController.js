import orderModel from "../models/Order.js";
import userModel from "../models/User.js";

export const placeOrder = async (req, res) => {
  try {
    const order = await orderModel.create({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      paymentMethod: "COD",
    });

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, orderId: order._id });
  } catch {
    res.status(500).json({ success: false });
  }
};

export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch {
    res.status(500).json({ success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};
