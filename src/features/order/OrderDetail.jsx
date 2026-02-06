import { useEffect, useState } from "react";
import { Container, Card, Alert, Spinner, Badge, Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paying, setPaying] = useState(false);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data?.data);
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
      DELIVERED: "success",
      CANCELLED: "danger",
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
                <Button variant="primary" onClick={handleConfirmPayment} disabled={paying}>
                  {paying ? "Processing..." : "Confirm Payment (Mock)"}
                </Button>
              </div>
            )}
            <div className="mb-3">
              <strong>Shipping Address:</strong> {order.shippingAddress}, {order.city}, {order.state} - {order.pincode}
            </div>
            <div className="mb-3">
              <strong>Contact:</strong> {order.contactPhone}
            </div>
            <div className="mb-3">
              <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
            </div>
            <h5 className="mt-4">Order Items</h5>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Puja Type</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.pujaTypeName}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.unitPrice}</td>
                    <td>₹{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
