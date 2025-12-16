import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";

const Food = () => {
  const { restaurantId } = useParams();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // items per page

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/api/food?restaurantId=${restaurantId}&page=${page}&limit=${limit}`
        );
        setFoods(res.data?.data || []);
        setTotalPages(res.data?.pages || 1);
      } catch (err) {
        console.error("Error fetching food items:", err);
        setError("Failed to load food items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [restaurantId, page]);

  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

  if (loading) return <p className="text-center py-8">Loading food items...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold text-ternary mb-4">Food Items</h1>

      {foods.length === 0 ? (
        <p>No food items available for this restaurant.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foods.map((f) => (
              <div key={f._id} className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition">
                <img
                  src={`${BASE_URL}/images/${f.image}` || "https://via.placeholder.com/150"}
                  alt={f.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-bold">{f.name}</h2>
                <p>Category: {f.category}</p>
                <p>Type: {f.foodType}</p>
                <p>Price: ₹{f.price}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Food;
