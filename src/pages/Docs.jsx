import { Container, Card, Row, Col, ListGroup } from "react-bootstrap";
import {
  FaUserShield,
  FaUser,
  FaPrayingHands,
  FaShoppingCart,
  FaUserTie,
  FaBook,
  FaBox,
  FaClipboardList,
  FaListUl,
} from "react-icons/fa";
import {
  RITUAL_TYPES,
  PRODUCT_CATEGORIES,
  BOOKING_STATUS_LABELS,
  ORDER_STATUS_LABELS,
} from "../constants";

export default function Docs() {
  return (
    <div className="py-5">
      <Container>
        <div className="text-center mb-5">
          <FaBook className="mb-3" style={{ fontSize: "3rem", color: "var(--primary-600)" }} />
          <h1 className="fw-bold">Documentation</h1>
          <p className="text-muted">Admin setup, catalog management, and how customers use the portal.</p>
        </div>

        <Row className="g-4">
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
              <Card.Header
                className="border-0 py-3 d-flex align-items-center"
                style={{
                  background: "var(--gradient-primary)",
                  color: "white",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <FaUserShield className="me-2" />
                <span className="fw-bold">Admin User</span>
              </Card.Header>
              <Card.Body className="p-4">
                <p className="mb-2">
                  Use this <strong>admin user</strong> (backend must seed it with role <code>ADMIN</code>):
                </p>
                <ul className="mb-0">
                  <li><strong>Email:</strong> admin@inxinfo.com</li>
                  <li><strong>Password:</strong> Admin@123</li>
                </ul>
                <p className="mt-3 mb-0 small text-muted">
                  Log in with this account to access admin features and Documentation. If login fails, ensure the
                  backend has seeded the admin user and set <code>role</code> to <code>ADMIN</code> (or{" "}
                  <code>isAdmin: true</code>) for that user.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
              <Card.Header
                className="border-0 py-3 d-flex align-items-center"
                style={{
                  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <FaUser className="me-2 text-teal" />
                <span className="fw-bold">Customer (Logged In)</span>
              </Card.Header>
              <Card.Body className="p-4">
                <p className="mb-2">When a <strong>customer</strong> is logged in, they can:</p>
                <ul className="mb-0">
                  <li>Browse and search <strong>Puja services</strong> (by ritual type)</li>
                  <li>View and place <strong>Orders</strong> (products/items)</li>
                  <li>Discover and book <strong>Pandit Ji</strong> (by ritual type & location)</li>
                  <li>See <strong>Bookings</strong> and Orders from the user dashboard</li>
                </ul>
                <p className="mt-3 mb-0 small text-muted">
                  Menu: Search, Puja, Orders, Pandit Ji.
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* How to add as Admin */}
          <Col lg={12}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
              <Card.Header
                className="border-0 py-3"
                style={{
                  background: "var(--gradient-primary)",
                  color: "white",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <h5 className="mb-0 fw-bold">As Admin: How to Add Items, Orders, Pandit Ji & Puja Types</h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Row>
                  <Col md={6} className="mb-4">
                    <h6 className="d-flex align-items-center mb-3">
                      <FaBox className="me-2 text-teal" /> 1. Products (Items)
                    </h6>
                    <p className="small mb-2">
                      Add sellable <strong>products</strong> so customers can order them. Use admin API to create
                      products with: <code>name</code>, <code>description</code>, <code>category</code>,{" "}
                      <code>price</code>, <code>discountPrice</code>, <code>inventory.stock</code>, images, etc.
                    </p>
                    <p className="small mb-1 fw-semibold">Categories (use one per product):</p>
                    <ul className="small text-muted mb-0" style={{ columnCount: 2 }}>
                      {PRODUCT_CATEGORIES.map((c) => (
                        <li key={c.value}>{c.displayName}</li>
                      ))}
                    </ul>
                    <p className="small mt-2 mb-0">
                      <strong>API:</strong> <code>POST /api/admin/products</code> or <code>/api/admin/items</code> (as per backend).
                    </p>
                  </Col>
                  <Col md={6} className="mb-4">
                    <h6 className="d-flex align-items-center mb-3">
                      <FaClipboardList className="me-2 text-teal" /> 2. Orders
                    </h6>
                    <p className="small mb-2">
                      <strong>Orders</strong> are created by customers when they place an order. As admin you can:
                    </p>
                    <ul className="small mb-2">
                      <li>List orders: <code>GET /api/admin/orders</code></li>
                      <li>Update order status (e.g. confirmed, shipped, delivered)</li>
                      <li>Add tracking, update payment status</li>
                    </ul>
                    <p className="small mb-1 fw-semibold">Order statuses:</p>
                    <ul className="small text-muted mb-0" style={{ fontSize: "0.8rem" }}>
                      {Object.entries(ORDER_STATUS_LABELS).slice(0, 6).map(([k, v]) => (
                        <li key={k}><code>{k}</code>: {v}</li>
                      ))}
                      <li className="text-muted">… and more (cancelled, returned, refunded, etc.)</li>
                    </ul>
                  </Col>
                  <Col md={6} className="mb-4">
                    <h6 className="d-flex align-items-center mb-3">
                      <FaUserTie className="me-2 text-teal" /> 3. Pandit Ji
                    </h6>
                    <p className="small mb-2">
                      Add a <strong>Pandit</strong> by linking a <code>User</code> and filling profile:{" "}
                      <code>profile.displayName</code>, <code>profile.bio</code>, <code>profile.experience</code>,{" "}
                      <code>location</code> (city, state, pincode, coordinates), <code>specializations</code> (ritual
                      type + basePrice + duration), <code>languages</code>, <code>availability</code> (working days,
                      hours), <code>pricing</code> (minimumCharge, travelCharges).
                    </p>
                    <p className="small mb-0">
                      <strong>API:</strong> <code>POST /api/admin/pandit</code>. Ritual types in specializations
                      must be from the Puja types list below.
                    </p>
                  </Col>
                  <Col md={6} className="mb-4">
                    <h6 className="d-flex align-items-center mb-3">
                      <FaPrayingHands className="me-2 text-teal" /> 4. Puja Types (Ritual Types) &amp; Puja Services
                    </h6>
                    <p className="small mb-2">
                      <strong>Ritual types</strong> are used in Bookings and in Pandit specializations. Use them when
                      creating “Puja services” in the catalog or when configuring what a Pandit offers. Supported
                      types (same as Booking and Pandit schema):
                    </p>
                    <ListGroup className="small mb-0" style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {RITUAL_TYPES.map((t) => (
                        <ListGroup.Item key={t.value} className="py-1">{t.displayName}</ListGroup.Item>
                      ))}
                    </ListGroup>
                    <p className="small mt-2 mb-0">
                      <strong>API:</strong> <code>POST /api/admin/puja</code> to add a puja service (name, ritual type,
                      description, price, etc.).
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Admin APIs */}
          <Col lg={12}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
              <Card.Header
                className="border-0 py-3"
                style={{
                  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <h5 className="mb-0 fw-bold">Admin APIs (Backend)</h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Row>
                  <Col md={3}>
                    <div className="d-flex align-items-center mb-2">
                      <FaPrayingHands className="me-2 text-teal" />
                      <strong>Puja services</strong>
                    </div>
                    <code className="small">/api/admin/puja</code>
                    <p className="small text-muted mt-1 mb-0">Create, update, delete puja services (ritual types).</p>
                  </Col>
                  <Col md={3}>
                    <div className="d-flex align-items-center mb-2">
                      <FaShoppingCart className="me-2 text-teal" />
                      <strong>Products (Items)</strong>
                    </div>
                    <code className="small">/api/admin/products</code>
                    <p className="small text-muted mt-1 mb-0">Add/edit products; categories as per Product schema.</p>
                  </Col>
                  <Col md={3}>
                    <div className="d-flex align-items-center mb-2">
                      <FaUserTie className="me-2 text-teal" />
                      <strong>Pandit Ji</strong>
                    </div>
                    <code className="small">/api/admin/pandit</code>
                    <p className="small text-muted mt-1 mb-0">Add and manage Pandit profiles &amp; specializations.</p>
                  </Col>
                  <Col md={3}>
                    <div className="d-flex align-items-center mb-2">
                      <FaClipboardList className="me-2 text-teal" />
                      <strong>Orders / Bookings</strong>
                    </div>
                    <code className="small">/api/admin/orders</code>, <code>/api/admin/bookings</code>
                    <p className="small text-muted mt-1 mb-0">List and update order/booking status.</p>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 small text-muted">
                  Run the full application so these admin routes and customer-facing <code>/api/puja</code>,{" "}
                  <code>/api/pandit</code>, <code>/api/orders</code>, <code>/api/bookings</code> are available.
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* Reference: Booking & Order statuses */}
          <Col lg={12}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
              <Card.Header
                className="border-0 py-3 d-flex align-items-center"
                style={{
                  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <FaListUl className="me-2 text-teal" />
                <span className="fw-bold">Reference: Booking &amp; Order Statuses</span>
              </Card.Header>
              <Card.Body className="p-4">
                <Row>
                  <Col md={6}>
                    <h6 className="small fw-bold text-muted mb-2">Booking status</h6>
                    <ul className="small mb-0">
                      {Object.entries(BOOKING_STATUS_LABELS).map(([k, v]) => (
                        <li key={k}><code>{k}</code> — {v}</li>
                      ))}
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h6 className="small fw-bold text-muted mb-2">Order status</h6>
                    <ul className="small mb-0">
                      {Object.entries(ORDER_STATUS_LABELS).map(([k, v]) => (
                        <li key={k}><code>{k}</code> — {v}</li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
