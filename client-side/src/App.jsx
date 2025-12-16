import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"; 
import Footer from "./components/Footer";
import StoreContextProvider, { StoreContext } from "./StoreContext";

// Pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";
import Restaurants from "./pages/Restaurants";
import Address from "./pages/Address";
import Review from "./pages/Review";
import Food from "./pages/Food";

// Login popup
import { LoginPopup } from "./components/LoginPopup/LoginPopup";

const AppRoutes = ({ showLogin, setShowLogin }) => {
  const { token } = useContext(StoreContext);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />

        {/* Authenticated Routes */}
        <Route path="/myorders" element={token ? <MyOrders /> : <Navigate to="/" />} />
        <Route path="/restaurants" element={token ? <Restaurants /> : <Navigate to="/" />} />
        <Route path="/address" element={token ? <Address /> : <Navigate to="/" />} />
        <Route path="/review/:id" element={token ? <Review /> : <Navigate to="/" />} />
        <Route path="/food/:restaurantId" element={token ? <Food /> : <Navigate to="/" />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      <StoreContextProvider>
        <div className="app">
          <AppRoutes showLogin={showLogin} setShowLogin={setShowLogin} />
        </div>
        <Footer />
      </StoreContextProvider>
    </BrowserRouter>
  );
};

export default App;
