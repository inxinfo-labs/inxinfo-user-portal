import { useMemo } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { QRCodeSVG } from "qrcode.react";
import AppConfig from "../config/appConfig";
import { FaMobileAlt, FaDownload, FaQrcode } from "react-icons/fa";

/**
 * Public page: QR code to open/install the website.
 * Set REACT_APP_PUBLIC_URL in production to your deployed URL so the QR code points to the right place.
 */
export default function InstallApp() {
  const siteUrl = useMemo(() => {
    const base = AppConfig.publicUrl && AppConfig.publicUrl.trim()
      ? AppConfig.publicUrl.trim().replace(/\/$/, "")
      : (typeof window !== "undefined" ? window.location.origin : "");
    return base;
  }, []);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
            <Card.Body className="p-4 p-md-5 text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{
                  width: 56,
                  height: 56,
                  background: "var(--gradient-primary, linear-gradient(135deg, #ff9933 0%, #ea580c 100%))",
                  color: "white",
                }}
              >
                <FaMobileAlt style={{ fontSize: "1.5rem" }} />
              </div>
              <h1 className="h4 fw-bold mb-2" style={{ color: "var(--primary-700, #c2410c)" }}>
                Open or install INXINFO Labs
              </h1>
              <p className="text-muted mb-4">
                Scan the QR code with your phone to open the website, or add it to your home screen to use it like an app.
              </p>

              <div className="d-flex justify-content-center mb-4">
                <div
                  className="d-flex flex-column align-items-center p-3 rounded-3"
                  style={{ background: "#f8fafc", border: "1px dashed #e2e8f0" }}
                >
                  <FaQrcode className="mb-2 text-muted" style={{ fontSize: "1.25rem" }} />
                  <QRCodeSVG value={siteUrl} size={200} level="M" includeMargin />
                  <span className="small text-muted mt-2">Scan to open</span>
                </div>
              </div>

              <p className="small text-muted mb-2">
                <strong>Link:</strong>{" "}
                <a href={siteUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary-600)" }}>
                  {siteUrl}
                </a>
              </p>

              <Card className="border mt-4 text-start" style={{ borderRadius: "0.75rem", background: "#f8fafc" }}>
                <Card.Body className="p-3">
                  <h6 className="fw-semibold mb-2 d-flex align-items-center">
                    <FaDownload className="me-2 text-teal" />
                    Add to Home Screen
                  </h6>
                  <ul className="small mb-0 ps-3">
                    <li><strong>iPhone/iPad:</strong> Safari → Share → Add to Home Screen</li>
                    <li><strong>Android:</strong> Chrome → Menu (⋮) → Add to Home screen / Install app</li>
                    <li><strong>Desktop:</strong> Chrome/Edge → address bar → install icon or menu → Install INXINFO Labs</li>
                  </ul>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
