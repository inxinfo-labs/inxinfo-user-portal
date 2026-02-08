import { useEffect, useState } from "react";
import { Container, Table, Alert, Spinner, Badge, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FaPlus, FaEye, FaRupeeSign, FaCalendarAlt } from "react-icons/fa";

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
      setLoading(true);
      const response = await api.get("/orders");
      setOrders(response.data?.data || response.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders. Please try again.");
      console.error(err);
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
    return <Badge bg={variants[status] || "secondary"} className="px-3 py-2">{status}</Badge>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
          <p className="mt-3 text-muted">Loading your orders...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
        <div>
          <h1 className="fw-bold mb-2">My Orders</h1>
          <p className="text-muted mb-0">View and manage your orders</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => navigate("/user/order/create")}
          className="fw-semibold"
          style={{
            background: "var(--gradient-primary)",
            border: "none",
            borderRadius: "0.75rem",
            padding: "0.75rem 1.5rem"
          }}
        >
          <FaPlus className="me-2" />
          Create Order
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)} className="mb-4">
          {error}
        </Alert>
      )}

      {orders.length === 0 ? (
        <Card className="border-0 shadow-sm text-center py-5">
          <Card.Body>
            <div className="mb-4">
              <FaCalendarAlt style={{ fontSize: "4rem", color: "#cbd5e1" }} />
            </div>
            <h4 className="mb-3">No orders found</h4>
            <p className="text-muted mb-4">You haven't placed any orders yet.</p>
            <Button 
              variant="primary"
              onClick={() => navigate("/user/order/create")}
              style={{
                background: "var(--gradient-primary)",
                border: "none",
                borderRadius: "0.75rem"
              }}
            >
              <FaPlus className="me-2" />
              Create Your First Order
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}>
                  <tr>
                    <th className="px-4 py-3 fw-semibold">Order Number</th>
                    <th className="px-4 py-3 fw-semibold">Items</th>
                    <th className="px-4 py-3 fw-semibold">Total Amount</th>
                    <th className="px-4 py-3 fw-semibold">Status</th>
                    <th className="px-4 py-3 fw-semibold">Date</th>
                    <th className="px-4 py-3 fw-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td className="px-4 py-3">
                        <span className="fw-semibold">{order.orderNumber || `#${order.id}`}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-muted">
                          {order.orderItems?.length || 0} item(s)
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="fw-bold text-primary d-flex align-items-center">
                          <FaRupeeSign className="me-1" />
                          {order.totalAmount || "0.00"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-muted d-flex align-items-center">
                          <FaCalendarAlt className="me-2" style={{ fontSize: "0.875rem" }} />
                          {formatDate(order.createdAt)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => navigate(`/user/order/${order.id}`)}
                          className="fw-semibold"
                          style={{ borderRadius: "0.5rem" }}
                        >
                          <FaEye className="me-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
