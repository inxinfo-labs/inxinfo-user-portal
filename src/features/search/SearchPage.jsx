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
        matchQuery(p.category, normalizedQuery)
    );
  }, [pujas, normalizedQuery]);

  const filteredPandits = useMemo(() => {
    if (!normalizedQuery) return pandits;
    return pandits.filter(
      (p) =>
        matchQuery(p.name, normalizedQuery) ||
        matchQuery(p.email, normalizedQuery) ||
        matchQuery(p.city, normalizedQuery) ||
        matchQuery(p.bio, normalizedQuery) ||
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
          placeholder="Search puja, pandit, city, category..."
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
          <Row xs={1} md={2} lg={3} className="g-3">
            {filteredPujas.map((p) => (
              <Col key={p.id}>
                <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
                  <Card.Body>
                    {p.category && (
                      <Badge bg="light" text="dark" className="mb-2">
                        {p.category}
                      </Badge>
                    )}
                    <Card.Title className="h6 fw-bold">{p.name}</Card.Title>
                    {p.description && (
                      <Card.Text className="small text-muted text-truncate" style={{ maxHeight: "2.5rem" }}>
                        {p.description}
                      </Card.Text>
                    )}
                    {p.price != null && (
                      <p className="mb-2 small fw-semibold text-success">₹{p.price}</p>
                    )}
                    <Button
                      as={Link}
                      to={`/user/puja/${p.id}/book`}
                      variant="outline-primary"
                      size="sm"
                      className="mt-1"
                    >
                      Book <FaArrowRight className="ms-1" />
                    </Button>
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
          <Row xs={1} md={2} lg={3} className="g-3">
            {filteredPandits.map((p) => (
              <Col key={p.id}>
                <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
                  <Card.Body>
                    {p.city && (
                      <Badge bg="light" text="dark" className="mb-2">
                        {p.city}
                      </Badge>
                    )}
                    <Card.Title className="h6 fw-bold">{p.name}</Card.Title>
                    {p.bio && (
                      <Card.Text className="small text-muted text-truncate" style={{ maxHeight: "2.5rem" }}>
                        {p.bio}
                      </Card.Text>
                    )}
                    {p.hourlyRate != null && (
                      <p className="mb-2 small fw-semibold text-success">₹{p.hourlyRate}/hr</p>
                    )}
                    <Button
                      as={Link}
                      to={`/user/pandit/${p.id}/book`}
                      variant="outline-primary"
                      size="sm"
                      className="mt-1"
                    >
                      Book <FaArrowRight className="ms-1" />
                    </Button>
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
