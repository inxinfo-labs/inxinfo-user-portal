import { useState } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";
import { getGmailValidationError } from "../../utils/emailValidation";
import { FaEnvelope, FaLeaf } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const emailErr = getGmailValidationError(email);
    if (emailErr) {
      setError(emailErr);
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email: email.trim() });
      setSent(true);
    } catch (err) {
      setError(
        getApiErrorMessage(
          err,
          "Could not send reset link. Check your Gmail address and try again, or contact support."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
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
            <FaEnvelope style={{ fontSize: "1.5rem" }} />
          </div>
          <h3 className="h5 fw-bold mb-2" style={{ color: "#0f766e" }}>
            Check your email
          </h3>
          <p className="text-muted small mb-4">
            If an account exists for <strong>{email}</strong>, we’ve sent a password reset link. Check your inbox and
            spam folder.
          </p>
          <Button
            as={Link}
            to="/auth/login"
            variant="primary"
            className="rounded-3"
            style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", border: "none" }}
          >
            Back to sign in
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
            Forgot password?
          </h1>
          <p className="text-muted small mb-0">
            Enter your Gmail address and we’ll send you a link to reset your password.
          </p>
        </div>

        {error && (
          <Alert variant="danger" className="py-2 mb-3 rounded-3" dismissible onClose={() => setError("")}>
            <small>{error}</small>
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="small fw-semibold text-secondary">
              <FaEnvelope className="me-1" style={{ color: "#0d9488" }} /> Gmail address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="you@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-2 rounded-3 py-2"
              style={{ borderColor: "#e2e8f0" }}
            />
            <Form.Text className="small text-muted">Only Gmail addresses are allowed.</Form.Text>
          </Form.Group>
          <Button
            type="submit"
            className="w-100 rounded-3 py-2 fw-semibold border-0"
            disabled={loading}
            style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", fontSize: "1rem" }}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" /> Sending...
              </>
            ) : (
              "Send reset link"
            )}
          </Button>
        </Form>

        <p className="text-center mt-4 mb-0 small text-muted">
          <Link to="/auth/login" className="fw-semibold text-decoration-none" style={{ color: "#0d9488" }}>
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
