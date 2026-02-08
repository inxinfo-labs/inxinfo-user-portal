import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoute from "../shared/guards/AdminRoute";
import Loader from "../shared/components/Loader";

const PublicLayout = lazy(() => import("../components/layout/PublicLayout"));
const PrivateLayout = lazy(() => import("../components/layout/PrivateLayout"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Docs = lazy(() => import("../pages/Docs"));
const Blog = lazy(() => import("../pages/Blog"));
const AuthRoutes = lazy(() => import("../features/auth/auth.routes"));
const UserRoutes = lazy(() => import("../features/user/user.routes"));
const PujaRoutes = lazy(() => import("../features/puja/puja.routes"));
const OrderRoutes = lazy(() => import("../features/order/order.routes"));
const PanditRoutes = lazy(() => import("../features/pandit/pandit.routes"));
const AdminRoutes = lazy(() => import("../features/admin/admin.routes"));
const ProductsRoutes = lazy(() => import("../features/products/products.routes"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader fullscreen text="Loading..." />}>
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/products/*" element={<ProductsRoutes />} />
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
        {/* SPA: unknown paths redirect to home (no full page reload) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
