import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-indigo-600 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <NavLink to="/admin" className="block mb-3">Dashboard</NavLink>
      <NavLink to="/admin/restaurants" className="block mb-3">Restaurants</NavLink>
      <NavLink to="/admin/restaurants/add" className="block mb-3">Add Restaurant</NavLink>
      <NavLink to="/admin/foods" className="block mb-3">Foods</NavLink>
      <NavLink to="/admin/foods/add" className="block">Add Food</NavLink>
    </div>
  );
}
