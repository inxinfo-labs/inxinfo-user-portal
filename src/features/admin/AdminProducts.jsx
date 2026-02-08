import { useState, useEffect } from "react";
import { Container, Card, Button, Form, Row, Col, Table, Alert, Spinner, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";
import { FaPlus, FaArrowLeft } from "react-icons/fa";

// Backend uses /api/admin/items with { name, description, price, sku, active }
const INIT_FORM = { name: "", description: "", price: "", sku: "", active: true };

export default function AdminProducts() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ ...INIT_FORM });

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/admin/items");
      const raw = res.data?.data ?? res.data?.items ?? res.data;
      setList(Array.isArray(raw) ? raw : []);
    } catch (err) {
      setList([]);
      setError(getApiErrorMessage(err, "Could not load products. Ensure you are logged in as admin and backend exposes GET /api/admin/items."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...formData, [name]: value };
    if (name === "active") next.active = e.target.checked;
    setFormData(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.post("/admin/items", {
        name: formData.name.trim(),
        description: (formData.description || "").trim(),
        price: Number(formData.price) || 0,
        sku: (formData.sku || "").trim() || undefined,
        active: Boolean(formData.active),
      });
      setShowForm(false);
      setFormData({ ...INIT_FORM });
      fetchList();
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to add product. Ensure backend POST /api/admin/items and your JWT has ADMIN role."));
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
          <h2 className="mb-0 fw-bold">Products (Items)</h2>
        </div>
        <Button
          variant="primary"
          style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", border: "none" }}
          onClick={() => setShowForm(true)}
        >
          <FaPlus className="me-2" /> Add Product
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
              No products yet. Add one using the button above.
            </p>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.id ?? p._id}>
                    <td>{p.name}</td>
                    <td>{p.sku ?? "—"}</td>
                    <td>₹{p.price}</td>
                    <td>{p.active !== false ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Product (Item)</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={formData.name} onChange={handleChange} required placeholder="Product name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" value={formData.description} onChange={handleChange} as="textarea" rows={2} placeholder="Description" />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price (₹)</Form.Label>
                  <Form.Control name="price" type="number" min={0} step={0.01} value={formData.price} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>SKU (optional)</Form.Label>
                  <Form.Control name="sku" value={formData.sku} onChange={handleChange} placeholder="e.g. PUJA-001" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check type="switch" name="active" label="Active (visible to customers)" checked={formData.active} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" disabled={saving} style={{ background: "#0d9488", border: "none" }}>
              {saving ? <Spinner animation="border" size="sm" /> : "Add Product"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
