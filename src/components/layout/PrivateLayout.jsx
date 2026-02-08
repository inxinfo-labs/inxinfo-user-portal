import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ProtectedRoute from "../../shared/guards/ProtectedRoute";

export default function PrivateLayout() {
  return (
    <ProtectedRoute>
      <Navbar />
      <main className="container-fluid mt-3 mt-md-4 mb-4">
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}
