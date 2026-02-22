import { Container } from "react-bootstrap";
import { useServiceModal, SERVICE_TYPES } from "../../context/ServiceModalContext";

const BANNER_IMAGE = "https://northindianpanditjiallpuja.com/wp-content/uploads/2025/12/shraadh-puja-all-puja.jpg";

export default function PromoBanner() {
  const { openService } = useServiceModal();

  return (
    <section className="py-3 py-md-4" style={{ background: "var(--bg-secondary, #f8fafc)" }}>
      <Container>
        <div
          className="rounded-4 overflow-hidden shadow-sm border-0 d-block text-decoration-none position-relative"
          style={{
            background: "white",
            maxWidth: 900,
            margin: "0 auto",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div className="row g-0 align-items-center">
            <div className="col-md-6">
              <img
                src={BANNER_IMAGE}
                alt="Shradh Puja and all Puja services"
                loading="lazy"
                decoding="async"
                width={600}
                height={255}
                className="img-fluid w-100"
                style={{
                  objectFit: "cover",
                  minHeight: 200,
                }}
              />
            </div>
            <div className="col-md-6 p-4 p-md-5">
              <span
                className="badge mb-2"
                style={{
                  background: "var(--gradient-primary)",
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "0.35rem 0.75rem",
                }}
              >
                Featured
              </span>
              <h3 className="fw-bold mb-2" style={{ color: "var(--primary-800)", fontSize: "1.5rem" }}>
                Shradh Puja &amp; All Puja Services
              </h3>
              <p className="text-muted small mb-4" style={{ lineHeight: 1.6 }}>
                Traditional Shradh puja, festival pujas, and full ritual services at home or at your venue. Book an experienced Pandit Ji.
              </p>
              <button
                type="button"
                className="btn fw-semibold"
                style={{
                  background: "var(--gradient-primary)",
                  border: "none",
                  color: "white",
                  borderRadius: "0.75rem",
                  padding: "0.5rem 1.25rem",
                }}
                onClick={() => openService(SERVICE_TYPES.PUJA)}
              >
                Book Puja Now
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
