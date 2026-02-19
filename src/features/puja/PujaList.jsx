import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useCart } from "../../context/CartContext";
import { FaClock, FaRupeeSign, FaArrowRight, FaShoppingCart, FaPrayingHands } from "react-icons/fa";

export default function PujaList() {
  const { addPuja } = useCart();
  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPujas();
  }, []);

  const fetchPujas = async () => {
    try {
      setLoading(true);
      const response = await api.get("/puja");
      setPujas(response.data?.data || response.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load puja services. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
          <p className="mt-3 text-muted">Loading puja services...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="mb-5">
        <h1 className="fw-bold mb-2">Puja Services</h1>
        <p className="text-muted">Choose from our wide range of traditional puja services</p>
      </div>

      {(!pujas || pujas.length === 0) ? (
        <Alert variant="info" className="text-center py-4">
          <h5>No puja services available</h5>
          <p className="mb-0">Please check back later or contact support.</p>
        </Alert>
      ) : (
        <Row className="g-4">
          {pujas.map((puja) => (
            <Col lg={4} md={6} key={puja.id}>
              <Card
                className="h-100 border-0 shadow-sm service-card"
                style={{
                  transition: "all 0.3s ease",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  minHeight: 460,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                }}
              >
                {puja.imageUrl ? (
                  <Card.Img
                    variant="top"
                    src={puja.imageUrl}
                    style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
                  />
                ) : (
                  <div
                    className="card-img-placeholder d-flex align-items-center justify-content-center"
                    style={{
                      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                  >
                    <FaPrayingHands className="text-muted" style={{ fontSize: "2.5rem", opacity: 0.5 }} />
                  </div>
                )}
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {puja.ritualType && <Badge bg="primary">{puja.ritualType}</Badge>}
                    {puja.category && <Badge bg="light" text="dark">{puja.category}</Badge>}
                  </div>
                  <Card.Title className="fw-bold mb-2" style={{ fontSize: "1.1rem", color: "#111827" }}>
                    {puja.name}
                  </Card.Title>
                  <div className="card-content mb-2">
                    <Card.Text className="text-muted small mb-0">
                      {puja.description
                        ? puja.description.length > 100
                          ? `${puja.description.substring(0, 100)}...`
                          : puja.description
                        : "Traditional puja service"}
                    </Card.Text>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-primary">₹{puja.price ?? "N/A"}</span>
                    <span className="text-muted small">
                      <FaClock className="me-1" />
                      {puja.durationMinutes || 60} min
                    </span>
                  </div>
                  <div className="card-actions d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="flex-grow-1"
                      style={{ borderRadius: "0.5rem" }}
                      onClick={() => addPuja(puja)}
                    >
                      <FaShoppingCart className="me-1" /> Add to cart
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-grow-1"
                      onClick={() => navigate(`/user/puja/${puja.id}/book`)}
                      style={{ background: "var(--gradient-primary)", border: "none", borderRadius: "0.5rem" }}
                    >
                      Book <FaArrowRight className="ms-1" />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
