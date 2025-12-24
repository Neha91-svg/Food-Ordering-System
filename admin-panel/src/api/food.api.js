import api from "./axios";

// 🔒 Admin
export const addFood = (data) =>
  api.post("/food/admin/foods", data);

export const updateFood = (id, data) =>
  api.put(`/food/admin/foods/${id}`, data);

export const deleteFood = (id) =>
  api.delete(`/food/admin/foods/${id}`);

// 🌍 User
export const getFoodsByRestaurant = (restaurantId) =>
  api.get(`/food/restaurant/${restaurantId}`);
