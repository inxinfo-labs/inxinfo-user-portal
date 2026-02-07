import { useState, useContext } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { FaEnvelope, FaLock, FaSignInAlt, FaLeaf } from "react-icons/fa";

export default function Login({ embedded = false }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.accessToken) {
        login(res.data.accessToken);
        navigate("/user/home");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || "Invalid credentials. Please try again.";
      setError(typeof errorMessage === "string" ? errorMessage : "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (embedded) {
    return (
      <div className="border-0 shadow-sm p-4 rounded-3">
        <h5 className="mb-4 fw-bold">Sign In</h5>
        {error && <Alert variant="danger" className="mb-3" dismissible onClose={() => setError("")}>{error}</Alert>}
        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" className="w-100" disabled={loading}>{loading ? <Spinner size="sm" /> : "Login"}</Button>
        </Form>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        background: "linear-gradient(160deg, #0f766e 0%, #0d9488 35%, #14b8a6 70%, #2dd4bf 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.03)", transform: "translate(-50%, -50%)" }} />

      <div
        className="w-100 shadow-lg border-0 rounded-4 overflow-hidden"
        style={{
          maxWidth: 480,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.5)",
        }}
      >
        <div className="p-4 p-md-5">
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
              style={{ width: 56, height: 56, background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", color: "white" }}
            >
              <FaLeaf style={{ fontSize: "1.5rem" }} />
            </div>
            <h1 className="h3 fw-bold mb-2" style={{ color: "#0f766e" }}>Welcome back</h1>
            <p className="text-muted small mb-0">Sign in to access Puja services, orders & PanditJi</p>
          </div>

          {error && (
            <Alert variant="danger" className="py-2 mb-3 rounded-3" dismissible onClose={() => setError("")}>
              <small>{error}</small>
            </Alert>
          )}

          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-secondary">
                <FaEnvelope className="me-1" style={{ color: "#0d9488" }} /> Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 rounded-3 py-2"
                style={{ borderColor: "#e2e8f0" }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-semibold text-secondary">
                <FaLock className="me-1" style={{ color: "#0d9488" }} /> Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 rounded-3 py-2"
                style={{ borderColor: "#e2e8f0" }}
              />
              <div className="d-flex justify-content-end mt-1">
                <Link to="#" className="small text-decoration-none" style={{ color: "#0d9488" }}>Forgot password?</Link>
              </div>
            </Form.Group>

            <Button
              type="submit"
              className="w-100 rounded-3 py-2 fw-semibold border-0"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                fontSize: "1rem",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(13, 148, 136, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {loading ? (
                <><Spinner animation="border" size="sm" className="me-2" /> Signing in...</>
              ) : (
                <><FaSignInAlt className="me-2" /> Sign in</>
              )}
            </Button>
          </Form>

          <p className="text-center mt-4 mb-0 small text-muted">
            Don't have an account?{" "}
            <Link to="/auth/register" className="fw-semibold text-decoration-none" style={{ color: "#0d9488" }}>
              Create account
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        .form-control:focus { border-color: #0d9488 !important; box-shadow: 0 0 0 0.2rem rgba(13, 148, 136, 0.2) !important; }
      `}</style>
    </div>
  );
}
