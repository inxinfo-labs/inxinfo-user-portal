import { useState, useContext } from "react";
import { Card, Button, Form, Spinner, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

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
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (embedded) {
    return (
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <h5 className="mb-4 fw-bold">Sign In</h5>
          {error && (
            <Alert variant="danger" className="mb-3" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "2rem 1rem"
    }}>
      <Row className="w-100" style={{ maxWidth: "1000px" }}>
        <Col lg={12}>
          <Card className="shadow-lg border-0 overflow-hidden" style={{ borderRadius: "20px" }}>
            <Row className="g-0">
              {/* Left Side - Branding */}
              <Col lg={5} className="d-none d-lg-flex align-items-center justify-content-center text-white p-5" 
                style={{ 
                  background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div className="mb-4">
                    <h1 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>INXINFO Labs</h1>
                    <p className="lead mb-2">Innovation Nexus for Information</p>
                    <p className="opacity-90">Connecting innovation with information for next-gen solutions.</p>
                  </div>
                  <div className="mt-5">
                    <h5 className="mb-3">Welcome Back!</h5>
                    <ul className="list-unstyled">
                      <li className="mb-2">✓ Secure Authentication</li>
                      <li className="mb-2">✓ Your Data Protected</li>
                      <li className="mb-2">✓ Fast & Reliable</li>
                    </ul>
                  </div>
                </div>
                <div style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-50%",
                  width: "200%",
                  height: "200%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  animation: "pulse 4s ease-in-out infinite"
                }}></div>
              </Col>

              {/* Right Side - Login Form */}
              <Col lg={7} className="p-4 p-lg-5">
                <div className="mb-4">
                  <h2 className="fw-bold mb-2" style={{ color: "#0d9488" }}>Sign In to Your Account</h2>
                  <p className="text-muted">Enter your credentials to access your account</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4" dismissible onClose={() => setError("")}>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={submit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <FaEnvelope className="me-2 text-teal" />
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-2"
                      style={{ borderRadius: "10px", padding: "0.75rem" }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <FaLock className="me-2 text-teal" />
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-2"
                      style={{ borderRadius: "10px", padding: "0.75rem" }}
                    />
                    <div className="d-flex justify-content-end mt-2">
                      <Link 
                        to="#" 
                        className="text-decoration-none small"
                        style={{ color: "#0d9488" }}
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </Form.Group>

                  <Button 
                    type="submit" 
                    className="w-100 fw-semibold" 
                    disabled={loading}
                    style={{
                      background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                      border: "none",
                      borderRadius: "10px",
                      padding: "0.875rem",
                      fontSize: "1.1rem",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 10px 20px rgba(13, 148, 136, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="me-2" />
                        Sign In
                      </>
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <span className="text-muted">Don't have an account?</span>{" "}
                  <Link 
                    to="/auth/register" 
                    className="fw-semibold"
                    style={{ color: "#0d9488", textDecoration: "none" }}
                  >
                    Create Account
                  </Link>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .form-control:focus {
          border-color: #0d9488 !important;
          box-shadow: 0 0 0 0.2rem rgba(13, 148, 136, 0.25) !important;
        }
      `}</style>
    </div>
  );
}
