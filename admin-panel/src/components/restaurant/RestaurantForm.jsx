import { useState } from "react";
import { addRestaurant } from "../../api/restaurant.api";

export default function RestaurantForm() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    averageCost: "",
    image: null,
  });

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please select restaurant image");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("averageCost", form.averageCost);
    data.append("image", form.image);
    data.append("location[city]", form.city);

    try {
      await addRestaurant(data);
      alert("Restaurant Added Successfully");

      setForm({
        name: "",
        city: "",
        averageCost: "",
        image: null,
      });
    } catch (err) {
      alert("Failed to add restaurant");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white w-[440px] rounded-2xl shadow-lg p-6 space-y-4"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            🏪 Add Restaurant
          </h2>
          <p className="text-sm text-gray-500">
            Register a new restaurant
          </p>
        </div>

        {/* Name */}
        <div>
          <label className="label">Restaurant Name</label>
          <input
            className="input"
            name="name"
            placeholder="e.g. Spice Garden"
            value={form.name}
            onChange={changeHandler}
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="label">City</label>
          <input
            className="input"
            name="city"
            placeholder="Mumbai"
            value={form.city}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Average Cost */}
        <div>
          <label className="label">Average Cost for Two (₹)</label>
          <input
            type="number"
            className="input"
            name="averageCost"
            placeholder="500"
            value={form.averageCost}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Restaurant Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={changeHandler}
            className="block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:bg-indigo-50 file:text-indigo-700
                       hover:file:bg-indigo-100"
            required
          />
        </div>

        {/* Button */}
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded-xl
                     font-semibold hover:bg-indigo-700 transition"
        >
          ➕ Add Restaurant
        </button>
      </form>
    </div>
  );
}
