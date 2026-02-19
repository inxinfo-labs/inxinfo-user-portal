import { useState, useEffect } from "react";
import { Container, Card, Table, Badge, Spinner, Alert, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FaHistory, FaArrowLeft, FaSync } from "react-icons/fa";

const PAGE_SIZE = 30;
const actionColors = { CREATE: "success", UPDATE: "info", DELETE: "danger" };
const entityLabels = {
  ORDER: "Order",
  PUJA_BOOKING: "Puja booking",
  PANDIT_BOOKING: "Pandit booking",
  ITEM: "Product",
  PUJA_TYPE: "Puja service",
  PANDIT: "Pandit",
  USER: "User",
};

function formatDateTime(d) {
  if (!d) return "—";
  const dt = new Date(d);
  return dt.toLocaleString(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function AdminAudit() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = () => {
    setLoading(true);
    setError(null);
    api
      .get("/audit/admin", { params: { page, size: PAGE_SIZE } })
      .then((r) => {
        const data = r.data?.data ?? r.data;
        const content = data?.content ?? (Array.isArray(data) ? data : []);
        setLogs(content);
        setTotalPages(data?.totalPages ?? 1);
      })
      .catch(() => setError("Failed to load audit logs"))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchLogs(), [page]);

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-4 flex-wrap">
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center gap-1"
            onClick={() => navigate("/user/admin")}
            aria-label="Back"
          >
            <FaArrowLeft /> Back
          </Button>
          <div>
            <h2 className="mb-0 fw-bold d-flex align-items-center gap-2">
              <FaHistory className="text-primary" /> Audit Trail
            </h2>
            <p className="text-muted small mb-0 mt-1">All changes across orders, services, pandits, and users</p>
          </div>
        </div>
        <Button variant="outline-primary" size="sm" onClick={fetchLogs} disabled={loading}>
          <FaSync /> Refresh
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          {loading && logs.length === 0 ? (
            <div className="text-center py-5">
              <Spinner animation="border" size="sm" />
              <p className="text-muted small mt-2">Loading audit logs...</p>
            </div>
          ) : !logs?.length ? (
            <div className="text-center py-5 text-muted">No audit entries yet.</div>
          ) : (
            <Table responsive hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Date & Time</th>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>ID</th>
                  <th>Changed by</th>
                  <th>Summary</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l) => (
                  <tr key={l.id}>
                    <td className="small text-nowrap">{formatDateTime(l.changedAt)}</td>
                    <td>
                      <Badge bg={actionColors[l.action] || "secondary"}>{l.action}</Badge>
                    </td>
                    <td>{entityLabels[l.entityType] || l.entityType}</td>
                    <td>{l.entityId}</td>
                    <td className="small">
                      {l.changedByEmail ?? `User #${l.changedByUserId}`}
                    </td>
                    <td className="small">{l.summary || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center p-3 border-top bg-light">
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                Previous
              </Button>
              <span className="small text-muted">Page {page + 1} of {totalPages}</span>
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
