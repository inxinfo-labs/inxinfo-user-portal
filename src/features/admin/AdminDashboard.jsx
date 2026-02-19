import { useState, useEffect } from "react";
import { Row, Col, Card, Alert, Spinner, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { FaBox, FaClipboardList, FaUserTie, FaPrayingHands, FaHistory, FaBook, FaExclamationTriangle, FaBell } from "react-icons/fa";

export default function AdminDashboard() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    api.get("/admin/orders")
      .then((r) => setRecentOrders((r.data?.data ?? r.data ?? []).slice(0, 5)))
      .catch(() => setRecentOrders([]))
      .finally(() => setLoadingRecent(false));
  }, []);

  return (
    <div className="py-4">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      <Alert variant="info" className="mb-4 d-flex align-items-start">
        <FaExclamationTriangle className="me-2 mt-1" />
        <div>
          <strong>Backend required.</strong> These pages call <code>/api/admin/*</code> APIs. Set <code>ADMIN_EMAIL</code> in order-service to receive email when a new order is placed.
        </div>
      </Alert>

      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card as={Link} to="/user/admin/products" className="border-0 shadow-sm h-100 text-decoration-none text-dark">
            <Card.Body className="text-center py-4">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{ width: 56, height: 56, background: "rgba(234, 88, 12, 0.15)", color: "var(--primary-600)" }}
              >
                <FaBox size={28} />
              </div>
              <Card.Title className="h6 mb-0">Products (Items)</Card.Title>
              <p className="small text-muted mb-0 mt-1">Add & manage products</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card as={Link} to="/user/admin/orders" className="border-0 shadow-sm h-100 text-decoration-none text-dark">
            <Card.Body className="text-center py-4">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{ width: 56, height: 56, background: "rgba(234, 88, 12, 0.15)", color: "var(--primary-600)" }}
              >
                <FaClipboardList size={28} />
              </div>
              <Card.Title className="h6 mb-0">Orders</Card.Title>
              <p className="small text-muted mb-0 mt-1">List & update status</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card as={Link} to="/user/admin/pandit" className="border-0 shadow-sm h-100 text-decoration-none text-dark">
            <Card.Body className="text-center py-4">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{ width: 56, height: 56, background: "rgba(234, 88, 12, 0.15)", color: "var(--primary-600)" }}
              >
                <FaUserTie size={28} />
              </div>
              <Card.Title className="h6 mb-0">Pandit Ji</Card.Title>
              <p className="small text-muted mb-0 mt-1">Add & manage pandits</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card as={Link} to="/user/admin/puja" className="border-0 shadow-sm h-100 text-decoration-none text-dark">
            <Card.Body className="text-center py-4">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{ width: 56, height: 56, background: "rgba(234, 88, 12, 0.15)", color: "var(--primary-600)" }}
              >
                <FaPrayingHands size={28} />
              </div>
              <Card.Title className="h6 mb-0">Puja Services</Card.Title>
              <p className="small text-muted mb-0 mt-1">Add & manage puja types</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card as={Link} to="/user/admin/audit" className="border-0 shadow-sm h-100 text-decoration-none text-dark">
            <Card.Body className="text-center py-4">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{ width: 56, height: 56, background: "rgba(234, 88, 12, 0.15)", color: "var(--primary-600)" }}
              >
                <FaHistory size={28} />
              </div>
              <Card.Title className="h6 mb-0">Audit Trail</Card.Title>
              <p className="small text-muted mb-0 mt-1">Track all changes by date &amp; user</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {recentOrders.length > 0 && (
        <Card className="border-0 shadow-sm mb-4">
          <Card.Header className="d-flex align-items-center justify-content-between bg-white border-0 py-3">
            <h5 className="mb-0 fw-bold d-flex align-items-center">
              <FaBell className="me-2 text-primary" />
              Recent orders (all users)
            </h5>
            <Link to="/user/admin/orders" className="btn btn-sm btn-outline-primary">View all</Link>
          </Card.Header>
          <Card.Body className="p-0">
            {loadingRecent ? (
              <div className="text-center py-4"><Spinner animation="border" size="sm" /></div>
            ) : (
              <table className="table table-hover mb-0">
                <thead><tr><th>Order</th><th>User</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id}>
                      <td>{o.orderNumber ?? `#${o.id}`}</td>
                      <td>{o.userName ?? `User #${o.userId}`}</td>
                      <td>₹{o.totalAmount ?? "—"}</td>
                      <td><Badge bg={o.paymentStatus === "PAID" ? "success" : "warning"}>{o.paymentStatus ?? "PENDING"}</Badge></td>
                      <td><Badge bg="secondary">{o.status ?? "—"}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card.Body>
        </Card>
      )}

      <Row className="mt-4">
        <Col>
          <Card as={Link} to="/docs" className="border-0 shadow-sm text-decoration-none text-dark">
            <Card.Body className="d-flex align-items-center">
              <FaBook className="me-3" style={{ fontSize: "1.5rem", color: "var(--primary-600)" }} />
              <div>
                <Card.Title className="h6 mb-0">Documentation</Card.Title>
                <p className="small text-muted mb-0">API reference, ritual types, categories, statuses</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
