import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Form,
  InputGroup,
  Badge,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { FaSearch, FaPrayingHands, FaUserTie, FaBox, FaArrowRight } from "react-icons/fa";
import { getApiErrorMessage } from "../../utils/apiError";

function usePujaAndPandit() {
  const [pujas, setPujas] = useState([]);
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [pujaRes, panditRes] = await Promise.all([
          api.get("/puja").catch(() => ({ data: { data: [] } })),
          api.get("/pandit/available").catch(() => ({ data: { data: [] } })),
        ]);
        if (cancelled) return;
        setPujas(pujaRes.data?.data ?? pujaRes.data ?? []);
        setPandits(panditRes.data?.data ?? panditRes.data ?? []);
      } catch (e) {
        if (!cancelled) setError(getApiErrorMessage(e, "Failed to load search data."));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return { pujas, pandits, loading, error };
}

function matchQuery(str, q) {
  if (!str || typeof str !== "string") return false;
  return str.toLowerCase().includes((q || "").toLowerCase().trim());
}

function matchPrice(value, q) {
  if (value == null || value === "") return false;
  const str = String(value);
  return str.includes(q) || str.replace(/\D/g, "").includes(q.replace(/\D/g, ""));
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { pujas, pandits, loading, error } = usePujaAndPandit();

  const normalizedQuery = (query || "").trim().toLowerCase();

  const filteredPujas = useMemo(() => {
    if (!normalizedQuery) return pujas;
    return pujas.filter(
      (p) =>
        matchQuery(p.name, normalizedQuery) ||
        matchQuery(p.description, normalizedQuery) ||
        matchQuery(p.category, normalizedQuery) ||
        matchQuery(p.ritualType, normalizedQuery) ||
        matchPrice(p.price, normalizedQuery) ||
        matchQuery(String(p.durationMinutes || ""), normalizedQuery)
    );
  }, [pujas, normalizedQuery]);

  const filteredPandits = useMemo(() => {
    if (!normalizedQuery) return pandits;
    return pandits.filter(
      (p) =>
        matchQuery(p.name, normalizedQuery) ||
        matchQuery(p.email, normalizedQuery) ||
        matchQuery(p.city, normalizedQuery) ||
        matchQuery(p.state, normalizedQuery) ||
        matchQuery(p.bio, normalizedQuery) ||
        matchPrice(p.hourlyRate, normalizedQuery) ||
        matchQuery(String(p.experienceYears || ""), normalizedQuery) ||
        (Array.isArray(p.specializations) && p.specializations.some((s) => matchQuery(s, normalizedQuery)))
    );
  }, [pandits, normalizedQuery]);

  const hasResults =
    (activeTab === "all" && (filteredPujas.length > 0 || filteredPandits.length > 0)) ||
    (activeTab === "puja" && filteredPujas.length > 0) ||
    (activeTab === "pandit" && filteredPandits.length > 0);

  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
          <p className="mt-3 text-muted">Loading search data...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" dismissible onClose={() => {}}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-2">Search</h1>
        <p className="text-muted mb-0">
          Search across Puja services, Pandits, and related offerings
        </p>
      </div>

      <InputGroup size="lg" className="mb-4 shadow-sm" style={{ borderRadius: "0.75rem" }}>
        <InputGroup.Text className="bg-white border-end-0">
          <FaSearch className="text-muted" />
        </InputGroup.Text>
        <Form.Control
          type="search"
          placeholder="Search by name, price, puja, pandit, city, ritual type, category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-start-0"
          style={{ borderRadius: "0 0.75rem 0.75rem 0" }}
        />
      </InputGroup>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "all")} className="mb-3">
        <Tab eventKey="all" title={<><FaBox className="me-1" /> All</>} />
        <Tab eventKey="puja" title={<><FaPrayingHands className="me-1" /> Puja</>} />
        <Tab eventKey="pandit" title={<><FaUserTie className="me-1" /> Pandit</>} />
      </Tabs>

      {!hasResults && (
        <Alert variant="info" className="text-center py-4">
          {normalizedQuery
            ? "No results found for your search. Try a different term or browse all."
            : "Enter a search term above or browse by tab."}
        </Alert>
      )}

      {(activeTab === "all" || activeTab === "puja") && filteredPujas.length > 0 && (
        <div className="mb-4">
          <h5 className="fw-bold mb-3">
            <FaPrayingHands className="me-2 text-teal" />
            Puja Services ({filteredPujas.length})
          </h5>
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredPujas.map((p) => (
              <Col key={p.id} lg={4} md={6}>
                <Card className="h-100 border-0 shadow-sm service-card" style={{ borderRadius: "1rem", minHeight: 460, overflow: "hidden" }}>
                  {p.imageUrl ? (
                    <Card.Img variant="top" src={p.imageUrl} style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }} />
                  ) : (
                    <div className="card-img-placeholder d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
                      <FaPrayingHands className="text-muted" style={{ fontSize: "2.5rem", opacity: 0.5 }} />
                    </div>
                  )}
                  <Card.Body className="p-4 d-flex flex-column">
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {p.ritualType && <Badge bg="primary">{p.ritualType}</Badge>}
                      {p.category && <Badge bg="light" text="dark">{p.category}</Badge>}
                    </div>
                    <Card.Title className="h6 fw-bold mb-2">{p.name}</Card.Title>
                    <div className="card-content mb-2">
                    <Card.Text className="small text-muted mb-0">
                      {p.description ? (p.description.length > 100 ? `${p.description.substring(0, 100)}...` : p.description) : "Traditional puja service"}
                    </Card.Text>
                    </div>
                    <div className="card-actions d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-success">₹{p.price ?? "N/A"}</span>
                      <Button as={Link} to={`/user/puja/${p.id}/book`} variant="primary" size="sm" style={{ borderRadius: "0.5rem" }}>
                        Book <FaArrowRight className="ms-1" />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {(activeTab === "all" || activeTab === "pandit") && filteredPandits.length > 0 && (
        <div className="mb-4">
          <h5 className="fw-bold mb-3">
            <FaUserTie className="me-2 text-teal" />
            Pandits ({filteredPandits.length})
          </h5>
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredPandits.map((p) => (
              <Col key={p.id} lg={4} md={6}>
                <Card className="h-100 border-0 shadow-sm service-card" style={{ borderRadius: "1rem", minHeight: 460, overflow: "hidden" }}>
                  {p.profileImageUrl ? (
                    <Card.Img variant="top" src={p.profileImageUrl} style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }} />
                  ) : (
                    <div className="card-img-placeholder d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
                      <FaUserTie className="text-muted" style={{ fontSize: "2.5rem", opacity: 0.5 }} />
                    </div>
                  )}
                  <Card.Body className="p-4 d-flex flex-column">
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {p.city && <Badge bg="primary">{p.city}</Badge>}
                      {p.status === "AVAILABLE" && <Badge bg="success">Available</Badge>}
                    </div>
                    <Card.Title className="h6 fw-bold mb-2">{p.name}</Card.Title>
                    <div className="card-content mb-2">
                    <Card.Text className="small text-muted mb-0">
                      {p.bio ? (p.bio.length > 100 ? `${p.bio.substring(0, 100)}...` : p.bio) : "Experienced pandit for your ceremonies"}
                    </Card.Text>
                    </div>
                    <div className="card-actions d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-success">₹{p.hourlyRate ?? "N/A"}/hr</span>
                      <Button as={Link} to={`/user/pandit/${p.id}/book`} variant="primary" size="sm" style={{ borderRadius: "0.5rem" }}>
                        Book <FaArrowRight className="ms-1" />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
}
