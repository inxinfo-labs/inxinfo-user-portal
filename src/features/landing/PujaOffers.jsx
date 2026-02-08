import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { FaPrayingHands, FaTag, FaGift } from "react-icons/fa";
import { useServiceModal, SERVICE_TYPES } from "../../context/ServiceModalContext";
import { useAuthModal, AUTH_MODES } from "../../context/AuthModalContext";

const offers = [
  {
    title: "Festival Special Puja",
    description: "Book a full puja package for upcoming festivals. Includes samagri and experienced Pandit Ji.",
    discount: "20% off",
    cta: "Book now",
    action: "puja",
    icon: <FaPrayingHands />,
    color: "#0d9488",
  },
  {
    title: "New Customer Offer",
    description: "First-time customers get a welcome discount on puja services and product orders.",
    discount: "10% off",
    cta: "Register & claim",
    action: "register",
    icon: <FaGift />,
    color: "#0f766e",
  },
  {
    title: "Pandit Ji at Home",
    description: "Get an experienced Pandit at your doorstep. Book for weddings, griha pravesh, and more.",
    discount: "Flat rate",
    cta: "Find Pandit",
    action: "pandit",
    icon: <FaTag />,
    color: "#14b8a6",
  },
];

export default function PujaOffers({ embedded = false }) {
  const { openService, closeService } = useServiceModal();
  const { openAuth } = useAuthModal();

  const handleOfferClick = (action) => {
    closeService();
    if (action === "puja") openService(SERVICE_TYPES.PUJA);
    else if (action === "register") openAuth(AUTH_MODES.REGISTER);
    else if (action === "pandit") openService(SERVICE_TYPES.PANDIT);
  };

  const cards = (
    <Row className="g-4">
      {offers.map((offer, i) => (
        <Col md={4} key={i}>
          <Card
            role="button"
            tabIndex={0}
            className="border-0 shadow-sm h-100 text-decoration-none"
            style={{
              color: "inherit",
              borderRadius: "1rem",
              transition: "all 0.3s ease",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => handleOfferClick(offer.action)}
            onKeyDown={(e) => e.key === "Enter" && handleOfferClick(offer.action)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(13, 148, 136, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
            }}
          >
            <div
              className="p-3 text-white d-flex align-items-center justify-content-between"
              style={{ background: offer.color }}
            >
              <span style={{ fontSize: "1.5rem" }}>{offer.icon}</span>
              <Badge bg="light" text="dark">{offer.discount}</Badge>
            </div>
            <Card.Body className="p-4">
              <Card.Title className="fw-bold mb-2">{offer.title}</Card.Title>
              <Card.Text className="text-muted small mb-3">{offer.description}</Card.Text>
              <span className="fw-semibold" style={{ color: offer.color }}>
                {offer.cta} →
              </span>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  if (embedded) {
    return (
      <div className="py-2">
        <p className="text-muted small mb-3 text-center">
          Special deals on puja services, products, and Pandit Ji bookings
        </p>
        {cards}
      </div>
    );
  }

  return (
    <section id="puja-offers" className="py-5" style={{ background: "linear-gradient(180deg, #f0fdfa 0%, #fff 100%)" }}>
      <Container>
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Puja Offers & Promotions</h2>
          <p className="text-muted mb-0" style={{ maxWidth: "560px", margin: "0 auto" }}>
            Special deals on puja services, products, and Pandit Ji bookings. Click to open in popup.
          </p>
        </div>
        {cards}
      </Container>
    </section>
  );
}
