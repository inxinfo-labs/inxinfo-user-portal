import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCheckCircle, FaUsers, FaLightbulb, FaAward } from "react-icons/fa";

export default function About() {
  const values = [
    { icon: <FaUsers />, title: "Trust & Tradition", desc: "Authentic Hindu rituals and experienced Pandit Ji" },
    { icon: <FaLightbulb />, title: "Easy Booking", desc: "Book puja and Pandit Ji from home, hassle-free" },
    { icon: <FaAward />, title: "Quality Samagri", desc: "Genuine puja items and samagri for every ritual" },
  ];

  return (
    <section id="about" className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">About INXINFO Labs</h2>
          <p className="lead text-muted" style={{ maxWidth: "700px", margin: "0 auto" }}>
            Your trusted platform for Hindu puja, Pandit Ji booking, and puja samagri
          </p>
        </div>

        <Row className="align-items-center mb-5">
          <Col md={6} className="mb-4 mb-md-0">
            <div 
              className="p-4 rounded"
              style={{
                background: "linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(194, 65, 12, 0.12) 100%)",
                border: "1px solid rgba(234, 88, 12, 0.2)"
              }}
            >
              <h3 className="fw-bold mb-4">Our Story</h3>
              <p className="text-muted mb-3" style={{ lineHeight: 1.8 }}>
                INXINFO Labs brings traditional Hindu puja and rituals to your doorstep. We connect families 
                with experienced Pandit Ji for every occasion — from festival pujas to Shradh, weddings to griha pravesh.
              </p>
              <p className="text-muted mb-3" style={{ lineHeight: 1.8 }}>
                We offer puja samagri, idols, and full puja services so you can perform rituals with authenticity 
                and ease. Our platform is built to preserve and simplify Hindu traditions for modern families.
              </p>
              <p className="text-muted" style={{ lineHeight: 1.8 }}>
                Whether you need a Pandit Ji at home, puja items, or a complete puja package for your occasion, 
                we are here to support your spiritual and ritual needs.
              </p>
            </div>
          </Col>

          <Col md={6}>
            <div className="ps-md-4">
              <h4 className="fw-bold mb-4">What We Offer</h4>
              <div className="d-flex flex-column gap-3">
                {[
                  "Puja at home — all rituals",
                  "Book Pandit Ji by location & ritual",
                  "Puja samagri & ritual items",
                  "Festival & occasion pujas",
                  "Shradh, Satyanarayan, griha pravesh",
                  "Wedding & mundan ceremonies",
                  "Transparent pricing & booking",
                  "Dedicated support for your puja needs"
                ].map((item, idx) => (
                  <div key={idx} className="d-flex align-items-start">
                    <FaCheckCircle className="text-success me-3 mt-1" style={{ fontSize: "1.2rem", flexShrink: 0 }} />
                    <span className="text-muted">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        {/* Core Values */}
        <Row className="g-4 mt-4">
          {values.map((value, idx) => (
            <Col md={4} key={idx}>
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div 
                  className="mb-3"
                  style={{ 
                    fontSize: "2.5rem",
                    color: "var(--teal)"
                  }}
                >
                  {value.icon}
                </div>
                <h5 className="fw-bold mb-2">{value.title}</h5>
                <p className="text-muted small mb-0">{value.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Rituals & Services */}
        <Row className="mt-5 pt-5" style={{ borderTop: "1px solid #e2e8f0" }}>
          <Col md={12}>
            <div className="text-center mb-4">
              <h4 className="fw-bold mb-3">Rituals &amp; Puja We Support</h4>
              <p className="text-muted" style={{ maxWidth: "720px", margin: "0 auto 1.5rem" }}>
                Traditional Hindu puja and ceremonies for every occasion.
              </p>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {[
                "Satyanarayan Puja",
                "Shradh & Pitru Paksha",
                "Griha Pravesh",
                "Wedding ceremonies",
                "Mundan & naming",
                "Festival pujas (Diwali, Navratri)",
                "Puja samagri & items",
                "Custom rituals"
              ].map((item, idx) => (
                <span 
                  key={idx}
                  className="badge px-3 py-2"
                  style={{
                    background: "#f1f5f9",
                    color: "#475569",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    borderRadius: "8px"
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
