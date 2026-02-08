import { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useUserModal } from "../../context/UserModalContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUser, FaEdit, FaExternalLinkAlt, FaPrayingHands, FaShoppingCart, FaUserTie, FaSearch } from "react-icons/fa";
import { getDisplayNameForDashboard } from "../../utils/displayName";
import { RITUAL_TYPES } from "../../constants";

const OFFICE_LAT = 12.9716;
const OFFICE_LNG = 77.5946;
const OFFICE_ADDRESS = "Bangalore, Karnataka, India";

export default function UserHome() {
  const { user, avatar } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { closeUserModal } = useUserModal();
  const [userLocation, setUserLocation] = useState(null);

  const goTo = (path) => {
    closeUserModal();
    navigate(path);
  };
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLocationLoading(true);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationError(null);
        setLocationLoading(false);
      },
      () => {
        setLocationError("Could not get your location.");
        setLocationLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, [user]);

  const openInGoogleMaps = (lat, lng) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  if (!user) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="user-home">
      {location.state?.message && (
        <Alert variant="info" dismissible className="mb-4">
          {location.state.message}
        </Alert>
      )}
      {/* Welcome Section - attractive block */}
      <div
        className="mb-5 rounded-3 p-4 p-md-5"
        style={{
          background: "linear-gradient(135deg, rgba(255, 153, 51, 0.08) 0%, rgba(234, 88, 12, 0.06) 50%, rgba(184, 28, 28, 0.06) 100%)",
          border: "1px solid rgba(234, 88, 12, 0.15)",
          boxShadow: "0 4px 20px rgba(234, 88, 12, 0.08)",
        }}
      >
        <h1 className="fw-bold mb-2 mb-md-3" style={{ color: "var(--primary-800)", fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
          Welcome back, {getDisplayNameForDashboard(user)}!
        </h1>
        <p className="mb-0 lead" style={{ color: "#475569", fontSize: "1.05rem", maxWidth: "32rem" }}>
          Manage your services, bookings, and orders from your dashboard. Book puja, order samagri, or find a Pandit Ji—all in one place.
        </p>
      </div>

      {/* Quick Actions */}
      <Row className="g-4 mb-5">
        <Col md={3} sm={6}>
          <Card
            className="border-0 shadow-sm h-100 text-center"
            role="button"
            tabIndex={0}
            onClick={() => goTo("/user/search")}
            onKeyDown={(e) => e.key === "Enter" && goTo("/user/search")}
            style={{
              borderRadius: "1rem",
              transition: "all 0.3s ease",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(234, 88, 12, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }}
          >
            <Card.Body className="p-4">
              <div className="mb-3">
                <div
                  className="mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "1rem",
                    background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                    color: "white"
                  }}
                >
                  <FaSearch style={{ fontSize: "2rem" }} />
                </div>
              </div>
              <h5 className="fw-bold mb-2">Search</h5>
              <p className="text-muted small mb-0">Search puja, pandit & more</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card
            className="border-0 shadow-sm h-100 text-center"
            role="button"
            tabIndex={0}
            onClick={() => goTo("/user/puja")}
            onKeyDown={(e) => e.key === "Enter" && goTo("/user/puja")}
            style={{
              borderRadius: "1rem",
              transition: "all 0.3s ease",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(234, 88, 12, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }}
          >
            <Card.Body className="p-4">
              <div className="mb-3">
                <div
                  className="mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "1rem",
                    background: "var(--gradient-primary)",
                    color: "white"
                  }}
                >
                  <FaPrayingHands style={{ fontSize: "2rem" }} />
                </div>
              </div>
              <h5 className="fw-bold mb-2">Puja Services</h5>
              <p className="text-muted small mb-0">Book traditional puja services</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6}>
          <Card
            className="border-0 shadow-sm h-100 text-center"
            role="button"
            tabIndex={0}
            onClick={() => goTo("/user/order")}
            onKeyDown={(e) => e.key === "Enter" && goTo("/user/order")}
            style={{
              borderRadius: "1rem",
              transition: "all 0.3s ease",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(234, 88, 12, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }}
          >
            <Card.Body className="p-4">
              <div className="mb-3">
                <div
                  className="mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "1rem",
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    color: "white"
                  }}
                >
                  <FaShoppingCart style={{ fontSize: "2rem" }} />
                </div>
              </div>
              <h5 className="fw-bold mb-2">Orders</h5>
              <p className="text-muted small mb-0">View and manage orders</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6}>
          <Card
            className="border-0 shadow-sm h-100 text-center"
            role="button"
            tabIndex={0}
            onClick={() => goTo("/user/pandit")}
            onKeyDown={(e) => e.key === "Enter" && goTo("/user/pandit")}
            style={{
              borderRadius: "1rem",
              transition: "all 0.3s ease",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(234, 88, 12, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }}
          >
            <Card.Body className="p-4">
              <div className="mb-3">
                <div
                  className="mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "1rem",
                    background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                    color: "white"
                  }}
                >
                  <FaUserTie style={{ fontSize: "2rem" }} />
                </div>
              </div>
              <h5 className="fw-bold mb-2">PanditJi</h5>
              <p className="text-muted small mb-0">Find and book pandits</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6}>
          <Card
            className="border-0 shadow-sm h-100 text-center"
            role="button"
            tabIndex={0}
            onClick={() => goTo("/user/profile")}
            onKeyDown={(e) => e.key === "Enter" && goTo("/user/profile")}
            style={{
              borderRadius: "1rem",
              transition: "all 0.3s ease",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(234, 88, 12, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }}
          >
            <Card.Body className="p-4">
              <div className="mb-3">
                <div
                  className="mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "1rem",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "white"
                  }}
                >
                  <FaUser style={{ fontSize: "2rem" }} />
                </div>
              </div>
              <h5 className="fw-bold mb-2">My Profile</h5>
              <p className="text-muted small mb-0">Manage your profile</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Profile Card & Office Location */}
      <Row className="g-4 mb-4">
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "1rem" }}>
            <Card.Body className="text-center p-4">
              <div 
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "var(--gradient-primary)",
                  overflow: "hidden",
                  border: "4px solid rgba(234, 88, 12, 0.25)",
                  boxShadow: "0 4px 12px rgba(234, 88, 12, 0.2)"
                }}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <FaUser style={{ fontSize: "3rem", color: "white" }} />
                )}
              </div>
              <h5 className="fw-bold mb-3">{getDisplayNameForDashboard(user)}</h5>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="fw-semibold"
                  style={{
                    background: "var(--gradient-primary)",
                    border: "none",
                    borderRadius: "0.5rem"
                  }}
                  onClick={() => goTo("/user/profile")}
                >
                  <FaUser className="me-2" /> View Profile
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="fw-semibold"
                  style={{ borderRadius: "0.5rem" }}
                  onClick={() => goTo("/user/profile")}
                >
                  <FaEdit className="me-2" /> Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100 overflow-hidden" style={{ borderRadius: "1rem" }}>
            <Card.Header 
              className="border-0 py-3 px-4"
              style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}
            >
              <h5 className="mb-0 fw-bold d-flex align-items-center">
                <FaMapMarkerAlt className="me-2 text-primary" />
                INXINFO Labs – Office Location
              </h5>
            </Card.Header>
            <div style={{ height: "300px" }}>
              <iframe
                title="Office location"
                src={`https://www.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <Card.Footer className="border-0 py-3 px-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
              <span className="text-muted small">{OFFICE_ADDRESS}</span>
              <Button
                variant="outline-primary"
                size="sm"
                className="fw-semibold"
                style={{ borderRadius: "0.5rem" }}
                onClick={() => openInGoogleMaps(OFFICE_LAT, OFFICE_LNG)}
              >
                <FaExternalLinkAlt className="me-1" /> Open in Maps
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Rituals & Puja We Support */}
      <Row className="mb-4">
        <Col xs={12}>
          <div
            className="rounded-3 p-4 p-md-5"
            style={{
              background: "linear-gradient(180deg, #fffbf7 0%, #fff7ed 100%)",
              border: "1px solid rgba(234, 88, 12, 0.15)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div className="text-center mb-4">
              <h4 className="fw-bold mb-2" style={{ color: "var(--primary-800)" }}>
                Rituals & Puja We Support
              </h4>
              <p className="text-muted mb-0" style={{ maxWidth: "540px", margin: "0 auto", fontSize: "0.95rem" }}>
                Traditional Hindu puja and ceremonies for every occasion.
              </p>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {RITUAL_TYPES.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-2 rounded-pill"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    color: "var(--primary-800)",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    border: "1px solid rgba(234, 88, 12, 0.2)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* User Location Card */}
      {user && (
        <Card className="border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
          <Card.Body className="p-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center">
              <FaMapMarkerAlt className="me-2 text-primary" />
              Your Current Location
            </h5>
            {locationLoading && (
              <p className="text-muted mb-2 d-flex align-items-center">
                <Spinner animation="border" size="sm" className="me-2" />
                Getting your location…
              </p>
            )}
            {locationError && (
              <p className="text-muted mb-2">{locationError}</p>
            )}
            {userLocation && !locationLoading && (
              <>
                <p className="text-muted mb-2">
                  Latitude: {userLocation.lat.toFixed(4)}, Longitude: {userLocation.lng.toFixed(4)}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="fw-semibold"
                  style={{
                    background: "var(--gradient-primary)",
                    border: "none",
                    borderRadius: "0.5rem"
                  }}
                  onClick={() => openInGoogleMaps(userLocation.lat, userLocation.lng)}
                >
                  <FaExternalLinkAlt className="me-1" /> Show on Google Maps
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

