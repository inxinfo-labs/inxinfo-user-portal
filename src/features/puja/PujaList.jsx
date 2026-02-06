import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FaClock, FaRupeeSign, FaArrowRight } from "react-icons/fa";

export default function PujaList() {
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
              <Card className="h-100 border-0 shadow-sm" style={{ transition: "all 0.3s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                }}
              >
                {puja.imageUrl && (
                  <Card.Img 
                    variant="top" 
                    src={puja.imageUrl} 
                    style={{ 
                      height: "220px", 
                      objectFit: "cover",
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem"
                    }} 
                  />
                )}
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Card.Title className="fw-bold mb-0" style={{ fontSize: "1.25rem", color: "#111827" }}>
                      {puja.name}
                    </Card.Title>
                    {puja.category && (
                      <Badge bg="primary" className="ms-2">
                        {puja.category}
                      </Badge>
                    )}
                  </div>
                  
                  <Card.Text className="text-muted mb-4" style={{ minHeight: "60px" }}>
                    {puja.description || "Traditional puja service"}
                  </Card.Text>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center text-primary fw-bold" style={{ fontSize: "1.5rem" }}>
                      <FaRupeeSign className="me-1" style={{ fontSize: "1.25rem" }} />
                      {puja.price || "N/A"}
                    </div>
                    <div className="d-flex align-items-center text-muted">
                      <FaClock className="me-2" />
                      <span>{puja.durationMinutes || 60} min</span>
                    </div>
                  </div>

                  <Button 
                    variant="primary" 
                    className="w-100 fw-semibold"
                    onClick={() => navigate(`/user/puja/${puja.id}/book`)}
                    style={{
                      background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                      border: "none",
                      borderRadius: "0.75rem",
                      padding: "0.75rem"
                    }}
                  >
                    Book Now <FaArrowRight className="ms-2" />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
