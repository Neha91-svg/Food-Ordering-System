import { useEffect, useState } from "react";
import { getAdminRestaurants } from "../../api/restaurant.api";
import { addFood } from "../../api/food.api";

export default function FoodForm() {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    foodType: "VEG",
    restaurantId: "",
    image: null,
  });

  useEffect(() => {
    getAdminRestaurants().then((res) =>
      setRestaurants(res.data.data)
    );
  }, []);

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) =>
      data.append(key, form[key])
    );

    await addFood(data);
    alert("Food Added Successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white w-[440px] rounded-2xl shadow-lg p-6 space-y-4"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">🍔 Add New Food</h2>
          <p className="text-sm text-gray-500">
            Create food items for your restaurant
          </p>
        </div>

        {/* Restaurant */}
        <div>
          <label className="label">Restaurant</label>
          <select
            name="restaurantId"
            className="input"
            onChange={changeHandler}
            required
          >
            <option value="">Select Restaurant</option>
            {restaurants.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Food Name */}
        <div>
          <label className="label">Food Name</label>
          <input
            className="input"
            name="name"
            placeholder="e.g. Margherita Pizza"
            onChange={changeHandler}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">Price (₹)</label>
          <input
            className="input"
            name="price"
            type="number"
            placeholder="199"
            onChange={changeHandler}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <input
            className="input"
            name="category"
            placeholder="Pizza, Burger, Dessert"
            onChange={changeHandler}
            required
          />
        </div>

        {/* Food Type */}
        <div>
          <label className="label">Food Type</label>
          <select
            name="foodType"
            className="input"
            onChange={changeHandler}
          >
            <option value="VEG">🥦 Veg</option>
            <option value="NON_VEG">🍗 Non-Veg</option>
            <option value="EGG">🥚 Egg</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Food Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={changeHandler}
            className="block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:bg-green-50 file:text-green-700
                       hover:file:bg-green-100"
            required
          />
        </div>

        {/* Button */}
        <button
          className="w-full bg-green-600 text-white py-2 rounded-xl
                     font-semibold hover:bg-green-700 transition"
        >
          ➕ Add Food
        </button>
      </form>
    </div>
  );
}
