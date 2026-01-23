import { useState } from "react";
import { Card, Button, Form, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      alert("Registration successful. Please login.");
      navigate("/auth/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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
            <Col
              md={6}
              className="bg-dark text-white p-5 d-flex flex-column justify-content-center"
            >
              <h2 className="fw-bold">Join INXINFO Labs</h2>
              <p className="mt-3">
                Build. Innovate. Scale.
              </p>
              <p className="opacity-75">
                Create your account to access next-gen platforms and tools.
              </p>
            </Col>

            {/* RIGHT FORM */}
            <Col md={6} className="p-5">
              <h4 className="mb-4 fw-semibold">Create Account</h4>

              <Form onSubmit={submit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@inxinfo.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Register"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <span className="text-muted">Already have an account?</span>{" "}
                <Link to="/auth/login">Login</Link>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
