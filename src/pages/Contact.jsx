import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhone, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const submit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      content: "satish.prasad@inxinfo.com",
      link: "mailto:satish.prasad@inxinfo.com",
      color: "#ef4444"
    },
    {
      icon: <FaGlobe />,
      title: "Website",
      content: "inxinfo.com",
      link: "https://inxinfo.com",
      color: "#3b82f6"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      content: "Bangalore, India",
      link: null,
      color: "#10b981"
    },
  ];

  return (
    <section id="contact" className="py-5" style={{ background: "#f8fafc" }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Get In Touch</h2>
          <p className="lead text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Have a project in mind? Let's discuss how we can help bring your vision to life
          </p>
        </div>

        <Row className="g-4 mb-5">
          {contactInfo.map((info, idx) => (
            <Col md={4} key={idx}>
              <Card 
                className="h-100 border-0 shadow-sm text-center p-4"
                style={{ 
                  transition: "all 0.3s ease",
                  cursor: info.link ? "pointer" : "default"
                }}
                onMouseEnter={(e) => {
                  if (info.link) {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (info.link) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                  }
                }}
                onClick={() => info.link && window.open(info.link, '_blank')}
              >
                <div 
                  className="mb-3"
                  style={{ 
                    fontSize: "2.5rem",
                    color: info.color,
                    display: "inline-block"
                  }}
                >
                  {info.icon}
                </div>
                <h5 className="fw-bold mb-2">{info.title}</h5>
                {info.link ? (
                  <a 
                    href={info.link}
                    className="text-decoration-none"
                    style={{ color: "#475569" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-muted mb-0">{info.content}</p>
                )}
              </Card>
            </Col>
          ))}
        </Row>

        <Card className="shadow-lg border-0 overflow-hidden">
          <Row className="g-0">
            {/* LEFT INFO */}
            <Col 
              md={5} 
              className="p-5 text-white"
              style={{
                background: "var(--gradient-hero)"
              }}
            >
              <h3 className="fw-bold mb-4">Let's Start a Conversation</h3>
              <p className="mb-4" style={{ opacity: 0.95 }}>
                Whether you're looking to build a new platform, modernize existing systems, 
                or explore innovative solutions, we're here to help.
              </p>
              
              <div className="mb-4">
                <h5 className="fw-bold mb-3">What We Can Help With:</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">✓ SaaS Platform Development</li>
                  <li className="mb-2">✓ Cloud Migration & Architecture</li>
                  <li className="mb-2">✓ Enterprise Software Solutions</li>
                  <li className="mb-2">✓ API Development & Integration</li>
                  <li className="mb-2">✓ DevOps & Infrastructure</li>
                  <li className="mb-2">✓ Technical Consulting</li>
                </ul>
              </div>

              <div className="d-flex gap-3 mt-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-white"
                  style={{ fontSize: "1.5rem" }}
                >
                  <FaLinkedin />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-white"
                  style={{ fontSize: "1.5rem" }}
                >
                  <FaGithub />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-white"
                  style={{ fontSize: "1.5rem" }}
                >
                  <FaTwitter />
                </a>
              </div>
            </Col>

            {/* RIGHT FORM */}
            <Col md={7} className="p-5">
              <h4 className="fw-bold mb-4">Send Us a Message</h4>
              <Form onSubmit={submit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Name</Form.Label>
                      <Form.Control
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        style={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        style={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Subject</Form.Label>
                  <Form.Control
                    required
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    style={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    required
                    placeholder="Tell us about your project or inquiry..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    style={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  variant="primary"
                  className="px-4 py-2 fw-semibold"
                  style={{ borderRadius: "8px" }}
                >
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </section>
  );
}
