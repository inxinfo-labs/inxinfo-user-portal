import { useEffect, useState, useContext } from "react";
import { Card, Form, Button, Row, Col, Image, Alert } from "react-bootstrap";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { FaUser, FaPhone, FaCalendarAlt, FaVenusMars, FaMapMarkerAlt, FaGlobe, FaSave } from "react-icons/fa";

const UpdateProfile = () => {
  const { user, avatar } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobileNumber: "",
    dob: "",
    gender: "MALE",
    country: "",
    location: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        mobileNumber: user.mobileNumber || "",
        dob: user.dob ? user.dob.split("T")[0] : "",
        gender: user.gender || "MALE",
        country: user.country || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.put("/user/profile", form);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
      // Refresh user data
      window.location.reload();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || "Failed to update profile";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-teal" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="update-profile">
      <Row className="g-4">
        {/* Profile Picture Preview */}
        <Col lg={12}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
            <Card.Body className="text-center p-4">
              <div 
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                  overflow: "hidden",
                  border: "4px solid rgba(13, 148, 136, 0.2)"
                }}
              >
                {avatar ? (
                  <Image 
                    src={avatar} 
                    roundedCircle 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <FaUser style={{ fontSize: "3rem", color: "white" }} />
                )}
              </div>
              <p className="text-muted small mb-0">Profile Picture</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Update Form */}
        <Col lg={12}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
            <Card.Header 
              className="border-0 py-3"
              style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}
            >
              <h5 className="mb-0 fw-bold d-flex align-items-center">
                <FaUser className="me-2 text-teal" />
                Update Your Profile
              </h5>
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

              <Form onSubmit={submit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaUser className="me-2 text-teal" />
                        Full Name
                      </Form.Label>
                      <Form.Control
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border-2"
                        style={{ borderRadius: "10px", padding: "0.75rem" }}
                        placeholder="Enter your full name"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaPhone className="me-2 text-teal" />
                        Mobile Number
                      </Form.Label>
                      <Form.Control
                        name="mobileNumber"
                        type="tel"
                        value={form.mobileNumber}
                        onChange={handleChange}
                        className="border-2"
                        style={{ borderRadius: "10px", padding: "0.75rem" }}
                        placeholder="+1 234 567 8900"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaCalendarAlt className="me-2 text-teal" />
                        Date of Birth
                      </Form.Label>
                      <Form.Control
                        name="dob"
                        type="date"
                        value={form.dob}
                        onChange={handleChange}
                        className="border-2"
                        style={{ borderRadius: "10px", padding: "0.75rem" }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaVenusMars className="me-2 text-teal" />
                        Gender
                      </Form.Label>
                      <Form.Select
                        name="gender"
                        value={form.gender}
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
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaGlobe className="me-2 text-teal" />
                        Country
                      </Form.Label>
                      <Form.Control
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="border-2"
                        style={{ borderRadius: "10px", padding: "0.75rem" }}
                        placeholder="Enter your country"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaMapMarkerAlt className="me-2 text-teal" />
                        City/Location
                      </Form.Label>
                      <Form.Control
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="border-2"
                        style={{ borderRadius: "10px", padding: "0.75rem" }}
                        placeholder="Enter your city"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex gap-3 mt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="fw-semibold"
                    style={{
                      background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                      border: "none",
                      borderRadius: "10px",
                      padding: "0.75rem 2rem",
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
                        <span className="spinner-border spinner-border-sm me-2" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style>{`
        .form-control:focus, .form-select:focus {
          border-color: #0d9488 !important;
          box-shadow: 0 0 0 0.2rem rgba(13, 148, 136, 0.25) !important;
        }
      `}</style>
    </div>
  );
};

export default UpdateProfile;
