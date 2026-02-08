import { Container } from "react-bootstrap";
import { FaNewspaper } from "react-icons/fa";

export default function Blog() {
  return (
    <div className="py-5">
      <Container className="text-center py-5">
        <FaNewspaper className="mb-3" style={{ fontSize: "3rem", color: "#0d9488" }} />
        <h1 className="fw-bold">Blog</h1>
        <p className="text-muted">Articles and updates coming soon.</p>
      </Container>
    </div>
  );
}
