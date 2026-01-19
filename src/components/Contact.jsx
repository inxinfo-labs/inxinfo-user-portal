import { Card, Container, Form, Button } from "react-bootstrap";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you shortly.");
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-4">
        <h2 className="mb-3">Contact Us</h2>
        <p>
          Have questions or want to work with us? Fill out the form below and 
          our team will respond as soon as possible.
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Your Name" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Your Email" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Your Message"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Send Message
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
