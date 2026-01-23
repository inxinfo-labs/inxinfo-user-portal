import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ProtectedRoute from "../../shared/guards/ProtectedRoute";


export default function PrivateLayout() {
  return (
    <ProtectedRoute>
      <Navbar />
      <main className="container mt-4">
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}
