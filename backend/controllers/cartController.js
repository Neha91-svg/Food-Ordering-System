import cartModel from "../models/Cart.js";

/**
 * ADD TO CART (NO AUTH, NO TOKEN)
 */
export const addToCart = async (req, res) => {
  try {
    const { userId, foodId } = req.body;

    if (!userId || !foodId) {
      return res.status(400).json({
        success: false,
        message: "userId and foodId are required",
      });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = await cartModel.create({
        userId,
        items: [{ foodId, quantity: 1 }],
      });
    } else {
      const index = cart.items.findIndex(
        item => item.foodId?.toString() === foodId
      );

      if (index > -1) {
        cart.items[index].quantity += 1;
      } else {
        cart.items.push({ foodId, quantity: 1 });
      }

      await cart.save();
    }

    res.json({ success: true, cart });
  } catch (err) {
    console.error("ADD CART ERROR:", err);
    res.status(500).json({ success: false });
  }
};

export const removeFromCart = async (req, res) => {
    try {
        const { userId, foodId } = req.body;

        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.json({ success: true, data: [] });
        }

        cart.items = cart.items.filter(
            item => item.foodId.toString() !== foodId
        );

        await cart.save();

        res.json({ success: true, cart });
    } catch (error) {
        console.error("RemoveCart Error:", error);
        res.status(500).json({ success: false });
    }
};
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await cartModel
      .findOne({ userId })
      .populate({
        path: "items.foodId",
        select: "name price image",
        options: { strictPopulate: false },
      });

    if (!cart) {
      return res.json({ success: true, data: [] });
    }

    const safeItems = cart.items.filter(item => item.foodId);

    res.json({
      success: true,
      data: safeItems,
    });
  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.json({ success: true, data: [] });
  }
};
