import { Card, Tabs, Tab, Row, Col, ListGroup, Badge, Button } from "react-bootstrap";

export default function Home() {
  return (
    <div className="container mt-5">
      {/* HERO */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">INXINFO Labs</h1>
        <p className="text-secondary fs-5">
          Innovation Nexus for Information
        </p>

        <Badge bg="primary" className="fs-6 p-2 mb-3">
          Connecting innovation with information for next-gen solutions
        </Badge>

        <div className="mt-3">
          <Button variant="primary" className="m-1">Explore Solutions</Button>
          <Button variant="outline-secondary" className="m-1">Contact Us</Button>
        </div>
      </div>

      {/* TABS */}
      <Tabs defaultActiveKey="overview" className="mb-4 justify-content-center" fill>

        {/* OVERVIEW */}
        <Tab eventKey="overview" title="Overview">
          <Row className="g-4 mt-3">
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Who We Are</Card.Title>
                  <Card.Text>
                    <strong>INXINFO Labs</strong> is a technology innovation hub
                    delivering modern software, SaaS platforms, and
                    cloud-native systems for enterprises and startups.
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
                    combining cutting-edge innovation with meaningful
                    information.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* SERVICES */}
        <Tab eventKey="services" title="Services">
          <Row className="g-4 mt-3">
            <Col md={6}>
              <Card className="shadow-sm p-3 h-100">
                <Card.Title>Core Services</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>💻 IT Services & SaaS Development</ListGroup.Item>
                  <ListGroup.Item>☁️ Cloud & Microservices</ListGroup.Item>
                  <ListGroup.Item>📊 Data Analytics & AI</ListGroup.Item>
                  <ListGroup.Item>🧪 R&D & Innovation Labs</ListGroup.Item>
                  <ListGroup.Item>🔁 Legacy Modernization</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm p-3 h-100">
                <Card.Title>Technology Stack</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>Java, Spring Boot, Microservices</ListGroup.Item>
                  <ListGroup.Item>React, Bootstrap, Modern UI</ListGroup.Item>
                  <ListGroup.Item>Docker, Kubernetes, CI/CD</ListGroup.Item>
                  <ListGroup.Item>AWS, Cloud-Native Architecture</ListGroup.Item>
                  <ListGroup.Item>Secure & Scalable Systems</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* LINKS */}
        <Tab eventKey="links" title="Links">
          <Row className="g-4 mt-3">
            <Col md={6}>
              <Card className="shadow-sm p-3">
                <Card.Title>Official Links</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>🌐 Website: inxinfo.com</ListGroup.Item>
                  <ListGroup.Item>📧 Email: satish.prasad@inxinfo.com</ListGroup.Item>
                  <ListGroup.Item>🐙 GitHub: github.com/satishlabs</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm p-3 text-center">
                <Card.Body>
                  <Card.Title>Work With Us</Card.Title>
                  <p>Let’s build innovative solutions together.</p>
                  <Button variant="primary" className="m-1">Get Started</Button>
                  <Button variant="outline-secondary" className="m-1">
                    Contact
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

      </Tabs>
    </div>
  );
}
