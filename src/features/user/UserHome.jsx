import { useContext, useState, useEffect } from "react";
import { Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useUserModal } from "../../context/UserModalContext";
import {
  FaMapMarkerAlt,
  FaUser,
  FaExternalLinkAlt,
  FaPrayingHands,
  FaShoppingCart,
  FaSearch,
  FaCalendarAlt,
  FaEllipsisV,
} from "react-icons/fa";
import { getDisplayNameForDashboard } from "../../utils/displayName";
import { RITUAL_TYPES } from "../../constants";
import RitualDetailModal from "../../components/RitualDetailModal";
import AdSlot from "../../components/AdSlot";

const OFFICE_LAT = 12.9716;
const OFFICE_LNG = 77.5946;
const OFFICE_ADDRESS = "Bangalore, Karnataka, India";

export default function UserHome() {
  const { user, avatar } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { closeUserModal } = useUserModal();
  const [userLocation, setUserLocation] = useState(null);
  const [selectedRitual, setSelectedRitual] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

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
      setLocationError("Geolocation is not supported.");
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
    <div className="user-home-layout">
      {/* Main Content - left sidebar is in global app layout */}
      <main className="user-home-main">
        {location.state?.message && (
          <Alert variant="info" dismissible className="mb-4">
            {location.state.message}
          </Alert>
        )}

        {/* Page Title Row */}
        <div className="d-flex align-items-start justify-content-between mb-4">
          <h1 className="user-home-title fw-bold mb-0">{getDisplayNameForDashboard(user)}</h1>
          <button
            type="button"
            className="btn btn-link p-0 text-secondary"
            aria-label="More options"
          >
            <FaEllipsisV size={20} />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="user-home-tabs mb-4">
          <button
            type="button"
            className={`user-home-tab ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            type="button"
            className={`user-home-tab ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "about" && (
          <div className="user-home-content-card mb-4">
            <h6 className="fw-bold mb-3">About</h6>
            <p className="text-muted small mb-0">
              Manage your services, bookings, and orders from your dashboard. Book puja, order samagri, or find a Pandit Ji—all in one place.
            </p>
            <Button variant="outline-primary" size="sm" className="mt-3" onClick={() => goTo("/user/profile")}>
              View full profile
            </Button>
          </div>
        )}

        {activeTab === "home" && (
        <>
        {/* Content Card - Quick Actions (like Reading list card) */}
        <div className="user-home-content-card mb-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            {avatar ? (
              <img src={avatar} alt="" className="user-home-card-avatar rounded-circle" />
            ) : (
              <div className="user-home-card-avatar rounded-circle d-flex align-items-center justify-content-center bg-primary text-white">
                <FaUser />
              </div>
            )}
            <div>
              <h5 className="fw-bold mb-0">{getDisplayNameForDashboard(user)}</h5>
              <span className="text-muted small">Dashboard</span>
            </div>
          </div>
          <h6 className="fw-bold mb-3">Quick actions</h6>
          <Row className="g-3">
            <Col xs={6} md={4}>
              <div
                className="user-home-action-card"
                role="button"
                tabIndex={0}
                onClick={() => goTo("/user/activity")}
                onKeyDown={(e) => e.key === "Enter" && goTo("/user/activity")}
              >
                <FaCalendarAlt className="mb-2" style={{ color: "var(--accent-emerald)" }} />
                <span className="small fw-semibold">My Activity</span>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div
                className="user-home-action-card"
                role="button"
                tabIndex={0}
                onClick={() => goTo("/user/search")}
                onKeyDown={(e) => e.key === "Enter" && goTo("/user/search")}
              >
                <FaSearch className="mb-2" style={{ color: "var(--accent-purple)" }} />
                <span className="small fw-semibold">Search</span>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div
                className="user-home-action-card"
                role="button"
                tabIndex={0}
                onClick={() => goTo("/user/book")}
                onKeyDown={(e) => e.key === "Enter" && goTo("/user/book")}
              >
                <FaPrayingHands className="mb-2 text-primary" />
                <span className="small fw-semibold">Book</span>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div
                className="user-home-action-card"
                role="button"
                tabIndex={0}
                onClick={() => goTo("/user/order")}
                onKeyDown={(e) => e.key === "Enter" && goTo("/user/order")}
              >
                <FaShoppingCart className="mb-2" style={{ color: "var(--accent-blue)" }} />
                <span className="small fw-semibold">Orders</span>
              </div>
            </Col>
          </Row>
        </div>

        {/* Office Location Card */}
        <div className="user-home-content-card mb-4 overflow-hidden">
          <h6 className="fw-bold mb-3 d-flex align-items-center">
            <FaMapMarkerAlt className="me-2 text-primary" />
            INXINFO Labs – Office
          </h6>
          <div style={{ height: "220px", borderRadius: "8px", overflow: "hidden" }}>
            <iframe
              title="Office"
              src={`https://www.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
            <span className="text-muted small">{OFFICE_ADDRESS}</span>
            <Button variant="link" size="sm" className="p-0 fw-semibold" onClick={() => openInGoogleMaps(OFFICE_LAT, OFFICE_LNG)}>
              <FaExternalLinkAlt className="me-1" /> Open in Maps
            </Button>
          </div>
        </div>

        {/* Rituals Section */}
        <div className="user-home-content-card mb-4">
          <h6 className="fw-bold mb-3">Rituals & Puja We Support</h6>
          <div className="d-flex flex-wrap gap-2">
            {RITUAL_TYPES.slice(0, 6).map((item, idx) => (
              <span
                key={item.value ?? idx}
                role="button"
                tabIndex={0}
                className="user-home-pill"
                onClick={() => setSelectedRitual(item)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedRitual(item)}
              >
                {item.displayName}
              </span>
            ))}
          </div>
        </div>

        <AdSlot size="banner" slotId="user-home-banner" className="mb-4" />

        {userLocation && !locationLoading && (
          <div className="user-home-content-card">
            <h6 className="fw-bold mb-2">Your Location</h6>
            <p className="text-muted small mb-2">{userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>
            <Button variant="outline-primary" size="sm" onClick={() => openInGoogleMaps(userLocation.lat, userLocation.lng)}>
              <FaExternalLinkAlt className="me-1" /> Show on Maps
            </Button>
          </div>
        )}

        <RitualDetailModal show={!!selectedRitual} onHide={() => setSelectedRitual(null)} ritual={selectedRitual} />
        </>
        )}
      </main>

      {/* Right Sidebar - Profile Summary */}
      <aside className="user-home-right">
        <div className="user-home-profile-card">
          <div className="mb-3">
            {avatar ? (
              <img src={avatar} alt="" className="user-home-profile-avatar rounded-circle" />
            ) : (
              <div className="user-home-profile-avatar rounded-circle d-flex align-items-center justify-content-center bg-primary text-white">
                <FaUser size={32} />
              </div>
            )}
          </div>
          <h5 className="fw-bold mb-2">{getDisplayNameForDashboard(user)}</h5>
          <Button
            variant="link"
            className="p-0 fw-semibold text-success text-decoration-none"
            style={{ fontSize: "0.95rem" }}
            onClick={() => goTo("/user/profile/update")}
          >
            Edit profile
          </Button>
        </div>
      </aside>
    </div>
  );
}
