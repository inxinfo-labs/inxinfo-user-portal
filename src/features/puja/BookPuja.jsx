import { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export default function BookPuja() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [puja, setPuja] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    bookingDate: "",
    bookingTime: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactPhone: "",
    specialInstructions: "",
  });

  useEffect(() => {
    fetchPuja();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPuja = async () => {
    try {
      const response = await api.get(`/puja/${id}`);
      setPuja(response.data.data);
    } catch (err) {
      setError("Failed to load puja details");
    } finally {
      setLoading(false);
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
      await api.post("/puja/book", {
        pujaTypeId: parseInt(id),
        ...formData,
      });
      navigate("/user/puja/bookings");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book puja");
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
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Book {puja?.name}</h2>
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
        <Form.Group className="mb-3">
          <Form.Label>Booking Time</Form.Label>
          <Form.Control
            type="time"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
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
          {submitting ? "Booking..." : "Book Puja"}
        </Button>
      </Form>
    </Container>
  );
}
