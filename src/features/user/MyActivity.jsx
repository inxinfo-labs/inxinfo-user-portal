import { useEffect, useState } from "react";
import { Container, Card, Tab, Tabs, Table, Badge, Spinner, Alert, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FaUserTie, FaPrayingHands, FaShoppingCart, FaRupeeSign, FaArrowLeft, FaEye } from "react-icons/fa";

const LIMIT = 10;

function PanditBookingsSection({ bookings, loading, error }) {
  const navigate = useNavigate();
  const statusVariant = (s) => ({ PENDING: "warning", CONFIRMED: "success", IN_PROGRESS: "info", COMPLETED: "primary", CANCELLED: "danger" }[s] || "secondary");
  if (loading) return <div className="text-center py-4"><Spinner animation="border" size="sm" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!bookings?.length) return <p className="text-muted mb-0">No PanditJi bookings yet.</p>;
  return (
    <>
      <Table size="sm" hover className="mb-0">
        <thead><tr><th>Pandit</th><th>Date</th><th>Time</th><th>Amount</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {bookings.slice(0, LIMIT).map((b) => (
            <tr key={b.id}>
              <td>{b.pandit?.name ?? "—"}</td>
              <td>{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "—"}</td>
              <td>{b.startTime ? `${b.startTime}–${b.endTime}` : "—"}</td>
              <td><FaRupeeSign className="me-1" />{b.totalAmount ?? "—"}</td>
              <td><Badge bg={statusVariant(b.status)}>{b.status ?? "—"}</Badge></td>
              <td>{b.status === "PENDING" && <Button size="sm" variant="outline-primary" onClick={() => navigate(`/user/pandit/booking/${b.id}/pay`)}>Pay</Button>}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {bookings.length > LIMIT && <p className="text-muted small mt-2 mb-0">Showing last {LIMIT}. <Button variant="link" className="p-0" onClick={() => navigate("/user/pandit/bookings")}>View all</Button></p>}
      {bookings.length <= LIMIT && bookings.length > 0 && <Button variant="link" size="sm" className="p-0 mt-2" onClick={() => navigate("/user/pandit/bookings")}>View all PanditJi bookings</Button>}
    </>
  );
}

function PujaBookingsSection({ bookings, loading, error }) {
  const navigate = useNavigate();
  const statusVariant = (s) => ({ PENDING: "warning", CONFIRMED: "success", IN_PROGRESS: "info", COMPLETED: "primary", CANCELLED: "danger" }[s] || "secondary");
  if (loading) return <div className="text-center py-4"><Spinner animation="border" size="sm" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!bookings?.length) return <p className="text-muted mb-0">No puja bookings yet.</p>;
  return (
    <>
      <Table size="sm" hover className="mb-0">
        <thead><tr><th>Puja</th><th>Date</th><th>Time</th><th>Amount</th><th>Status</th><th>Address</th></tr></thead>
        <tbody>
          {bookings.slice(0, LIMIT).map((b) => (
            <tr key={b.id}>
              <td>{b.pujaType?.name ?? "—"}</td>
              <td>{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "—"}</td>
              <td>{b.bookingTime ?? "—"}</td>
              <td><FaRupeeSign className="me-1" />{b.totalAmount ?? "—"}</td>
              <td><Badge bg={statusVariant(b.status)}>{b.status ?? "—"}</Badge></td>
              <td className="text-muted small">{[b.address, b.city].filter(Boolean).join(", ") || "—"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {(bookings.length > LIMIT || bookings.length > 0) && <Button variant="link" size="sm" className="p-0 mt-2" onClick={() => navigate("/user/puja/bookings")}>View all puja bookings</Button>}
    </>
  );
}

function OrdersSection({ orders, loading, error }) {
  const navigate = useNavigate();
  const statusVariant = (s) => ({ PENDING: "warning", CONFIRMED: "success", PROCESSING: "info", SHIPPED: "primary", DELIVERED: "success", CANCELLED: "danger", REFUNDED: "secondary" }[s] || "secondary");
  if (loading) return <div className="text-center py-4"><Spinner animation="border" size="sm" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!orders?.length) return <p className="text-muted mb-0">No orders yet.</p>;
  return (
    <>
      <Table size="sm" hover className="mb-0">
        <thead><tr><th>Order</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Date &amp; Time</th><th></th></tr></thead>
        <tbody>
          {orders.slice(0, LIMIT).map((o) => (
            <tr key={o.id}>
              <td>{o.orderNumber ?? `#${o.id}`}</td>
              <td className="small">
                {o.orderItems?.length ? `${o.orderItems.length} puja` : ""}
                {(o.orderItems?.length && o.productItems?.length) ? ", " : ""}
                {o.productItems?.length ? `${o.productItems.length} product(s)` : ""}
                {!(o.orderItems?.length || o.productItems?.length) ? "—" : ""}
              </td>
              <td><FaRupeeSign className="me-1" />{o.totalAmount ?? "—"}</td>
              <td><Badge bg={o.paymentStatus === "PAID" ? "success" : "warning"}>{o.paymentStatus ?? "PENDING"}</Badge></td>
              <td><Badge bg={statusVariant(o.status)}>{o.status ?? "—"}</Badge></td>
              <td className="small">{o.createdAt ? new Date(o.createdAt).toLocaleString() : "—"}</td>
              <td><Button size="sm" variant="outline-primary" onClick={() => navigate(`/user/order/${o.id}`)}><FaEye /> View</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      {(orders.length > LIMIT || orders.length > 0) && <Button variant="link" size="sm" className="p-0 mt-2" onClick={() => navigate("/user/order")}>View all orders</Button>}
    </>
  );
}

export default function MyActivity() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [panditBookings, setPanditBookings] = useState([]);
  const [pujaBookings, setPujaBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingPandit, setLoadingPandit] = useState(true);
  const [loadingPuja, setLoadingPuja] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorPandit, setErrorPandit] = useState(null);
  const [errorPuja, setErrorPuja] = useState(null);
  const [errorOrders, setErrorOrders] = useState(null);

  useEffect(() => {
    api.get("/pandit/bookings").then((r) => {
      setPanditBookings(r.data?.data ?? r.data ?? []);
      setErrorPandit(null);
    }).catch(() => setErrorPandit("Failed to load PanditJi bookings")).finally(() => setLoadingPandit(false));
  }, []);
  useEffect(() => {
    api.get("/puja/bookings").then((r) => {
      setPujaBookings(r.data?.data ?? r.data ?? []);
      setErrorPuja(null);
    }).catch(() => setErrorPuja("Failed to load puja bookings")).finally(() => setLoadingPuja(false));
  }, []);
  useEffect(() => {
    api.get("/orders").then((r) => {
      setOrders(r.data?.data ?? r.data ?? []);
      setErrorOrders(null);
    }).catch(() => setErrorOrders("Failed to load orders")).finally(() => setLoadingOrders(false));
  }, []);

  return (
    <Container className="my-4">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center gap-1"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FaArrowLeft /> Back
          </Button>
          <div>
            <h2 className="mb-0 fw-bold">My Activity</h2>
            <p className="text-muted small mb-0 mt-1">Orders, PanditJi &amp; Puja bookings</p>
          </div>
        </div>
      </div>

      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("orders")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActiveTab("orders")}
          >
            <Card.Body className="py-3 text-center">
              <FaShoppingCart className="text-primary mb-2" style={{ fontSize: "1.5rem" }} />
              <div className="fw-bold fs-4">{orders.length}</div>
              <small className="text-muted">Orders</small>
              <div className="small text-teal mt-1">Click to filter</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("pandit")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActiveTab("pandit")}
          >
            <Card.Body className="py-3 text-center">
              <FaUserTie className="text-primary mb-2" style={{ fontSize: "1.5rem" }} />
              <div className="fw-bold fs-4">{panditBookings.length}</div>
              <small className="text-muted">PanditJi bookings</small>
              <div className="small text-teal mt-1">Click to filter</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("puja")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActiveTab("puja")}
          >
            <Card.Body className="py-3 text-center">
              <FaPrayingHands className="text-primary mb-2" style={{ fontSize: "1.5rem" }} />
              <div className="fw-bold fs-4">{pujaBookings.length}</div>
              <small className="text-muted">Puja bookings</small>
              <div className="small text-teal mt-1">Click to filter</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Body className="pt-3">
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-0 border-0" id="my-activity-tabs">
            <Tab eventKey="orders" title={<><FaShoppingCart className="me-1" /> Orders ({orders.length})</>}>
              <div className="pt-3">
                <OrdersSection orders={orders} loading={loadingOrders} error={errorOrders} />
              </div>
            </Tab>
            <Tab eventKey="pandit" title={<><FaUserTie className="me-1" /> PanditJi Bookings ({panditBookings.length})</>}>
              <div className="pt-3">
                <PanditBookingsSection bookings={panditBookings} loading={loadingPandit} error={errorPandit} />
              </div>
            </Tab>
            <Tab eventKey="puja" title={<><FaPrayingHands className="me-1" /> Puja Bookings ({pujaBookings.length})</>}>
              <div className="pt-3">
                <PujaBookingsSection bookings={pujaBookings} loading={loadingPuja} error={errorPuja} />
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
}
