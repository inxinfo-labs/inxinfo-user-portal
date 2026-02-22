import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPrayingHands, FaArrowRight } from "react-icons/fa";

export default function Hero({ onOpenModal }) {
  return (
    <section 
      id="home" 
      className="hero-section py-4"
      style={{
        background: "var(--gradient-hero)",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        minHeight: "clamp(320px, 45vh, 500px)",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* Subtle dark overlay for consistent text contrast */}
      <div 
        className="hero-overlay"
        aria-hidden="true"
      />
      
      <Container style={{ position: "relative", zIndex: 1 }}>
        <Row className="align-items-center g-3 g-md-4">
          <Col xs={12} md={7} className="fade-in-up hero-content order-2 order-md-1">
            <div className="mb-4">
              <span 
                className="badge px-3 py-2 mb-3 hero-badge"
              >
                <FaPrayingHands className="me-2" />
                Puja &amp; Hindu Rituals
              </span>
            </div>
            
            <h1 className="hero-title display-3 fw-bold mb-4">
              INXINFO Labs
            </h1>
            
            <p className="hero-tagline lead mb-4">
              Book Puja, Pandit Ji &amp; Puja Samagri
            </p>
            
            <p className="hero-desc mb-5">
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
            <div className="row mt-4 pt-3 hero-stats">
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="fw-bold hero-stat-value">100+</div>
                <div className="hero-stat-label">Pujas Booked</div>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="fw-bold hero-stat-value">50+</div>
                <div className="hero-stat-label">Pandit Ji</div>
              </div>
              <div className="col-md-4">
                <div className="fw-bold hero-stat-value">24/7</div>
                <div className="hero-stat-label">Booking Support</div>
              </div>
            </div>
          </Col>
          
          <Col xs={12} md={5} className="text-center fade-in-up order-1 order-md-2">
            <div className="hero-card">
              <div style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}>🪔</div>
              <h4 className="mt-3 mb-2 hero-card-title">Puja at Your Doorstep</h4>
              <p className="hero-card-desc mb-0">
                Book traditional puja, get samagri, and experienced Pandit Ji for every occasion
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
