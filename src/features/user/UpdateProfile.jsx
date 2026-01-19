import { useEffect, useState, useContext } from "react";
import { Card, Form, Button, Row, Col, Image } from "react-bootstrap";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { user, avatar } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobileNumber: "",
    dob: "",
    gender: "MALE",
    country: "",
    location: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        mobileNumber: user.mobileNumber || "",
        dob: user.dob || "",
        gender: user.gender || "MALE",
        country: user.country || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/user/profile", form);
      alert("Profile updated successfully!");
      navigate("/user/profile"); // go back to profile page
    } catch {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-4 text-center">Update Profile</h3>

          <div className="text-center mb-3">
            <Image src={avatar} roundedCircle width={120} height={120} />
          </div>

          {/* <Button
            className="w-100 mb-3"
            onClick={() => navigate("/user/profile/pic")}
          >
            Change Profile Picture
          </Button> */}

          <Form onSubmit={submit}>
            <Row className="mb-3">
              <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={form.name}
                  required
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Col>
              <Col>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  value={form.mobileNumber}
                  onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
              </Col>
              <Col>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                />
              </Col>
              <Col>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateProfile;
