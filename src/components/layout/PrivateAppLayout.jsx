import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, InputGroup, Dropdown, Button, Modal } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useSidebar } from "../../context/SidebarContext";
import { getDisplayNameForNav } from "../../utils/displayName";
import { isAdmin } from "../../utils/admin";
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaSearch,
  FaCog,
  FaQuestionCircle,
  FaBars,
  FaBell,
  FaShoppingCart,
  FaBox,
  FaPrayingHands,
  FaUserTie,
  FaUserShield,
  FaBookmark,
  FaFileAlt,
  FaChartBar,
  FaQrcode,
  FaMobileAlt,
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import AppConfig from "../../config/appConfig";
import Footer from "./Footer";

const SIDEBAR_NAV = [
  { path: "/user/home", icon: FaHome, label: "Home" },
  { path: "/user/activity", icon: FaBookmark, label: "Activity" },
  { path: "/user/profile", icon: FaUser, label: "Profile" },
  { path: "/user/search", icon: FaSearch, label: "Search" },
  { path: "/user/book", icon: FaFileAlt, label: "Book" },
  { path: "/user/order", icon: FaChartBar, label: "Orders" },
  { path: "/user/cart", icon: FaShoppingCart, label: "Cart" },
  { path: "/user/puja", icon: FaPrayingHands, label: "Puja" },
  { path: "/user/pandit", icon: FaUserTie, label: "Pandit" },
  { path: "/user/products", icon: FaBox, label: "Products" },
];

function AppHeader() {
  const navigate = useNavigate();
  const { user, avatar, logout } = useContext(AuthContext);
  const { cartCount } = useCart();
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const [searchVal, setSearchVal] = useState("");
  const [showQrModal, setShowQrModal] = useState(false);

  const siteUrl = AppConfig.publicUrl?.trim() || (typeof window !== "undefined" ? window.location.origin : "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal?.trim()) navigate(`/user/search?q=${encodeURIComponent(searchVal.trim())}`);
  };

  const handleLogout = () => {
    logout?.();
    navigate("/");
  };

  const admin = isAdmin(user);

  return (
    <header className="app-header border-bottom bg-white sticky-top" style={{ zIndex: 1030 }}>
      <div
        className="d-flex"
        style={{
          height: 6,
          background: "linear-gradient(90deg, #ff9933 0%, #ff9933 33.33%, #ffffff 33.33%, #ffffff 66.66%, #b91c1c 66.66%, #b91c1c 100%)",
        }}
      />
      <div className="d-flex flex-wrap align-items-center w-100 px-2 px-sm-3 py-2 gap-1 gap-sm-2">
        {/* Close sidebar | Logo | Search */}
        <div className="d-flex align-items-center flex-grow-1 gap-2 min-w-0" style={{ minWidth: 0 }}>
          <button
            type="button"
            className="btn btn-link text-secondary p-2 d-flex align-items-center justify-content-center"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <FaBars size={20} />
          </button>

          <Link to="/user/home" className="d-flex align-items-center gap-2 text-decoration-none flex-shrink-0">
            <span
              className="d-flex align-items-center justify-content-center rounded-2"
              style={{
                width: 36,
                height: 36,
                background: "var(--gradient-primary)",
                color: "white",
                fontWeight: 700,
                fontSize: "0.85rem",
              }}
            >
              IN
            </span>
            <span className="fw-bold text-dark d-none d-sm-inline" style={{ fontSize: "1.1rem" }}>
              INXINFO
            </span>
            <span className="text-muted small d-none d-md-inline" style={{ fontWeight: 600 }}>
              Labs
            </span>
          </Link>

          <Form className="flex-grow-1 mx-2 mx-md-3" style={{ maxWidth: 360, minWidth: 0 }} onSubmit={handleSearch}>
            <InputGroup size="sm" className="rounded-pill bg-light">
              <InputGroup.Text className="border-0 bg-transparent ps-3">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search"
                className="border-0 bg-transparent py-2"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
            </InputGroup>
          </Form>
        </div>

        {/* Get App | Notification | Profile */}
        <div className="d-flex align-items-center gap-1 gap-md-2 flex-shrink-0">
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" className="text-secondary p-2 text-decoration-none" size="sm">
              <FaMobileAlt size={18} />
              <span className="ms-1 d-none d-lg-inline small">Get app</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow-lg border-0 p-3" style={{ borderRadius: "12px", minWidth: 200 }}>
              <div className="text-center">
                <FaQrcode className="mb-2 text-muted" />
                <QRCodeSVG value={siteUrl} size={140} level="M" includeMargin />
                <p className="small text-muted mt-2 mb-0">Scan to open</p>
                <Button variant="outline-primary" size="sm" className="mt-2" onClick={() => setShowQrModal(true)}>
                  View full
                </Button>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <button type="button" className="btn btn-link text-secondary p-2 position-relative" aria-label="Notifications">
            <FaBell size={18} />
          </button>

          <Link to="/user/cart" className="btn btn-link text-secondary p-2 position-relative">
            <FaShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="position-absolute top-0 end-0 badge rounded-pill bg-primary" style={{ fontSize: "0.6rem" }}>
                {cartCount}
              </span>
            )}
          </Link>

          <Dropdown align="end">
            <Dropdown.Toggle variant="link" className="d-flex align-items-center text-decoration-none p-0 ms-1">
              {avatar ? (
                <img src={avatar} alt="" className="rounded-circle" style={{ width: 36, height: 36, objectFit: "cover" }} />
              ) : (
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--gradient-primary)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  {getDisplayNameForNav(user)?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="shadow-lg border-0"
              style={{ borderRadius: "12px", marginTop: "0.5rem", minWidth: 200, padding: "0.5rem" }}
            >
              <Dropdown.Item as={Link} to="/user/profile" className="d-flex align-items-center py-2">
                <FaUser className="me-2" />
                View Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/user/profile/update" className="d-flex align-items-center py-2">
                <FaCog className="me-2" />
                Settings
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/contact" className="d-flex align-items-center py-2">
                <FaQuestionCircle className="me-2" />
                Help
              </Dropdown.Item>
              {admin && (
                <Dropdown.Item as={Link} to="/user/admin" className="d-flex align-items-center py-2 text-primary">
                  Admin
                </Dropdown.Item>
              )}
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="d-flex align-items-center py-2 text-danger">
                <FaSignOutAlt className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Modal show={showQrModal} onHide={() => setShowQrModal(false)} centered>
        <Modal.Body className="text-center p-4">
          <h6 className="fw-bold mb-3">Get INXINFO Labs</h6>
          <QRCodeSVG value={siteUrl} size={220} level="M" includeMargin />
          <p className="small text-muted mt-3 mb-0">Scan with your phone to open</p>
        </Modal.Body>
      </Modal>
    </header>
  );
}

function AppSidebar() {
  const location = useLocation();
  const { sidebarOpen } = useSidebar();
  const { user } = useContext(AuthContext);
  const admin = isAdmin(user);

  if (!sidebarOpen) return null;

  return (
    <aside className="app-sidebar">
      <nav className="app-sidebar-nav">
        {SIDEBAR_NAV.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path === "/user/home" && (location.pathname === "/user" || location.pathname === "/user/home")) ||
            (item.path !== "/user/home" && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`app-sidebar-item ${isActive ? "active" : ""}`}
            >
              <Icon className="app-sidebar-icon" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        {admin && (
          <Link to="/user/admin" className={`app-sidebar-item ${location.pathname.startsWith("/user/admin") ? "active" : ""}`}>
            <FaUserShield className="app-sidebar-icon" />
            <span>Admin</span>
          </Link>
        )}
      </nav>
    </aside>
  );
}

export default function PrivateAppLayout({ children }) {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="app-layout">
      <AppHeader />
      <div className="app-body">
        <AppSidebar />
        {sidebarOpen && (
          <div
            className="app-sidebar-overlay d-md-none"
            role="button"
            tabIndex={0}
            aria-label="Close menu"
            onClick={toggleSidebar}
            onKeyDown={(e) => e.key === "Enter" && toggleSidebar()}
          />
        )}
        <main className={`app-main ${!sidebarOpen ? "sidebar-closed" : ""}`}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export function PrivateAppLayoutWrapper({ children }) {
  return <PrivateAppLayout>{children}</PrivateAppLayout>;
}
