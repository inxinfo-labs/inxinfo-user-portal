import { lazy, Suspense, useContext } from "react";
import { useUserModal, USER_MODAL_VIEWS } from "../context/UserModalContext";
import { AuthContext } from "../context/AuthContext";
import { getDisplayName } from "../utils/displayName";
import Loader from "../shared/components/Loader";

const UserHome = lazy(() => import("../features/user/UserHome"));
const Profile = lazy(() => import("../features/user/Profile"));

export default function UserModal() {
  const { open, view, closeUserModal } = useUserModal();
  const { user } = useContext(AuthContext);

  if (!open) return null;

  const title =
    view === USER_MODAL_VIEWS.PROFILE && user
      ? getDisplayName(user)
      : view === USER_MODAL_VIEWS.HOME
        ? "Dashboard"
        : "Account";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(15, 23, 42, 0.5)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
        padding: "1rem",
      }}
      onClick={closeUserModal}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          maxWidth: 720,
          width: "100%",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom"
          style={{
            background: "var(--gradient-primary)",
            color: "white",
            flexShrink: 0,
          }}
        >
          <h4 className="mb-0 fw-bold">{title}</h4>
          <button
            type="button"
            aria-label="Close"
            onClick={closeUserModal}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              width: 36,
              height: 36,
              borderRadius: "10px",
              color: "white",
              fontSize: "1.25rem",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto", minHeight: 0, padding: "1rem" }}>
          <Suspense fallback={<Loader />}>
            {view === USER_MODAL_VIEWS.HOME && <UserHome />}
            {view === USER_MODAL_VIEWS.PROFILE && <Profile />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
