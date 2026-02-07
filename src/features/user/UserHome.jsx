import { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaUser, FaEdit, FaExternalLinkAlt, FaPrayingHands, FaShoppingCart, FaUserTie } from "react-icons/fa";

const OFFICE_LAT = 12.9716;
const OFFICE_LNG = 77.5946;
const OFFICE_ADDRESS = "Bangalore, Karnataka, India";

export default function UserHome() {
  const { user, avatar } = useContext(AuthContext);
  const [userLocation, setUserLocation] = useState(null);
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
      {/* Welcome Section */}
      <div className="mb-5">
        <h1 className="fw-bold mb-2">Welcome back, {user.name || user.email}!</h1>
        <p className="text-muted mb-0">Manage your services, bookings, and orders from your dashboard</p>
      </div>

      {/* Quick Actions */}
      <Row className="g-4 mb-5">
        <Col md={3} sm={6}>
          <Card className="border-0 shadow-sm h-100 text-center" as={Link} to="/user/puja"
          style={{ 
            borderRadius: "1rem",
            transition: "all 0.3s ease",
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(13, 148, 136, 0.15)";
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
                    background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
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
          <Card className="border-0 shadow-sm h-100 text-center" as={Link} to="/user/order"
          style={{ 
            borderRadius: "1rem",
            transition: "all 0.3s ease",
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(13, 148, 136, 0.15)";
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
          <Card className="border-0 shadow-sm h-100 text-center" as={Link} to="/user/pandit"
          style={{ 
            borderRadius: "1rem",
            transition: "all 0.3s ease",
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(13, 148, 136, 0.15)";
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
          <Card className="border-0 shadow-sm h-100 text-center" as={Link} to="/user/profile"
          style={{ 
            borderRadius: "1rem",
            transition: "all 0.3s ease",
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(13, 148, 136, 0.15)";
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
                  background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                  overflow: "hidden",
                  border: "4px solid rgba(13, 148, 136, 0.2)",
                  boxShadow: "0 4px 12px rgba(13, 148, 136, 0.2)"
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
              <h5 className="fw-bold mb-2">{user.name}</h5>
              <p className="text-muted small mb-3">{user.email}</p>
              <div className="d-grid gap-2">
                <Button 
                  as={Link} 
                  to="/user/profile" 
                  variant="primary" 
                  size="sm" 
                  className="fw-semibold"
                  style={{
                    background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                    border: "none",
                    borderRadius: "0.5rem"
                  }}
                >
                  <FaUser className="me-2" /> View Profile
                </Button>
                <Button 
                  as={Link} 
                  to="/user/profile" 
                  variant="outline-primary" 
                  size="sm"
                  className="fw-semibold"
                  style={{ borderRadius: "0.5rem" }}
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
                    background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
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
