import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", path: "/about" },
      { label: "Services", path: "/" },
      { label: "Contact", path: "/contact" },
    ],
    resources: [
      { label: "Documentation", path: "#" },
      { label: "Blog", path: "#" },
      { label: "Support", path: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", path: "#" },
      { label: "Terms of Service", path: "#" },
      { label: "Cookie Policy", path: "#" },
    ],
  };

  return (
    <footer 
      className="mt-auto"
      style={{
        background: "#0f172a",
        color: "#e5e7eb",
        padding: "4rem 0 2rem"
      }}
    >
      <Container>
        <Row className="g-4 mb-4">
          {/* Brand Column */}
          <Col md={4}>
            <h4 className="fw-bold mb-3" style={{ color: "white" }}>
              INXINFO Labs
            </h4>
            <p className="text-muted mb-3" style={{ lineHeight: 1.7 }}>
              Innovation Nexus for Information. Building enterprise-ready 
              digital solutions that scale with your business.
            </p>
            <div className="d-flex gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-white"
                style={{ fontSize: "1.5rem", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-white"
                style={{ fontSize: "1.5rem", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <FaGithub />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-white"
                style={{ fontSize: "1.5rem", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <FaTwitter />
              </a>
              <a 
                href="mailto:satish.prasad@inxinfo.com"
                className="text-white"
                style={{ fontSize: "1.5rem", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <FaEnvelope />
              </a>
            </div>
          </Col>

          {/* Company Links */}
          <Col md={2}>
            <h6 className="fw-bold mb-3" style={{ color: "white" }}>Company</h6>
            <ul className="list-unstyled">
              {footerLinks.company.map((link, idx) => (
                <li key={idx} className="mb-2">
                  <Link
                    to={link.path}
                    className="text-muted text-decoration-none"
                    style={{ transition: "all 0.3s ease", display: "inline-block" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Resources Links */}
          <Col md={2}>
            <h6 className="fw-bold mb-3" style={{ color: "white" }}>Resources</h6>
            <ul className="list-unstyled">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx} className="mb-2">
                  {(link.path && link.path.startsWith("/")) ? (
                  <Link
                    to={link.path}
                    className="text-muted text-decoration-none"
                    style={{ transition: "all 0.3s ease", display: "inline-block" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {link.label}
                  </Link>
                  ) : (
                  <a
                    href={link.href || link.path || "#"}
                    className="text-muted text-decoration-none"
                    style={{ transition: "all 0.3s ease", display: "inline-block" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {link.label}
                  </a>
                  )}
                </li>
              ))}
            </ul>
          </Col>

          {/* Legal Links */}
          <Col md={2}>
            <h6 className="fw-bold mb-3" style={{ color: "white" }}>Legal</h6>
            <ul className="list-unstyled">
              {footerLinks.legal.map((link, idx) => (
                <li key={idx} className="mb-2">
                  {link.path && link.path.startsWith("/") ? (
                    <Link
                      to={link.path}
                      className="text-muted text-decoration-none"
                      style={{ 
                        transition: "all 0.3s ease",
                        display: "inline-block"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#94a3b8";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.path || "#"}
                      className="text-muted text-decoration-none"
                      style={{ 
                        transition: "all 0.3s ease",
                        display: "inline-block"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#94a3b8";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={2}>
            <h6 className="fw-bold mb-3" style={{ color: "white" }}>Contact</h6>
            <ul className="list-unstyled text-muted small">
              <li className="mb-2">
                <FaEnvelope className="me-2" />
                <a 
                  href="mailto:satish.prasad@inxinfo.com"
                  className="text-muted text-decoration-none"
                  style={{ fontSize: "0.875rem" }}
                >
                  Email Us
                </a>
              </li>
              <li className="mb-2">
                <span>📍 Bangalore, India</span>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <Row>
          <Col md={12}>
            <div 
              className="text-center pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
              <p className="text-muted mb-0 small">
                © {currentYear} INXINFO Labs. All rights reserved. • v1.0.0
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
