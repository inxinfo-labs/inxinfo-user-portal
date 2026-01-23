import { Button, Container } from "react-bootstrap";

export default function CTA({ onOpenModal }) {
  return (
    <section className="cta text-center py-5 bg-primary text-white">
      <Container>
        <h2>Ready to start?</h2>
        <Button
          size="lg"
          variant="light"
          onClick={onOpenModal} // NEW: triggers modal
        >
          Get Started
        </Button>
      </Container>
    </section>
  );
}
