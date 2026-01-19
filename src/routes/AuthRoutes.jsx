import { Routes, Route } from "react-router-dom";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}
