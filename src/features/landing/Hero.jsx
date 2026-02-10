import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPrayingHands, FaArrowRight } from "react-icons/fa";

export default function Hero({ onOpenModal }) {
  return (
    <section 
      id="home" 
      className="py-5"
      style={{
        background: "var(--gradient-hero)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        minHeight: "55vh",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* Background - soft sacred pattern */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06) 0%, transparent 50%)",
          opacity: 0.8
        }}
      />
      
      <Container style={{ position: "relative", zIndex: 1 }}>
        <Row className="align-items-center">
          <Col md={7} className="fade-in-up">
            <div className="mb-4">
              <span 
                className="badge px-3 py-2 mb-3"
              style={{
                background: "rgba(255,255,255,0.25)",
                fontSize: "0.9rem",
                fontWeight: 600
              }}
              >
                <FaPrayingHands className="me-2" />
                Puja &amp; Hindu Rituals
              </span>
            </div>
            
            <h1 
              className="display-3 fw-bold mb-4"
              style={{ 
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.2,
                textShadow: "0 2px 20px rgba(0,0,0,0.2)"
              }}
            >
              INXINFO Labs
            </h1>
            
            <p 
              className="lead mb-4"
              style={{ 
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                opacity: 0.95,
                lineHeight: 1.6,
                maxWidth: "600px"
              }}
            >
              Book Puja, Pandit Ji &amp; Puja Samagri
            </p>
            
            <p 
              className="mb-5"
              style={{ 
                fontSize: "1.1rem",
                opacity: 0.9,
                maxWidth: "550px"
              }}
            >
              Traditional Hindu puja services at home, festival pujas, Shradh, and all rituals. 
              Order puja samagri and book experienced Pandit Ji for your occasions.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Button 
                variant="light" 
                size="lg" 
                onClick={onOpenModal}
                className="px-4 py-3 fw-semibold"
                style={{ borderRadius: "12px" }}
              >
                Get Started <FaArrowRight className="ms-2" />
              </Button>
              <Button 
                variant="outline-light" 
                size="lg"
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-3 fw-semibold"
                style={{ borderRadius: "12px", borderWidth: "2px" }}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="row mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="fw-bold" style={{ fontSize: "2rem" }}>100+</div>
                <div style={{ opacity: 0.9 }}>Pujas Booked</div>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="fw-bold" style={{ fontSize: "2rem" }}>50+</div>
                <div style={{ opacity: 0.9 }}>Pandit Ji</div>
              </div>
              <div className="col-md-4">
                <div className="fw-bold" style={{ fontSize: "2rem" }}>24/7</div>
                <div style={{ opacity: 0.9 }}>Booking Support</div>
              </div>
            </div>
          </Col>
          
          <Col md={5} className="text-center fade-in-up">
            <div 
              style={{
                background: "rgba(255,255,255,0.18)",
                borderRadius: "24px",
                padding: "3rem",
                border: "1px solid rgba(255,255,255,0.25)"
              }}
            >
              <div style={{ fontSize: "5rem" }}>🪔</div>
              <h4 className="mt-3 mb-2">Puja at Your Doorstep</h4>
              <p style={{ opacity: 1 }}>
                Book traditional puja, get samagri, and experienced Pandit Ji for every occasion
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
