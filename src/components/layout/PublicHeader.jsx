import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, InputGroup, Dropdown, Button, Modal } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useAuthModal, AUTH_MODES } from "../../context/AuthModalContext";
import { useSidebar } from "../../context/SidebarContext";
import { FaSearch, FaMobileAlt, FaShoppingCart, FaBars } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import AppConfig from "../../config/appConfig";

export default function PublicHeader() {
  const navigate = useNavigate();
  const { token, user, avatar } = useContext(AuthContext);
  const { cartCount } = useCart();
  const { openAuth } = useAuthModal();
  const { toggleSidebar } = useSidebar();
  const [searchVal, setSearchVal] = useState("");
  const [showQrModal, setShowQrModal] = useState(false);
  const siteUrl = AppConfig.publicUrl?.trim() || (typeof window !== "undefined" ? window.location.origin : "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal?.trim()) {
      if (token) navigate(`/user/search?q=${encodeURIComponent(searchVal.trim())}`);
      else navigate(`/products?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <header className="public-header border-bottom bg-white sticky-top" style={{ zIndex: 1030, paddingLeft: "env(safe-area-inset-left)", paddingRight: "env(safe-area-inset-right)" }}>
      <div
        className="d-flex"
        style={{
          height: 4,
          background: "linear-gradient(90deg, #ff9933 0%, #ff9933 33.33%, #ffffff 33.33%, #ffffff 66.66%, #b91c1c 66.66%, #b91c1c 100%)",
        }}
      />
      <div className="d-flex flex-wrap align-items-center w-100 px-2 px-sm-3 py-2 gap-2">
        <div className="d-flex align-items-center flex-grow-1 min-w-0" style={{ minWidth: 0 }}>
          <button
            type="button"
            className="btn btn-link text-secondary p-2 d-flex align-items-center justify-content-center me-1"
            onClick={toggleSidebar}
            aria-label="Open menu"
          >
            <FaBars size={20} />
          </button>
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none flex-shrink-0">
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

        <div className="d-flex align-items-center gap-1 flex-shrink-0 flex-wrap">
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" className="text-secondary p-2 text-decoration-none" size="sm">
              <FaMobileAlt size={18} />
              <span className="ms-1 d-none d-lg-inline small">Get app</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow-lg border-0 p-3" style={{ borderRadius: "12px", minWidth: 200 }}>
              <div className="text-center">
                <QRCodeSVG value={siteUrl || "https://inxinfo.com"} size={140} level="M" includeMargin />
                <p className="small text-muted mt-2 mb-0">Scan to open</p>
                <Button variant="outline-primary" size="sm" className="mt-2" onClick={() => setShowQrModal(true)}>
                  View full
                </Button>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          {token ? (
            <>
              <Link to="/user/cart" className="btn btn-link text-secondary p-2 position-relative">
                <FaShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 end-0 badge rounded-pill bg-primary" style={{ fontSize: "0.6rem" }}>
                    {cartCount}
                  </span>
                )}
              </Link>
              <Button variant="primary" size="sm" className="ms-1" onClick={() => navigate("/user/home")}>
                Dashboard
              </Button>
            </>
          ) : (
            <>
              <Link to="/products" className="btn btn-link text-secondary p-2 small d-none d-md-inline-block">
                Products
              </Link>
              <Button variant="outline-primary" size="sm" className="ms-1" onClick={() => openAuth(AUTH_MODES.LOGIN)}>
                Login
              </Button>
              <Button variant="primary" size="sm" className="ms-1" onClick={() => openAuth(AUTH_MODES.REGISTER)}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>

      <Modal show={showQrModal} onHide={() => setShowQrModal(false)} centered>
        <Modal.Body className="text-center p-4">
          <h6 className="fw-bold mb-3">Get INXINFO Labs</h6>
          <QRCodeSVG value={siteUrl || "https://inxinfo.com"} size={220} level="M" includeMargin />
          <p className="small text-muted mt-3 mb-0">Scan with your phone to open</p>
        </Modal.Body>
      </Modal>
    </header>
  );
}
