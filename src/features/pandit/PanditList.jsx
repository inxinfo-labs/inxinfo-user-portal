import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FaMapMarkerAlt, FaStar, FaRupeeSign, FaClock, FaArrowRight } from "react-icons/fa";

export default function PanditList() {
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityFilter, setCityFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPandits();
  }, []);

  const fetchPandits = async () => {
    try {
      setLoading(true);
      const response = await api.get("/pandit/available");
      setPandits(response.data?.data || response.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load pandits. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCityFilter = async () => {
    if (!cityFilter.trim()) {
      fetchPandits();
      return;
    }
    try {
      setLoading(true);
      const response = await api.get(`/pandit/city/${encodeURIComponent(cityFilter)}`);
      setPandits(response.data?.data || response.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to filter pandits");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
          <p className="mt-3 text-muted">Loading available pandits...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="mb-5">
        <h1 className="fw-bold mb-2">Available Pandits</h1>
        <p className="text-muted">Book experienced pandits for your ceremonies</p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div className="d-flex gap-2 flex-grow-1" style={{ maxWidth: "400px" }}>
          <Form.Control
            type="text"
            placeholder="Filter by city..."
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCityFilter()}
            className="border-2"
            style={{ borderRadius: "0.75rem" }}
          />
          <Button 
            variant="outline-primary" 
            onClick={handleCityFilter}
            style={{ borderRadius: "0.75rem", minWidth: "100px" }}
          >
            Filter
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)} className="mb-4">
          {error}
        </Alert>
      )}

      {pandits.length === 0 ? (
        <Alert variant="info" className="text-center py-4">
          <h5>No pandits available</h5>
          <p className="mb-0">Try adjusting your filters or check back later.</p>
        </Alert>
      ) : (
        <Row className="g-4">
          {pandits.map((pandit) => (
            <Col lg={4} md={6} key={pandit.id}>
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
                {pandit.profileImageUrl && (
                  <Card.Img 
                    variant="top" 
                    src={pandit.profileImageUrl} 
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
                      {pandit.name}
                    </Card.Title>
                    {pandit.status === "AVAILABLE" && (
                      <Badge bg="success">Available</Badge>
                    )}
                  </div>

                  {pandit.bio && (
                    <Card.Text className="text-muted mb-3" style={{ minHeight: "40px" }}>
                      {pandit.bio.length > 80 ? `${pandit.bio.substring(0, 80)}...` : pandit.bio}
                    </Card.Text>
                  )}

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <FaMapMarkerAlt className="me-2 text-primary" />
                      <span className="text-muted">
                        {pandit.city}, {pandit.state}
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaStar className="me-2 text-warning" />
                      <span className="text-muted">
                        {pandit.experienceYears || 0} years experience
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaRupeeSign className="me-2 text-primary" />
                      <span className="fw-bold text-primary" style={{ fontSize: "1.25rem" }}>
                        {pandit.hourlyRate || "N/A"}
                      </span>
                      <span className="text-muted ms-1">/hour</span>
                    </div>
                  </div>

                  {pandit.specializations && pandit.specializations.length > 0 && (
                    <div className="mb-3">
                      <small className="text-muted d-block mb-2">Specializations:</small>
                      <div className="d-flex flex-wrap gap-2">
                        {pandit.specializations.slice(0, 3).map((spec, idx) => (
                          <Badge key={idx} bg="secondary" style={{ fontSize: "0.75rem" }}>
                            {spec}
                          </Badge>
                        ))}
                        {pandit.specializations.length > 3 && (
                          <Badge bg="secondary" style={{ fontSize: "0.75rem" }}>
                            +{pandit.specializations.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <Button 
                    variant="primary" 
                    className="w-100 fw-semibold"
                    onClick={() => navigate(`/user/pandit/${pandit.id}/book`)}
                    style={{
                      background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                      border: "none",
                      borderRadius: "0.75rem",
                      padding: "0.75rem"
                    }}
                  >
                    Book Pandit <FaArrowRight className="ms-2" />
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
