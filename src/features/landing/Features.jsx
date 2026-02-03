import { Card, Col, Row, Container } from "react-bootstrap";
import { FaShieldAlt, FaCloud, FaHeadset, FaRocket, FaLock, FaServer, FaCode, FaChartLine } from "react-icons/fa";

const featureData = [
  { 
    title: "Secure Authentication", 
    icon: <FaShieldAlt />, 
    description: "Enterprise-grade security with OAuth, JWT, and multi-factor authentication to protect your data.",
    color: "#ef4444"
  },
  { 
    title: "Cloud-Native Architecture", 
    icon: <FaCloud />, 
    description: "Built for scale with microservices, containerization, and auto-scaling capabilities.",
    color: "#3b82f6"
  },
  { 
    title: "24/7 Expert Support", 
    icon: <FaHeadset />, 
    description: "Round-the-clock technical support and dedicated account management for your peace of mind.",
    color: "#10b981"
  },
  { 
    title: "Modern UI & UX", 
    icon: <FaRocket />, 
    description: "Beautiful, intuitive interfaces designed with user experience and accessibility in mind.",
    color: "#f59e0b"
  },
  { 
    title: "Data Security", 
    icon: <FaLock />, 
    description: "End-to-end encryption, compliance with industry standards, and regular security audits.",
    color: "#8b5cf6"
  },
  { 
    title: "High Performance", 
    icon: <FaServer />, 
    description: "Optimized for speed with CDN integration, caching strategies, and performance monitoring.",
    color: "#06b6d4"
  },
  { 
    title: "Developer-Friendly", 
    icon: <FaCode />, 
    description: "Clean APIs, comprehensive documentation, and SDKs for seamless integration.",
    color: "#ec4899"
  },
  { 
    title: "Analytics & Insights", 
    icon: <FaChartLine />, 
    description: "Real-time analytics, custom dashboards, and actionable insights to drive decisions.",
    color: "#14b8a6"
  },
];

export default function Features() {
  return (
    <section className="py-5" style={{ background: "#f8fafc" }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Why Choose INXINFO Labs?</h2>
          <p className="lead text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
            We combine cutting-edge technology with proven methodologies to deliver exceptional results
          </p>
        </div>
        
        <Row className="g-4">
          {featureData.map((f, i) => (
            <Col md={6} lg={3} key={i}>
              <Card 
                className="shadow-sm text-center p-4 h-100 border-0"
                style={{ 
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                }}
              >
                <div 
                  className="mb-3"
                  style={{ 
                    fontSize: "3rem",
                    color: f.color,
                    display: "inline-block",
                    padding: "1rem",
                    background: `${f.color}15`,
                    borderRadius: "16px"
                  }}
                >
                  {f.icon}
                </div>
                <h5 className="fw-bold mb-3">{f.title}</h5>
                <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>
                  {f.description}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
