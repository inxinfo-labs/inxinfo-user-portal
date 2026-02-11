import { useState, useMemo } from "react";
import { Container, Card, Row, Col, Badge, Form, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FESTIVALS, getUpcomingFestivals } from "../data/festivals";
import { FaCalendarAlt, FaPrayingHands, FaUserTie, FaBox, FaShoppingCart, FaShareAlt } from "react-icons/fa";
import { useServiceModal, SERVICE_TYPES } from "../context/ServiceModalContext";

export default function FestivalsCalendar() {
  const { openService } = useServiceModal();
  const navigate = useNavigate();
  const [showPast, setShowPast] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [shareFeedback, setShareFeedback] = useState(null);
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

  const formatEventDate = (dateStr) =>
    new Date(dateStr + "T12:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const handleShare = async (ev) => {
    setShareFeedback(null);
    const text = ev ? `${ev.name} – ${formatEventDate(ev.date)}. Book puja or Pandit Ji at INXINFO Labs.` : "Festivals & Puja Calendar – INXINFO Labs";
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: "INXINFO Labs Calendar", text, url });
        setShareFeedback("Shared!");
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setShareFeedback("Link copied to clipboard");
      }
    } catch (e) {
      if (e.name !== "AbortError") setShareFeedback("Could not share");
    }
  };

  return (
    <Container className="py-4">
      <div className="mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div>
          <h1 className="fw-bold mb-2 d-flex align-items-center gap-2">
            <FaCalendarAlt className="text-primary" />
            Festivals &amp; Puja Calendar
          </h1>
          <p className="text-muted mb-0">
            Upcoming Hindu festivals and puja dates. Select a date or click an event to book puja, Pandit Ji, or order samagri.
          </p>
        </div>
        <Button
          variant="outline-primary"
          className="d-flex align-items-center gap-2"
          style={{ borderRadius: "10px" }}
          onClick={() => handleShare()}
        >
          <FaShareAlt /> Share calendar
        </Button>
        {shareFeedback && <span className="text-muted small">{shareFeedback}</span>}
      </div>

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
                            role="button"
                            tabIndex={0}
                            className="list-group-item d-flex align-items-center justify-content-between flex-wrap gap-2 border-0 py-3 px-3 calendar-event-item"
                            style={{ cursor: "pointer" }}
                            onClick={() => setSelectedEvent(ev)}
                            onKeyDown={(e) => e.key === "Enter" && setSelectedEvent(ev)}
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

      {/* Modal: select event → Book (Puja / Pandit / Products) or Share */}
      <Modal
        show={!!selectedEvent}
        onHide={() => setSelectedEvent(null)}
        centered
        style={{ borderRadius: "16px" }}
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold" style={{ color: "var(--primary-800)" }}>
            {selectedEvent?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          {selectedEvent && (
            <>
              <p className="text-muted mb-4">
                {formatEventDate(selectedEvent.date)} · {selectedEvent.type}
              </p>
              <p className="small text-muted mb-4">
                Book a puja service, Pandit Ji, or order puja samagri for this occasion.
              </p>
              <Row className="g-2">
                <Col xs={12}>
                  <Button
                    variant="primary"
                    className="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                    style={{ borderRadius: "10px", background: "var(--gradient-primary)", border: "none" }}
                    onClick={() => { setSelectedEvent(null); openService(SERVICE_TYPES.PUJA); }}
                  >
                    <FaPrayingHands size={18} /> Puja Services
                  </Button>
                </Col>
                <Col xs={12}>
                  <Button
                    variant="outline-primary"
                    className="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                    style={{ borderRadius: "10px" }}
                    onClick={() => { setSelectedEvent(null); openService(SERVICE_TYPES.PANDIT); }}
                  >
                    <FaUserTie size={18} /> Book Pandit Ji
                  </Button>
                </Col>
                <Col xs={12}>
                  <Button
                    variant="outline-secondary"
                    className="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                    style={{ borderRadius: "10px" }}
                    onClick={() => { setSelectedEvent(null); openService(SERVICE_TYPES.PRODUCTS); }}
                  >
                    <FaBox size={18} /> Puja items &amp; Products
                  </Button>
                </Col>
                <Col xs={12}>
                  <Button
                    variant="link"
                    className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 text-decoration-none"
                    onClick={() => { handleShare(selectedEvent); }}
                  >
                    <FaShareAlt /> Share this event
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
