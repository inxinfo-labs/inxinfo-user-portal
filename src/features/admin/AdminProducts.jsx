import { useState, useEffect } from "react";
import { Container, Card, Button, Form, Row, Col, Table, Alert, Spinner, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";
import { PRODUCT_CATEGORIES } from "../../constants";
import { FaBox, FaPlus, FaArrowLeft } from "react-icons/fa";

export default function AdminProducts() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    category: PRODUCT_CATEGORIES[0],
    price: "",
    discountPrice: "",
    stock: "0",
  });

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/admin/products");
      setList(Array.isArray(res.data?.data) ? res.data.data : res.data?.products ?? []);
    } catch (err) {
      setList([]);
      setError(getApiErrorMessage(err, "Could not load products. Is the backend /api/admin/products running?"));
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
      await api.post("/admin/products", {
        name: formData.name.trim(),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription?.trim() || undefined,
        category: formData.category,
        price: Number(formData.price) || 0,
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
        inventory: { stock: Number(formData.stock) || 0 },
      });
      setShowForm(false);
      setFormData({ name: "", description: "", shortDescription: "", category: PRODUCT_CATEGORIES[0], price: "", discountPrice: "", stock: "0" });
      fetchList();
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to add product"));
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
              No products yet. Add one using the button above. Backend must expose <code>GET /api/admin/products</code> and <code>POST /api/admin/products</code>.
            </p>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p._id || p.id}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>₹{p.price}</td>
                    <td>{p.inventory?.stock ?? p.stock ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={formData.name} onChange={handleChange} required placeholder="Product name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" value={formData.description} onChange={handleChange} as="textarea" rows={2} required placeholder="Description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={formData.category} onChange={handleChange}>
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
                  <Form.Label>Discount Price (₹, optional)</Form.Label>
                  <Form.Control name="discountPrice" type="number" min={0} step={0.01} value={formData.discountPrice} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control name="stock" type="number" min={0} value={formData.stock} onChange={handleChange} />
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
