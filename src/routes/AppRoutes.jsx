import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PublicLayout from "../components/layout/PublicLayout";
import PrivateLayout from "../components/layout/PrivateLayout";
import Loader from "../shared/components/Loader";

const Landing = lazy(() => import("../features/landing/Landing"));
const AuthRoutes = lazy(() => import("../features/auth/auth.routes"));
const UserRoutes = lazy(() => import("../features/user/user.routes"));



export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/user/*" element={<UserRoutes />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
