import React, { useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../StoreContext";
import { ShoppingCart, User, Package } from "lucide-react";

const Navbar = ({ setShowLogin }) => {
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
        <div className="navbar">
            <Link to="/">
                <img src="/logo.png" alt="Logo" className="logo" />
            </Link>

            {/* NAV MENU */}
            {!token ? (
                <ul className="navbar-menu">
                    <li onClick={() => navigate("/")}>Home</li>
                    <li onClick={() => scrollToSection("explore-menu")}>Menu</li>
                    <li onClick={() => scrollToSection("app-download")}>Get App</li>
                    <li onClick={() => scrollToSection("footer")}>Contact Us</li>
                </ul>
            ) : (
                <ul className="navbar-menu">
                    <li onClick={() => navigate("/restaurants")}>Restaurants</li>
                    <li onClick={() => navigate("/restaurants")}>Food</li>
                    <li onClick={() => navigate("/review/1")}>Review</li>
                    <li onClick={() => navigate("/cart")}>Cart</li>
                </ul>
            )}

            {/* RIGHT SIDE */}
            <div className="navbar-right">


                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className="navbar-profile">
                        <User className="w-5 h-5 cursor-pointer hover:text-secondary" />
                        <ul className="nav-profile-dropdown">


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
