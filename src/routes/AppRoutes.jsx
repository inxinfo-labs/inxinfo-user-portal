import { Routes, Route } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout";
import PrivateLayout from "../components/layout/PrivateLayout";
import LandingPage from "../pages/LandingPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AuthRoutes from "../features/auth/auth.routes";
import UserRoutes from "../features/user/user.routes";
import PujaRoutes from "../features/puja/puja.routes";
import OrderRoutes from "../features/order/order.routes";
import PanditRoutes from "../features/pandit/pandit.routes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
      </Route>

      {/* PRIVATE */}
      <Route element={<PrivateLayout />}>
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/user/puja/*" element={<PujaRoutes />} />
        <Route path="/user/order/*" element={<OrderRoutes />} />
        <Route path="/user/pandit/*" element={<PanditRoutes />} />
      </Route>
    </Routes>
  );
}
