import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCheckCircle, FaUsers, FaLightbulb, FaAward } from "react-icons/fa";

export default function About() {
  const values = [
    { icon: <FaUsers />, title: "Collaboration", desc: "We work closely with our clients as partners" },
    { icon: <FaLightbulb />, title: "Innovation", desc: "Pushing boundaries with cutting-edge technology" },
    { icon: <FaAward />, title: "Excellence", desc: "Delivering quality that exceeds expectations" },
  ];

  return (
    <section id="about" className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">About INXINFO Labs</h2>
          <p className="lead text-muted" style={{ maxWidth: "700px", margin: "0 auto" }}>
            Transforming ideas into enterprise-ready digital solutions
          </p>
        </div>

        <Row className="align-items-center mb-5">
          <Col md={6} className="mb-4 mb-md-0">
            <div 
              className="p-4 rounded"
              style={{
                background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
                border: "1px solid rgba(102, 126, 234, 0.2)"
              }}
            >
              <h3 className="fw-bold mb-4">Our Story</h3>
              <p className="text-muted mb-3" style={{ lineHeight: 1.8 }}>
                INXINFO Labs is a technology innovation hub specializing in enterprise-grade platforms 
                with a strong focus on security, scalability, and exceptional developer experience.
              </p>
              <p className="text-muted mb-3" style={{ lineHeight: 1.8 }}>
                We partner with startups and enterprises worldwide to transform innovative ideas into 
                reliable, production-ready solutions that scale with your business.
              </p>
              <p className="text-muted" style={{ lineHeight: 1.8 }}>
                Our team combines deep technical expertise with business acumen to deliver solutions 
                that not only meet today's requirements but are built to evolve with tomorrow's challenges.
              </p>
            </div>
          </Col>

          <Col md={6}>
            <div className="ps-md-4">
              <h4 className="fw-bold mb-4">What We Offer</h4>
              <div className="d-flex flex-column gap-3">
                {[
                  "Cloud Native Architecture",
                  "Secure Authentication & Authorization",
                  "Modular & Scalable Systems",
                  "Enterprise SaaS Solutions",
                  "Microservices & API Development",
                  "DevOps & CI/CD Implementation",
                  "Data Analytics & AI Integration",
                  "24/7 Monitoring & Support"
                ].map((item, idx) => (
                  <div key={idx} className="d-flex align-items-start">
                    <FaCheckCircle className="text-success me-3 mt-1" style={{ fontSize: "1.2rem", flexShrink: 0 }} />
                    <span className="text-muted">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        {/* Core Values */}
        <Row className="g-4 mt-4">
          {values.map((value, idx) => (
            <Col md={4} key={idx}>
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div 
                  className="mb-3"
                  style={{ 
                    fontSize: "2.5rem",
                    color: "var(--teal)"
                  }}
                >
                  {value.icon}
                </div>
                <h5 className="fw-bold mb-2">{value.title}</h5>
                <p className="text-muted small mb-0">{value.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Technology Stack */}
        <Row className="mt-5 pt-5" style={{ borderTop: "1px solid #e2e8f0" }}>
          <Col md={12}>
            <div className="text-center mb-4">
              <h4 className="fw-bold mb-3">Our Technology Stack</h4>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {[
                "React & Next.js", "Node.js & Express", "Java & Spring Boot",
                "Python & Django", "Docker & Kubernetes", "AWS & Azure",
                "PostgreSQL & MongoDB", "Redis & Elasticsearch", "GraphQL & REST APIs",
                "TypeScript & JavaScript", "Microservices", "CI/CD Pipelines"
              ].map((tech, idx) => (
                <span 
                  key={idx}
                  className="badge px-3 py-2"
                  style={{
                    background: "#f1f5f9",
                    color: "#475569",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    borderRadius: "8px"
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
