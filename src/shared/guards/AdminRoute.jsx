import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { isAdmin } from "../../utils/admin";

export default function AdminRoute({ children }) {
  const { token, user } = useContext(AuthContext);

  if (!token) return <Navigate to="/auth/login" replace />;
  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  if (!isAdmin(user)) return <Navigate to="/user/home" replace />;

  return children;
}
