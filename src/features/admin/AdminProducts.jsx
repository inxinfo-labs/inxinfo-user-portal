import { useState, useEffect } from "react";
import { Container, Card, Button, Form, Row, Col, Table, Alert, Spinner, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";
import { PRODUCT_CATEGORIES } from "../../constants";
import { FaPlus, FaArrowLeft } from "react-icons/fa";

const INIT_FORM = { name: "", description: "", category: "", price: "", discountPrice: "", stock: "0", images: "", sku: "", active: true };

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
        category: (formData.category || "").trim() || undefined,
        price: Number(formData.price) || 0,
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
        stock: Math.max(0, parseInt(formData.stock, 10) || 0),
        images: (formData.images || "").trim() || undefined,
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
          style={{ background: "var(--gradient-primary)", border: "none" }}
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
            <>
              <h6 className="text-muted mb-2">Audit: Products with created and last updated date/time</h6>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Stock</th>
                    <th>SKU</th>
                    <th>Active</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((p) => (
                    <tr key={p.id ?? p._id}>
                      <td>{p.name}</td>
                      <td className="small">{p.category ?? "—"}</td>
                      <td>₹{p.price ?? "—"}</td>
                      <td>{p.discountPrice != null ? `₹${p.discountPrice}` : "—"}</td>
                      <td>{p.stock ?? 0}</td>
                      <td className="small">{p.sku ?? "—"}</td>
                      <td>{p.active !== false ? "Yes" : "No"}</td>
                      <td className="small">{p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}</td>
                      <td className="small">{p.updatedAt ? new Date(p.updatedAt).toLocaleString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
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
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={formData.category} onChange={handleChange}>
                <option value="">— Select category —</option>
                {PRODUCT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Form.Select>
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
                  <Form.Label>Discount price (₹, optional)</Form.Label>
                  <Form.Control name="discountPrice" type="number" min={0} step={0.01} value={formData.discountPrice} onChange={handleChange} placeholder="0" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock (inventory)</Form.Label>
                  <Form.Control name="stock" type="number" min={0} value={formData.stock} onChange={handleChange} />
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
              <Form.Label>Images (comma-separated URLs, optional)</Form.Label>
              <Form.Control name="images" value={formData.images} onChange={handleChange} placeholder="https://..." as="textarea" rows={2} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="switch" name="active" label="Active (visible to customers)" checked={formData.active} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" disabled={saving} style={{ background: "var(--primary-600)", border: "none" }}>
              {saving ? <Spinner animation="border" size="sm" /> : "Add Product"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
