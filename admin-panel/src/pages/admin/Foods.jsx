import { useEffect, useState } from "react";
import { getAdminRestaurants } from "../../api/restaurant.api";
import { getFoodsByRestaurant } from "../../api/food.api";
import FoodList from "../../components/food/FoodList";


export default function Foods() {
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getAdminRestaurants().then((res) =>
      setRestaurants(res.data.data)
    );
  }, []);

  const loadFoods = async (id) => {
    setSelected(id);
    const res = await getFoodsByRestaurant(id);
    setFoods(res.data.data);
  };

  return (
    <div className="flex gap-6">
      {/* LEFT */}
      <div className="w-1/3 bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-3">Restaurants</h2>
        {restaurants.map((r) => (
          <button
            key={r._id}
            onClick={() => loadFoods(r._id)}
            className={`block w-full text-left mb-2 ${selected === r._id ? "font-bold text-indigo-600" : ""
              }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* RIGHT */}
      <div className="flex-1 bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-3">Foods</h2>

        <FoodList
          foods={foods}
          onDelete={(id) =>
            setFoods((prev) => prev.filter((f) => f._id !== id))
          }
        />
      </div>

    </div>
  );
}
