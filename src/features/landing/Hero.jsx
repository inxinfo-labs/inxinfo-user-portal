// Hero.jsx
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Hero({ onOpenModal }) {
  return (
    <section id="home" className="py-5 bg-light">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-4 fw-bold">INXINFO Labs</h1>
            <p className="lead text-muted">
              Enterprise-ready SaaS platforms and cloud-native solutions.
            </p>

            <Button variant="primary" size="lg" onClick={onOpenModal}>
              Talk to Sales
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
