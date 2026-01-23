import { Card, Container, Row, Col } from "react-bootstrap";

export default function Contact() {
  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-4">
        <h2 className="mb-3">Contact INXINFO Labs</h2>

        <Row className="mb-4">
          <Col md={6}>
            <p>
              We’d love to hear from you. Reach out to us for partnerships,
              consulting, product development, or innovation initiatives.
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

            <p>
              📍 <strong>Location:</strong> Bangalore, India
            </p>
          </Col>

          <Col md={6}>
            <iframe
              title="INXINFO Labs Location"
              src="https://www.google.com/maps?q=Bangalore&output=embed"
              width="100%"
              height="300"
              loading="lazy"
              style={{ borderRadius: "8px", border: 0 }}
            />
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
