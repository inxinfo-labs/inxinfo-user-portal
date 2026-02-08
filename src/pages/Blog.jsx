import { useState } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { FaNewspaper, FaRss, FaEnvelope, FaArrowRight } from "react-icons/fa";

export default function Blog() {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  const handleNotify = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    const subject = encodeURIComponent("Blog updates – INXINFO Labs");
    const body = encodeURIComponent(`Please add me to your blog updates list.\nEmail: ${email}`);
    window.location.href = `mailto:satish.prasad@inxinfo.com?subject=${subject}&body=${body}`;
    setNotified(true);
  };

  return (
    <section className="py-5" style={{ background: "var(--bg-secondary)" }}>
      <Container>
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
            style={{
              width: 72,
              height: 72,
              background: "var(--gradient-primary)",
              color: "white",
              boxShadow: "0 8px 24px rgba(234, 88, 12, 0.25)",
            }}
          >
            <FaNewspaper style={{ fontSize: "2rem" }} />
          </div>
          <h1 className="fw-bold mb-2" style={{ color: "var(--text-primary)", fontSize: "2rem" }}>
            Blog
          </h1>
          <p className="text-muted mb-0" style={{ maxWidth: 520, margin: "0 auto", fontSize: "1.05rem" }}>
            Articles, product updates, and news — all in one place.
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "1.25rem", overflow: "hidden" }}>
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <FaRss style={{ color: "var(--primary-600)", fontSize: "1.25rem" }} />
                  <span className="fw-semibold" style={{ color: "var(--text-primary)" }}>Coming soon</span>
                </div>
                <p className="text-muted mb-4">
                  We&apos;re preparing articles on Puja services, product guides, and company updates. 
                  Get notified when we publish.
                </p>
                {!notified ? (
                  <Form onSubmit={handleNotify} className="d-flex gap-2 flex-wrap">
                    <Form.Control
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow-1"
                      style={{ maxWidth: 280, borderRadius: "0.75rem" }}
                    />
                    <Button
                      type="submit"
                      className="d-flex align-items-center gap-2"
                      style={{
                        background: "var(--gradient-primary)",
                        border: "none",
                        borderRadius: "0.75rem",
                      }}
                    >
                      Notify me <FaArrowRight size={14} />
                    </Button>
                  </Form>
                ) : (
                  <div className="d-flex align-items-center gap-2 text-success">
                    <FaEnvelope />
                    <span>Your email client will open. Send the message to get on our list.</span>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <a
            href="mailto:satish.prasad@inxinfo.com?subject=Blog%20or%20updates"
            className="btn btn-outline-primary"
            style={{ borderRadius: "0.75rem" }}
          >
            Contact us for updates
          </a>
        </div>
      </Container>
    </section>
  );
}
