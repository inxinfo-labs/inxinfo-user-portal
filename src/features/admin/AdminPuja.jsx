import { useState, useEffect } from "react";
import { Container, Card, Button, Form, Table, Alert, Spinner, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";
import { RITUAL_TYPES } from "../../constants";
import { FaPlus, FaArrowLeft } from "react-icons/fa";

export default function AdminPuja() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ritualType: RITUAL_TYPES[0],
    description: "",
    basePrice: "500",
    durationMinutes: "60",
  });

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/admin/puja");
      setList(Array.isArray(res.data?.data) ? res.data.data : res.data?.pujas ?? []);
    } catch (err) {
      setList([]);
      setError(getApiErrorMessage(err, "Could not load puja services. Is the backend /api/admin/puja running?"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.post("/admin/puja", {
        name: formData.name.trim(),
        ritualType: formData.ritualType,
        type: formData.ritualType,
        description: formData.description?.trim() || undefined,
        basePrice: Number(formData.basePrice) || 0,
        durationMinutes: Number(formData.durationMinutes) || 60,
      });
      setShowForm(false);
      setFormData({ name: "", ritualType: RITUAL_TYPES[0], description: "", basePrice: "500", durationMinutes: "60" });
      fetchList();
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to add puja service"));
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
          <h2 className="mb-0 fw-bold">Puja Services</h2>
        </div>
        <Button
          variant="primary"
          style={{ background: "var(--gradient-primary)", border: "none" }}
          onClick={() => setShowForm(true)}
        >
          <FaPlus className="me-2" /> Add Puja Service
        </Button>
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
              No puja services yet. Add one using the button above. Backend must expose <code>GET /api/admin/puja</code> and <code>POST /api/admin/puja</code>.
            </p>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ritual Type</th>
                  <th>Price</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p._id || p.id}>
                    <td>{p.name}</td>
                    <td>{p.ritualType || p.type || "—"}</td>
                    <td>₹{p.basePrice ?? p.price ?? "—"}</td>
                    <td>{p.durationMinutes ?? p.duration ?? "—"} min</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Puja Service</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Satyanarayan Puja at Home" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ritual Type</Form.Label>
              <Form.Select name="ritualType" value={formData.ritualType} onChange={handleChange}>
                {RITUAL_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" value={formData.description} onChange={handleChange} as="textarea" rows={2} placeholder="Short description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Base Price (₹)</Form.Label>
              <Form.Control name="basePrice" type="number" min={0} value={formData.basePrice} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control name="durationMinutes" type="number" min={15} value={formData.durationMinutes} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" disabled={saving} style={{ background: "var(--primary-600)", border: "none" }}>
              {saving ? <Spinner animation="border" size="sm" /> : "Add Puja Service"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
