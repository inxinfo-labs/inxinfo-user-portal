import { Routes, Route } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout";
import PrivateLayout from "../components/layout/PrivateLayout";
import AdminRoute from "../shared/guards/AdminRoute";
import LandingPage from "../pages/LandingPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Docs from "../pages/Docs";
import Blog from "../pages/Blog";
import AuthRoutes from "../features/auth/auth.routes";
import UserRoutes from "../features/user/user.routes";
import PujaRoutes from "../features/puja/puja.routes";
import OrderRoutes from "../features/order/order.routes";
import PanditRoutes from "../features/pandit/pandit.routes";
import AdminRoutes from "../features/admin/admin.routes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
      </Route>

      {/* PRIVATE - more specific paths first */}
      <Route element={<PrivateLayout />}>
        <Route path="/user/puja/*" element={<PujaRoutes />} />
        <Route path="/user/order/*" element={<OrderRoutes />} />
        <Route path="/user/pandit/*" element={<PanditRoutes />} />
        {/* Admin: only for role ADMIN */}
        <Route path="/user/admin/*" element={<AdminRoute><AdminRoutes /></AdminRoute>} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/docs" element={<AdminRoute><Docs /></AdminRoute>} />
      </Route>
    </Routes>
  );
}
