import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProtectedRoute from "../../shared/guards/ProtectedRoute";

export default function PrivateLayout() {
  return (
    <ProtectedRoute>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main className="container-fluid mt-3 mt-md-4 mb-4" style={{ flex: 1 }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
