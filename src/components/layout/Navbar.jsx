import { useContext, useState } from "react";
import { Navbar as BootstrapNavbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useAuthModal, AUTH_MODES } from "../../context/AuthModalContext";
import { useServiceModal, SERVICE_TYPES } from "../../context/ServiceModalContext";
import { usePageModal, PAGE_MODAL_TYPES } from "../../context/PageModalContext";
import { useUserModal, USER_MODAL_VIEWS } from "../../context/UserModalContext";
import { getDisplayNameForNav } from "../../utils/displayName";
import { isAdmin } from "../../utils/admin";
import { FaUser, FaSignOutAlt, FaHome, FaInfoCircle, FaEnvelope, FaBars, FaTimes, FaSearch, FaUserShield, FaBox, FaPrayingHands, FaShoppingCart, FaUserTie, FaTag } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, user, avatar, logout } = useContext(AuthContext);
  const { openService } = useServiceModal();
  const { openAuth } = useAuthModal();
  const { openPage } = usePageModal();
  const { openUserModal, closeUserModal } = useUserModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const admin = isAdmin(user);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-0 sticky-top" style={{ zIndex: 1000 }}>
      {/* Ritual / festival top band - saffron, white, maroon (sacred Hindu colors) */}
      <div
        className="d-flex"
        style={{
          height: 6,
          background: "linear-gradient(90deg, #ff9933 0%, #ff9933 33.33%, #ffffff 33.33%, #ffffff 66.66%, #b91c1c 66.66%, #b91c1c 100%)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      />
      <BootstrapNavbar
        expand="lg"
        className="bg-white border-0 py-2 py-lg-3"
        style={{
          boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
          borderBottom: "2px solid var(--primary-100)",
          background: "linear-gradient(180deg, #ffffff 0%, #fffbf7 100%)",
        }}
      >
        <Container fluid="lg">
          {/* Logo/Brand - clean block */}
          <BootstrapNavbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center text-decoration-none rounded-3 px-3 py-2"
            style={{
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "var(--primary-700)",
              letterSpacing: "-0.02em",
              background: "var(--primary-50)",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--primary-100)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--primary-50)";
            }}
          >
            <span
              className="d-inline-flex align-items-center justify-content-center me-2"
              style={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                background: "var(--gradient-primary)",
                color: "white",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              IN
            </span>
            <span style={{ color: "var(--primary-700)" }}>INXINFO</span>
            <span className="ms-1 opacity-75" style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b" }}>Labs</span>
          </BootstrapNavbar.Brand>

          <BootstrapNavbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="border-0 rounded-2"
            style={{ padding: "0.5rem 0.75rem" }}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </BootstrapNavbar.Toggle>

          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            {/* Navigation Links - spaced */}
            <Nav className="me-auto ms-lg-4 gap-1">
              <Nav.Link
                as={Link}
                to="/"
                className="fw-semibold rounded-2 px-3 py-2"
                style={{ color: "#475569", fontSize: "0.95rem" }}
              >
                <FaHome className="me-2 opacity-75" />
                Home
              </Nav.Link>
              <Nav.Link
                as="button"
                type="button"
                className="fw-semibold border-0 bg-transparent rounded-2 px-3 py-2"
                style={{ color: "#475569", fontSize: "0.95rem" }}
                onClick={() => openPage(PAGE_MODAL_TYPES.ABOUT)}
              >
                <FaInfoCircle className="me-2 opacity-75" />
                About
              </Nav.Link>
              <Nav.Link
                as="button"
                type="button"
                className="fw-semibold border-0 bg-transparent rounded-2 px-3 py-2"
                style={{ color: "#475569", fontSize: "0.95rem" }}
                onClick={() => openPage(PAGE_MODAL_TYPES.CONTACT)}
              >
                <FaEnvelope className="me-2 opacity-75" />
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
              <Nav.Link as={Link} to="/user/admin" className="fw-semibold d-flex align-items-center" style={{ color: "var(--primary-600)" }}>
                <FaUserShield className="me-1" />
                Admin
              </Nav.Link>
            )}
          </Nav>

          {/* Auth Section - Login | Register | Join as PanditJi (no overlap) */}
          <Nav className="align-items-center">
            {!token ? (
              <div
                className="d-flex align-items-center flex-wrap justify-content-end nav-auth-buttons"
                style={{
                  columnGap: "1rem",
                  rowGap: "0.5rem",
                  minWidth: 0,
                }}
              >
                <Button
                  variant="outline-primary"
                  className="fw-semibold flex-shrink-0"
                  style={{
                    borderRadius: "10px",
                    borderColor: "var(--primary-600)",
                    color: "var(--primary-600)",
                    padding: "0.5rem 0.85rem",
                    fontSize: "0.9rem",
                  }}
                  onClick={() => openAuth(AUTH_MODES.LOGIN)}
                >
                  Login
                </Button>
                <span className="d-none d-sm-inline text-muted flex-shrink-0" style={{ fontSize: "0.75rem" }} aria-hidden>|</span>
                <Button
                  variant="outline-secondary"
                  className="fw-semibold flex-shrink-0"
                  style={{ borderRadius: "10px", padding: "0.5rem 0.85rem", fontSize: "0.9rem" }}
                  onClick={() => openAuth(AUTH_MODES.REGISTER)}
                >
                  Register
                </Button>
                <span className="d-none d-sm-inline text-muted flex-shrink-0" style={{ fontSize: "0.75rem", marginLeft: "0.1rem" }} aria-hidden>|</span>
                <Button
                  className="fw-semibold flex-shrink-0"
                  style={{
                    background: "var(--gradient-primary)",
                    border: "none",
                    borderRadius: "10px",
                    padding: "0.5rem 0.85rem",
                    fontSize: "0.9rem",
                    whiteSpace: "nowrap",
                    marginLeft: "0.15rem",
                  }}
                  onClick={() => openAuth(AUTH_MODES.REGISTER_PANDIT)}
                >
                  Join as PanditJi
                </Button>
              </div>
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
                        background: "var(--gradient-primary)",
                        color: "white",
                        fontWeight: 600
                      }}
                    >
                      {getDisplayNameForNav(user)?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="ms-2 d-none d-md-inline fw-semibold" style={{ color: "#1e293b", textDecoration: "none" }}>
                    {getDisplayNameForNav(user)}
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
                  onClick={() => openUserModal(USER_MODAL_VIEWS.HOME)}
                  className="d-flex align-items-center py-2"
                  style={{ borderRadius: "8px" }}
                >
                  <FaHome className="me-2 text-teal" />
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item
                  className="d-flex align-items-center py-2"
                  style={{ borderRadius: "8px" }}
                  onClick={() => {
                    closeUserModal();
                    navigate("/user/search");
                  }}
                >
                  <FaSearch className="me-2 text-teal" />
                  Search
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => openUserModal(USER_MODAL_VIEWS.PROFILE)}
                  className="d-flex align-items-center py-2"
                  style={{ borderRadius: "8px" }}
                >
                  <FaUser className="me-2 text-teal" />
                  My Profile
                </Dropdown.Item>
                  {admin && (
                    <Dropdown.Item
                      className="d-flex align-items-center py-2"
                      style={{ borderRadius: "8px", color: "var(--primary-600)" }}
                      onClick={() => {
                        closeUserModal();
                        navigate("/user/admin");
                      }}
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
    </header>
  );
}
