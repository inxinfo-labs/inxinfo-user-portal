import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";

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
      setPandits(response.data?.data ?? []);
      setError(null);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to load pandits"));
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
      setPandits(response.data?.data ?? []);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to filter pandits"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Pandits</h2>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Filter by city"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            style={{ width: "200px" }}
          />
          <Button variant="outline-primary" onClick={handleCityFilter}>
            Filter
          </Button>
        </div>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {pandits.map((pandit) => (
          <Col md={4} key={pandit.id} className="mb-4">
            <Card>
              {pandit.profileImageUrl && (
                <Card.Img variant="top" src={pandit.profileImageUrl} style={{ height: "200px", objectFit: "cover" }} />
              )}
              <Card.Body>
                <Card.Title>{pandit.name}</Card.Title>
                <Card.Text>{pandit.bio}</Card.Text>
                <Card.Text>
                  <strong>Experience:</strong> {pandit.experienceYears} years
                </Card.Text>
                <Card.Text>
                  <strong>Rate:</strong> ₹{pandit.hourlyRate}/hour
                </Card.Text>
                <Card.Text>
                  <strong>Location:</strong> {pandit.city}, {pandit.state}
                </Card.Text>
                {pandit.specializations && pandit.specializations.length > 0 && (
                  <Card.Text>
                    <strong>Specializations:</strong> {pandit.specializations.join(", ")}
                  </Card.Text>
                )}
                <Button variant="primary" onClick={() => navigate(`/user/pandit/${pandit.id}/book`)}>
                  Book Pandit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
