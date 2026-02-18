import { useState, useContext } from "react";
import { Button, Form, Spinner, Alert, Tab, Tabs } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useAuthModal, AUTH_MODES } from "../../context/AuthModalContext";
import { getApiErrorDetails, formatErrorForDisplay } from "../../utils/apiError";
import { FaEnvelope, FaLock, FaSignInAlt, FaLeaf, FaMobileAlt, FaKey } from "react-icons/fa";
import GoogleLoginBtn from "./GoogleLoginBtn";

export default function Login({ embedded = false, onSuccess }) {
  const { login } = useContext(AuthContext);
  const { openAuth } = useAuthModal();
  const [activeTab, setActiveTab] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otpEmailOrPhone, setOtpEmailOrPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [error, setError] = useState("");
  const [twoFactorStep, setTwoFactorStep] = useState(false);
  const [twoFactorTempToken, setTwoFactorTempToken] = useState("");
  const [twoFactorEmail, setTwoFactorEmail] = useState("");
  const [twoFactorOtp, setTwoFactorOtp] = useState("");
  const navigate = useNavigate();

  const submitPassword = async (e) => {
    e.preventDefault();
    const u = (username || "").trim();
    const p = (password || "").trim();
    if (!u || !p) {
      setError("Email, username or phone and password are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { username: u, password: p });
      if (res.data?.requiresTwoFactor && res.data?.twoFactorTempToken) {
        setTwoFactorStep(true);
        setTwoFactorTempToken(res.data.twoFactorTempToken);
        setTwoFactorEmail(res.data.email || "");
        setTwoFactorOtp("");
      } else if (res.data?.accessToken) {
        const userInfo = {
          role: res.data.role ?? "USER",
          userId: res.data.userId,
          email: res.data.email,
        };
        login(res.data.accessToken, userInfo);
        onSuccess?.();
        navigate("/user/home");
      } else {
        setError("Invalid response from server. Please try again.");
      }
    } catch (err) {
      setError(formatErrorForDisplay(getApiErrorDetails(err)));
    } finally {
      setLoading(false);
    }
  };

  const submitTwoFactor = async (e) => {
    e.preventDefault();
    const code = (twoFactorOtp || "").trim();
    if (!code || !twoFactorTempToken) {
      setError("Enter the verification code sent to your email.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/verify-2fa", { twoFactorTempToken: twoFactorTempToken, otp: code });
      if (res.data?.accessToken) {
        const userInfo = {
          role: res.data.role ?? "USER",
          userId: res.data.userId,
          email: res.data.email,
        };
        login(res.data.accessToken, userInfo);
        onSuccess?.();
        navigate("/user/home");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err) {
      setError(formatErrorForDisplay(getApiErrorDetails(err)));
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    const input = (otpEmailOrPhone || "").trim();
    if (!input) {
      setError("Enter your email or phone number.");
      return;
    }
    setSendOtpLoading(true);
    setError("");
    try {
      await api.post("/auth/send-otp", { emailOrPhone: input });
      setOtpSent(true);
      setOtpCode("");
      setError("");
    } catch (err) {
      setError(formatErrorForDisplay(getApiErrorDetails(err)));
    } finally {
      setSendOtpLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const input = (otpEmailOrPhone || "").trim();
    const code = (otpCode || "").trim();
    if (!input || !code) {
      setError("Email/phone and OTP are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/verify-otp", { emailOrPhone: input, otp: code });
      if (res.data?.accessToken) {
        const userInfo = {
          role: res.data.role ?? "USER",
          userId: res.data.userId,
          email: res.data.email,
        };
        login(res.data.accessToken, userInfo);
        onSuccess?.();
        navigate("/user/home");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err) {
      setError(formatErrorForDisplay(getApiErrorDetails(err)));
    } finally {
      setLoading(false);
    }
  };

  if (embedded) {
    return (
      <div className="border-0 shadow-sm p-4 rounded-3">
        <h5 className="mb-4 fw-bold">Sign In</h5>
        {error && (
          <Alert variant="danger" className="mb-3 py-3" dismissible onClose={() => setError("")}>
            <small className="d-block" style={{ whiteSpace: "pre-line" }}>{error}</small>
            {!twoFactorStep && (
              <Link to="/auth/forgot-password" className="small fw-semibold mt-2 d-inline-block text-decoration-none" style={{ color: "var(--primary-600)" }}>
                Reset password
              </Link>
            )}
          </Alert>
        )}
        {twoFactorStep ? (
          <>
            <p className="small text-muted mb-3">Enter the code sent to <strong>{twoFactorEmail}</strong>.</p>
            <Form onSubmit={submitTwoFactor}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="6-digit code"
                  value={twoFactorOtp}
                  onChange={(e) => setTwoFactorOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  required
                  className="text-center"
                />
              </Form.Group>
              <div className="d-flex gap-2">
                <Button type="button" variant="outline-secondary" size="sm" onClick={() => { setTwoFactorStep(false); setTwoFactorTempToken(""); setError(""); }}>Back</Button>
                <Button type="submit" className="flex-grow-1" disabled={loading || twoFactorOtp.length < 4}>
                  {loading ? <Spinner size="sm" /> : "Verify"}
                </Button>
              </div>
            </Form>
          </>
        ) : (
          <Form onSubmit={submitPassword}>
            <Form.Group className="mb-3">
              <Form.Label>Email, username or phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="you@example.com or +91 98765 43210"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
        )}
        <p className="text-center mt-3 mb-0 small text-muted">
          Don&apos;t have an account?{" "}
          <button type="button" className="btn btn-link p-0 fw-semibold text-decoration-none" style={{ color: "var(--primary-600)" }} onClick={() => openAuth(AUTH_MODES.REGISTER)}>
            Register
          </button>
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        background: "var(--gradient-hero)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        className="w-100 shadow-lg border-0 rounded-4 overflow-hidden"
        style={{
          maxWidth: 460,
          background: "rgba(255, 255, 255, 0.98)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.5)",
        }}
      >
        <div className="p-4 p-md-5">
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
              style={{
                width: 56,
                height: 56,
                background: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)",
                color: "white",
              }}
            >
              <FaLeaf style={{ fontSize: "1.5rem" }} />
            </div>
            <h1 className="h3 fw-bold mb-2" style={{ color: "var(--primary-700)" }}>
              Welcome back
            </h1>
            <p className="text-muted small mb-0">
              Sign in with password or one-time code
            </p>
          </div>

          {error && (
            <Alert
              variant="danger"
              className="py-3 mb-3 rounded-3"
              dismissible
              onClose={() => setError("")}
            >
              <small className="d-block" style={{ whiteSpace: "pre-line" }}>{error}</small>
              {!twoFactorStep && (
                <Link
                  to="/auth/forgot-password"
                  className="small fw-semibold mt-2 d-inline-block text-decoration-none"
                  style={{ color: "var(--primary-600)" }}
                >
                  Reset password
                </Link>
              )}
            </Alert>
          )}

          {twoFactorStep ? (
            <div className="mb-3">
              <p className="small text-muted mb-3">
                Two-factor authentication is enabled. Enter the code sent to <strong>{twoFactorEmail}</strong>.
              </p>
              <Form onSubmit={submitTwoFactor}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">Verification code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={twoFactorOtp}
                    onChange={(e) => setTwoFactorOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                    required
                    className="border-2 rounded-3 py-2 text-center"
                    style={{ borderColor: "#e2e8f0", letterSpacing: "0.5em", fontSize: "1.25rem" }}
                  />
                </Form.Group>
                <div className="d-flex gap-2">
                  <Button
                    type="button"
                    variant="outline-secondary"
                    className="rounded-3"
                    onClick={() => { setTwoFactorStep(false); setTwoFactorTempToken(""); setError(""); }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-grow-1 rounded-3 py-2 fw-semibold border-0"
                    disabled={loading || twoFactorOtp.length < 4}
                    style={{
                      background: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)",
                      fontSize: "1rem",
                    }}
                  >
                    {loading ? <><Spinner animation="border" size="sm" className="me-2" /> Verifying...</> : "Verify and sign in"}
                  </Button>
                </div>
              </Form>
            </div>
          ) : (
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => {
              setActiveTab(k || "password");
              setError("");
              if (k === "otp") setOtpSent(false);
            }}
            className="mb-3 border-0"
          >
            <Tab eventKey="password" title={<span><FaKey className="me-1" /> Password</span>}>
              <Form onSubmit={submitPassword}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaEnvelope className="me-1" style={{ color: "var(--primary-600)" }} /> Email or phone number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Use the email or mobile number you registered with"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border-2 rounded-3 py-2"
                    style={{ borderColor: "#e2e8f0" }}
                  />
                  <Form.Text className="small text-muted">
                    Sign in with the same email or mobile number you used during registration.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaLock className="me-1" style={{ color: "var(--primary-600)" }} /> Password
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
                    <Link to="/auth/forgot-password" className="small text-decoration-none" style={{ color: "var(--primary-600)" }}>
                      Forgot password?
                    </Link>
                  </div>
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 rounded-3 py-2 fw-semibold border-0"
                  disabled={loading}
                  style={{
                    background: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)",
                    fontSize: "1rem",
                  }}
                >
                  {loading ? (
                    <><Spinner animation="border" size="sm" className="me-2" /> Signing in...</>
                  ) : (
                    <><FaSignInAlt className="me-2" /> Sign in</>
                  )}
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="otp" title={<span><FaMobileAlt className="me-1" /> OTP</span>}>
              {!otpSent ? (
                <Form onSubmit={sendOtp}>
                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-semibold text-secondary">
                      <FaEnvelope className="me-1" style={{ color: "var(--primary-600)" }} /> Email address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="you@example.com"
                      value={otpEmailOrPhone}
                      onChange={(e) => setOtpEmailOrPhone(e.target.value)}
                      required
                      className="border-2 rounded-3 py-2"
                      style={{ borderColor: "#e2e8f0" }}
                    />
                    <Form.Text className="small text-muted">
                      We’ll OTP is sent to your email only. To sign in with mobile number, use the Password tab.
                    </Form.Text>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="w-100 rounded-3 py-2 fw-semibold border-0"
                    disabled={sendOtpLoading}
                    style={{
                      background: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)",
                      fontSize: "1rem",
                    }}
                  >
                    {sendOtpLoading ? (
                      <><Spinner animation="border" size="sm" className="me-2" /> Sending...</>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </Form>
              ) : (
                <Form onSubmit={verifyOtp}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-secondary">Code sent to {otpEmailOrPhone}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      maxLength={6}
                      required
                      className="border-2 rounded-3 py-2 text-center"
                      style={{ borderColor: "#e2e8f0", letterSpacing: "0.5em", fontSize: "1.25rem" }}
                    />
                  </Form.Group>
                  <div className="d-flex gap-2 mb-3">
                    <Button
                      type="button"
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-3"
                      onClick={() => setOtpSent(false)}
                    >
                      Change email/phone
                    </Button>
                    <Button
                      type="button"
                      variant="outline-primary"
                      size="sm"
                      className="rounded-3"
                      onClick={sendOtp}
                      disabled={sendOtpLoading}
                    >
                      Resend OTP
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    className="w-100 rounded-3 py-2 fw-semibold border-0"
                    disabled={loading || otpCode.length < 4}
                    style={{
                      background: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)",
                      fontSize: "1rem",
                    }}
                  >
                    {loading ? <><Spinner animation="border" size="sm" className="me-2" /> Verifying...</> : "Verify & sign in"}
                  </Button>
                </Form>
              )}
            </Tab>
          </Tabs>
          )}

          <div className="mt-4 pt-3 border-top" style={{ borderColor: "#e2e8f0 !important" }}>
            <p className="text-center small text-muted mb-2">or sign in with</p>
            <GoogleLoginBtn label="Sign in with Google" variant="outline" />
          </div>

          <p className="text-center mt-4 mb-0 small text-muted">
            Don’t have an account?{" "}
            <Link to="/auth/register" className="fw-semibold text-decoration-none" style={{ color: "var(--primary-600)" }}>
              Create account
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        .nav-tabs .nav-link { border: none; color: #64748b; font-weight: 600; }
        .nav-tabs .nav-link.active { color: var(--primary-700); background: transparent; border-bottom: 2px solid var(--primary-600); }
        .form-control:focus { border-color: var(--primary-600) !important; box-shadow: 0 0 0 0.2rem rgba(234, 88, 12, 0.2) !important; }
      `}</style>
    </div>
  );
}
