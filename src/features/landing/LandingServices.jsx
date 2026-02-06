import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPrayingHands, FaShoppingCart, FaUserTie } from "react-icons/fa";

const services = [
  {
    title: "Puja Services",
    description: "Book traditional puja services for your occasions",
    to: "/user/puja",
    icon: <FaPrayingHands />,
    color: "#0d9488",
  },
  {
    title: "Orders",
    description: "View and manage your puja orders",
    to: "/user/order",
    icon: <FaShoppingCart />,
    color: "#0f766e",
  },
  {
    title: "Book Pandit",
    description: "Find and book experienced pandits",
    to: "/user/pandit",
    icon: <FaUserTie />,
    color: "#14b8a6",
  },
];

export default function LandingServices() {
  return (
    <section className="py-5" style={{ background: "#fff" }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Our Services</h2>
          <p className="lead text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Sign in to access Puja services, orders, and pandit booking
          </p>
        </div>
        <Row className="g-4">
          {services.map((s, i) => (
            <Col md={4} key={i}>
              <Card
                as={Link}
                to={s.to}
                className="border-0 shadow-sm h-100 text-center text-decoration-none"
                style={{
                  color: "inherit",
                  borderRadius: "1rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(13, 148, 136, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                }}
              >
                <Card.Body className="p-4">
                  <div
                    className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "12px",
                      background: `${s.color}20`,
                      color: s.color,
                      fontSize: "1.5rem",
                    }}
                  >
                    {s.icon}
                  </div>
                  <h5 className="fw-bold mb-2">{s.title}</h5>
                  <p className="text-muted small mb-0">{s.description}</p>
                  <span className="text-teal fw-semibold small mt-2 d-inline-block">
                    Go to service →
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <p className="text-center text-muted small mt-3 mb-0">
          You will be asked to log in or register if you are not signed in.
        </p>
      </Container>
    </section>
  );
}
