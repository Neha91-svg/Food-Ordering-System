import api from "./axios";

// 🔒 Admin
export const getAdminRestaurants = () =>
  api.get("/restaurant/admin/restaurants");

export const addRestaurant = (data) =>
  api.post("/restaurant/admin/restaurants", data);

// 🌍 Public
export const getRestaurants = () =>
  api.get("/restaurant/list");

export const getRestaurantById = (id) =>
  api.get(`/restaurant/${id}`);
