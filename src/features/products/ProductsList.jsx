import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart, FaRupeeSign, FaBox } from "react-icons/fa";

/** Public list of products (GET /api/items). Anyone can view; sign in to order. */
export default function ProductsList() {
  const { token } = useContext(AuthContext);
  const { addProduct } = useCart();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    api
      .get("/items")
      .then((res) => {
        const raw = res.data?.data ?? res.data?.items ?? res.data;
        const list = Array.isArray(raw) ? raw : [];
        if (!cancelled) setItems(list);
      })
      .catch((err) => {
        if (!cancelled) setError(getApiErrorMessage(err, "Could not load products."));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Loading products...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-2">Products</h1>
        <p className="text-muted mb-0">Puja samagri, idols, and more. Add to order and checkout.</p>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)} className="mb-4">
          {error}
        </Alert>
      )}

      {items.length === 0 ? (
        <Alert variant="info" className="text-center py-4">
          <h5>No products available</h5>
          <p className="mb-0">Check back later for new items.</p>
        </Alert>
      ) : (
        <Row className="g-4">
          {items.map((item) => (
            <Col xs={12} sm={6} lg={4} key={item.id ?? item._id}>
              <Card
                className="h-100 border-0 shadow-sm service-card"
                style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  minHeight: 460,
                  transition: "all 0.3s ease",
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
                <div
                  className="card-img-placeholder d-flex align-items-center justify-content-center text-white"
                  style={{
                    height: 180,
                    background: "linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%)",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                >
                  <FaBox style={{ fontSize: "2.5rem", opacity: 0.9 }} />
                </div>
                <Card.Body className="d-flex flex-column p-4">
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {item.productCategory && (
                      <Badge bg="primary">{item.productCategory}</Badge>
                    )}
                  </div>
                  <Card.Title className="fw-bold mb-2" style={{ fontSize: "1.1rem", color: "#111827" }}>
                    {item.name}
                  </Card.Title>
                  <div className="card-content mb-2">
                    <Card.Text className="text-muted small mb-0">
                      {item.description
                        ? item.description.length > 100
                          ? `${item.description.slice(0, 100)}...`
                          : item.description
                        : "Puja samagri and ritual items"}
                    </Card.Text>
                  </div>
                  <div className="card-actions d-flex align-items-center justify-content-between pt-2">
                    <span className="fw-bold text-primary">₹{item.price ?? "N/A"}</span>
                    {token ? (
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          style={{ borderRadius: "0.5rem" }}
                          onClick={() => addProduct(item)}
                        >
                          <FaShoppingCart className="me-1" /> Cart
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          style={{ borderRadius: "0.5rem", background: "var(--gradient-primary)", border: "none" }}
                          as={Link}
                          to="/user/order/create"
                          state={{ addItemId: item.id ?? item._id, addItemName: item.name, addItemPrice: item.price }}
                        >
                          Order
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={{ borderRadius: "0.5rem" }}
                        as={Link}
                        to="/auth/login"
                      >
                        Sign in to order
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="mt-4 text-center">
        {token ? (
          <Button
            variant="outline-primary"
            onClick={() => navigate("/user/order/create")}
            style={{ borderRadius: "0.75rem" }}
          >
            Create order (puja + products)
          </Button>
        ) : (
          <p className="text-muted small mb-0">
            <Link to="/auth/login">Sign in</Link> to create an order with products and puja services.
          </p>
        )}
      </div>
    </Container>
  );
}
