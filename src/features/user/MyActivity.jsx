import { useEffect, useState } from "react";
import { Container, Card, Table, Badge, Spinner, Alert, Button, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { FaUserTie, FaPrayingHands, FaShoppingCart, FaRupeeSign, FaArrowLeft, FaEye } from "react-icons/fa";
import AdSlot from "../../components/AdSlot";

const LIMIT = 5;

function PanditBookingsSection({ bookings, loading, error }) {
  const navigate = useNavigate();
  const statusVariant = (s) => ({ PENDING: "warning", CONFIRMED: "success", IN_PROGRESS: "info", COMPLETED: "primary", CANCELLED: "danger" }[s] || "secondary");
  if (loading) return <div className="text-center py-4"><Spinner animation="border" size="sm" /></div>;
  if (error) return <Alert variant="danger" className="mb-0">{error}</Alert>;
  if (!bookings?.length) return <p className="text-muted mb-0">No PanditJi bookings yet.</p>;
  return (
    <>
      <Table responsive className="mb-0">
        <thead><tr><th>Pandit</th><th>Date</th><th>Time</th><th>Amount</th><th>Status</th><th className="text-end">Action</th></tr></thead>
        <tbody>
          {bookings.slice(0, LIMIT).map((b) => (
            <tr key={b.id}>
              <td>{b.pandit?.name ?? "—"}</td>
              <td>{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "—"}</td>
              <td>{b.startTime ? `${b.startTime}–${b.endTime}` : "—"}</td>
              <td><FaRupeeSign className="me-1" />{b.totalAmount ?? "—"}</td>
              <td><Badge bg={statusVariant(b.status)}>{b.status ?? "—"}</Badge></td>
              <td className="text-end">{b.status === "PENDING" && <Button size="sm" variant="outline-primary" onClick={() => navigate(`/user/pandit/booking/${b.id}/pay`)}>Pay</Button>}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {(bookings.length > LIMIT || bookings.length > 0) && (
        <div className="p-2 border-top bg-light">
          <Button variant="link" size="sm" className="p-0 text-decoration-none" onClick={() => navigate("/user/pandit/bookings")}>
            View all PanditJi bookings ({bookings.length})
          </Button>
        </div>
      )}
    </>
  );
}

function PujaBookingsSection({ bookings, loading, error }) {
  const navigate = useNavigate();
  const statusVariant = (s) => ({ PENDING: "warning", CONFIRMED: "success", IN_PROGRESS: "info", COMPLETED: "primary", CANCELLED: "danger" }[s] || "secondary");
  if (loading) return <div className="text-center py-4"><Spinner animation="border" size="sm" /></div>;
  if (error) return <Alert variant="danger" className="mb-0">{error}</Alert>;
  if (!bookings?.length) return <p className="text-muted mb-0">No puja bookings yet.</p>;
  return (
    <>
      <Table responsive className="mb-0">
        <thead><tr><th>Puja</th><th>Date</th><th>Time</th><th>Amount</th><th>Status</th><th className="text-end">Address</th></tr></thead>
        <tbody>
          {bookings.slice(0, LIMIT).map((b) => (
            <tr key={b.id}>
              <td>{b.pujaType?.name ?? "—"}</td>
              <td>{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "—"}</td>
              <td>{b.bookingTime ?? "—"}</td>
              <td><FaRupeeSign className="me-1" />{b.totalAmount ?? "—"}</td>
              <td><Badge bg={statusVariant(b.status)}>{b.status ?? "—"}</Badge></td>
              <td className="text-muted small text-end">{[b.address, b.city].filter(Boolean).join(", ") || "—"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {(bookings.length > LIMIT || bookings.length > 0) && (
        <div className="p-2 border-top bg-light">
          <Button variant="link" size="sm" className="p-0 text-decoration-none" onClick={() => navigate("/user/puja/bookings")}>
            View all puja bookings ({bookings.length})
          </Button>
        </div>
      )}
    </>
  );
}

function OrdersSection({ orders, loading, error }) {
  const navigate = useNavigate();
  const statusVariant = (s) => ({ PENDING: "warning", CONFIRMED: "success", PROCESSING: "info", SHIPPED: "primary", DELIVERED: "success", CANCELLED: "danger", REFUNDED: "secondary" }[s] || "secondary");
  if (loading) return <div className="text-center py-4"><Spinner animation="border" size="sm" /></div>;
  if (error) return <Alert variant="danger" className="mb-0">{error}</Alert>;
  if (!orders?.length) return <p className="text-muted mb-0">No orders yet.</p>;
  return (
    <>
      <Table responsive className="mb-0">
        <thead><tr><th>Order</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th><th className="text-end">Action</th></tr></thead>
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
              <td className="text-end"><Button size="sm" variant="outline-primary" onClick={() => navigate(`/user/order/${o.id}`)}><FaEye /> View</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      {(orders.length > LIMIT || orders.length > 0) && (
        <div className="p-2 border-top bg-light">
          <Button variant="link" size="sm" className="p-0 text-decoration-none" onClick={() => navigate("/user/order")}>
            View all orders ({orders.length})
          </Button>
        </div>
      )}
    </>
  );
}

export default function MyActivity() {
  const navigate = useNavigate();
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

  const allLoaded = !loadingPandit && !loadingPuja && !loadingOrders;
  const hasNoActivity =
    allLoaded &&
    (!orders?.length && !panditBookings?.length && !pujaBookings?.length);

  useEffect(() => {
    if (hasNoActivity) {
      navigate("/user/home", {
        replace: true,
        state: {
          message:
            "You don't have any activity yet. Book a puja, order products, or book a Pandit Ji to see your activity here.",
        },
      });
    }
  }, [hasNoActivity, navigate]);

  const activityAsOf = new Date().toLocaleString();

  if (hasNoActivity) {
    return (
      <Container className="my-4 text-center py-5">
        <Spinner animation="border" size="sm" />
        <p className="text-muted small mt-2">Redirecting...</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
        <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1" onClick={() => navigate(-1)} aria-label="Go back">
          <FaArrowLeft /> Back
        </Button>
        <div>
          <h2 className="mb-0 fw-bold">My Activity</h2>
          <p className="text-muted small mb-0 mt-1">Orders, PanditJi &amp; Puja bookings</p>
        </div>
      </div>
      <p className="text-muted small mb-4">Activity as of: <strong>{activityAsOf}</strong></p>

      <Row>
        <Col lg={8}>
          {(loadingOrders || orders.length > 0) && (
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-white d-flex align-items-center justify-content-between flex-wrap">
                <span><FaShoppingCart className="me-2 text-primary" /><strong>Orders</strong></span>
                <span className="text-muted small">{orders.length} total</span>
              </Card.Header>
              <Card.Body className="p-0">
                <OrdersSection orders={orders} loading={loadingOrders} error={errorOrders} />
              </Card.Body>
            </Card>
          )}

          {(loadingPandit || panditBookings.length > 0) && (
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-white d-flex align-items-center justify-content-between flex-wrap">
                <span><FaUserTie className="me-2 text-primary" /><strong>PanditJi bookings</strong></span>
                <span className="text-muted small">{panditBookings.length} total</span>
              </Card.Header>
              <Card.Body className="p-0">
                <PanditBookingsSection bookings={panditBookings} loading={loadingPandit} error={errorPandit} />
              </Card.Body>
            </Card>
          )}

          {(loadingPuja || pujaBookings.length > 0) && (
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-white d-flex align-items-center justify-content-between flex-wrap">
                <span><FaPrayingHands className="me-2 text-primary" /><strong>Puja bookings</strong></span>
                <span className="text-muted small">{pujaBookings.length} total</span>
              </Card.Header>
              <Card.Body className="p-0">
                <PujaBookingsSection bookings={pujaBookings} loading={loadingPuja} error={errorPuja} />
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Summary</h5>
              <div className="text-muted small mb-2">As of {activityAsOf}</div>
              {orders.length > 0 && (
                <div className="d-flex justify-content-between mb-2"><span>Orders</span><span>{orders.length}</span></div>
              )}
              {panditBookings.length > 0 && (
                <div className="d-flex justify-content-between mb-2"><span>PanditJi bookings</span><span>{panditBookings.length}</span></div>
              )}
              {pujaBookings.length > 0 && (
                <div className="d-flex justify-content-between mb-3"><span>Puja bookings</span><span>{pujaBookings.length}</span></div>
              )}
              {orders.length > 0 && (
                <Link
                  to="/user/order"
                  className="d-flex align-items-center justify-content-center gap-2 w-100 py-2 mb-2 text-decoration-none border rounded"
                  style={{ color: "#475569", borderColor: "#e2e8f0", fontSize: "0.9rem" }}
                >
                  <FaShoppingCart /> All orders
                </Link>
              )}
              {panditBookings.length > 0 && (
                <Link
                  to="/user/pandit/bookings"
                  className="d-flex align-items-center justify-content-center gap-2 w-100 py-2 mb-2 text-decoration-none border rounded"
                  style={{ color: "#475569", borderColor: "#e2e8f0", fontSize: "0.9rem" }}
                >
                  <FaUserTie /> PanditJi bookings
                </Link>
              )}
              {pujaBookings.length > 0 && (
                <Link
                  to="/user/puja/bookings"
                  className="d-flex align-items-center justify-content-center gap-2 w-100 py-2 text-decoration-none border rounded"
                  style={{ color: "#475569", borderColor: "#e2e8f0", fontSize: "0.9rem" }}
                >
                  <FaPrayingHands /> Puja bookings
                </Link>
              )}
            </Card.Body>
          </Card>
          <div className="mt-4">
            <AdSlot size="sidebar" slotId="activity-sidebar" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
