import { useEffect, useState } from "react";
import { getAdminRestaurants } from "../../api/restaurant.api";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminRestaurants()
      .then((res) => setRestaurants(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading restaurants...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">
          🏪 Restaurants
        </h1>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-12 px-6 py-3 text-sm font-semibold text-gray-500 bg-gray-50">
        <div className="col-span-5">Restaurant</div>
        <div className="col-span-3">City</div>
        <div className="col-span-2">Avg Cost</div>
        <div className="col-span-2">Status</div>
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
            className="grid grid-cols-12 px-6 py-4 items-center border-t hover:bg-gray-50 transition"
          >
            {/* Name + Image */}
            <div className="col-span-5 flex items-center gap-3">
              <img
                src={`${import.meta.env.VITE_BASE_API_URL.replace(
                  "/api",
                  ""
                )}/uploads/${r.image}`}
                alt={r.name}
                className="w-12 h-12 rounded-lg object-cover border"
              />

              <div>
                <p className="font-semibold text-gray-800">
                  {r.name}
                </p>

              </div>
            </div>

            {/* City */}
            <div className="col-span-3 text-gray-700">
              {r.location?.city || "N/A"}
            </div>

            {/* Cost */}
            <div className="col-span-2 font-medium">
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
          </div>
        ))
      )}
    </div>
  );
}
