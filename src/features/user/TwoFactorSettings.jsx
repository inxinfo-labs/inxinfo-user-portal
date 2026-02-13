import { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { FaShieldAlt, FaCheck } from "react-icons/fa";
import { getApiErrorMessage } from "../../utils/apiError";

export default function TwoFactorSettings() {
  const { user, refreshUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(""); // "enable-sent" | "disable-password"
  const [otp, setOtp] = useState("");
  const [disablePassword, setDisablePassword] = useState("");

  const twoFactorOn = !!user?.twoFactorEnabled;

  const handleSendSetupOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/user/2fa/send-setup-otp");
      setStep("enable-sent");
      setOtp("");
      setSuccess("Verification code sent to your email. Enter it below.");
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to send code."));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmEnable = async (e) => {
    e.preventDefault();
    const code = (otp || "").trim();
    if (!code) {
      setError("Enter the code from your email.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/user/2fa/confirm", { otp: code });
      setStep("");
      setOtp("");
      setSuccess("Two-factor authentication is now enabled.");
      refreshUser?.();
    } catch (err) {
      setError(getApiErrorMessage(err, "Invalid or expired code. Try sending a new code."));
    } finally {
      setLoading(false);
    }
  };

  const handleDisableClick = () => {
    setStep("disable-password");
    setDisablePassword("");
    setError("");
    setSuccess("");
  };

  const handleDisableSubmit = async (e) => {
    e.preventDefault();
    const pwd = disablePassword || "";
    if (!pwd) {
      setError("Enter your password to disable 2FA.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/user/2fa/disable", { password: pwd });
      setStep("");
      setDisablePassword("");
      setSuccess("Two-factor authentication is now disabled.");
      refreshUser?.();
    } catch (err) {
      setError(getApiErrorMessage(err, "Wrong password or request failed."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="two-factor-settings">
      <h6 className="fw-bold mb-3 d-flex align-items-center">
        <FaShieldAlt className="me-2 text-teal" />
        Two-factor authentication
      </h6>
      <p className="text-muted small mb-4">
        When enabled, you will enter a verification code from your email after your password when signing in.
      </p>

      {success && <Alert variant="success" dismissible onClose={() => setSuccess("")}>{success}</Alert>}
      {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}

      {!twoFactorOn && step !== "enable-sent" && (
        <Button
          variant="primary"
          onClick={handleSendSetupOtp}
          disabled={loading}
          style={{ background: "var(--gradient-primary)", border: "none" }}
        >
          {loading ? "Sending..." : "Enable two-factor authentication"}
        </Button>
      )}

      {!twoFactorOn && step === "enable-sent" && (
        <Form onSubmit={handleConfirmEnable}>
          <Form.Group className="mb-3">
            <Form.Label>Verification code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter 6-digit code from email"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
            />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button type="button" variant="outline-secondary" onClick={() => setStep("")}>Cancel</Button>
            <Button type="submit" disabled={loading || otp.length < 4}>
              {loading ? "Verifying..." : "Confirm and enable"}
            </Button>
          </div>
        </Form>
      )}

      {twoFactorOn && step !== "disable-password" && (
        <div className="d-flex align-items-center gap-2">
          <span className="text-success d-flex align-items-center">
            <FaCheck className="me-1" /> On
          </span>
          <Button variant="outline-danger" size="sm" onClick={handleDisableClick}>
            Disable 2FA
          </Button>
        </div>
      )}

      {twoFactorOn && step === "disable-password" && (
        <Form onSubmit={handleDisableSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Enter your password to disable 2FA</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={disablePassword}
              onChange={(e) => setDisablePassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button type="button" variant="outline-secondary" onClick={() => setStep("")}>Cancel</Button>
            <Button type="submit" variant="danger" disabled={loading || !disablePassword}>
              {loading ? "Disabling..." : "Disable two-factor"}
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}
