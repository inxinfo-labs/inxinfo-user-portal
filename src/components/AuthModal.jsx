import { useAuthModal, AUTH_MODES } from "../context/AuthModalContext";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import { FaLeaf, FaUserTie, FaUserPlus } from "react-icons/fa";

const config = {
  [AUTH_MODES.LOGIN]: {
    title: "Sign In",
    subtitle: "Welcome back",
    icon: <FaUserPlus size={24} />,
    gradient: "var(--gradient-primary)",
  },
  [AUTH_MODES.REGISTER]: {
    title: "Create Account",
    subtitle: "Join to book Puja, orders & Pandit Ji",
    icon: <FaLeaf size={24} />,
    gradient: "var(--gradient-primary)",
  },
  [AUTH_MODES.REGISTER_PANDIT]: {
    title: "Join as PanditJi",
    subtitle: "Register once; admin will approve you as Pandit",
    icon: <FaUserTie size={24} />,
    gradient: "var(--gradient-puja)",
  },
};

export default function AuthModal() {
  const { open, mode, closeAuth } = useAuthModal();

  if (!open || !mode) return null;

  const { title, subtitle, icon, gradient } = config[mode] || config[AUTH_MODES.LOGIN];
  const isRegister = mode === AUTH_MODES.REGISTER || mode === AUTH_MODES.REGISTER_PANDIT;

  return (
    <div
      className="auth-modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1060,
        padding: "1rem",
      }}
      onClick={closeAuth}
    >
      <div
        className="auth-modal-dialog"
        style={{
          background: "white",
          borderRadius: "20px",
          maxWidth: isRegister ? 640 : 440,
          width: "100%",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient - extra margin below for gap */}
        <div
          style={{
            background: gradient,
            color: "white",
            padding: "1.25rem 1.5rem",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: 0,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </div>
          <div>
            <h4 className="mb-0 fw-bold" style={{ fontSize: "1.25rem" }}>{title}</h4>
            <p className="mb-0 small opacity-90" style={{ fontSize: "0.875rem" }}>{subtitle}</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={closeAuth}
            style={{
              marginLeft: "auto",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              width: 36,
              height: 36,
              borderRadius: "10px",
              color: "white",
              fontSize: "1.25rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Gap between header and body */}
        <div style={{ height: 4, background: "var(--gray-100, #f1f5f9)", flexShrink: 0 }} />

        {/* Scrollable body - prevents overlap */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            minHeight: 0,
            padding: "1.5rem 1.75rem",
            marginTop: 8,
          }}
        >
          {mode === AUTH_MODES.LOGIN && (
            <Login embedded onSuccess={closeAuth} />
          )}
          {(mode === AUTH_MODES.REGISTER || mode === AUTH_MODES.REGISTER_PANDIT) && (
            <Register
              defaultRegisterAs={mode === AUTH_MODES.REGISTER_PANDIT ? "PANDIT" : "CUSTOMER"}
              embedded
              onSuccess={closeAuth}
            />
          )}
        </div>
      </div>
    </div>
  );
}
