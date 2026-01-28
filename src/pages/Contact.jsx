import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submit = (e) => {
    e.preventDefault();
    alert("Thank you! We will get back to you shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-5 bg-light">
      <Container>
        <Card className="shadow-sm p-4">
          <Row>
            {/* LEFT INFO */}
            <Col md={5} className="mb-4">
              <h3 className="fw-bold mb-3">Contact INXINFO Labs</h3>
              <p className="text-muted">
                Reach out for partnerships, consulting, SaaS development,
                or innovation initiatives.
              </p>

              <p>
                📧 <strong>Email:</strong>{" "}
                <a href="mailto:satish.prasad@inxinfo.com">
                  satish.prasad@inxinfo.com
                </a>
              </p>

              <p>
                🌐 <strong>Website:</strong>{" "}
                <a href="https://inxinfo.com" target="_blank" rel="noreferrer">
                  inxinfo.com
                </a>
              </p>

              <p>📍 <strong>Location:</strong> Bangalore, India</p>
            </Col>

            {/* RIGHT FORM */}
            <Col md={7}>
              <Form onSubmit={submit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                </Form.Group>

                <Button type="submit" variant="primary">
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
