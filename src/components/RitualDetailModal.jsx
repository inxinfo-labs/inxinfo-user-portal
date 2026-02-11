import { useEffect, useState } from "react";
import { Modal, Spinner, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { RITUAL_DESCRIPTIONS } from "../constants/ritualTypes";
import { FaRupeeSign, FaClock, FaArrowRight } from "react-icons/fa";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1605486336934-64f838d74018?w=400&q=80";

export default function RitualDetailModal({ show, onHide, ritual }) {
  const navigate = useNavigate();
  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!show || !ritual?.value) {
      setPujas([]);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .get(`/puja/ritual-type/${ritual.value}`)
      .then((res) => {
        if (!cancelled) setPujas(res.data?.data ?? res.data ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.message || "Could not load puja details.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [show, ritual?.value]);

  const fallbackDesc = ritual?.value ? RITUAL_DESCRIPTIONS[ritual.value] : null;
  const displayName = ritual?.displayName ?? ritual?.value ?? "Puja";

  const handleBook = (puja) => {
    onHide();
    navigate(`/user/puja/${puja.id}/book`);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="ritual-detail-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold" style={{ color: "var(--primary-800)" }}>
          {displayName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2">
        {loading && (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-2 mb-0">Loading puja details…</p>
          </div>
        )}
        {error && !loading && (
          <p className="text-muted mb-3">{error}</p>
        )}
        {!loading && (
          <>
            <p className="text-muted mb-4" style={{ lineHeight: 1.7 }}>
              {pujas.length > 0
                ? (pujas[0].description || fallbackDesc)
                : (fallbackDesc || "Traditional Hindu puja and ceremonies for this occasion. Book a puja service or Pandit Ji with us.")}
            </p>
            {pujas.length > 0 ? (
              <>
                <h6 className="fw-bold mb-3" style={{ color: "var(--primary-800)" }}>Available services</h6>
                <Row className="g-3">
                  {pujas.map((puja) => (
                    <Col md={6} key={puja.id}>
                      <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "12px", overflow: "hidden" }}>
                        {puja.imageUrl ? (
                          <Card.Img
                            variant="top"
                            src={puja.imageUrl}
                            alt={puja.name}
                            style={{ height: "140px", objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            className="d-flex align-items-center justify-content-center bg-light"
                            style={{ height: "140px" }}
                          >
                            <img
                              src={PLACEHOLDER_IMAGE}
                              alt=""
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </div>
                        )}
                        <Card.Body className="p-3">
                          <Card.Title className="h6 fw-bold mb-2" style={{ color: "#111827" }}>
                            {puja.name}
                          </Card.Title>
                          <Card.Text className="text-muted small mb-2" style={{ minHeight: "2.5em" }}>
                            {puja.description ? (puja.description.slice(0, 80) + (puja.description.length > 80 ? "…" : "")) : "Traditional puja service"}
                          </Card.Text>
                          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <span className="text-primary fw-bold">
                              <FaRupeeSign className="me-1" />{puja.price}
                            </span>
                            <span className="text-muted small">
                              <FaClock className="me-1" />{puja.durationMinutes || 60} min
                            </span>
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-100 mt-2 fw-semibold"
                            style={{ borderRadius: "8px", background: "var(--gradient-primary)", border: "none" }}
                            onClick={() => handleBook(puja)}
                          >
                            Book <FaArrowRight className="ms-1" />
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </>
            ) : (
              <div className="text-center py-2">
                <Button
                  variant="primary"
                  className="fw-semibold"
                  style={{ borderRadius: "10px", background: "var(--gradient-primary)", border: "none" }}
                  onClick={() => { onHide(); navigate("/user/puja"); }}
                >
                  View all puja services <FaArrowRight className="ms-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
