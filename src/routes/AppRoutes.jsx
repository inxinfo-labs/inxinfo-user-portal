import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";
import MainLayout from "../components/layout/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Root */}
      <Route path="/" element={<Navigate to="/auth/login" />} />

      {/* Auth */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* User (Protected + Layout) */}
      <Route
        path="/user/*"
        element={
          <MainLayout>
            <UserRoutes />
          </MainLayout>
        }
      />

    </Routes>
  );
}
