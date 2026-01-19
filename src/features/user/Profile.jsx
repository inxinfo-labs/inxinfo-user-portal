import { Card, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";




function Profile() {
  const { user, avatar } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return <div className="text-center mt-5 spinner-border" />;

  return (
    <div className="container mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={3} className="text-center">
              <Image
                src={avatar}
                roundedCircle
                width={120}
                height={120}
              />
              
            </Col>

            <Col md={9}>
              <h4>{user.name}</h4>
              <p className="text-muted">{user.email}</p>
            </Col>
          </Row>

          <hr />

          <Button
            variant="outline-secondary"
            onClick={() => navigate("/user/profile/update")}
          >
            Edit Profile
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
