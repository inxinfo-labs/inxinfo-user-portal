import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FaMapMarkerAlt, FaRupeeSign, FaArrowRight, FaUserTie } from "react-icons/fa";

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
        <h1 className="fw-bold mb-2">PanditJi — Available Pandits</h1>
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
                {pandit.profileImageUrl ? (
                  <Card.Img
                    variant="top"
                    src={pandit.profileImageUrl}
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
                    <FaUserTie className="text-muted" style={{ fontSize: "2.5rem", opacity: 0.5 }} />
                  </div>
                )}
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {pandit.city && <Badge bg="primary">{pandit.city}</Badge>}
                    {pandit.status === "AVAILABLE" && <Badge bg="success">Available</Badge>}
                  </div>
                  <Card.Title className="fw-bold mb-2" style={{ fontSize: "1.1rem", color: "#111827" }}>
                    {pandit.name}
                  </Card.Title>
                  <div className="card-content mb-2">
                    <Card.Text className="text-muted small mb-0">
                      {pandit.bio
                        ? pandit.bio.length > 100
                          ? `${pandit.bio.substring(0, 100)}...`
                          : pandit.bio
                        : "Experienced pandit for your ceremonies"}
                    </Card.Text>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-1">
                    <span className="fw-bold text-primary">₹{pandit.hourlyRate ?? "N/A"}/hr</span>
                    <span className="text-muted small">
                      <FaMapMarkerAlt className="me-1" />
                      {pandit.city || "—"}
                      {pandit.experienceYears != null && ` · ${pandit.experienceYears} yrs`}
                    </span>
                  </div>
                  {pandit.specializations && pandit.specializations.length > 0 && (
                    <div className="mb-2">
                      <div className="d-flex flex-wrap gap-1">
                        {pandit.specializations.slice(0, 3).map((spec, idx) => (
                          <Badge key={idx} bg="secondary" style={{ fontSize: "0.7rem" }}>
                            {spec}
                          </Badge>
                        ))}
                        {pandit.specializations.length > 3 && (
                          <Badge bg="secondary" style={{ fontSize: "0.7rem" }}>
                            +{pandit.specializations.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="card-actions">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-100"
                      onClick={() => navigate(`/user/pandit/${pandit.id}/book`)}
                      style={{
                        background: "var(--gradient-primary)",
                        border: "none",
                        borderRadius: "0.5rem",
                      }}
                    >
                      Book PanditJi <FaArrowRight className="ms-1" />
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
