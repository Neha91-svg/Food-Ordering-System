import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Restaurants from "../pages/admin/Restaurants";
import Foods from "../pages/admin/Foods";
import RestaurantForm from "../components/restaurant/RestaurantForm";
import FoodForm from "../components/food/FoodForm";

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="restaurants" element={<Restaurants />} />
        <Route path="restaurants/add" element={<RestaurantForm />} />
        <Route path="foods" element={<Foods />} />
        <Route path="foods/add" element={<FoodForm />} />
      </Routes>
    </AdminLayout>
  );
}
