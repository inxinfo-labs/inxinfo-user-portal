import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";
import { FaLock, FaSave } from "react-icons/fa";

export default function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    setLoading(true);
    try {
      await api.put("/user/password", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      setSuccess("Password changed successfully. Use your new password next time you sign in.");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Failed to change password. Check that your current password is correct.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
      <Card.Header
        className="border-0 py-3"
        style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}
      >
        <h5 className="mb-0 fw-bold d-flex align-items-center">
          <FaLock className="me-2 text-teal" />
          Change password
        </h5>
        <p className="text-muted small mb-0 mt-1">Update your password while signed in</p>
      </Card.Header>
      <Card.Body className="p-4">
        {success && (
          <Alert variant="success" className="mb-4" dismissible onClose={() => setSuccess("")}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mb-4" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Current password</Form.Label>
            <Form.Control
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              required
              placeholder="Enter current password"
              className="border-2"
              style={{ borderRadius: "10px", padding: "0.75rem" }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">New password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="At least 6 characters"
              className="border-2"
              style={{ borderRadius: "10px", padding: "0.75rem" }}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Confirm new password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter new password"
              className="border-2"
              style={{ borderRadius: "10px", padding: "0.75rem" }}
            />
          </Form.Group>
          <Button
            type="submit"
            disabled={loading}
            className="fw-semibold"
            style={{
              background: "var(--gradient-primary)",
              border: "none",
              borderRadius: "10px",
              padding: "0.75rem 2rem",
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Updating...
              </>
            ) : (
              <>
                <FaSave className="me-2" />
                Update password
              </>
            )}
          </Button>
        </Form>
        <p className="text-muted small mt-3 mb-0">
          Forgot your current password? Use{" "}
          <a href="/auth/forgot-password">Forgot password</a> on the login page to receive a reset link.
        </p>
      </Card.Body>
    </Card>
  );
}
