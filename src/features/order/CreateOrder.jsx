import { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";

export default function CreateOrder() {
  const navigate = useNavigate();
  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [formData, setFormData] = useState({
    shippingAddress: "",
    city: "",
    state: "",
    pincode: "",
    contactPhone: "",
    notes: "",
  });

  useEffect(() => {
    fetchPujas();
  }, []);

  const fetchPujas = async () => {
    try {
      const response = await api.get("/puja");
      setPujas(response.data?.data ?? []);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to load puja services"));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addToOrder = (puja) => {
    const existingItem = orderItems.find((item) => item.pujaTypeId === puja.id);
    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.pujaTypeId === puja.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOrderItems([...orderItems, { pujaTypeId: puja.id, quantity: 1 }]);
    }
  };

  const removeFromOrder = (pujaId) => {
    setOrderItems(orderItems.filter((item) => item.pujaTypeId !== pujaId));
  };

  const updateQuantity = (pujaId, quantity) => {
    if (quantity <= 0) {
      removeFromOrder(pujaId);
    } else {
      setOrderItems(
        orderItems.map((item) =>
          item.pujaTypeId === pujaId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      setError("Please add at least one item to the order");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await api.post("/orders", {
        items: orderItems,
        ...formData,
      });
      const created = res.data?.data;
      if (created?.id) navigate(`/user/order/${created.id}`);
      else navigate("/user/order");
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to create order"));
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
      <h2 className="mb-4">Create Order</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={8}>
          <h4 className="mb-3">Available Puja Services</h4>
          <Row>
            {pujas.map((puja) => (
              <Col md={6} key={puja.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{puja.name}</Card.Title>
                    <Card.Text>₹{puja.price}</Card.Text>
                    <Button variant="primary" size="sm" onClick={() => addToOrder(puja)}>
                      Add to Order
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>Order Items</h5>
            </Card.Header>
            <Card.Body>
              {orderItems.length === 0 ? (
                <p>No items in order</p>
              ) : (
                <>
                  {orderItems.map((item) => {
                    const puja = pujas.find((p) => p.id === item.pujaTypeId);
                    return (
                      <div key={item.pujaTypeId} className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>{puja?.name}</span>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => removeFromOrder(item.pujaTypeId)}
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.pujaTypeId, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.pujaTypeId, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <span className="ms-auto">₹{puja?.price * item.quantity}</span>
                        </div>
                      </div>
                    );
                  })}
                  <hr />
                  <strong>
                    Total: ₹
                    {orderItems.reduce((sum, item) => {
                      const puja = pujas.find((p) => p.id === item.pujaTypeId);
                      return sum + (puja?.price || 0) * item.quantity;
                    }, 0)}
                  </strong>
                </>
              )}
            </Card.Body>
          </Card>
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control
                type="text"
                name="shippingAddress"
                value={formData.shippingAddress}
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
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={submitting || orderItems.length === 0}>
              {submitting ? "Creating..." : "Create Order"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
