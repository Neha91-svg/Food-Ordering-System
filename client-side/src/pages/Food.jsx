import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Food = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Generate / get guestId
  const getGuestId = () => {
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = "guest_" + Date.now();
      localStorage.setItem("guestId", guestId);
    }
    return guestId;
  };

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(`/api/food/restaurant/${restaurantId}`);
        setFoods(res.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load food items.");
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) fetchFoods();
  }, [restaurantId]);

  // ✅ Add to cart (NO TOKEN)
  const handleAddToCart = async (foodId) => {
    try {
      const userId = getGuestId();

      const res = await axios.post("/api/cart/add", {
        userId,
        foodId,
      });

      if (res.data.success) {
        alert("Item added to cart!");
        navigate("/cart");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add to cart");
    }
  };

  if (loading) return <p className="text-center py-8">Loading food items...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-6">Food Items</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((f) => (
          <div
            key={f._id}
            className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={`/images/${f.image}`}
              alt={f.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />

            <h2 className="text-lg font-bold">{f.name}</h2>
            <p className="text-sm text-gray-600">{f.category}</p>
            <p>Type: {f.foodType}</p>
            <p className="font-semibold">₹{f.price}</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => navigate(`/food/${f._id}/reviews`)}
                className="text-blue-600 font-medium hover:underline"
              >
                View Reviews
              </button>

              <button
                onClick={() => handleAddToCart(f._id)}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;
