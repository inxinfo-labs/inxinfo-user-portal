import { Row, Col, Image, ListGroup } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ViewProfile = () => {
  const { user, avatar } = useContext(AuthContext);

  return (
    <Row className="align-items-center">
      <Col md={3} className="text-center">
        <Image src={avatar} roundedCircle width={120} height={120} />
      </Col>

      <Col md={9}>
        <h5>{user.name}</h5>
        <p className="text-muted">{user.email}</p>

        <ListGroup variant="flush">
          <ListGroup.Item><b>DOB:</b> {user.dob}</ListGroup.Item>
          <ListGroup.Item><b>Gender:</b> {user.gender}</ListGroup.Item>
          <ListGroup.Item><b>Country:</b> {user.country || "-"}</ListGroup.Item>
          <ListGroup.Item><b>Location:</b> {user.location || "-"}</ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ViewProfile;
