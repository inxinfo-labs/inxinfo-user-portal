import { useEffect, useState } from "react";
import { Container, Card, Alert, Spinner, Badge, Table, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";
import AuditInfo from "../../components/AuditInfo";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paying, setPaying] = useState(false);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      const raw = response.data?.data ?? response.data;
      if (raw) {
        setOrder({
          ...raw,
          orderItems: Array.isArray(raw.orderItems) ? raw.orderItems : [],
          productItems: Array.isArray(raw.productItems) ? raw.productItems : [],
        });
      } else {
        setOrder(null);
      }
      setError(null);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to load order details"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleConfirmPayment = async () => {
    setPaying(true);
    setError(null);
    try {
      const response = await api.post(`/orders/${id}/payment/confirm`, { paymentId: "MOCK-" + id });
      setOrder(response.data?.data);
    } catch (err) {
      setError(getApiErrorMessage(err, "Payment confirmation failed"));
    } finally {
      setPaying(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      PENDING: "warning",
      CONFIRMED: "success",
      PROCESSING: "info",
      SHIPPED: "primary",
      OUT_FOR_DELIVERY: "info",
      DELIVERED: "success",
      CANCELLED: "danger",
      RETURNED: "secondary",
      REFUNDED: "secondary",
    };
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
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
      <h2 className="mb-4">Order Details</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {order && (
        <Card>
          <Card.Body>
            <div className="mb-3">
              <strong>Order Number:</strong> {order.orderNumber}
            </div>
            <div className="mb-3">
              <strong>Status:</strong> {getStatusBadge(order.status)}
              {order.paymentStatus && (
                <>
                  {" "}
                  <Badge bg={order.paymentStatus === "PAID" ? "success" : "warning"} className="ms-2">
                    {order.paymentStatus}
                  </Badge>
                </>
              )}
            </div>
            <div className="mb-3">
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </div>
            {order.paymentStatus === "PENDING" && (
              <div className="mb-3">
                <strong className="d-block mb-2">Payment</strong>
                <Row className="g-2 align-items-center">
                  <Col xs="auto">
                    <Button variant="primary" onClick={() => navigate(`/user/order/${id}/pay`)}>
                      Pay with Card / UPI
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button variant="outline-secondary" onClick={handleConfirmPayment} disabled={paying}>
                      {paying ? "Processing..." : "Confirm Payment"}
                    </Button>
                  </Col>
                </Row>
                <p className="text-muted small mb-0 mt-1">Use Mock for local testing when payment-service is not running.</p>
              </div>
            )}
            {(order.createdAt || order.updatedAt) && (
              <div className="mb-3">
                <AuditInfo createdAt={order.createdAt} updatedAt={order.updatedAt} createdAtLabel="Order date" />
              </div>
            )}
            <div className="mb-3">
              <strong>Shipping Address:</strong> {order.shippingAddress}, {order.city}, {order.state} - {order.pincode}
            </div>
            <div className="mb-3">
              <strong>Contact:</strong> {order.contactPhone}
            </div>
            <h5 className="mt-4">Order Items</h5>
            {(order.orderItems?.length > 0 || order.productItems?.length > 0) ? (
              <>
                {order.orderItems?.length > 0 && (
                  <>
                    <h6 className="text-muted mt-2 mb-1">Puja services</h6>
                    <Table striped bordered size="sm">
                      <thead>
                        <tr>
                          <th>Puja Type</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th>Date & Time</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems.map((item) => (
                          <tr key={`puja-${item.id}`}>
                            <td>{item.pujaTypeName ?? "—"}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.unitPrice ?? 0}</td>
                            <td>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "—"}</td>
                            <td>₹{item.subtotal ?? 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
                {order.productItems?.length > 0 && (
                  <>
                    <h6 className="text-muted mt-3 mb-1">Products</h6>
                    <Table striped bordered size="sm">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th>Date & Time</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.productItems.map((item) => (
                          <tr key={`product-${item.id}`}>
                            <td>{item.itemName ?? "—"}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.unitPrice ?? 0}</td>
                            <td>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "—"}</td>
                            <td>₹{item.subtotal ?? 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
              </>
            ) : (
              <p className="text-muted mb-0">No line items for this order.</p>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
