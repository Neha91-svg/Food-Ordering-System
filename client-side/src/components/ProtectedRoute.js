import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../StoreContext";

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(StoreContext);

    if (!token) {
        // Agar user login nahi hai, login page ya home page redirect
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
