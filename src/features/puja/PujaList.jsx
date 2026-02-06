import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

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
      setPujas(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load puja services");
      console.error(err);
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

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Puja Services</h2>
      {(!pujas || pujas.length === 0) && (
        <Alert variant="info">No puja services available yet. Please try again later.</Alert>
      )}
      <Row>
        {(pujas || []).map((puja) => (
          <Col md={4} key={puja.id} className="mb-4">
            <Card>
              {puja.imageUrl && (
                <Card.Img variant="top" src={puja.imageUrl} style={{ height: "200px", objectFit: "cover" }} />
              )}
              <Card.Body>
                <Card.Title>{puja.name}</Card.Title>
                <Card.Text>{puja.description}</Card.Text>
                <Card.Text>
                  <strong>Price:</strong> ₹{puja.price}
                </Card.Text>
                <Card.Text>
                  <strong>Duration:</strong> {puja.durationMinutes} minutes
                </Card.Text>
                <Button variant="primary" onClick={() => navigate(`/user/puja/${puja.id}/book`)}>
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
