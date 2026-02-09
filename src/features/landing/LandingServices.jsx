import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaPrayingHands, FaShoppingCart, FaUserTie, FaBox } from "react-icons/fa";
import { useServiceModal, SERVICE_TYPES } from "../../context/ServiceModalContext";
import { AuthContext } from "../../context/AuthContext";

const services = [
  {
    title: "Book",
    description: "Book PanditJi, order items, or book puja services — all in one place",
    serviceType: SERVICE_TYPES.PANDIT,
    path: "/user/book",
    icon: <FaUserTie />,
    color: "var(--primary-600)",
  },
  {
    title: "Products",
    description: "Browse puja samagri, idols & more. Anyone can view; sign in to order",
    serviceType: SERVICE_TYPES.PRODUCTS,
    path: "/products",
    icon: <FaBox />,
    color: "var(--primary-600)",
  },
  {
    title: "Orders",
    description: "View and manage your puja & product orders",
    serviceType: SERVICE_TYPES.ORDER,
    path: "/user/order",
    icon: <FaShoppingCart />,
    color: "#14b8a6",
  },
];

export default function LandingServices() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { openService } = useServiceModal();

  const handleServiceClick = (s) => {
    if (token && s.path) {
      navigate(s.path);
    } else {
      openService(s.serviceType);
    }
  };

  return (
    <section id="our-services" className="py-4" style={{ background: "#fff" }}>
      <Container>
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-3">Our Puja &amp; Ritual Services</h2>
          <p className="lead text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Book puja, Pandit Ji, and order puja samagri — Hindu rituals and offerings in one place
          </p>
        </div>
        <Row className="g-4">
          {services.map((s, i) => (
            <Col md={6} lg={3} key={i}>
              <Card
                role="button"
                tabIndex={0}
                className="border-0 shadow-sm h-100 text-center text-decoration-none"
                style={{
                  color: "inherit",
                  borderRadius: "1rem",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => handleServiceClick(s)}
                onKeyDown={(e) => e.key === "Enter" && handleServiceClick(s)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(234, 88, 12, 0.15)";
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
                    Open in popup →
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <p className="text-center text-muted small mt-3 mb-0">
          Browse puja samagri anytime; sign in to book puja, Pandit Ji, or view your orders.
        </p>
      </Container>
    </section>
  );
}
