import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaBox, FaPrayingHands, FaArrowRight } from "react-icons/fa";

const sections = [
  {
    key: "pandit",
    title: "Book PanditJi",
    description: "Find and book an experienced pandit for your ceremony. Choose date, time, and ritual type.",
    path: "/user/pandit",
    icon: FaUserTie,
    color: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
  },
  {
    key: "order",
    title: "Order Items",
    description: "Buy puja samagri, idols, incense, and other products. Add to cart or create an order.",
    path: "/user/products",
    icon: FaBox,
    color: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  },
  {
    key: "service",
    title: "Book Service (Puja)",
    description: "Book traditional puja services for occasions — Satyanarayan, Ganesh, marriage, griha pravesh, and more.",
    path: "/user/puja",
    icon: FaPrayingHands,
    color: "var(--gradient-primary)",
  },
];

export default function BookPage() {
  const navigate = useNavigate();

  return (
    <Container className="my-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-2">Book</h1>
        <p className="text-muted mb-0">
          Book a PanditJi, order products, or book a puja service — all in one place.
        </p>
      </div>
      <Row className="g-4">
        {sections.map((s) => (
          <Col md={4} key={s.key}>
            <Card
              className="border-0 shadow-sm h-100"
              style={{ borderRadius: "1rem" }}
            >
              <Card.Body className="p-4 d-flex flex-column">
                <div
                  className="mb-3 d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "56px",
                    height: "56px",
                    background: s.color,
                    color: "white",
                  }}
                >
                  <s.icon style={{ fontSize: "1.5rem" }} />
                </div>
                <h5 className="fw-bold mb-2">{s.title}</h5>
                <p className="text-muted small flex-grow-1 mb-3">{s.description}</p>
                <Button
                  variant="primary"
                  className="align-self-start"
                  style={{
                    background: s.color,
                    border: "none",
                    borderRadius: "0.5rem",
                  }}
                  onClick={() => navigate(s.path)}
                >
                  {s.key === "pandit" && "Book PanditJi"}
                  {s.key === "order" && "Browse & Order"}
                  {s.key === "service" && "Book Puja Service"}
                  <FaArrowRight className="ms-2" style={{ fontSize: "0.75rem" }} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
