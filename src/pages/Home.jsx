import { Card, Tabs, Tab, Row, Col, ListGroup, Badge, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

export default function Home() {
  return (
    <section id="home" className="py-5" style={{ background: "#ffffff" }}>
      <div className="container">
        {/* HERO */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-4 mb-3">INXINFO Labs</h1>
          <p className="text-secondary fs-4 mb-3">
            Innovation Nexus for Information
          </p>

          <Badge 
            bg="primary" 
            className="fs-6 p-3 mb-4"
            style={{ borderRadius: "12px" }}
          >
            Enterprise-ready digital solutions
          </Badge>

          <div className="mt-4">
            <Button 
              variant="primary" 
              className="m-2 px-4 py-2"
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Solutions
            </Button>
            <Button 
              variant="outline-primary" 
              className="m-2 px-4 py-2"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* CONTENT TABS */}
        <Tabs 
          defaultActiveKey="overview" 
          className="mb-4 justify-content-center" 
          fill
          style={{ borderBottom: "2px solid #e2e8f0" }}
        >
          <Tab eventKey="overview" title="Overview">
            <Row className="g-4 mt-4">
              <Col md={6}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <Card.Title className="fw-bold mb-3">Who We Are</Card.Title>
                    <Card.Text className="text-muted" style={{ lineHeight: 1.8 }}>
                      <strong>INXINFO Labs</strong> is a technology innovation hub
                      delivering modern SaaS platforms, cloud-native systems,
                      and enterprise software solutions. We combine cutting-edge 
                      technology with proven methodologies to help businesses 
                      transform their digital infrastructure.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <Card.Title className="fw-bold mb-3">Our Mission</Card.Title>
                    <Card.Text className="text-muted" style={{ lineHeight: 1.8 }}>
                      To build intelligent, secure, and scalable systems by
                      combining innovation with meaningful information. We empower 
                      organizations to achieve their goals through technology that 
                      is both powerful and accessible.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="services" title="Services">
            <Row className="g-4 mt-4">
              <Col md={6}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body className="p-4">
                    <Card.Title className="fw-bold mb-3">Core Services</Card.Title>
                    <ListGroup variant="flush">
                      {[
                        "SaaS & Platform Development",
                        "Cloud & Microservices Architecture",
                        "Data & AI Solutions",
                        "R&D & Innovation Labs",
                        "API Development & Integration",
                        "DevOps & Infrastructure"
                      ].map((service, idx) => (
                        <ListGroup.Item key={idx} className="border-0 px-0 py-2">
                          <FaCheckCircle className="text-success me-2" />
                          {service}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body className="p-4">
                    <Card.Title className="fw-bold mb-3">Technology Stack</Card.Title>
                    <ListGroup variant="flush">
                      {[
                        "Java, Spring Boot, Microservices",
                        "React, Next.js, Modern UI Frameworks",
                        "Docker, Kubernetes, Containerization",
                        "AWS, Azure, Cloud Infrastructure",
                        "PostgreSQL, MongoDB, Redis",
                        "CI/CD, GitOps, Automation"
                      ].map((tech, idx) => (
                        <ListGroup.Item key={idx} className="border-0 px-0 py-2">
                          <FaCheckCircle className="text-primary me-2" />
                          {tech}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}
