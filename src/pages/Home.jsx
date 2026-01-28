import { Card, Tabs, Tab, Row, Col, ListGroup, Badge, Button } from "react-bootstrap";

export default function Home() {
  return (
    <section id="home" className="py-5 bg-light">
      <div className="container">
        {/* HERO */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">INXINFO Labs</h1>
          <p className="text-secondary fs-5">
            Innovation Nexus for Information
          </p>

          <Badge bg="primary" className="fs-6 p-2 mb-3">
            Enterprise-ready digital solutions
          </Badge>

          <div className="mt-3">
            <Button variant="primary" className="m-1">
              Explore Solutions
            </Button>
            <Button variant="outline-secondary" className="m-1">
              Contact Us
            </Button>
          </div>
        </div>

        {/* CONTENT TABS */}
        <Tabs defaultActiveKey="overview" className="mb-4 justify-content-center" fill>
          <Tab eventKey="overview" title="Overview">
            <Row className="g-4 mt-3">
              <Col md={6}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>Who We Are</Card.Title>
                    <Card.Text>
                      <strong>INXINFO Labs</strong> is a technology innovation hub
                      delivering modern SaaS platforms, cloud-native systems,
                      and enterprise software.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>Our Mission</Card.Title>
                    <Card.Text>
                      To build intelligent, secure, and scalable systems by
                      combining innovation with meaningful information.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="services" title="Services">
            <Row className="g-4 mt-3">
              <Col md={6}>
                <Card className="shadow-sm p-3 h-100">
                  <Card.Title>Core Services</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>💻 SaaS & Platform Development</ListGroup.Item>
                    <ListGroup.Item>☁️ Cloud & Microservices</ListGroup.Item>
                    <ListGroup.Item>📊 Data & AI Solutions</ListGroup.Item>
                    <ListGroup.Item>🧪 R&D & Innovation</ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="shadow-sm p-3 h-100">
                  <Card.Title>Technology Stack</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Java, Spring Boot</ListGroup.Item>
                    <ListGroup.Item>React, Modern UI</ListGroup.Item>
                    <ListGroup.Item>Docker, Kubernetes</ListGroup.Item>
                    <ListGroup.Item>AWS, CI/CD</ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}
