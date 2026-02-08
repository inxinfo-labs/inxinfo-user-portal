import { Row, Col, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBox, FaClipboardList, FaUserTie, FaPrayingHands, FaBook, FaExclamationTriangle } from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <div className="py-4">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      <Alert variant="info" className="mb-4 d-flex align-items-start">
        <FaExclamationTriangle className="me-2 mt-1" />
        <div>
          <strong>Backend required.</strong> These pages call <code>/api/admin/*</code> APIs. Ensure your backend
          exposes: <code>GET/POST /admin/products</code>, <code>GET/PATCH /admin/orders</code>,{" "}
          <code>GET/POST /admin/pandit</code>, <code>GET/POST /admin/puja</code>. If APIs are not implemented yet,
          you will see errors when listing or adding.
        </div>
      </Alert>

      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card as={Link} to="/user/admin/products" className="border-0 shadow-sm h-100 text-decoration-none text-dark">
            <Card.Body className="text-center py-4">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{ width: 56, height: 56, background: "rgba(13, 148, 136, 0.15)", color: "#0d9488" }}
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
                style={{ width: 56, height: 56, background: "rgba(13, 148, 136, 0.15)", color: "#0d9488" }}
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
                style={{ width: 56, height: 56, background: "rgba(13, 148, 136, 0.15)", color: "#0d9488" }}
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
                style={{ width: 56, height: 56, background: "rgba(13, 148, 136, 0.15)", color: "#0d9488" }}
              >
                <FaPrayingHands size={28} />
              </div>
              <Card.Title className="h6 mb-0">Puja Services</Card.Title>
              <p className="small text-muted mb-0 mt-1">Add & manage puja types</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card as={Link} to="/docs" className="border-0 shadow-sm text-decoration-none text-dark">
            <Card.Body className="d-flex align-items-center">
              <FaBook className="me-3" style={{ fontSize: "1.5rem", color: "#0d9488" }} />
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
