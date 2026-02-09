import { useState, useEffect } from "react";
import { Container, Card, Table, Alert, Spinner, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";
import { ORDER_STATUS, ORDER_STATUS_LABELS } from "../../constants";
import { FaArrowLeft } from "react-icons/fa";

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

  const toBackendStatus = (s) => (s || "").toUpperCase().replace(/-/g, "_");

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    setError("");
    try {
      await api.patch(`/admin/orders/${orderId}`, { orderStatus: toBackendStatus(newStatus) });
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
            <>
              <h6 className="text-muted mb-2">Audit: Orders with created and last updated date/time</h6>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>User</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Update status</th>
                  </tr>
                </thead>
              <tbody>
                {list.map((o) => {
                  const currentStatus = (o.orderStatus || o.status || "").toUpperCase().replace(/-/g, "_");
                  return (
                  <tr key={o._id || o.id}>
                    <td>{o.orderNumber || o.orderId || o._id || o.id}</td>
                    <td>{o.userName ?? `User #${o.userId ?? "—"}`}</td>
                    <td className="small">
                      {o.orderItems?.length ? `${o.orderItems.length} puja` : ""}
                      {o.orderItems?.length && o.productItems?.length ? ", " : ""}
                      {o.productItems?.length ? `${o.productItems.length} product(s)` : ""}
                      {!(o.orderItems?.length || o.productItems?.length) ? "—" : ""}
                    </td>
                    <td>₹{o.totalAmount ?? o.pricing?.totalAmount ?? "—"}</td>
                    <td><span className={`badge ${o.paymentStatus === "PAID" ? "bg-success" : "bg-warning"}`}>{o.paymentStatus ?? "PENDING"}</span></td>
                    <td><span className="badge bg-secondary">{currentStatus || "—"}</span></td>
                    <td className="small">{o.createdAt ? new Date(o.createdAt).toLocaleString() : "—"}</td>
                    <td className="small">{o.updatedAt ? new Date(o.updatedAt).toLocaleString() : "—"}</td>
                    <td>
                      <Form.Select
                        size="sm"
                        style={{ maxWidth: 200 }}
                        value={currentStatus}
                        onChange={(e) => updateStatus(o.id || o._id, e.target.value)}
                        disabled={updatingId === (o.id || o._id)}
                      >
                        {ORDER_STATUS.map((s) => (
                          <option key={s} value={s.toUpperCase().replace(/-/g, "_")}>{ORDER_STATUS_LABELS[s] || s}</option>
                        ))}
                      </Form.Select>
                    </td>
                  </tr>
                );})}
              </tbody>
            </Table>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
