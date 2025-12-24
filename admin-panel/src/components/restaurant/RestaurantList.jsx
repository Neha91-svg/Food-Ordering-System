import { useEffect, useState } from "react";
import { getAdminRestaurants } from "../../api/restaurant.api";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminRestaurants()
      .then((res) => setRestaurants(res.data.data))
      .catch(() => alert("Failed to load restaurants"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading restaurants...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow">
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b">
        <h2 className="text-xl font-bold text-gray-800">
          🏪 Restaurants
        </h2>
        <span className="text-sm text-gray-500">
          Total: {restaurants.length}
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-5 py-3 text-sm font-semibold text-gray-500 bg-gray-50">
        <div className="col-span-4">Restaurant</div>
        <div className="col-span-2">City</div>
        <div className="col-span-2">Avg Cost</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Rows */}
      {restaurants.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No restaurants found
        </div>
      ) : (
        restaurants.map((r) => (
          <div
            key={r._id}
            className="grid grid-cols-12 gap-4 px-5 py-4 items-center border-t hover:bg-gray-50 transition"
          >
            {/* Restaurant Info */}
            <div className="col-span-4 flex items-center gap-3">
              <img
                src={`${import.meta.env.VITE_BASE_API_URL.replace(
                  "/api",
                  ""
                )}/uploads/${r.image}`}
                alt={r.name}
                className="w-14 h-14 rounded-lg object-cover border"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {r.name}
                </p>
                <p className="text-xs text-gray-500">
                  ID: {r._id.slice(0, 8)}...
                </p>
              </div>
            </div>

            {/* City */}
            <div className="col-span-2 text-gray-700">
              {r.location?.city || "—"}
            </div>

            {/* Avg Cost */}
            <div className="col-span-2 text-gray-700">
              ₹{r.averageCost}
            </div>

            {/* Status */}
            <div className="col-span-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${r.isOpen
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {r.isOpen ? "Open" : "Closed"}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex justify-end gap-3">
              <button
                className="text-blue-600 text-sm hover:underline"
              >
                Edit
              </button>
              <button
                className="text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
