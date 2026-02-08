import { Container, Card } from "react-bootstrap";
import { FaNewspaper } from "react-icons/fa";

export default function Blog() {
  return (
    <section className="py-5" style={{ background: "var(--bg-secondary)" }}>
      <Container>
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
            style={{
              width: 64,
              height: 64,
              background: "var(--gradient-primary)",
              color: "white",
            }}
          >
            <FaNewspaper style={{ fontSize: "1.75rem" }} />
          </div>
          <h1 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>Blog</h1>
          <p className="text-muted mb-0" style={{ maxWidth: 480, margin: "0 auto" }}>
            Articles, product updates, and news — all in one place.
          </p>
        </div>
        <Card className="border-0 shadow-sm text-center py-5" style={{ borderRadius: "1rem" }}>
          <Card.Body>
            <p className="text-muted mb-0">Coming soon. Check back for updates.</p>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}
