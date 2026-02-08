import { useEffect, useState, useContext } from "react";
import { Card, Form, Button, Row, Col, Image, Alert } from "react-bootstrap";
import { Country, State, City } from "country-state-city";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { getApiErrorMessage } from "../../utils/apiError";
import { ApiCodeMessages } from "../../constants";
import { COUNTRY_PHONE_CODES, DEFAULT_COUNTRY_CODE } from "../../constants";
import { FaUser, FaPhone, FaCalendarAlt, FaVenusMars, FaMapMarkerAlt, FaGlobe, FaSave } from "react-icons/fa";

const DEFAULT_DIAL = COUNTRY_PHONE_CODES.find((c) => c.code === DEFAULT_COUNTRY_CODE)?.dial || "+91";

const UpdateProfile = () => {
  const { user, avatar } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneCode: DEFAULT_DIAL,
    phoneNumber: "",
    dob: "",
    gender: "MALE",
    countryCode: DEFAULT_COUNTRY_CODE,
    stateCode: "",
    city: "",
  });

  const countries = Country.getAllCountries();
  const defaultCountryFirst = [...countries].sort((a, b) =>
    a.isoCode === DEFAULT_COUNTRY_CODE ? -1 : b.isoCode === DEFAULT_COUNTRY_CODE ? 1 : a.name.localeCompare(b.name)
  );
  const states = State.getStatesOfCountry(form.countryCode);
  const cities = form.stateCode
    ? City.getCitiesOfState(form.countryCode, form.stateCode)
    : [];

  useEffect(() => {
    if (!user) return;
    let phoneCode = DEFAULT_DIAL;
    let phoneNumber = "";
    if (user.mobileNumber && typeof user.mobileNumber === "string") {
      const trimmed = user.mobileNumber.trim();
      const match = trimmed.match(/^(\+\d+)\s*(.*)$/);
      if (match) {
        phoneCode = match[1];
        phoneNumber = (match[2] || "").trim();
      } else {
        phoneNumber = trimmed;
      }
    }
    const countryObj = countries.find(
      (c) => c.name === user.country || c.isoCode === user.country
    );
    const countryCode = countryObj?.isoCode || DEFAULT_COUNTRY_CODE;
    const statesForCountry = State.getStatesOfCountry(countryCode);
    let stateCode = "";
    let city = "";
    if (user.location && typeof user.location === "string") {
      const parts = user.location.split(",").map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        const stateName = parts[0];
        const stateFound = statesForCountry.find(
          (s) => s.name.toLowerCase() === stateName.toLowerCase()
        );
        stateCode = stateFound?.isoCode || "";
        city = parts.slice(1).join(", ");
      } else if (parts.length === 1) {
        city = parts[0];
      }
    }
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phoneCode,
      phoneNumber,
      dob: user.dob ? user.dob.split("T")[0] : "",
      gender: user.gender || "MALE",
      countryCode,
      stateCode,
      city,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps -- sync form from user only; countries from lib is stable
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "countryCode") {
        next.stateCode = "";
        next.city = "";
      } else if (name === "stateCode") next.city = "";
      return next;
    });
    setError("");
    setSuccess("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const countryObj = countries.find((c) => c.isoCode === form.countryCode);
      const countryName = countryObj?.name || "";
      const stateObj = states.find((s) => s.isoCode === form.stateCode);
      const locationParts = [stateObj?.name, form.city?.trim()].filter(Boolean);
      const location = locationParts.length ? locationParts.join(", ") : "";
      const mobileNumber =
        form.phoneNumber?.trim()
          ? `${form.phoneCode.trim()} ${form.phoneNumber.trim()}`
          : "";

      await api.put("/user/profile", {
        firstName: form.firstName,
        lastName: form.lastName,
        dob: form.dob || null,
        gender: form.gender,
        country: countryName,
        location: location || null,
        mobileNumber: mobileNumber || null,
      });
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
      window.location.reload();
    } catch (err) {
      const code = err.response?.data?.code;
      const msg =
        (code != null && ApiCodeMessages[code]) ||
        getApiErrorMessage(err, "Failed to update profile");
      setError(msg);
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
                  background: "var(--gradient-primary)",
                  overflow: "hidden",
                  border: "4px solid rgba(234, 88, 12, 0.25)"
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
                        First Name
                      </Form.Label>
                      <Form.Control
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="border-2"
                        style={{ borderRadius: "10px", padding: "0.75rem" }}
                        placeholder="First name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaUser className="me-2 text-teal" />
                        Last Name
                      </Form.Label>
                      <Form.Control
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="border-2"
                        style={{ borderRadius: "10px", padding: "0.75rem" }}
                        placeholder="Last name"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaPhone className="me-2 text-teal" />
                        Mobile Number
                      </Form.Label>
                      <div className="d-flex gap-2">
                        <Form.Select
                          value={form.phoneCode}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, phoneCode: e.target.value }))
                          }
                          className="border-2"
                          style={{
                            borderRadius: "10px",
                            padding: "0.75rem",
                            maxWidth: "120px",
                          }}
                          aria-label="Country code"
                        >
                          {COUNTRY_PHONE_CODES.map((c) => (
                            <option key={c.code} value={c.dial}>
                              {c.dial}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control
                          name="phoneNumber"
                          type="tel"
                          value={form.phoneNumber}
                          onChange={handleChange}
                          className="border-2 flex-grow-1"
                          style={{ borderRadius: "10px", padding: "0.75rem" }}
                          placeholder="98765 43210"
                        />
                      </div>
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
                  <Col md={4}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaGlobe className="me-2 text-teal" />
                        Country
                      </Form.Label>
                      <Form.Select
                        name="countryCode"
                        value={form.countryCode}
                        onChange={handleChange}
                        className="border-2"
                        style={{ borderRadius: "10px", padding: "0.75rem" }}
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
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaMapMarkerAlt className="me-2 text-teal" />
                        State
                      </Form.Label>
                      <Form.Select
                        name="stateCode"
                        value={form.stateCode}
                        onChange={handleChange}
                        className="border-2"
                        style={{ borderRadius: "10px", padding: "0.75rem" }}
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
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaMapMarkerAlt className="me-2 text-teal" />
                        City
                      </Form.Label>
                      <Form.Select
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="border-2"
                        style={{ borderRadius: "10px", padding: "0.75rem" }}
                      >
                        <option value="">Select city</option>
                        {cities.map((c) => (
                          <option
                            key={c.name + (c.stateCode || "")}
                            value={c.name}
                          >
                            {c.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex gap-3 mt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="fw-semibold"
                    style={{
                      background: "var(--gradient-primary)",
                      border: "none",
                      borderRadius: "10px",
                      padding: "0.75rem 2rem",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 10px 20px rgba(234, 88, 12, 0.25)";
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
          border-color: var(--primary-600) !important;
          box-shadow: 0 0 0 0.2rem rgba(234, 88, 12, 0.25) !important;
        }
      `}</style>
    </div>
  );
};

export default UpdateProfile;
