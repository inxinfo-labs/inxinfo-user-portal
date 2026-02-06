import { useState, useContext } from "react";
import { Card, Button, Form, Spinner, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaVenusMars, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

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
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare registration data
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        dob: formData.dob || null,
        gender: formData.gender || null,
      };

      const res = await api.post("/auth/register", registerData);
      
      // Login with the token
      if (res.data.accessToken) {
        login(res.data.accessToken);
        
        // Update profile with additional fields if provided
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
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "2rem 1rem"
    }}>
      <Row className="w-100" style={{ maxWidth: "1000px" }}>
        <Col lg={12}>
          <Card className="shadow-lg border-0 overflow-hidden" style={{ borderRadius: "20px" }}>
            <Row className="g-0">
              {/* Left Side - Branding */}
              <Col lg={5} className="d-none d-lg-flex align-items-center justify-content-center text-white p-5" 
                style={{ 
                  background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div className="mb-4">
                    <h1 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>INXINFO Labs</h1>
                    <p className="lead mb-2">Innovation Nexus for Information</p>
                    <p className="opacity-90">Connecting innovation with information for next-gen solutions.</p>
                  </div>
                  <div className="mt-5">
                    <h5 className="mb-3">Join our community</h5>
                    <ul className="list-unstyled">
                      <li className="mb-2">✓ Secure & Reliable Platform</li>
                      <li className="mb-2">✓ Professional Services</li>
                      <li className="mb-2">✓ 24/7 Support</li>
                    </ul>
                  </div>
                </div>
                <div style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-50%",
                  width: "200%",
                  height: "200%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  animation: "pulse 4s ease-in-out infinite"
                }}></div>
              </Col>

              {/* Right Side - Registration Form */}
              <Col lg={7} className="p-4 p-lg-5">
                <div className="mb-4">
                  <h2 className="fw-bold mb-2" style={{ color: "#0d9488" }}>Create Your Account</h2>
                  <p className="text-muted">Fill in your details to get started</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4" dismissible onClose={() => setError("")}>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={submit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <FaUser className="me-2 text-teal" />
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="border-2"
                          style={{ borderRadius: "10px", padding: "0.75rem" }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <FaEnvelope className="me-2 text-teal" />
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="border-2"
                          style={{ borderRadius: "10px", padding: "0.75rem" }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <FaLock className="me-2 text-teal" />
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          minLength={6}
                          className="border-2"
                          style={{ borderRadius: "10px", padding: "0.75rem" }}
                        />
                        <Form.Text className="text-muted">Minimum 6 characters</Form.Text>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <FaPhone className="me-2 text-teal" />
                          Mobile Number
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="mobileNumber"
                          placeholder="+1 234 567 8900"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          className="border-2"
                          style={{ borderRadius: "10px", padding: "0.75rem" }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <FaCalendarAlt className="me-2 text-teal" />
                          Date of Birth
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="border-2"
                          style={{ borderRadius: "10px", padding: "0.75rem" }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <FaVenusMars className="me-2 text-teal" />
                          Gender
                        </Form.Label>
                        <Form.Select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="border-2"
                          style={{ borderRadius: "10px", padding: "0.75rem" }}
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <FaMapMarkerAlt className="me-2 text-teal" />
                          Country
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="country"
                          placeholder="United States"
                          value={formData.country}
                          onChange={handleChange}
                          className="border-2"
                          style={{ borderRadius: "10px", padding: "0.75rem" }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <FaMapMarkerAlt className="me-2 text-teal" />
                          Location/City
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="location"
                          placeholder="New York"
                          value={formData.location}
                          onChange={handleChange}
                          className="border-2"
                          style={{ borderRadius: "10px", padding: "0.75rem" }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button 
                    type="submit" 
                    className="w-100 mt-3 fw-semibold" 
                    disabled={loading}
                    style={{
                      background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                      border: "none",
                      borderRadius: "10px",
                      padding: "0.875rem",
                      fontSize: "1.1rem",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 10px 20px rgba(13, 148, 136, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <span className="text-muted">Already have an account?</span>{" "}
                  <Link 
                    to="/auth/login" 
                    className="fw-semibold"
                    style={{ color: "#0d9488", textDecoration: "none" }}
                  >
                    Sign In
                  </Link>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .form-control:focus, .form-select:focus {
          border-color: #0d9488 !important;
          box-shadow: 0 0 0 0.2rem rgba(13, 148, 136, 0.25) !important;
        }
      `}</style>
    </div>
  );
}
