import { useState, useContext } from "react";
import { Button, Form, Spinner, Alert, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaVenusMars, FaMapMarkerAlt, FaPhone, FaLeaf } from "react-icons/fa";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "MALE",
    mobileNumber: "",
    country: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        dob: formData.dob || null,
        gender: formData.gender || null,
      };

      const res = await api.post("/auth/register", registerData);

      if (res.data.accessToken) {
        login(res.data.accessToken);

        if (formData.mobileNumber || formData.country || formData.location) {
          try {
            await api.put("/user/profile", {
              name: formData.name,
              mobileNumber: formData.mobileNumber || "",
              dob: formData.dob || "",
              gender: formData.gender || "MALE",
              country: formData.country || "",
              location: formData.location || "",
            });
          } catch (profileError) {
            console.log("Profile update skipped:", profileError);
          }
        }

        navigate("/user/home");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || "Registration failed. Please try again.";
      setError(typeof errorMessage === "string" ? errorMessage : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        background: "linear-gradient(160deg, #0f766e 0%, #0d9488 35%, #14b8a6 70%, #2dd4bf 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "10%", right: "8%", width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
      <div style={{ position: "absolute", bottom: "20%", left: "5%", width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

      <div
        className="w-100 shadow-lg border-0 rounded-4 overflow-hidden"
        style={{
          maxWidth: 620,
          background: "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.5)",
        }}
      >
        <div className="p-4 p-md-5">
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
              style={{ width: 56, height: 56, background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", color: "white" }}
            >
              <FaLeaf style={{ fontSize: "1.5rem" }} />
            </div>
            <h1 className="h3 fw-bold mb-2" style={{ color: "#0f766e" }}>Create your account</h1>
            <p className="text-muted small mb-0">Join to book Puja services, orders & PanditJi</p>
          </div>

          {error && (
            <Alert variant="danger" className="py-2 mb-3 rounded-3" dismissible onClose={() => setError("")}>
              <small>{error}</small>
            </Alert>
          )}

          <Form onSubmit={submit}>
            <Row className="g-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary"><FaUser className="me-1" style={{ color: "#0d9488" }} /> Full name</Form.Label>
                  <Form.Control type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="border-2 rounded-3 py-2" style={{ borderColor: "#e2e8f0" }} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary"><FaEnvelope className="me-1" style={{ color: "#0d9488" }} /> Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className="border-2 rounded-3 py-2" style={{ borderColor: "#e2e8f0" }} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary"><FaLock className="me-1" style={{ color: "#0d9488" }} /> Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required minLength={6} className="border-2 rounded-3 py-2" style={{ borderColor: "#e2e8f0" }} />
                  <Form.Text className="small text-muted">Min 6 characters</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary"><FaPhone className="me-1" style={{ color: "#0d9488" }} /> Mobile</Form.Label>
                  <Form.Control type="tel" name="mobileNumber" placeholder="+1 234 567 8900" value={formData.mobileNumber} onChange={handleChange} className="border-2 rounded-3 py-2" style={{ borderColor: "#e2e8f0" }} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary"><FaCalendarAlt className="me-1" style={{ color: "#0d9488" }} /> Date of birth</Form.Label>
                  <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} className="border-2 rounded-3 py-2" style={{ borderColor: "#e2e8f0" }} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary"><FaVenusMars className="me-1" style={{ color: "#0d9488" }} /> Gender</Form.Label>
                  <Form.Select name="gender" value={formData.gender} onChange={handleChange} className="border-2 rounded-3 py-2" style={{ borderColor: "#e2e8f0" }}>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary"><FaMapMarkerAlt className="me-1" style={{ color: "#0d9488" }} /> Country</Form.Label>
                  <Form.Control type="text" name="country" placeholder="India" value={formData.country} onChange={handleChange} className="border-2 rounded-3 py-2" style={{ borderColor: "#e2e8f0" }} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary"><FaMapMarkerAlt className="me-1" style={{ color: "#0d9488" }} /> City</Form.Label>
                  <Form.Control type="text" name="location" placeholder="Bangalore" value={formData.location} onChange={handleChange} className="border-2 rounded-3 py-2" style={{ borderColor: "#e2e8f0" }} />
                </Form.Group>
              </Col>
            </Row>

            <Button
              type="submit"
              className="w-100 rounded-3 py-2 mt-2 fw-semibold border-0"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                fontSize: "1rem",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(13, 148, 136, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {loading ? <><Spinner animation="border" size="sm" className="me-2" /> Creating account...</> : "Create account"}
            </Button>
          </Form>

          <p className="text-center mt-4 mb-0 small text-muted">
            Already have an account?{" "}
            <Link to="/auth/login" className="fw-semibold text-decoration-none" style={{ color: "#0d9488" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        .form-control:focus, .form-select:focus { border-color: #0d9488 !important; box-shadow: 0 0 0 0.2rem rgba(13, 148, 136, 0.2) !important; }
      `}</style>
    </div>
  );
}
