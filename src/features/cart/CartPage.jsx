import { useState } from "react";
import { Container, Card, Table, Button, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaTrash, FaRupeeSign, FaShoppingBag, FaUserTie, FaPrayingHands, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, cartCount, totalAmount, removeProduct, removePuja, clearPandit, clearOrderItems } = useCart();
  const [error, setError] = useState(null);

  const hasOrderItems = cart.productItems.length > 0 || cart.pujaItems.length > 0;
  const hasPandit = !!cart.panditBooking;

  const handleCheckout = () => {
    if (!hasOrderItems && !hasPandit) {
      setError("Cart is empty.");
      return;
    }
    if (hasOrderItems) {
      clearOrderItems();
      navigate("/user/order/create", {
        state: {
          fromCart: true,
          productItems: cart.productItems.map((i) => ({ itemId: i.itemId, quantity: i.quantity })),
          pujaItems: cart.pujaItems.map((i) => ({ pujaTypeId: i.pujaTypeId, quantity: i.quantity })),
        },
      });
      return;
    }
    if (hasPandit && cart.panditBooking?.bookingId) {
      clearPandit();
      navigate(`/user/pandit/booking/${cart.panditBooking.bookingId}/pay`);
    } else if (hasPandit) {
      setError("PanditJi booking in cart has no booking ID. Please book from PanditJi page first.");
    }
  };

  if (cartCount === 0) {
    return (
      <Container className="my-5">
        <h2 className="mb-4">Cart</h2>
        <Alert variant="info">Your cart is empty. Add products, puja services, or book a PanditJi.</Alert>
        <div className="d-flex flex-wrap gap-2">
          <Button variant="primary" onClick={() => navigate("/products")}>
            <FaShoppingBag className="me-2" /> Browse Products
          </Button>
          <Button variant="outline-primary" onClick={() => navigate("/user/puja")}>
            <FaPrayingHands className="me-2" /> Puja Services
          </Button>
          <Button variant="outline-primary" onClick={() => navigate("/user/pandit")}>
            <FaUserTie className="me-2" /> Book PanditJi
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/user/activity")}
            className="d-flex align-items-center justify-content-center gap-2 my-activity-btn"
          >
            <span className="my-activity-icon">
              <FaCalendarAlt />
            </span>
            <span>My Activity</span>
          </Button>
        </div>
      </Container>
    );
  }

  const cartAsOf = new Date().toLocaleString();

  return (
    <Container className="my-4">
      <h2 className="mb-4">Cart</h2>
      <p className="text-muted">Review and checkout. You can pay for order and PanditJi booking separately after checkout.</p>
      <p className="text-muted small mb-3">Cart as of: <strong>{cartAsOf}</strong></p>
      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      <Row>
        <Col lg={8}>
          {hasOrderItems && (
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-white d-flex align-items-center justify-content-between flex-wrap">
                <span><FaShoppingBag className="me-2 text-primary" /><strong>Order items</strong></span>
                <span className="text-muted small">As of {cartAsOf}</span>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive className="mb-0">
                  <thead><tr><th>Item</th><th>Price</th><th>Qty</th><th>Subtotal</th><th className="text-end">Action</th></tr></thead>
                  <tbody>
                    {cart.productItems.map((i) => (
                      <tr key={i.itemId}>
                        <td>{i.name}</td>
                        <td>₹{i.price}</td>
                        <td>{i.quantity}</td>
                        <td>₹{(i.price * i.quantity).toFixed(2)}</td>
                        <td><Button size="sm" variant="outline-danger" onClick={() => removeProduct(i.itemId)}><FaTrash /></Button></td>
                      </tr>
                    ))}
                    {cart.pujaItems.map((i) => (
                      <tr key={i.pujaTypeId}>
                        <td><FaPrayingHands className="me-1 text-muted" />{i.name}</td>
                        <td>₹{i.price}</td>
                        <td>{i.quantity}</td>
                        <td>₹{(i.price * i.quantity).toFixed(2)}</td>
                        <td><Button size="sm" variant="outline-danger" onClick={() => removePuja(i.pujaTypeId)}><FaTrash /></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}

          {hasPandit && cart.panditBooking && (
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-white d-flex align-items-center">
                <FaUserTie className="me-2 text-primary" />
                <strong>PanditJi booking</strong>
              </Card.Header>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <div>{cart.panditBooking.panditName ?? "PanditJi"}</div>
                  <div className="text-muted small">₹{cart.panditBooking.totalAmount ?? 0}</div>
                  {cart.panditBooking.bookingId && (
                    <Button size="sm" variant="link" className="p-0" onClick={() => navigate(`/user/pandit/booking/${cart.panditBooking.bookingId}/pay`)}>
                      Pay now
                    </Button>
                  )}
                </div>
                <Button variant="outline-danger" size="sm" onClick={clearPandit}>Remove</Button>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Summary</h5>
              <div className="text-muted small mb-2">As of {cartAsOf}</div>
              <div className="d-flex justify-content-between mb-2"><span>Items</span><span>{cartCount}</span></div>
              <div className="d-flex justify-content-between fw-bold mb-3"><span>Total</span><span><FaRupeeSign />{totalAmount.toFixed(2)}</span></div>
              <Button
                variant="primary"
                className="w-100 mb-2"
                onClick={handleCheckout}
                style={{ background: "var(--gradient-primary)", border: "none" }}
              >
                Proceed to checkout
              </Button>
              <Link
                to="/user/activity"
                className="d-flex align-items-center justify-content-center gap-2 w-100 py-2 text-decoration-none border rounded-3 my-activity-link"
                style={{ color: "#475569", borderColor: "#e2e8f0", fontSize: "0.9rem" }}
              >
                <span className="my-activity-icon"><FaCalendarAlt /></span>
                <span>My Activity</span>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
