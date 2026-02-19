import { FaClock } from "react-icons/fa";
import { formatDateTime } from "../utils/audit";

/**
 * Reusable audit info display for createdAt / updatedAt.
 * Use on profile, order details, and anywhere audit timestamps are shown.
 * @param {string} createdAtLabel - Optional label for created (default: "Created")
 * @param {string} updatedAtLabel - Optional label for updated (default: "Last updated")
 */
export default function AuditInfo({
  createdAt,
  updatedAt,
  size = "small",
  className = "",
  createdAtLabel = "Created",
  updatedAtLabel = "Last updated",
}) {
  if (!createdAt && !updatedAt) return null;

  return (
    <div className={`audit-info ${className}`} style={{ fontSize: size === "small" ? "0.875rem" : "1rem" }}>
      <div className="d-flex align-items-center text-muted mb-1">
        <FaClock className="me-2" style={{ fontSize: "0.75rem" }} />
        <span className="fw-semibold">Audit</span>
      </div>
      <div className="small text-muted">
        {createdAt && <div>{createdAtLabel}: {formatDateTime(createdAt)}</div>}
        {updatedAt && <div>{updatedAtLabel}: {formatDateTime(updatedAt)}</div>}
      </div>
    </div>
  );
}
