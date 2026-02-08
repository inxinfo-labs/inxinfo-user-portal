import { useAuthModal, AUTH_MODES } from "../context/AuthModalContext";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

const titles = {
  [AUTH_MODES.LOGIN]: "Sign In",
  [AUTH_MODES.REGISTER]: "Create Account",
  [AUTH_MODES.REGISTER_PANDIT]: "Join as PanditJi",
};

export default function AuthModal() {
  const { open, mode, closeAuth } = useAuthModal();

  if (!open || !mode) return null;

  const title = titles[mode] || "Account";

  return (
    <div
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
        zIndex: 1060,
        padding: "1rem",
      }}
      onClick={closeAuth}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          maxWidth: "520px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
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
            onClick={closeAuth}
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
        <div className="p-4">
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
