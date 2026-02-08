import { Container, Row, Col, Card } from "react-bootstrap";
import { useServiceModal, SERVICE_TYPES } from "../../context/ServiceModalContext";

const PUJA_IMAGES = {
  satyanarayan:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Satya_Narayan_Puja.JPG",
  grihaPravesh:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
};

const featured = [
  {
    id: "satyanarayan",
    title: "Satyanarayan Puja",
    description:
      "Sacred Satyanarayan puja for peace, prosperity, and blessings. Performed at home for family welfare and auspicious beginnings.",
    image: PUJA_IMAGES.satyanarayan,
    imageAlt: "Satyanarayan Puja ceremony",
  },
  {
    id: "griha-pravesh",
    title: "Griha Pravesh Puja",
    description:
      "Housewarming and Griha Pravesh ceremonies for your new home. Traditional rituals to bless the home and bring good fortune.",
    image: PUJA_IMAGES.grihaPravesh,
    imageAlt: "New home for Griha Pravesh housewarming ceremony",
  },
];

export default function FeaturedPujas() {
  const { openService } = useServiceModal();

  return (
    <section className="py-4 py-md-5" style={{ background: "#fffbf7" }}>
      <Container>
        <h2 className="text-center fw-bold mb-2" style={{ color: "var(--primary-800)" }}>
          Featured Pujas
        </h2>
        <p className="text-center text-muted mb-4" style={{ maxWidth: 560, margin: "0 auto" }}>
          Traditional ceremonies we perform at your home or venue.
        </p>
        <Row className="g-4">
          {featured.map((puja) => (
            <Col md={6} key={puja.id}>
              <Card
                className="border-0 shadow-sm h-100 overflow-hidden"
                style={{ borderRadius: "1rem", cursor: "pointer" }}
                onClick={() => openService(SERVICE_TYPES.PUJA)}
              >
                <div style={{ height: 220, overflow: "hidden" }}>
                  <img
                    src={puja.image}
                    alt={puja.imageAlt}
                    loading="lazy"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-2" style={{ color: "var(--primary-800)" }}>
                    {puja.title}
                  </h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>
                    {puja.description}
                  </p>
                  <button
                    type="button"
                    className="btn btn-sm fw-semibold mt-3"
                    style={{
                      background: "var(--gradient-primary)",
                      border: "none",
                      color: "white",
                      borderRadius: "0.5rem",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openService(SERVICE_TYPES.PUJA);
                    }}
                  >
                    Book this Puja
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
