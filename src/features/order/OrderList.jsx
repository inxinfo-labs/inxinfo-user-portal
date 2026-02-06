import { useEffect, useState } from "react";
import { Container, Table, Alert, Spinner, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data?.data ?? []);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to load orders"));
    } finally {
      setLoading(false);
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

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Orders</h2>
        <Button variant="primary" onClick={() => navigate("/user/order/create")}>
          Create Order
        </Button>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      {orders.length === 0 ? (
        <Alert variant="info">No orders found</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.orderItems?.length || 0} item(s)</td>
                <td>₹{order.totalAmount}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate(`/user/order/${order.id}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
