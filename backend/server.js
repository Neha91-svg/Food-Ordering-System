import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";

import userRoute from "./routes/userRoute.js";
import restaurantRoute from "./routes/restaurantRoute.js";
import foodRoute from "./routes/foodRoute.js";
import cartRoute from "./routes/cartRoute.js";
import addressRoute from "./routes/addressRoute.js";
import orderRoute from "./routes/orderRoute.js";
import reviewRoute from "./routes/reviewRoute.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use("/images", express.static("uploads"));

connectDB();

app.use("/api/user", userRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/food", foodRoute);
app.use("/api/cart", cartRoute);
app.use("/api/address", addressRoute);
app.use("/api/order", orderRoute);
app.use("/api/review", reviewRoute);

app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
