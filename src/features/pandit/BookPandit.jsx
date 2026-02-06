import { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner, Card, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export default function BookPandit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pandit, setPandit] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    bookingDate: "",
    startTime: "",
    durationHours: 1,
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactPhone: "",
    specialInstructions: "",
  });

  useEffect(() => {
    fetchPandit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (formData.bookingDate) {
      checkAvailability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.bookingDate, id]);

  const fetchPandit = async () => {
    try {
      const response = await api.get(`/pandit/${id}`);
      setPandit(response.data.data);
    } catch (err) {
      setError("Failed to load pandit details");
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async () => {
    try {
      const response = await api.get(`/pandit/${id}/availability`, {
        params: { date: formData.bookingDate },
      });
      setAvailability(response.data.data);
    } catch (err) {
      console.error("Failed to check availability");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.post("/pandit/book", {
        panditId: parseInt(id),
        ...formData,
      });
      navigate("/user/pandit/bookings");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book pandit");
    } finally {
      setSubmitting(false);
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
      <Row>
        <Col md={8}>
          <h2 className="mb-4">Book {pandit?.name}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Booking Date</Form.Label>
              <Form.Control
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </Form.Group>
            {availability && availability.availableSlots.length > 0 && (
              <Form.Group className="mb-3">
                <Form.Label>Available Time Slots</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {availability.availableSlots.map((slot, index) => (
                    <Button
                      key={index}
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setFormData({ ...formData, startTime: slot.startTime })}
                    >
                      {slot.startTime} - {slot.endTime}
                    </Button>
                  ))}
                </div>
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (Hours)</Form.Label>
              <Form.Control
                type="number"
                name="durationHours"
                value={formData.durationHours}
                onChange={handleChange}
                min={1}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Phone</Form.Label>
              <Form.Control
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Special Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? "Booking..." : `Book Pandit (₹${pandit?.hourlyRate * formData.durationHours})`}
            </Button>
          </Form>
        </Col>
        <Col md={4}>
          {pandit && (
            <Card>
              <Card.Header>
                <h5>Pandit Details</h5>
              </Card.Header>
              <Card.Body>
                <p><strong>Name:</strong> {pandit.name}</p>
                <p><strong>Experience:</strong> {pandit.experienceYears} years</p>
                <p><strong>Hourly Rate:</strong> ₹{pandit.hourlyRate}</p>
                <p><strong>Location:</strong> {pandit.city}, {pandit.state}</p>
                {pandit.specializations && (
                  <div>
                    <strong>Specializations:</strong>
                    <ul>
                      {pandit.specializations.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {pandit.bio && <p>{pandit.bio}</p>}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
