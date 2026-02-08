import { useState, useEffect } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";
import { FaLock, FaLeaf } from "react-icons/fa";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) setError("Invalid or missing reset link. Request a new one from the Forgot password page.");
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", { token, newPassword: password });
      setSuccess(true);
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Reset failed. The link may have expired. Please request a new reset link.")
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center p-3"
        style={{
          background: "linear-gradient(160deg, #0f766e 0%, #0d9488 35%, #14b8a6 70%, #2dd4bf 100%)",
        }}
      >
        <div
          className="w-100 shadow-lg border-0 rounded-4 overflow-hidden p-4 p-md-5 text-center"
          style={{ maxWidth: 440, background: "rgba(255, 255, 255, 0.95)" }}
        >
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
            style={{
              width: 56,
              height: 56,
              background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
              color: "white",
            }}
          >
            <FaLock style={{ fontSize: "1.5rem" }} />
          </div>
          <h3 className="h5 fw-bold mb-2" style={{ color: "#0f766e" }}>
            Password updated
          </h3>
          <p className="text-muted small mb-4">You can now sign in with your new password.</p>
          <Button
            as={Link}
            to="/auth/login"
            variant="primary"
            className="rounded-3"
            style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", border: "none" }}
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        background: "linear-gradient(160deg, #0f766e 0%, #0d9488 35%, #14b8a6 70%, #2dd4bf 100%)",
      }}
    >
      <div
        className="w-100 shadow-lg border-0 rounded-4 overflow-hidden p-4 p-md-5"
        style={{ maxWidth: 440, background: "rgba(255, 255, 255, 0.95)" }}
      >
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
            style={{
              width: 56,
              height: 56,
              background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
              color: "white",
            }}
          >
            <FaLeaf style={{ fontSize: "1.5rem" }} />
          </div>
          <h1 className="h4 fw-bold mb-2" style={{ color: "#0f766e" }}>
            Set new password
          </h1>
          <p className="text-muted small mb-0">Enter your new password below.</p>
        </div>

        {error && (
          <Alert variant="danger" className="py-2 mb-3 rounded-3" dismissible onClose={() => setError("")}>
            <small>{error}</small>
          </Alert>
        )}

        {!token ? (
          <p className="text-center">
            <Link to="/auth/forgot-password" className="fw-semibold" style={{ color: "#0d9488" }}>
              Request a new reset link
            </Link>
          </p>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-secondary">
                <FaLock className="me-1" style={{ color: "#0d9488" }} /> New password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="border-2 rounded-3 py-2"
                style={{ borderColor: "#e2e8f0" }}
              />
              <Form.Text className="small text-muted">At least 6 characters.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="small fw-semibold text-secondary">Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="border-2 rounded-3 py-2"
                style={{ borderColor: "#e2e8f0" }}
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-100 rounded-3 py-2 fw-semibold border-0"
              disabled={loading}
              style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", fontSize: "1rem" }}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" /> Updating...
                </>
              ) : (
                "Update password"
              )}
            </Button>
          </Form>
        )}

        <p className="text-center mt-4 mb-0 small text-muted">
          <Link to="/auth/login" className="fw-semibold text-decoration-none" style={{ color: "#0d9488" }}>
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
