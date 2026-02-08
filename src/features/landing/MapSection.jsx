import { Container, Row, Col, Card } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";

const OFFICE_LAT = 12.9716;
const OFFICE_LNG = 77.5946;
const OFFICE_ADDRESS = "Bangalore, Karnataka, India";

export default function MapSection() {
  return (
    <section className="py-5" style={{ background: "var(--bs-light, #f0fdfa)" }}>
      <Container>
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Find Us</h2>
          <p className="text-muted mb-0">Visit us for puja bookings, Pandit Ji, and puja samagri</p>
        </div>
        <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: "16px" }}>
          <Row className="g-0">
            <Col md={4} className="p-4 d-flex flex-column justify-content-center">
              <div className="mb-3">
                <FaMapMarkerAlt style={{ fontSize: "2rem", color: "var(--teal)" }} />
              </div>
              <h5 className="fw-bold mb-2">INXINFO Labs</h5>
              <p className="text-muted mb-0">{OFFICE_ADDRESS}</p>
              <a
                href={`https://www.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary mt-3 rounded-pill btn-sm"
              >
                Open in Google Maps
              </a>
            </Col>
            <Col md={8} style={{ minHeight: 320 }}>
              <iframe
                title="INXINFO Labs location"
                src={`https://www.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 320 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Col>
          </Row>
        </Card>
      </Container>
    </section>
  );
}
