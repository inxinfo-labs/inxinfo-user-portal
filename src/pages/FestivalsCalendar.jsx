import { useState, useMemo } from "react";
import { Container, Card, Row, Col, Badge, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FESTIVALS, getUpcomingFestivals } from "../data/festivals";
import { FaCalendarAlt, FaPrayingHands, FaUserTie, FaBox, FaShoppingCart } from "react-icons/fa";
import { useServiceModal, SERVICE_TYPES } from "../context/ServiceModalContext";

export default function FestivalsCalendar() {
  const { openService } = useServiceModal();
  const [showPast, setShowPast] = useState(false);
  const list = useMemo(() => getUpcomingFestivals(showPast), [showPast]);

  const byMonth = list.reduce((acc, f) => {
    const monthKey = f.date.slice(0, 7);
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(f);
    return acc;
  }, {});

  const monthNames = {
    "01": "January", "02": "February", "03": "March", "04": "April",
    "05": "May", "06": "June", "07": "July", "08": "August",
    "09": "September", "10": "October", "11": "November", "12": "December",
  };

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-2 d-flex align-items-center gap-2">
          <FaCalendarAlt className="text-primary" />
          Festivals &amp; Puja Calendar
        </h1>
        <p className="text-muted mb-0">
          Upcoming Hindu festivals and puja dates for the year. Dates are approximate and may vary by region.
        </p>
      </div>

      <Card className="mb-4 border-0 shadow-sm" style={{ borderRadius: "12px", border: "2px solid var(--bs-primary)" }}>
        <Card.Header className="bg-white border-0 py-3 fw-bold text-primary" style={{ fontSize: "1.1rem" }}>
          Book for festivals &amp; occasions
        </Card.Header>
        <Card.Body className="py-4">
          <p className="text-muted small mb-3">
            Plan your puja, book a PanditJi, or order puja items. Click below to see the puja list, book a pandit, or shop products.
          </p>
          <Row className="g-3">
            <Col xs={12} md={4}>
              <Button
                variant="primary"
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                style={{ borderRadius: "10px", background: "var(--gradient-primary)", border: "none" }}
                onClick={() => openService(SERVICE_TYPES.PUJA)}
              >
                <FaPrayingHands size={20} />
                Puja Services
              </Button>
              <small className="text-muted d-block mt-1 text-center">View puja list &amp; book puja</small>
            </Col>
            <Col xs={12} md={4}>
              <Button
                variant="outline-primary"
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                style={{ borderRadius: "10px" }}
                onClick={() => openService(SERVICE_TYPES.PANDIT)}
              >
                <FaUserTie size={20} />
                Book PanditJi
              </Button>
              <small className="text-muted d-block mt-1 text-center">Book a pandit for your puja</small>
            </Col>
            <Col xs={12} md={4}>
              <Button
                variant="outline-primary"
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                style={{ borderRadius: "10px" }}
                onClick={() => openService(SERVICE_TYPES.PRODUCTS)}
              >
                <FaBox size={20} />
                Puja items &amp; Products
              </Button>
              <small className="text-muted d-block mt-1 text-center">Samagri, idols &amp; more</small>
            </Col>
          </Row>
          <div className="mt-3 pt-3 border-top text-center">
            <Link to="/user/order/create" className="btn btn-link text-decoration-none d-inline-flex align-items-center gap-2">
              <FaShoppingCart /> Create order (puja + products)
            </Link>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <Form.Check
            type="switch"
            id="show-past"
            label="Include past dates"
            checked={showPast}
            onChange={(e) => setShowPast(e.target.checked)}
          />
          <span className="text-muted small">
            {list.length} event{list.length !== 1 ? "s" : ""} shown
          </span>
        </Card.Body>
      </Card>

      {list.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center text-muted py-5">
            No upcoming events to show. Toggle &quot;Include past dates&quot; to see the full year.
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          {Object.entries(byMonth)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([monthKey, events]) => {
              const [y, m] = monthKey.split("-");
              const monthName = monthNames[m] || monthKey;
              return (
                <Col md={6} lg={4} key={monthKey}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Header
                      className="bg-white border-0 py-3 fw-bold text-primary"
                      style={{ borderBottom: "2px solid var(--bs-primary)" }}
                    >
                      {monthName} {y}
                    </Card.Header>
                    <Card.Body className="p-0">
                      <ul className="list-group list-group-flush mb-0">
                        {events.map((ev) => (
                          <li
                            key={`${ev.date}-${ev.name}`}
                            className="list-group-item d-flex align-items-center justify-content-between flex-wrap gap-2 border-0 py-3 px-3"
                          >
                            <div>
                              <span className="fw-semibold">{ev.name}</span>
                              <span className="text-muted small ms-2">
                                {new Date(ev.date + "T12:00:00").toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </span>
                            </div>
                            <Badge
                              bg={ev.type === "Puja" ? "primary" : "secondary"}
                              className="d-flex align-items-center gap-1"
                            >
                              {ev.type === "Puja" && <FaPrayingHands size={10} />}
                              {ev.type}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      )}

      <p className="text-muted small mt-4 mb-0">
        Dates are indicative. For exact tithi and muhurat, please refer to your local panchang or priest.
      </p>
    </Container>
  );
}
