import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Always get / create guestId
  const getGuestId = () => {
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = "guest_" + Date.now();
      localStorage.setItem("guestId", guestId);
    }
    return guestId;
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = getGuestId();

        const res = await axios.get(`/api/cart/get/${userId}`);

        if (res.data?.success) {
          setCartItems(res.data.data || []);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        console.error("Fetch cart error:", err);
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading cart...</p>;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Your cart is empty 🛒</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
        >
          Browse Food
        </button>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.foodId?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.foodId?._id}
          className="flex items-center gap-4 bg-white shadow p-4 rounded mb-3"
        >
          <img
            src={`/images/${item.foodId?.image}`}
            alt={item.foodId?.name}
            className="w-20 h-20 object-cover rounded"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.foodId?.name}</h3>
            <p className="text-gray-600">₹{item.foodId?.price}</p>
            <p>Qty: {item.quantity}</p>
          </div>

          <p className="font-semibold">
            ₹{item.foodId?.price * item.quantity}
          </p>
        </div>
      ))}

      <div className="mt-6 bg-white shadow p-6 rounded">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span>Delivery</span>
          <span>₹60</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>₹{subtotal + 60}</span>
        </div>

        <button
          onClick={() => navigate("/order")}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded text-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
