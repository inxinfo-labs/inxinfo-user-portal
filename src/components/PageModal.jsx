import { lazy, Suspense } from "react";
import { usePageModal, PAGE_MODAL_TYPES } from "../context/PageModalContext";
import Loader from "../shared/components/Loader";

const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Blog = lazy(() => import("../pages/Blog"));

const titles = {
  [PAGE_MODAL_TYPES.ABOUT]: "About INXINFO Labs",
  [PAGE_MODAL_TYPES.CONTACT]: "Contact Us",
  [PAGE_MODAL_TYPES.BLOG]: "Blog",
};

export default function PageModal() {
  const { open, page, closePage } = usePageModal();

  if (!open || !page) return null;

  const title = titles[page] || "Page";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(15, 23, 42, 0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1040,
        padding: "1rem",
      }}
      onClick={closePage}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          maxWidth: 900,
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
            onClick={closePage}
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
        <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
          <Suspense fallback={<Loader />}>
            {page === PAGE_MODAL_TYPES.ABOUT && <About />}
            {page === PAGE_MODAL_TYPES.CONTACT && <Contact />}
            {page === PAGE_MODAL_TYPES.BLOG && <Blog />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
