import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCheckCircle, FaUsers, FaLightbulb, FaAward, FaPrayingHands } from "react-icons/fa";
import { RITUAL_TYPES } from "../constants";

const FEATURED_RITUALS = [
  "Satyanarayan Puja",
  "Shradh & Pitru Paksha",
  "Griha Pravesh",
  "Wedding ceremonies",
  "Mundan & naming",
  "Festival pujas (Diwali, Navratri)",
  "Puja samagri & items",
  "Custom rituals",
];

const values = [
  { icon: <FaUsers />, title: "Trust & Tradition", desc: "Authentic Hindu rituals and experienced Pandit Ji for every occasion." },
  { icon: <FaLightbulb />, title: "Easy Booking", desc: "Book puja and Pandit Ji from home, hassle-free, with transparent pricing." },
  { icon: <FaAward />, title: "Quality Samagri", desc: "Genuine puja items and samagri for every ritual, delivered to your door." },
];

export default function About() {
  return (
    <section id="about" className="py-5">
      <Container>
        {/* Header */}
        <div
          className="text-center mb-5 p-4 rounded-3"
          style={{
            background: "linear-gradient(135deg, rgba(255, 153, 51, 0.08) 0%, rgba(234, 88, 12, 0.06) 50%, rgba(184, 28, 28, 0.06) 100%)",
            border: "1px solid rgba(234, 88, 12, 0.15)",
          }}
        >
          <h2 className="fw-bold mb-3" style={{ color: "var(--primary-800)" }}>
            About INXINFO Labs
          </h2>
          <p className="lead mb-0" style={{ maxWidth: "700px", margin: "0 auto", color: "#475569" }}>
            Your trusted platform for Hindu puja, Pandit Ji booking, and puja samagri
          </p>
        </div>

        {/* Our Story + What We Offer */}
        <Row className="align-items-stretch mb-5 g-4">
          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "1rem", overflow: "hidden" }}>
              <div
                className="p-4 p-md-5 h-100"
                style={{
                  background: "linear-gradient(135deg, rgba(234, 88, 12, 0.06) 0%, rgba(255, 255, 255, 1) 50%)",
                  borderLeft: "4px solid var(--primary-500)",
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <span
                    className="d-flex align-items-center justify-content-center me-3 rounded-3"
                    style={{ width: 48, height: 48, background: "var(--gradient-primary)", color: "white" }}
                  >
                    <FaPrayingHands />
                  </span>
                  <h3 className="fw-bold mb-0" style={{ color: "var(--primary-800)" }}>Our Story</h3>
                </div>
                <p className="text-muted mb-3" style={{ lineHeight: 1.8 }}>
                  INXINFO Labs brings traditional Hindu puja and rituals to your doorstep. We connect families
                  with experienced Pandit Ji for every occasion — from festival pujas to Shradh, weddings to griha pravesh.
                </p>
                <p className="text-muted mb-3" style={{ lineHeight: 1.8 }}>
                  We offer puja samagri, idols, and full puja services so you can perform rituals with authenticity
                  and ease. Our platform is built to preserve and simplify Hindu traditions for modern families.
                </p>
                <p className="text-muted mb-0" style={{ lineHeight: 1.8 }}>
                  Whether you need a Pandit Ji at home, puja items, or a complete puja package for your occasion,
                  we are here to support your spiritual and ritual needs.
                </p>
              </div>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "1rem", overflow: "hidden" }}>
              <div className="p-4 p-md-5 h-100" style={{ background: "#fffbf7" }}>
                <h4 className="fw-bold mb-4" style={{ color: "var(--primary-800)" }}>What We Offer</h4>
                <div className="d-flex flex-column gap-3">
                  {[
                    "Puja at home — all rituals",
                    "Book Pandit Ji by location & ritual",
                    "Puja samagri & ritual items",
                    "Festival & occasion pujas",
                    "Shradh, Satyanarayan, griha pravesh",
                    "Wedding & mundan ceremonies",
                    "Transparent pricing & booking",
                    "Dedicated support for your puja needs",
                  ].map((item, idx) => (
                    <div key={idx} className="d-flex align-items-center">
                      <FaCheckCircle className="me-3 flex-shrink-0" style={{ fontSize: "1.1rem", color: "var(--primary-600)" }} />
                      <span style={{ color: "#475569" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Trust & Tradition, Easy Booking, Quality Samagri */}
        <Row className="g-4 mb-5">
          {values.map((value, idx) => (
            <Col md={4} key={idx}>
              <Card
                className="h-100 border-0 text-center p-4"
                style={{
                  borderRadius: "1rem",
                  boxShadow: "0 4px 20px rgba(234, 88, 12, 0.08)",
                  border: "1px solid rgba(234, 88, 12, 0.12)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(234, 88, 12, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(234, 88, 12, 0.08)";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-3"
                  style={{ width: 64, height: 64, background: "var(--gradient-primary)", color: "white", fontSize: "1.75rem" }}
                >
                  {value.icon}
                </div>
                <h5 className="fw-bold mb-2" style={{ color: "var(--primary-800)" }}>{value.title}</h5>
                <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>{value.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Rituals & Puja We Support - full list */}
        <Row>
          <Col xs={12}>
            <div
              className="rounded-3 p-4 p-md-5"
              style={{
                background: "linear-gradient(180deg, #fffbf7 0%, #fff7ed 100%)",
                border: "1px solid rgba(234, 88, 12, 0.15)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div className="text-center mb-4">
                <h4 className="fw-bold mb-2" style={{ color: "var(--primary-800)" }}>
                  Rituals & Puja We Support
                </h4>
                <p className="text-muted mb-0" style={{ maxWidth: "560px", margin: "0 auto" }}>
                  Traditional Hindu puja and ceremonies for every occasion.
                </p>
              </div>
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                {FEATURED_RITUALS.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 rounded-pill"
                    style={{
                      background: "white",
                      color: "var(--primary-800)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      border: "1px solid rgba(234, 88, 12, 0.25)",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-center text-muted small mb-3">Plus our full range of puja services:</p>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {RITUAL_TYPES.map((item, idx) => (
                  <span
                    key={item.value ?? idx}
                    className="px-3 py-2 rounded"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      color: "#475569",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      border: "1px solid rgba(234, 88, 12, 0.15)",
                    }}
                  >
                    {item.displayName}
                  </span>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
