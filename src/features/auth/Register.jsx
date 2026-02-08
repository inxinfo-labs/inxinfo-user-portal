import { useState, useRef, useContext } from "react";
import { Button, Form, Spinner, Alert, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useAuthModal, AUTH_MODES } from "../../context/AuthModalContext";
import { getApiErrorMessage } from "../../utils/apiError";
import { getGmailValidationError } from "../../utils/emailValidation";
import { Country, State, City } from "country-state-city";
import {
  ApiCodeMessages,
  COUNTRY_PHONE_CODES,
  DEFAULT_COUNTRY_CODE,
} from "../../constants";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaVenusMars,
  FaMapMarkerAlt,
  FaPhone,
  FaLeaf,
  FaCamera,
  FaTimes,
} from "react-icons/fa";

const ACCEPT_IMAGE = "image/jpeg,image/png,image/webp";
const MAX_IMAGE_MB = 2;
const DEFAULT_DIAL = COUNTRY_PHONE_CODES.find((c) => c.code === DEFAULT_COUNTRY_CODE)?.dial || "+91";

export default function Register({ defaultRegisterAs = "CUSTOMER", embedded = false, onSuccess }) {
  const { login, refreshAvatar } = useContext(AuthContext);
  const authModal = useAuthModal();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    registerAs: defaultRegisterAs,
    phoneCode: DEFAULT_DIAL,
    phoneNumber: "",
    dob: "",
    gender: "MALE",
    countryCode: DEFAULT_COUNTRY_CODE,
    stateCode: "",
    city: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "countryCode") {
        next.stateCode = "";
        next.city = "";
      } else if (name === "stateCode") next.city = "";
      return next;
    });
    setError("");
  };

  const countries = Country.getAllCountries();
  const defaultCountryFirst = [...countries].sort((a, b) =>
    a.isoCode === DEFAULT_COUNTRY_CODE ? -1 : b.isoCode === DEFAULT_COUNTRY_CODE ? 1 : a.name.localeCompare(b.name)
  );
  const states = State.getStatesOfCountry(formData.countryCode);
  const cities = formData.stateCode
    ? City.getCitiesOfState(formData.countryCode, formData.stateCode)
    : [];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      setError("Please choose a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setError(`Image must be under ${MAX_IMAGE_MB} MB.`);
      return;
    }
    setProfilePic(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError("");
  };

  const removeProfilePic = () => {
    setProfilePic(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const emailErr = getGmailValidationError(formData.email);
    if (emailErr) {
      setError(emailErr);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);

    try {
      const mobileNumber =
        formData.phoneNumber?.trim() ? `${formData.phoneCode.trim()} ${formData.phoneNumber.trim()}` : null;
      const countryObj = countries.find((c) => c.isoCode === formData.countryCode);
      const stateObj = states.find((s) => s.isoCode === formData.stateCode);
      const countryName = countryObj?.name || null;
      const locationParts = [stateObj?.name, formData.city?.trim()].filter(Boolean);
      const location = locationParts.length ? locationParts.join(", ") : null;
      const registerData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        mobileNumber,
        dob: formData.dob || null,
        gender: formData.gender || null,
        country: countryName || null,
        location,
      };

      const res = await api.post("/auth/register", registerData);

      if (res.data?.accessToken) {
        const userInfo = {
          role: res.data.role ?? (formData.registerAs === "PANDIT" ? "USER" : "USER"),
          userId: res.data.userId,
          email: res.data.email,
        };
        login(res.data.accessToken, userInfo);

        if (profilePic) {
          try {
            const fd = new FormData();
            fd.append("file", profilePic);
            await api.post("/user/profile-pic", fd, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            if (refreshAvatar) await refreshAvatar();
          } catch (picErr) {
            console.warn("Profile pic upload skipped:", picErr);
          }
        }

        onSuccess?.();
        if (formData.registerAs === "PANDIT") {
          navigate("/user/home", { state: { message: "You have applied as Pandit. Admin will approve you shortly." } });
        } else {
          navigate("/user/home");
        }
      } else {
        setError("Registration succeeded but no token received. Please sign in.");
      }
    } catch (err) {
      const code = err.response?.data?.code;
      const msg =
        (code != null && ApiCodeMessages[code]) ||
        getApiErrorMessage(err, "Registration failed. Please try again.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
        <div className="p-4 p-md-5">
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
              style={{
                width: 56,
                height: 56,
                background: "var(--gradient-primary)",
                color: "white",
              }}
            >
              <FaLeaf style={{ fontSize: "1.5rem" }} />
            </div>
            <h1 className="h3 fw-bold mb-2" style={{ color: "var(--primary-700)" }}>
              Create your account
            </h1>
            <p className="text-muted small mb-0">
              Join to book Puja services, orders & Pandit Ji
            </p>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold text-secondary">Register as</Form.Label>
            <Form.Select
              name="registerAs"
              value={formData.registerAs}
              onChange={handleChange}
              className="border-2 rounded-3 py-2"
              style={{ borderColor: "#e2e8f0" }}
            >
              <option value="CUSTOMER">Customer (book puja, order products, book Pandit Ji)</option>
              <option value="PANDIT">Pandit (admin will approve you as Pandit after registration)</option>
            </Form.Select>
            {formData.registerAs === "PANDIT" && (
              <Form.Text className="small text-muted d-block mt-1">
                You will be registered as a user. Admin will approve you as Pandit; you can then accept bookings.
              </Form.Text>
            )}
          </Form.Group>

          {error && (
            <Alert
              variant="danger"
              className="py-2 mb-3 rounded-3"
              dismissible
              onClose={() => setError("")}
            >
              <small>{error}</small>
            </Alert>
          )}

          <Form onSubmit={submit}>
            {/* Optional profile picture */}
            <Form.Group className="mb-4 text-center">
              <Form.Label className="small fw-semibold text-secondary d-block mb-2">
                <FaCamera className="me-1" style={{ color: "var(--primary-600)" }} /> Profile photo (optional)
              </Form.Label>
              <div className="d-flex flex-column align-items-center gap-2">
                <div
                  className="rounded-circle border border-3 overflow-hidden bg-light d-flex align-items-center justify-content-center"
                  style={{
                    width: 100,
                    height: 100,
                    borderColor: "#e2e8f0 !important",
                    cursor: "pointer",
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <FaCamera className="text-muted" style={{ fontSize: "2rem" }} />
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPT_IMAGE}
                  onChange={handleFileChange}
                  className="d-none"
                />
                <div className="d-flex gap-2">
                  <Button
                    type="button"
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-3"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {profilePic ? "Change" : "Upload"}
                  </Button>
                  {profilePic && (
                    <Button
                      type="button"
                      variant="outline-danger"
                      size="sm"
                      className="rounded-3"
                      onClick={removeProfilePic}
                    >
                      <FaTimes /> Remove
                    </Button>
                  )}
                </div>
              </div>
            </Form.Group>

            <Row className="g-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaUser className="me-1" style={{ color: "var(--primary-600)" }} /> First name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="border-2 rounded-3 py-2"
                    style={{ borderColor: "#e2e8f0" }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaUser className="me-1" style={{ color: "var(--primary-600)" }} /> Last name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="border-2 rounded-3 py-2"
                    style={{ borderColor: "#e2e8f0" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaEnvelope className="me-1" style={{ color: "var(--primary-600)" }} /> Email (Gmail only)
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="you@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-2 rounded-3 py-2"
                    style={{ borderColor: "#e2e8f0" }}
                  />
                  <Form.Text className="small text-muted">Only Gmail addresses are allowed for registration.</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaPhone className="me-1" style={{ color: "var(--primary-600)" }} /> Mobile (optional)
                  </Form.Label>
                  <div className="d-flex gap-1">
                    <Form.Select
                      value={formData.phoneCode}
                      onChange={(e) => setFormData((p) => ({ ...p, phoneCode: e.target.value }))}
                      className="border-2 rounded-3 py-2 flex-grow-0"
                      style={{ borderColor: "#e2e8f0", maxWidth: "115px" }}
                      aria-label="Country code"
                    >
                      {COUNTRY_PHONE_CODES.map((c) => (
                        <option key={c.code} value={c.dial}>
                          {c.dial}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control
                      type="tel"
                      placeholder="98765 43210"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData((p) => ({ ...p, phoneNumber: e.target.value }))}
                      className="border-2 rounded-3 py-2"
                      style={{ borderColor: "#e2e8f0" }}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaLock className="me-1" style={{ color: "var(--primary-600)" }} /> Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="border-2 rounded-3 py-2"
                    style={{ borderColor: "#e2e8f0" }}
                  />
                  <Form.Text className="small text-muted">Min 6 characters</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaLock className="me-1" style={{ color: "var(--primary-600)" }} /> Confirm password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="border-2 rounded-3 py-2"
                    style={{ borderColor: "#e2e8f0" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaCalendarAlt className="me-1" style={{ color: "var(--primary-600)" }} /> Date of birth
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]}
                    className="border-2 rounded-3 py-2"
                    style={{ borderColor: "#e2e8f0" }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaVenusMars className="me-1" style={{ color: "var(--primary-600)" }} /> Gender
                  </Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="border-2 rounded-3 py-2"
                    style={{ borderColor: "#e2e8f0" }}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-2">
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaMapMarkerAlt className="me-1" style={{ color: "var(--primary-600)" }} /> Country
                  </Form.Label>
                  <Form.Select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="border-2 rounded-3 py-2"
                    style={{ borderColor: "#e2e8f0" }}
                  >
                    {defaultCountryFirst.map((c) => (
                      <option key={c.isoCode} value={c.isoCode}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaMapMarkerAlt className="me-1" style={{ color: "var(--primary-600)" }} /> State
                  </Form.Label>
                  <Form.Select
                    name="stateCode"
                    value={formData.stateCode}
                    onChange={handleChange}
                    className="border-2 rounded-3 py-2"
                    style={{ borderColor: "#e2e8f0" }}
                  >
                    <option value="">Select state</option>
                    {states.map((s) => (
                      <option key={s.isoCode} value={s.isoCode}>
                        {s.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    <FaMapMarkerAlt className="me-1" style={{ color: "var(--primary-600)" }} /> City
                  </Form.Label>
                  <Form.Select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="border-2 rounded-3 py-2"
                    style={{ borderColor: "#e2e8f0" }}
                  >
                    <option value="">Select city</option>
                    {cities.map((c) => (
                      <option key={c.name + (c.stateCode || "")} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Button
              type="submit"
              className="w-100 rounded-3 py-2 mt-2 fw-semibold border-0"
              disabled={loading}
              style={{
                background: "var(--gradient-primary)",
                fontSize: "1rem",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(234, 88, 12, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" /> Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </Form>

          <p className="text-center mt-4 mb-0 small text-muted">
            Already have an account?{" "}
            {embedded ? (
              <button type="button" className="btn btn-link p-0 fw-semibold text-decoration-none" style={{ color: "var(--primary-600)" }} onClick={() => authModal.openAuth(AUTH_MODES.LOGIN)}>
                Sign in
              </button>
            ) : (
              <Link to="/auth/login" className="fw-semibold text-decoration-none" style={{ color: "var(--primary-600)" }}>
                Sign in
              </Link>
            )}
          </p>
        </div>
  );
  if (embedded) {
    return (
      <div className="p-3 rounded-3 bg-white shadow-sm" style={{ maxWidth: 640 }}>
        {formContent}
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
      <div style={{ position: "absolute", top: "10%", right: "8%", width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
      <div style={{ position: "absolute", bottom: "20%", left: "5%", width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
      <div className="w-100 shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: 640, background: "rgba(255, 255, 255, 0.98)", backdropFilter: "blur(20px)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.5)" }}>
        {formContent}
      </div>
      <style>{`
        .form-control:focus, .form-select:focus { border-color: var(--primary-600) !important; box-shadow: 0 0 0 0.2rem rgba(234, 88, 12, 0.2) !important; }
      `}</style>
    </div>
  );
}
