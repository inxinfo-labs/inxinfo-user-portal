
import { Card, Container } from "react-bootstrap";

export default function About() {
  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-4">
        <h2 className="mb-3">About SatishLabs</h2>
        <p>
          SatishLabs is a technology-driven company focused on delivering 
          high-quality web and cloud solutions. Our team specializes in 
          full-stack development, DevOps, and cloud-native applications.
        </p>

        <p>
          We are committed to innovation, scalability, and performance. 
          Our goal is to empower businesses with modern, secure, and 
          efficient software solutions that accelerate growth.
        </p>

        <p>
          Our core values include professionalism, customer-centricity, 
          and continuous learning. Whether you are a startup or an enterprise, 
          SatishLabs provides tailored solutions to meet your unique business needs.
        </p>
      </Card>
    </Container>
  );
}
