import { useState } from "react";
import { Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Register() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false); // ⭐ key state
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUserExists(false);

    try {
      await api.post("/auth/register", form);
      alert("Registration successful. Please login.");
      navigate("/auth/login");
    } catch (err) {
      const res = err.response;

      if (res?.data?.code === 4009) {
        setUserExists(true); // ⭐ show sign-in option
      } else {
        alert("Registration failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto mt-5 p-4" style={{ width: "450px" }}>
      <h4 className="text-center mb-3">Create Account</h4>

      {userExists && (
        <Alert variant="warning">
          This email is already registered.
          <div className="mt-2 text-center">
            <Button
              variant="link"
              className="p-0 fw-semibold"
              onClick={() => navigate("/auth/login")}
            >
              👉 Sign in instead
            </Button>
          </div>
        </Alert>
      )}

      <Form onSubmit={submit}>
        <Form.Control
          className="mb-2"
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <Form.Control
          className="mb-2"
          placeholder="Email"
          type="email"
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        <Form.Control
          className="mb-2"
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />

        <Form.Control
          className="mb-3"
          type="date"
          onChange={e => setForm({ ...form, dob: e.target.value })}
          required
        />

        <Button type="submit" className="w-100" disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Register"}
        </Button>
      </Form>

      <div className="text-center mt-3">
        Already have an account?{" "}
        <Button variant="link" onClick={() => navigate("/auth/login")}>
          Sign In
        </Button>
      </div>
    </Card>
  );
}
