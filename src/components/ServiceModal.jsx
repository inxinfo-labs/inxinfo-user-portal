import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useServiceModal, SERVICE_TYPES } from "../context/ServiceModalContext";
import { useAuthModal, AUTH_MODES } from "../context/AuthModalContext";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const ProductsList = lazy(() => import("../features/products/ProductsList"));
const PujaList = lazy(() => import("../features/puja/PujaList"));
const OrderList = lazy(() => import("../features/order/OrderList"));
const PanditList = lazy(() => import("../features/pandit/PanditList"));
const PujaOffers = lazy(() => import("../features/landing/PujaOffers"));

const titles = {
  [SERVICE_TYPES.PRODUCTS]: "Products",
  [SERVICE_TYPES.PUJA]: "Puja Services",
  [SERVICE_TYPES.ORDER]: "My Orders",
  [SERVICE_TYPES.PANDIT]: "Book PanditJi",
  [SERVICE_TYPES.PUJA_OFFERS]: "Puja Offers & Promotions",
};

function SignInPrompt({ service, onClose, onOpenLogin, onOpenRegister }) {
  const copy = {
    [SERVICE_TYPES.PUJA]: "Sign in to browse and book puja services.",
    [SERVICE_TYPES.ORDER]: "Sign in to view and manage your orders.",
    [SERVICE_TYPES.PANDIT]: "Sign in to find and book experienced pandits.",
  };
  return (
    <div className="text-center py-5 px-4">
      <p className="text-muted mb-4">{copy[service] || "Sign in to continue."}</p>
      <div className="d-flex gap-2 justify-content-center flex-wrap">
        <Button variant="primary" onClick={() => { onClose(); onOpenLogin?.(); }} style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", border: "none", borderRadius: "0.75rem" }}>
          Login
        </Button>
        <Button variant="outline-primary" onClick={() => { onClose(); onOpenRegister?.(); }} style={{ borderRadius: "0.75rem" }}>
          Register
        </Button>
        <Button variant="outline-secondary" onClick={onClose} style={{ borderRadius: "0.75rem" }}>
          Close
        </Button>
      </div>
    </div>
  );
}

function ModalContent({ service, token, closeService, openAuth }) {
  if (service === SERVICE_TYPES.PRODUCTS) {
    return (
      <Suspense
        fallback={
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading...</p>
          </div>
        }
      >
        <ProductsList />
      </Suspense>
    );
  }
  if (service === SERVICE_TYPES.PUJA || service === SERVICE_TYPES.ORDER || service === SERVICE_TYPES.PANDIT) {
    if (!token) {
      return (
        <SignInPrompt
          service={service}
          onClose={closeService}
          onOpenLogin={() => openAuth(AUTH_MODES.LOGIN)}
          onOpenRegister={() => openAuth(AUTH_MODES.REGISTER)}
        />
      );
    }
  }
  if (service === SERVICE_TYPES.PUJA) {
    return (
      <Suspense
        fallback={
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading...</p>
          </div>
        }
      >
        <PujaList />
      </Suspense>
    );
  }
  if (service === SERVICE_TYPES.ORDER) {
    return (
      <Suspense
        fallback={
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading...</p>
          </div>
        }
      >
        <OrderList />
      </Suspense>
    );
  }
  if (service === SERVICE_TYPES.PANDIT) {
    return (
      <Suspense
        fallback={
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading...</p>
          </div>
        }
      >
        <PanditList />
      </Suspense>
    );
  }
  if (service === SERVICE_TYPES.PUJA_OFFERS) {
    return (
      <Suspense
        fallback={
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading...</p>
          </div>
        }
      >
        <PujaOffers embedded />
      </Suspense>
    );
  }
  return null;
}

export default function ServiceModal() {
  const { open, service, closeService } = useServiceModal();
  const { openAuth } = useAuthModal();
  const { token } = useContext(AuthContext);
  const location = useLocation();

  // Close modal when user navigates to booking, order detail, or auth
  useEffect(() => {
    if (!open || !service) return;
    const path = location.pathname;
    const isBooking = path.includes("/book");
    const isAuth = path.startsWith("/auth");
    const isOrderDetail = /^\/user\/order\/[^/]+$/.test(path);
    if (isBooking || isAuth || isOrderDetail) {
      closeService();
    }
  }, [location.pathname, open, service, closeService]);

  if (!open || !service) return null;

  const title = titles[service] || "Service";

  return (
    <div
      className="service-modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
        padding: "1rem",
      }}
      onClick={closeService}
    >
      <div
        className="service-modal-dialog"
        style={{
          background: "white",
          borderRadius: "16px",
          maxWidth: "960px",
          width: "100%",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="d-flex align-items-center justify-content-between border-bottom px-4 py-3"
          style={{ flexShrink: 0 }}
        >
          <h4 className="fw-bold mb-0" style={{ color: "#0d9488" }}>
            {title}
          </h4>
          <button
            type="button"
            aria-label="Close"
            onClick={closeService}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              color: "#64748b",
              cursor: "pointer",
              padding: "0.25rem 0.5rem",
              borderRadius: "8px",
            }}
          >
            ✕
          </button>
        </div>
        <div
          className="overflow-auto px-4 py-3"
          style={{ flex: 1, minHeight: "200px" }}
        >
          <ModalContent service={service} token={token} closeService={closeService} openAuth={openAuth} />
        </div>
      </div>
    </div>
  );
}
