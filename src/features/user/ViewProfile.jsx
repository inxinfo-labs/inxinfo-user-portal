import { Row, Col, Card, Image, ListGroup } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getDisplayName } from "../../utils/displayName";
import { FaUser, FaEnvelope, FaCalendarAlt, FaVenusMars, FaMapMarkerAlt, FaPhone, FaGlobe, FaExternalLinkAlt, FaLink } from "react-icons/fa";

const ViewProfile = () => {
  const { user, avatar } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-teal" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      });
    } catch {
      return dateString;
    }
  };

  const getGenderIcon = (gender) => {
    switch (gender?.toUpperCase()) {
      case "MALE":
        return "♂";
      case "FEMALE":
        return "♀";
      default:
        return "⚧";
    }
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleLocationClick = (location, country) => {
    const query = `${location || ""} ${country || ""}`.trim();
    if (query) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, "_blank");
    }
  };

  const handleWebsiteClick = (website) => {
    let url = website;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="view-profile">
      <Row className="g-4">
        {/* Profile Header Card */}
        <Col lg={12}>
          <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: "16px" }}>
            <div 
              className="p-4 text-white"
              style={{ 
                background: "var(--gradient-primary)"
              }}
            >
              <Row className="align-items-center">
                <Col xs="auto">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "120px",
                      height: "120px",
                      background: "rgba(255, 255, 255, 0.2)",
                      border: "4px solid rgba(255, 255, 255, 0.3)",
                      overflow: "hidden"
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
                </Col>
                <Col>
                  <h2 className="fw-bold mb-2 text-white">
                    {getDisplayName(user)}
                  </h2>
                  <p 
                    className="mb-1 opacity-90 d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEmailClick(user.email)}
                    onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                    onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                  >
                    <FaEnvelope className="me-2" />
                    {user.email}
                    <FaExternalLinkAlt className="ms-2" style={{ fontSize: "0.75rem" }} />
                  </p>
                  {user.mobileNumber && (
                    <p className="mb-0 opacity-90">
                      <FaPhone className="me-2" />
                      {user.mobileNumber}
                    </p>
                  )}
                </Col>
              </Row>
            </div>
          </Card>
        </Col>

        {/* Profile Details Card */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
            <Card.Header 
              className="border-0 py-3"
              style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}
            >
              <h5 className="mb-0 fw-bold d-flex align-items-center">
                <FaUser className="me-2 text-teal" />
                Personal Information
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0 px-0 py-3 d-flex align-items-center">
                  <div className="me-3" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(234, 88, 12, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FaUser className="text-teal" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="text-muted small mb-1">Full Name</div>
                    <div className="fw-semibold">
                      {getDisplayName(user)}
                    </div>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="border-0 px-0 py-3 d-flex align-items-center">
                  <div className="me-3" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(234, 88, 12, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FaEnvelope className="text-teal" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="text-muted small mb-1">Email Address</div>
                    <div 
                      className="fw-semibold d-flex align-items-center"
                      style={{ 
                        color: "var(--primary-600)",
                        cursor: "pointer"
                      }}
                      onClick={() => handleEmailClick(user.email)}
                      onMouseEnter={(e) => {
                        e.target.style.textDecoration = "underline";
                        e.target.style.opacity = "0.8";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.textDecoration = "none";
                        e.target.style.opacity = "1";
                      }}
                    >
                      {user.email}
                      <FaExternalLinkAlt className="ms-2" style={{ fontSize: "0.75rem" }} />
                    </div>
                  </div>
                </ListGroup.Item>

                {user.mobileNumber && (
                  <ListGroup.Item className="border-0 px-0 py-3 d-flex align-items-center">
                    <div className="me-3" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(234, 88, 12, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FaPhone className="text-teal" />
                    </div>
                    <div className="flex-grow-1">
                      <div className="text-muted small mb-1">Mobile Number</div>
                      <div className="fw-semibold">{user.mobileNumber}</div>
                    </div>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className="border-0 px-0 py-3 d-flex align-items-center">
                  <div className="me-3" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(234, 88, 12, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FaCalendarAlt className="text-teal" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="text-muted small mb-1">Date of Birth</div>
                    <div className="fw-semibold">{formatDate(user.dob)}</div>
                  </div>
                </ListGroup.Item>

                {user.gender && (
                  <ListGroup.Item className="border-0 px-0 py-3 d-flex align-items-center">
                    <div className="me-3" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(234, 88, 12, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FaVenusMars className="text-teal" />
                    </div>
                    <div className="flex-grow-1">
                      <div className="text-muted small mb-1">Gender</div>
                      <div className="fw-semibold d-flex align-items-center">
                        <span className="me-2">{getGenderIcon(user.gender)}</span>
                        {user.gender}
                      </div>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Location & Additional Info Card */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
            <Card.Header 
              className="border-0 py-3"
              style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}
            >
              <h5 className="mb-0 fw-bold d-flex align-items-center">
                <FaMapMarkerAlt className="me-2 text-teal" />
                Location & Links
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <ListGroup variant="flush">
                {user.country ? (
                  <ListGroup.Item 
                    className="border-0 px-0 py-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleLocationClick(user.location, user.country)}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(234, 88, 12, 0.08)";
                      e.target.style.borderRadius = "8px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                    }}
                  >
                    <div className="text-muted small mb-1 d-flex align-items-center">
                      <FaGlobe className="me-2" />
                      Country
                    </div>
                    <div className="fw-semibold d-flex align-items-center" style={{ color: "var(--primary-600)" }}>
                      {user.country}
                      <FaExternalLinkAlt className="ms-2" style={{ fontSize: "0.75rem" }} />
                    </div>
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item className="border-0 px-0 py-3 text-muted">
                    <FaGlobe className="me-2" />
                    Country not set
                  </ListGroup.Item>
                )}

                {user.location ? (
                  <ListGroup.Item 
                    className="border-0 px-0 py-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleLocationClick(user.location, user.country)}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(234, 88, 12, 0.08)";
                      e.target.style.borderRadius = "8px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                    }}
                  >
                    <div className="text-muted small mb-1 d-flex align-items-center">
                      <FaMapMarkerAlt className="me-2" />
                      City/Location
                    </div>
                    <div className="fw-semibold d-flex align-items-center" style={{ color: "var(--primary-600)" }}>
                      {user.location}
                      <FaExternalLinkAlt className="ms-2" style={{ fontSize: "0.75rem" }} />
                    </div>
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item className="border-0 px-0 py-3 text-muted">
                    <FaMapMarkerAlt className="me-2" />
                    Location not set
                  </ListGroup.Item>
                )}

                {/* Website Link - if you add website field to user model */}
                {user.website && (
                  <ListGroup.Item 
                    className="border-0 px-0 py-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleWebsiteClick(user.website)}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(234, 88, 12, 0.08)";
                      e.target.style.borderRadius = "8px";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                    }}
                  >
                    <div className="text-muted small mb-1 d-flex align-items-center">
                      <FaLink className="me-2" />
                      Website
                    </div>
                    <div className="fw-semibold d-flex align-items-center" style={{ color: "var(--primary-600)" }}>
                      {user.website}
                      <FaExternalLinkAlt className="ms-2" style={{ fontSize: "0.75rem" }} />
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>

              {(!user.country && !user.location) && (
                <div className="mt-3 p-3 rounded" style={{ background: "rgba(234, 88, 12, 0.08)" }}>
                  <p className="small text-muted mb-0">
                    <FaMapMarkerAlt className="me-2 text-teal" />
                    Update your location to help us serve you better
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ViewProfile;
