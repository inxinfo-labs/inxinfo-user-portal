import { Button, Container, Row, Col } from "react-bootstrap";
import { FaArrowRight, FaPrayingHands } from "react-icons/fa";

export default function CTA({ onOpenModal }) {
  return (
    <section 
      className="cta text-center py-5 text-white"
      style={{
        background: "var(--gradient-hero)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)",
          opacity: 0.8
        }}
      />
      
      <Container style={{ position: "relative", zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="mb-4">
              <FaPrayingHands style={{ fontSize: "3rem", opacity: 0.9 }} />
            </div>
            <h2 className="fw-bold mb-3" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
              Book Your Puja &amp; Pandit Ji Today
            </h2>
            <p className="lead mb-4" style={{ opacity: 0.95, fontSize: "1.25rem" }}>
              From festival pujas to Shradh, griha pravesh to weddings — traditional Hindu rituals 
              at your doorstep with experienced Pandit Ji and puja samagri.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Button
                size="lg"
                variant="light"
                onClick={onOpenModal}
                className="px-5 py-3 fw-semibold"
                style={{ borderRadius: "12px" }}
              >
                Get Started <FaArrowRight className="ms-2" />
              </Button>
              <Button
                size="lg"
                variant="outline-light"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 fw-semibold"
                style={{ borderRadius: "12px", borderWidth: "2px" }}
              >
                Contact Us
              </Button>
            </div>
            
            <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
              <p className="small mb-0" style={{ opacity: 0.9 }}>
                Trusted by 50+ enterprises • 100+ projects delivered • 24/7 support
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
