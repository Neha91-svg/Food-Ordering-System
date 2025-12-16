import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/restaurant/list`);
        setRestaurants(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Failed to load restaurants.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <p className="text-center py-8">Loading restaurants...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold text-ternary mb-4">Restaurants</h1>

      {restaurants.length === 0 ? (
        <p>No restaurants available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants.map((r) => (
            <div key={r._id} className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition">
              <h2 className="text-lg font-bold">{r.name}</h2>
              <p>{r.location?.address}</p>
              <p>Cuisines: {r.cuisines?.join(", ")}</p>
              <p>Avg Cost: ₹{r.averageCost}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
