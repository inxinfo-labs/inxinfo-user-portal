import { Card, Tabs, Tab, Row, Col, ListGroup, Badge, Button } from "react-bootstrap";

export default function Home() {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">Welcome to SatishLabs</h1>
        <p className="text-secondary fs-5">
          Learn, Build, and Deploy real-world applications with modern technologies.
        </p>
        <Badge bg="primary" className="fs-6 p-2">
          Java | Spring Boot | Microservices | DevOps | Cloud | Frontend
        </Badge>
      </div>

      {/* Tabs Section */}
      <Tabs defaultActiveKey="about" className="mb-4 justify-content-center" fill>
        {/* About Tab */}
        <Tab eventKey="about" title="About">
          <Row className="g-4 mt-3">
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Who We Are</Card.Title>
                  <Card.Text>
                    <strong>SatishLabs</strong> is a modern learning platform focused on helping developers master
                    <b> Java, Spring Boot, Microservices, DevOps, Cloud, and Frontend technologies</b>.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Our Mission</Card.Title>
                  <Card.Text>
                    We help developers and teams build real-world applications with clean architecture, security,
                    CI/CD pipelines, and scalable systems. Learning by doing is our core philosophy.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Features Tab */}
        <Tab eventKey="features" title="Features">
          <Row className="g-4 mt-3">
            <Col md={6}>
              <Card className="h-100 shadow-sm p-3">
                <Card.Title>Core Features</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>🔒 Secure Authentication & Authorization</ListGroup.Item>
                  <ListGroup.Item>👤 Profile Management</ListGroup.Item>
                  <ListGroup.Item>🌗 Theme (Light / Dark Mode)</ListGroup.Item>
                  <ListGroup.Item>🛠️ REST APIs with Spring Boot</ListGroup.Item>
                  <ListGroup.Item>🔍 Pagination, Search, and Filters</ListGroup.Item>
                  <ListGroup.Item>📁 File Upload & Profile Picture</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 shadow-sm p-3">
                <Card.Title>Advanced Features</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>📊 Real-time analytics dashboard</ListGroup.Item>
                  <ListGroup.Item>💡 Best coding practices & tutorials</ListGroup.Item>
                  <ListGroup.Item>🖥️ Responsive UI with React & Bootstrap</ListGroup.Item>
                  <ListGroup.Item>☁️ Cloud-ready microservices architecture</ListGroup.Item>
                  <ListGroup.Item>🚀 CI/CD pipelines for faster deployment</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Links Tab */}
        <Tab eventKey="links" title="Links">
          <Row className="g-4 mt-3">
            <Col md={6}>
              <Card className="h-100 shadow-sm p-3">
                <Card.Title>Official Links</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>🌐 Website: <a href="https://satishlabs.com" target="_blank" rel="noreferrer">satishlabs.com</a></ListGroup.Item>
                  <ListGroup.Item>🐙 GitHub: <a href="https://github.com/satishlabs" target="_blank" rel="noreferrer">github.com/satishlabs</a></ListGroup.Item>
                  <ListGroup.Item>📧 Email: support@satishlabs.com</ListGroup.Item>
                  <ListGroup.Item>📘 Documentation: <a href="https://docs.satishlabs.com" target="_blank" rel="noreferrer">docs.satishlabs.com</a></ListGroup.Item>
                  <ListGroup.Item>💬 Community Forum: <a href="https://community.satishlabs.com" target="_blank" rel="noreferrer">community.satishlabs.com</a></ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 shadow-sm p-3 text-center">
                <Card.Body>
                  <Card.Title>Quick Start</Card.Title>
                  <p>Start exploring tutorials, projects, and guides:</p>
                  <Button variant="primary" className="m-1" href="https://satishlabs.com/tutorials" target="_blank">Tutorials</Button>
                  <Button variant="success" className="m-1" href="https://github.com/satishlabs" target="_blank">GitHub</Button>
                  <Button variant="warning" className="m-1" href="https://docs.satishlabs.com" target="_blank">Docs</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
}
