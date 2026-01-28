import { Container, Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <section id="about" className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="fw-bold mb-3">About INXINFO Labs</h2>
            <p className="text-muted">
              INXINFO Labs builds enterprise-grade platforms with a strong focus
              on security, scalability, and developer experience.
            </p>
            <p className="text-muted">
              We partner with startups and enterprises to transform ideas into
              reliable, production-ready solutions.
            </p>
          </Col>

          <Col md={6}>
            <ul className="list-unstyled text-muted">
              <li>✔ Cloud Native Architecture</li>
              <li>✔ Secure Authentication & Authorization</li>
              <li>✔ Modular & Scalable Systems</li>
              <li>✔ Enterprise SaaS Solutions</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
