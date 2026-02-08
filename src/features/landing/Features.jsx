import { Card, Col, Row, Container } from "react-bootstrap";
import { FaPrayingHands, FaUserTie, FaBox, FaCalendarAlt, FaShieldAlt, FaRupeeSign, FaHeadset, FaStar } from "react-icons/fa";

const featureData = [
  { 
    title: "Traditional Puja Services", 
    icon: <FaPrayingHands />, 
    description: "Authentic Hindu puja — festival pujas, Shradh, Satyanarayan, griha pravesh, and all rituals at home.",
    color: "var(--primary-600)"
  },
  { 
    title: "Experienced Pandit Ji", 
    icon: <FaUserTie />, 
    description: "Book verified Pandit Ji for weddings, mundan, puja at home. Choose by location and ritual.",
    color: "var(--primary-700)"
  },
  { 
    title: "Puja Samagri &amp; Products", 
    icon: <FaBox />, 
    description: "Order puja samagri, idols, and everything you need for your puja and rituals.",
    color: "#14b8a6"
  },
  { 
    title: "Festival &amp; Occasion Pujas", 
    icon: <FaCalendarAlt />, 
    description: "Book puja for Diwali, Navratri, Satyanarayan, housewarming, and every Hindu occasion.",
    color: "#059669"
  },
  { 
    title: "Secure Booking", 
    icon: <FaShieldAlt />, 
    description: "Safe, easy booking with confirmed slots and transparent pricing for puja and Pandit Ji.",
    color: "var(--primary-600)"
  },
  { 
    title: "Transparent Pricing", 
    icon: <FaRupeeSign />, 
    description: "Clear rates for puja packages and Pandit Ji. No hidden charges.",
    color: "var(--primary-700)"
  },
  { 
    title: "Dedicated Support", 
    icon: <FaHeadset />, 
    description: "Help with booking, ritual guidance, and support for your puja and Pandit Ji needs.",
    color: "#10b981"
  },
  { 
    title: "Trusted by Families", 
    icon: <FaStar />, 
    description: "Thousands of families book puja and Pandit Ji for their sacred occasions.",
    color: "#d97706"
  },
];

export default function Features() {
  return (
    <section className="py-5" style={{ background: "#f8fafc" }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Why Choose Us for Puja &amp; Pandit Ji?</h2>
          <p className="lead text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Traditional Hindu rituals, experienced Pandit Ji, and puja samagri — all for your sacred occasions
          </p>
        </div>
        
        <Row className="g-4">
          {featureData.map((f, i) => (
            <Col md={6} lg={3} key={i}>
              <Card 
                className="shadow-sm text-center p-4 h-100 border-0"
                style={{ 
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                }}
              >
                <div 
                  className="mb-3"
                  style={{ 
                    fontSize: "3rem",
                    color: f.color,
                    display: "inline-block",
                    padding: "1rem",
                    background: `${f.color}15`,
                    borderRadius: "16px"
                  }}
                >
                  {f.icon}
                </div>
                <h5 className="fw-bold mb-3">{f.title}</h5>
                <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>
                  {f.description}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
