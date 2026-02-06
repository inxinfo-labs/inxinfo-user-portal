import { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaUser, FaEdit, FaCamera, FaExternalLinkAlt, FaPrayingHands, FaShoppingCart, FaUserTie } from "react-icons/fa";

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
    <div className="user-home theme-teal">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Welcome back, {user.name || user.email}!</h2>
        <p className="text-muted mb-0">Here’s your dashboard and office location.</p>
      </div>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100 card-theme">
            <Card.Body className="text-center p-4">
              <img
                src={avatar}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
              <h5 className="fw-bold mb-2">{user.name}</h5>
              <p className="text-muted small mb-3">{user.email}</p>
              <div className="d-grid gap-2">
                <Button as={Link} to="/user/profile" variant="primary" size="sm" className="rounded-pill">
                  <FaUser className="me-2" /> View Profile
                </Button>
                <Button as={Link} to="/user/profile/update" variant="outline-primary" size="sm" className="rounded-pill">
                  <FaEdit className="me-2" /> Update Profile
                </Button>
                <Button as={Link} to="/user/profile/pic" variant="outline-primary" size="sm" className="rounded-pill">
                  <FaCamera className="me-2" /> Upload Photo
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="border-0 shadow-sm h-100 card-theme overflow-hidden">
            <Card.Body className="p-0">
              <div className="p-3 border-bottom bg-light">
                <h5 className="fw-bold mb-0">
                  <FaMapMarkerAlt className="me-2 text-teal" />
                  INXINFO Labs – Office Location
                </h5>
              </div>
              <div style={{ height: 360 }}>
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
              <div className="p-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
                <span className="text-muted small">{OFFICE_ADDRESS}</span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="rounded-pill"
                  onClick={() => openInGoogleMaps(OFFICE_LAT, OFFICE_LNG)}
                >
                  <FaExternalLinkAlt className="me-1" /> Open in Google Maps
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100 card-theme">
            <Card.Body className="text-center p-4">
              <FaPrayingHands className="text-teal mb-3" style={{ fontSize: "3rem" }} />
              <h5 className="fw-bold mb-2">Puja Services</h5>
              <p className="text-muted small mb-3">Book different types of puja services</p>
              <Button as={Link} to="/user/puja" variant="primary" className="rounded-pill">
                Browse Puja Services
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100 card-theme">
            <Card.Body className="text-center p-4">
              <FaShoppingCart className="text-teal mb-3" style={{ fontSize: "3rem" }} />
              <h5 className="fw-bold mb-2">Orders</h5>
              <p className="text-muted small mb-3">View and manage your orders</p>
              <Button as={Link} to="/user/order" variant="primary" className="rounded-pill">
                View Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100 card-theme">
            <Card.Body className="text-center p-4">
              <FaUserTie className="text-teal mb-3" style={{ fontSize: "3rem" }} />
              <h5 className="fw-bold mb-2">Book Pandit</h5>
              <p className="text-muted small mb-3">Book a pandit ji for your ceremonies</p>
              <Button as={Link} to="/user/pandit" variant="primary" className="rounded-pill">
                Find Pandit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {user && (
        <Card className="border-0 shadow-sm card-theme">
          <Card.Body>
            <h5 className="fw-bold mb-3">
              <FaMapMarkerAlt className="me-2 text-teal" />
              Your current location
            </h5>
            {locationLoading && (
              <p className="text-muted mb-2">
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
                  className="rounded-pill"
                  onClick={() => openInGoogleMaps(userLocation.lat, userLocation.lng)}
                >
                  <FaExternalLinkAlt className="me-1" /> Show my location on Google Maps
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
