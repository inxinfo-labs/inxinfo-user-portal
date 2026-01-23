import { useState } from "react";
import { Card, Button, Form, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function Login({ embedded = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/user/home");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="min-vh-100 align-items-center justify-content-center bg-light">
      <Col md={10} lg={8}>
        <Card className="shadow border-0 overflow-hidden">
          <Row className="g-0">
            {/* LEFT BRAND */}
            {!embedded && (
              <Col
                md={6}
                className="bg-primary text-white p-5 d-flex flex-column justify-content-center"
              >
                <h2 className="fw-bold">INXINFO Labs</h2>
                <p className="mt-3">
                  Innovation Nexus for Information
                </p>
                <p className="opacity-75">
                  Connecting innovation with information for next-gen solutions.
                </p>
              </Col>
            )}

            {/* RIGHT FORM */}
            <Col md={embedded ? 12 : 6} className="p-5">
              <h4 className="mb-4 fw-semibold">Sign in to your account</h4>

              <Form onSubmit={submit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@inxinfo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Login"}
                </Button>
              </Form>

              {!embedded && (
                <div className="text-center mt-3">
                  <span className="text-muted">New here?</span>{" "}
                  <Link to="/auth/register">Create account</Link>
                </div>
              )}
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
