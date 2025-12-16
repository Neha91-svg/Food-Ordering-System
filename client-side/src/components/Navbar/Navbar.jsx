import React, { useState, useContext } from 'react';
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from '../../StoreContext';
import { ShoppingCart, User, Package, Search } from "lucide-react";

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    const scrollToSection = (id) => {
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }, 300);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className='navbar'>
            <Link to="/"><img src="/logo.png" alt="Logo" className='logo' /></Link>

            {/* Navbar menu */}
            {!token ? (
                <ul className='navbar-menu'>
                    <li className={menu === "home" ? "active" : ""} onClick={() => { setMenu("home"); navigate("/"); }}>Home</li>
                    <li className={menu === "menu" ? "active" : ""} onClick={() => { setMenu("menu"); scrollToSection("explore-menu"); }}>Menu</li>
                    <li className={menu === "mobile-app" ? "active" : ""} onClick={() => { setMenu("mobile-app"); scrollToSection("app-download"); }}>Get App</li>
                    <li className={menu === "contact-us" ? "active" : ""} onClick={() => { setMenu("contact-us"); scrollToSection("footer"); }}>Contact Us</li>
                </ul>
            ) : (
                <ul className='navbar-menu'>
                    <li onClick={() => navigate("/restaurants")}>Restaurants</li>
                    <li onClick={() => navigate("/food/1")}>Food</li>
                    <li onClick={() => navigate("/review/1")}>Review</li>
                    <li onClick={() => navigate("/address")}>Address</li>
                    <li onClick={() => navigate("/cart")}>Cart</li>
                </ul>
            )}

            <div className='navbar-right'>
                <Search className="w-5 h-5 cursor-pointer hover:text-secondary" />

                <Link to="/cart" className="navbar-search-icon">
                    <ShoppingCart className="w-5 h-5 hover:text-secondary" />
                    <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
                </Link>

                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className='navbar-profile'>
                        <User className="w-5 h-5 cursor-pointer hover:text-secondary" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate("/myorders")}>
                                <Package className="w-4 h-4" />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <User className="w-4 h-4" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
