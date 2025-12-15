import userModel from "../models/User.js";
import cartModel from "../models/Cart.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, foodId } = req.body;

        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = await cartModel.create({ userId, items: [{ foodId, quantity: 1 }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({ foodId, quantity: 1 });
            }
            await cart.save();
        }

        res.json({ success: true, cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};
export const removeFromCart = async (req, res) => {
    try {
        const { userId, foodId } = req.body;
        const cart = await cartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

        cart.items = cart.items.filter(item => item.foodId.toString() !== foodId);
        await cart.save();

        res.json({ success: true, cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await cartModel.findOne({ userId }).populate("items.foodId");
        res.json({ success: true, cart });
    } catch {
        res.status(500).json({ success: false });
    }
};


