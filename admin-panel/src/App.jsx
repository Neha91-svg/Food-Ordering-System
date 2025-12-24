import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}
