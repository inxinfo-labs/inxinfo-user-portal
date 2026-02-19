/**
 * Audit date/time formatting utilities.
 * Use for consistent display of createdAt, updatedAt across the app.
 */

/**
 * Format ISO date string for display (e.g. "Feb 19, 2025, 2:30 PM")
 */
export function formatDateTime(dateString) {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(dateString);
  }
}

/**
 * Format for compact display (e.g. "Feb 19, 2025")
 */
export function formatDateShort(dateString) {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return String(dateString);
  }
}
