import { useState } from "react";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.accessToken;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("userName", email.split("@")[0]);

      // Navigate to Home page after successful login
      navigate("/user/home");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto mt-5 p-4" style={{ width: "400px" }}>
      <h4 className="text-center mb-4">Login</h4>
      <Form onSubmit={submit}>
        <Form.Control
          className="mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Form.Control
          className="mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-100" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>
      </Form>

      <div className="text-center mt-3">
        <Link to="/auth/register">New user? Register</Link>
      </div>
    </Card>
  );
}
