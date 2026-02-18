import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

/**
 * Handles redirect from backend after Google OAuth2: reads token from URL,
 * stores it and redirects to home. Removes token from address bar for security.
 */
export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    const token = searchParams.get("token");
    const email = searchParams.get("email") || "";
    const userId = searchParams.get("userId");
    const role = searchParams.get("role") || "USER";

    if (!token) {
      setError("Sign-in was not completed. Please try again.");
      return;
    }

    done.current = true;
    const userInfo = {
      email: email || undefined,
      userId: userId ? Number(userId) : undefined,
      role: role || "USER",
    };
    login(token, userInfo);

    // Remove token from URL without adding a new history entry
    window.history.replaceState({}, document.title, window.location.pathname);

    navigate("/user/home", { replace: true });
  }, [searchParams, login, navigate]);

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center p-4">
        <div className="text-center">
          <p className="text-danger mb-3">{error}</p>
          <a href="/auth/login" className="btn btn-primary" style={{ borderRadius: "12px" }}>
            Back to Sign in
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4">
      <div className="text-center">
        <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
        <p className="mt-3 mb-0 fw-semibold" style={{ color: "var(--primary-700)" }}>
          Signing you in...
        </p>
        <p className="small text-muted mt-1">You will be redirected in a moment.</p>
      </div>
    </div>
  );
}
