import { useEffect, useState, useContext } from "react";
import { Card, Form, Button, Row, Col, Image } from "react-bootstrap";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const UpdateProfile = () => {
  const { user, avatar } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await api.put("/user/profile", form);
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0">
      <Card.Body>
        <div className="text-center mb-3">
          <Image src={avatar} roundedCircle width={100} height={100} />
        </div>

        <Form onSubmit={submit}>
          <Row className="mb-3">
            <Col>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </Col>

            <Col>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                value={form.mobileNumber}
                onChange={(e) =>
                  setForm({ ...form, mobileNumber: e.target.value })
                }
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>DOB</Form.Label>
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
                <option>MALE</option>
                <option>FEMALE</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Country</Form.Label>
              <Form.Control
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </Col>

            <Col>
              <Form.Label>Location</Form.Label>
              <Form.Control
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </Col>
          </Row>

          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UpdateProfile;
