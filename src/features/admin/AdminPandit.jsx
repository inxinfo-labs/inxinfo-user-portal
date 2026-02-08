import { useState, useEffect } from "react";
import { Container, Card, Button, Form, Row, Col, Table, Alert, Spinner, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";
import { RITUAL_TYPES } from "../../constants";
import { FaPlus, FaArrowLeft, FaUserCheck } from "react-icons/fa";

const INIT_FROM_USER = {
  userId: "",
  experienceYears: "5",
  hourlyRate: "500",
  bio: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  specializations: "Wedding,Griha Pravesh,Satyanarayan",
};

export default function AdminPandit() {
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showApproveForm, setShowApproveForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [approveSaving, setApproveSaving] = useState(false);
  const [fromUserData, setFromUserData] = useState({ ...INIT_FROM_USER });
  const [formData, setFormData] = useState({
    userId: "",
    displayName: "",
    bio: "",
    experience: "5",
    city: "",
    state: "",
    pincode: "",
    ritualType: RITUAL_TYPES[0],
    basePrice: "1000",
    durationMin: "60",
    languages: "Hindi,English",
  });

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/admin/pandit");
      setList(Array.isArray(res.data?.data) ? res.data.data : res.data?.pandits ?? []);
    } catch (err) {
      setList([]);
      setError(getApiErrorMessage(err, "Could not load pandits. Is the backend /api/admin/pandit running?"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      const raw = res.data?.data ?? res.data?.users ?? res.data;
      setUsers(Array.isArray(raw) ? raw : []);
    } catch (err) {
      setUsers([]);
    }
  };

  const openApproveModal = () => {
    setFromUserData({ ...INIT_FROM_USER });
    fetchUsers();
    setShowApproveForm(true);
  };

  const handleFromUserChange = (e) => {
    const { name, value } = e.target;
    setFromUserData((p) => ({ ...p, [name]: value }));
  };

  const handleApproveSubmit = async (e) => {
    e.preventDefault();
    const uid = fromUserData.userId?.trim();
    if (!uid) {
      setError("Select a user to approve as Pandit.");
      return;
    }
    setApproveSaving(true);
    setError("");
    try {
      const specializations = (fromUserData.specializations || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      await api.post("/admin/pandit/from-user", {
        userId: Number(uid) || uid,
        experienceYears: Number(fromUserData.experienceYears) || 0,
        hourlyRate: Number(fromUserData.hourlyRate) || 0,
        bio: (fromUserData.bio || "").trim() || undefined,
        address: (fromUserData.address || "").trim() || undefined,
        city: (fromUserData.city || "").trim() || undefined,
        state: (fromUserData.state || "").trim() || undefined,
        pincode: (fromUserData.pincode || "").trim() || undefined,
        specializations: specializations.length ? specializations : undefined,
      });
      setShowApproveForm(false);
      setFromUserData({ ...INIT_FROM_USER });
      fetchList();
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to approve user as Pandit."));
    } finally {
      setApproveSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const languages = formData.languages.split(",").map((s) => s.trim()).filter(Boolean);
      await api.post("/admin/pandit", {
        user: formData.userId.trim() || undefined,
        profile: {
          displayName: formData.displayName.trim(),
          bio: formData.bio?.trim() || undefined,
          experience: Number(formData.experience) || 0,
        },
        location: {
          address: {
            city: formData.city.trim(),
            state: formData.state.trim(),
            pincode: formData.pincode.trim(),
            country: "India",
          },
          coordinates: { latitude: 0, longitude: 0 },
        },
        specializations: [
          {
            ritualType: formData.ritualType,
            basePrice: Number(formData.basePrice) || 0,
            duration: { min: Number(formData.durationMin) || 60 },
            isActive: true,
          },
        ],
        languages: languages.length ? languages : ["Hindi"],
      });
      setShowForm(false);
      setFormData({
        userId: "",
        displayName: "",
        bio: "",
        experience: "5",
        city: "",
        state: "",
        pincode: "",
        ritualType: RITUAL_TYPES[0],
        basePrice: "1000",
        durationMin: "60",
        languages: "Hindi,English",
      });
      fetchList();
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to add pandit"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-2">
          <Link to="/user/admin" className="btn btn-outline-secondary btn-sm">
            <FaArrowLeft className="me-1" /> Back
          </Link>
          <h2 className="mb-0 fw-bold">Pandit Ji</h2>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            onClick={openApproveModal}
          >
            <FaUserCheck className="me-2" /> Approve user as Pandit
          </Button>
          <Button
            variant="primary"
            style={{ background: "var(--gradient-primary)", border: "none" }}
            onClick={() => setShowForm(true)}
          >
            <FaPlus className="me-2" /> Add Pandit
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Card className="border-0 shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : list.length === 0 ? (
            <p className="text-muted text-center py-4 mb-0">
              No pandits yet. Add one using the button above. Backend must expose <code>GET /api/admin/pandit</code> and <code>POST /api/admin/pandit</code>.
            </p>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Display Name</th>
                  <th>Experience</th>
                  <th>City</th>
                  <th>Ritual types</th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p._id || p.id}>
                    <td>{p.profile?.displayName ?? p.displayName ?? "—"}</td>
                    <td>{p.profile?.experience ?? p.experience ?? "—"} yrs</td>
                    <td>{p.location?.address?.city ?? p.city ?? "—"}</td>
                    <td>{(p.specializations ?? []).map((s) => s.ritualType).join(", ") || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showForm} onHide={() => setShowForm(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Pandit</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>User ID (optional – link existing user)</Form.Label>
              <Form.Control name="userId" value={formData.userId} onChange={handleChange} placeholder="Mongo ObjectId of User" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Display Name</Form.Label>
              <Form.Control name="displayName" value={formData.displayName} onChange={handleChange} required placeholder="Pandit name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control name="bio" value={formData.bio} onChange={handleChange} as="textarea" rows={2} placeholder="Short bio" />
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Experience (years)</Form.Label>
                  <Form.Control name="experience" type="number" min={0} value={formData.experience} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Ritual Type</Form.Label>
                  <Form.Select name="ritualType" value={formData.ritualType} onChange={handleChange}>
                    {RITUAL_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Base Price (₹)</Form.Label>
                  <Form.Control name="basePrice" type="number" min={0} value={formData.basePrice} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control name="durationMin" type="number" min={15} value={formData.durationMin} onChange={handleChange} />
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control name="state" value={formData.state} onChange={handleChange} placeholder="State" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control name="pincode" value={formData.pincode} onChange={handleChange} placeholder="6 digits" maxLength={6} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Languages (comma-separated)</Form.Label>
              <Form.Control name="languages" value={formData.languages} onChange={handleChange} placeholder="Hindi, English, Sanskrit" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" disabled={saving} style={{ background: "var(--primary-600)", border: "none" }}>
              {saving ? <Spinner animation="border" size="sm" /> : "Add Pandit"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showApproveForm} onHide={() => setShowApproveForm(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Approve user as Pandit</Modal.Title>
        </Modal.Header>
        <p className="px-3 pt-2 text-muted small mb-0">
          Select a user who registered as &quot;Pandit&quot;. They will become a Pandit and can accept bookings.
        </p>
        <Form onSubmit={handleApproveSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Select
                name="userId"
                value={fromUserData.userId}
                onChange={handleFromUserChange}
                required
              >
                <option value="">Select user...</option>
                {users.map((u) => (
                  <option key={u.id ?? u.userId} value={u.id ?? u.userId}>
                    {u.email ?? u.name ?? u.displayName ?? `User #${u.id ?? u.userId}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control name="bio" value={fromUserData.bio} onChange={handleFromUserChange} as="textarea" rows={2} placeholder="Short bio" />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Experience (years)</Form.Label>
                  <Form.Control name="experienceYears" type="number" min={0} value={fromUserData.experienceYears} onChange={handleFromUserChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Hourly rate (₹)</Form.Label>
                  <Form.Control name="hourlyRate" type="number" min={0} value={fromUserData.hourlyRate} onChange={handleFromUserChange} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control name="address" value={fromUserData.address} onChange={handleFromUserChange} placeholder="Street address" />
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control name="city" value={fromUserData.city} onChange={handleFromUserChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control name="state" value={fromUserData.state} onChange={handleFromUserChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control name="pincode" value={fromUserData.pincode} onChange={handleFromUserChange} maxLength={6} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Specializations (comma-separated)</Form.Label>
              <Form.Control name="specializations" value={fromUserData.specializations} onChange={handleFromUserChange} placeholder="Wedding, Griha Pravesh, Satyanarayan" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowApproveForm(false)}>Cancel</Button>
            <Button type="submit" disabled={approveSaving} style={{ background: "var(--primary-600)", border: "none" }}>
              {approveSaving ? <Spinner animation="border" size="sm" /> : "Approve as Pandit"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
