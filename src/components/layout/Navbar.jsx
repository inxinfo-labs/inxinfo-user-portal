import { useContext, useState } from "react";
import { Navbar as BootstrapNavbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useAuthModal, AUTH_MODES } from "../../context/AuthModalContext";
import { useServiceModal, SERVICE_TYPES } from "../../context/ServiceModalContext";
import { getDisplayName } from "../../utils/displayName";
import { isAdmin } from "../../utils/admin";
import { FaUser, FaSignOutAlt, FaHome, FaInfoCircle, FaEnvelope, FaBars, FaTimes, FaSearch, FaUserShield, FaBox, FaPrayingHands, FaShoppingCart, FaUserTie, FaTag } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, user, avatar, logout } = useContext(AuthContext);
  const { openService } = useServiceModal();
  const { openAuth } = useAuthModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const admin = isAdmin(user);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <BootstrapNavbar 
      expand="lg" 
      className="bg-white shadow-sm border-bottom"
      style={{ 
        padding: "0.75rem 0",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      <Container fluid="lg">
        {/* Logo/Brand */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          className="d-flex align-items-center"
          style={{
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1.75rem",
            color: "#0d9488",
            letterSpacing: "-0.5px"
          }}
        >
          <div 
            className="me-2 d-flex align-items-center justify-content-center"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
              color: "white",
              fontWeight: 700,
              fontSize: "1.2rem",
              boxShadow: "0 2px 8px rgba(13, 148, 136, 0.3)"
            }}
          >
            IN
          </div>
          <span style={{ color: "#0d9488" }}>INXINFO</span>
          <span className="ms-1" style={{ fontSize: "0.9rem", fontWeight: 400, color: "#64748b" }}>Labs</span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ border: "none" }}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </BootstrapNavbar.Toggle>

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto ms-4">
            <Nav.Link as={Link} to="/" className="fw-semibold" style={{ color: "#475569" }}>
              <FaHome className="me-1" />
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-semibold" style={{ color: "#475569" }}>
              <FaInfoCircle className="me-1" />
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-semibold" style={{ color: "#475569" }}>
              <FaEnvelope className="me-1" />
              Contact
            </Nav.Link>
            <Dropdown as={Nav.Item} className="d-flex align-items-center">
              <Dropdown.Toggle
                as={Nav.Link}
                className="fw-semibold"
                style={{ color: "#475569" }}
              >
                Services
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="shadow-lg border-0"
                style={{ borderRadius: "12px", marginTop: "0.5rem", minWidth: "200px" }}
              >
                <Dropdown.Item onClick={() => openService(SERVICE_TYPES.PRODUCTS)} className="py-2">
                  <FaBox className="me-2 text-teal" />
                  Products
                </Dropdown.Item>
                <Dropdown.Item onClick={() => openService(SERVICE_TYPES.PUJA)} className="py-2">
                  <FaPrayingHands className="me-2 text-teal" />
                  Puja Services
                </Dropdown.Item>
                <Dropdown.Item onClick={() => openService(SERVICE_TYPES.ORDER)} className="py-2">
                  <FaShoppingCart className="me-2 text-teal" />
                  Orders
                </Dropdown.Item>
                <Dropdown.Item onClick={() => openService(SERVICE_TYPES.PANDIT)} className="py-2">
                  <FaUserTie className="me-2 text-teal" />
                  Book PanditJi
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => openService(SERVICE_TYPES.PUJA_OFFERS)} className="py-2">
                  <FaTag className="me-2 text-teal" />
                  Puja Offers & Promotions
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {admin && (
              <Nav.Link as={Link} to="/user/admin" className="fw-semibold d-flex align-items-center" style={{ color: "#0d9488" }}>
                <FaUserShield className="me-1" />
                Admin
              </Nav.Link>
            )}
          </Nav>

          {/* Auth Section */}
          <Nav className="align-items-center">
            {!token ? (
              <>
                <Button
                  variant="outline-primary"
                  className="me-2 fw-semibold"
                  style={{
                    borderRadius: "8px",
                    borderColor: "#0d9488",
                    color: "#0d9488"
                  }}
                  onClick={() => openAuth(AUTH_MODES.LOGIN)}
                >
                  Login
                </Button>
                <Button
                  variant="outline-secondary"
                  className="me-2 fw-semibold"
                  style={{ borderRadius: "8px" }}
                  onClick={() => openAuth(AUTH_MODES.REGISTER)}
                >
                  Register
                </Button>
                <Button
                  className="fw-semibold"
                  style={{
                    background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                    border: "none",
                    borderRadius: "8px"
                  }}
                  onClick={() => openAuth(AUTH_MODES.REGISTER_PANDIT)}
                >
                  Join as PanditJi
                </Button>
              </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  className="d-flex align-items-center text-decoration-none p-0"
                  style={{ color: "#1e293b" }}
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile"
                      className="rounded-circle"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        border: "2px solid #e2e8f0"
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                        color: "white",
                        fontWeight: 600
                      }}
                    >
                      {getDisplayName(user)?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="ms-2 d-none d-md-inline fw-semibold" style={{ color: "#1e293b", textDecoration: "none" }}>
                    {getDisplayName(user)}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className="shadow-lg border-0"
                  style={{
                    borderRadius: "12px",
                    marginTop: "0.5rem",
                    minWidth: "220px",
                    padding: "0.5rem"
                  }}
                >
                  <Dropdown.Item
                    as={Link}
                    to="/user/home"
                    className="d-flex align-items-center py-2"
                    style={{ borderRadius: "8px" }}
                  >
                    <FaHome className="me-2 text-teal" />
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/user/search"
                    className="d-flex align-items-center py-2"
                    style={{ borderRadius: "8px" }}
                  >
                    <FaSearch className="me-2 text-teal" />
                    Search
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/user/profile"
                    className="d-flex align-items-center py-2"
                    style={{ borderRadius: "8px" }}
                  >
                    <FaUser className="me-2 text-teal" />
                    My Profile
                  </Dropdown.Item>
                  {admin && (
                    <Dropdown.Item
                      as={Link}
                      to="/user/admin"
                      className="d-flex align-items-center py-2"
                      style={{ borderRadius: "8px", color: "#0d9488" }}
                    >
                      <FaUserShield className="me-2" />
                      Admin
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="d-flex align-items-center py-2 text-danger"
                    style={{ borderRadius: "8px" }}
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
