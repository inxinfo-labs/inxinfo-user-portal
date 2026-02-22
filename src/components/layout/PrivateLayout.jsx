import { Outlet } from "react-router-dom";
import ProtectedRoute from "../../shared/guards/ProtectedRoute";
import { PrivateAppLayoutWrapper } from "./PrivateAppLayout";

export default function PrivateLayout() {
  return (
    <ProtectedRoute>
      <PrivateAppLayoutWrapper>
        <div className="container-fluid py-3" style={{ flex: 1 }}>
          <Outlet />
        </div>
      </PrivateAppLayoutWrapper>
    </ProtectedRoute>
  );
}
