import { Card, Col, Row, Container } from "react-bootstrap";
import { FaShieldAlt, FaCloud, FaHeadset, FaRocket } from "react-icons/fa";

const featureData = [
  { title: "Secure Authentication", icon: <FaShieldAlt /> },
  { title: "Cloud-Native", icon: <FaCloud /> },
  { title: "24/7 Support", icon: <FaHeadset /> },
  { title: "Modern UI & UX", icon: <FaRocket /> },
];

export default function Features() {
  return (
    <Container className="py-5">
      <Row className="g-4">
        {featureData.map((f, i) => (
          <Col md={3} key={i}>
           <Card className="shadow-sm text-center p-4 h-100 border-0">
              <div className="text-primary fs-1 mb-3">{f.icon}</div>
              <h5>{f.title}</h5>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
