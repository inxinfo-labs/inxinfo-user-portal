import { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner, Row, Col, Card, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";

export default function CreateOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pujas, setPujas] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [formData, setFormData] = useState({
    shippingAddress: "",
    city: "",
    state: "",
    pincode: "",
    contactPhone: "",
    notes: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [pujaRes, itemsRes] = await Promise.all([
          api.get("/puja").catch(() => ({ data: {} })),
          api.get("/items").catch(() => ({ data: {} })),
        ]);
        setPujas(pujaRes.data?.data ?? pujaRes.data ?? []);
        const raw = itemsRes.data?.data ?? itemsRes.data?.items ?? itemsRes.data;
        setProducts(Array.isArray(raw) ? raw : []);
      } catch (err) {
        setError(getApiErrorMessage(err, "Failed to load services"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const id = location.state?.addItemId;
    if (!id || products.length === 0) return;
    const product = products.find((p) => (p.id ?? p._id) === id);
    if (product) setProductItems((prev) => {
      const existing = prev.find((i) => i.itemId === id);
      if (existing) return prev.map((i) => (i.itemId === id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { itemId: id, quantity: 1 }];
    });
  }, [location.state?.addItemId, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addToOrder = (puja) => {
    const existingItem = orderItems.find((item) => item.pujaTypeId === puja.id);
    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.pujaTypeId === puja.id ? { ...item, quantity: item.quantity + 1 } : item
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
    if (quantity <= 0) removeFromOrder(pujaId);
    else setOrderItems(orderItems.map((item) => (item.pujaTypeId === pujaId ? { ...item, quantity } : item)));
  };

  const addProductToOrder = (product) => {
    const id = product.id ?? product._id;
    const existing = productItems.find((i) => i.itemId === id);
    if (existing) setProductItems(productItems.map((i) => (i.itemId === id ? { ...i, quantity: i.quantity + 1 } : i)));
    else setProductItems([...productItems, { itemId: id, quantity: 1 }]);
  };

  const removeProductFromOrder = (itemId) => {
    setProductItems(productItems.filter((i) => i.itemId !== itemId));
  };

  const updateProductQuantity = (itemId, quantity) => {
    if (quantity <= 0) removeProductFromOrder(itemId);
    else setProductItems(productItems.map((i) => (i.itemId === itemId ? { ...i, quantity } : i)));
  };

  const totalCount = orderItems.length + productItems.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (totalCount === 0) {
      setError("Please add at least one puja or product to the order.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        items: orderItems.length ? orderItems : undefined,
        productItems: productItems.length ? productItems : undefined,
      };
      const res = await api.post("/orders", payload);
      const created = res.data?.data ?? res.data;
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

  const pujaTotal = orderItems.reduce((sum, item) => {
    const puja = pujas.find((p) => p.id === item.pujaTypeId);
    return sum + (puja?.price || 0) * item.quantity;
  }, 0);
  const productTotal = productItems.reduce((sum, item) => {
    const product = products.find((p) => (p.id ?? p._id) === item.itemId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);
  const grandTotal = pujaTotal + productTotal;

  return (
    <Container className="my-5">
      <h2 className="mb-4">Create Order</h2>
      <p className="text-muted mb-3">
        <Link to="/products">Browse products</Link> or add puja services below.
      </p>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={8}>
          <Tabs defaultActiveKey="puja" className="mb-3">
            <Tab eventKey="puja" title={`Puja Services (${pujas.length})`}>
              <h5 className="mb-3">Puja Services</h5>
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
                {pujas.length === 0 && <p className="text-muted">No puja services available.</p>}
              </Row>
            </Tab>
            <Tab eventKey="products" title={`Products (${products.length})`}>
              <h5 className="mb-3">Products</h5>
              <Row>
                {products.map((product) => (
                  <Col md={6} key={product.id ?? product._id} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>₹{product.price}</Card.Text>
                        <Button variant="outline-primary" size="sm" onClick={() => addProductToOrder(product)}>
                          Add to Order
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
                {products.length === 0 && <p className="text-muted">No products available.</p>}
              </Row>
            </Tab>
          </Tabs>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>Your Order ({totalCount} items)</h5>
            </Card.Header>
            <Card.Body>
              {totalCount === 0 ? (
                <p className="text-muted">No items. Add puja or products from the tabs.</p>
              ) : (
                <>
                  {orderItems.map((item) => {
                    const puja = pujas.find((p) => p.id === item.pujaTypeId);
                    return (
                      <div key={`puja-${item.pujaTypeId}`} className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>{puja?.name}</span>
                          <Button variant="link" size="sm" className="p-0 text-danger" onClick={() => removeFromOrder(item.pujaTypeId)}>Remove</Button>
                        </div>
                        <div className="d-flex align-items-center mt-1">
                          <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.pujaTypeId, item.quantity - 1)}>-</Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.pujaTypeId, item.quantity + 1)}>+</Button>
                          <span className="ms-auto">₹{(puja?.price || 0) * item.quantity}</span>
                        </div>
                      </div>
                    );
                  })}
                  {productItems.map((item) => {
                    const product = products.find((p) => (p.id ?? p._id) === item.itemId);
                    return (
                      <div key={`product-${item.itemId}`} className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>{product?.name ?? "Product"}</span>
                          <Button variant="link" size="sm" className="p-0 text-danger" onClick={() => removeProductFromOrder(item.itemId)}>Remove</Button>
                        </div>
                        <div className="d-flex align-items-center mt-1">
                          <Button variant="outline-secondary" size="sm" onClick={() => updateProductQuantity(item.itemId, item.quantity - 1)}>-</Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button variant="outline-secondary" size="sm" onClick={() => updateProductQuantity(item.itemId, item.quantity + 1)}>+</Button>
                          <span className="ms-auto">₹{((product?.price) || 0) * item.quantity}</span>
                        </div>
                      </div>
                    );
                  })}
                  <hr />
                  <strong>Total: ₹{grandTotal}</strong>
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
            <Button variant="primary" type="submit" disabled={submitting || totalCount === 0}>
              {submitting ? "Creating..." : "Create Order"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
