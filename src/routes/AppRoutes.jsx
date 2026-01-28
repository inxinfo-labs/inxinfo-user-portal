import { Routes, Route } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout";
import PrivateLayout from "../components/layout/PrivateLayout";
import LandingPage from "../pages/LandingPage";
import AuthRoutes from "../features/auth/auth.routes";
import UserRoutes from "../features/user/user.routes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
      </Route>

      {/* PRIVATE */}
      <Route element={<PrivateLayout />}>
        <Route path="/user/*" element={<UserRoutes />} />
      </Route>
    </Routes>
  );
}
