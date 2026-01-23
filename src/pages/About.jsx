import { Card, Container, Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-4">
        <h2 className="mb-3">About INXINFO Labs</h2>

        <p className="text-muted">
          <strong>INXINFO Labs</strong> stands for <b>Innovation Nexus for Information</b>.
          We are a technology-driven organization focused on building intelligent,
          scalable, and future-ready digital solutions.
        </p>

        <p>
          Our mission is to <b>connect innovation with information</b> to deliver
          next-generation software platforms, cloud-native systems, and data-driven
          solutions for businesses worldwide.
        </p>

        <Row className="mt-4">
          <Col md={6}>
            <h5>What We Do</h5>
            <ul>
              <li>Enterprise Software & SaaS Platforms</li>
              <li>Cloud & Microservices Architecture</li>
              <li>Data Analytics, AI & Automation</li>
              <li>R&D, Prototyping & Innovation Labs</li>
              <li>Technology Consulting & Modernization</li>
            </ul>
          </Col>

          <Col md={6}>
            <h5>Our Values</h5>
            <ul>
              <li>🚀 Innovation-first mindset</li>
              <li>🔐 Security & scalability by design</li>
              <li>📈 Performance-driven engineering</li>
              <li>🤝 Client-centric execution</li>
              <li>📚 Continuous learning & R&D</li>
            </ul>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
