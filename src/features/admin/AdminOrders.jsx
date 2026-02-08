import { useState, useEffect } from "react";
import { Container, Card, Button, Table, Alert, Spinner, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";
import { ORDER_STATUS, ORDER_STATUS_LABELS } from "../../constants";
import { FaClipboardList, FaArrowLeft } from "react-icons/fa";

export default function AdminOrders() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/admin/orders");
      setList(Array.isArray(res.data?.data) ? res.data.data : res.data?.orders ?? []);
    } catch (err) {
      setList([]);
      setError(getApiErrorMessage(err, "Could not load orders. Is the backend /api/admin/orders running?"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    setError("");
    try {
      await api.patch(`/admin/orders/${orderId}`, { orderStatus: newStatus });
      fetchList();
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to update order status"));
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center gap-2 mb-4">
        <Link to="/user/admin" className="btn btn-outline-secondary btn-sm">
          <FaArrowLeft className="me-1" /> Back
        </Link>
        <h2 className="mb-0 fw-bold">Orders</h2>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Card className="border-0 shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : list.length === 0 ? (
            <p className="text-muted text-center py-4 mb-0">
              No orders yet. Orders are created by customers. Backend must expose <code>GET /api/admin/orders</code> and <code>PATCH /api/admin/orders/:id</code>.
            </p>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Update status</th>
                </tr>
              </thead>
              <tbody>
                {list.map((o) => (
                  <tr key={o._id || o.id}>
                    <td>{o.orderId || o._id || o.id}</td>
                    <td><span className="badge bg-secondary">{o.orderStatus || o.status || "—"}</span></td>
                    <td>₹{o.pricing?.totalAmount ?? o.totalAmount ?? "—"}</td>
                    <td>
                      <Form.Select
                        size="sm"
                        style={{ maxWidth: 180 }}
                        value={o.orderStatus || o.status || ""}
                        onChange={(e) => updateStatus(o._id || o.id, e.target.value)}
                        disabled={updatingId === (o._id || o.id)}
                      >
                        {ORDER_STATUS.map((s) => (
                          <option key={s} value={s}>{ORDER_STATUS_LABELS[s] || s}</option>
                        ))}
                      </Form.Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
