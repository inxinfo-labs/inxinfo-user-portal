import { useState, useContext } from "react";
import { Card, Button, Form, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/register", { name, email, password });
      login(res.data.accessToken); // ✅ log in immediately
      navigate("/user/home");
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="min-vh-100 align-items-center justify-content-center bg-light">
      <Col md={10} lg={8}>
        <Card className="shadow border-0 overflow-hidden">
          <Row className="g-0">
            <Col md={6} className="bg-primary text-white p-5 d-flex flex-column justify-content-center">
              <h2 className="fw-bold">INXINFO Labs</h2>
              <p className="mt-3">Innovation Nexus for Information</p>
            </Col>

            <Col md={6} className="p-5">
              <h4 className="mb-4 fw-semibold">Create your account</h4>
              <Form onSubmit={submit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="w-100" disabled={loading}>
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
