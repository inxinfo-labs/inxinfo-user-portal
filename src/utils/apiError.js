import { ApiCodeMessages } from "../constants";

/**
 * Normalized API error details from backend contract: success, errorCode, message, traceId.
 * Also supports legacy: code, message.
 * @param {import('axios').AxiosError} err
 * @returns {{ message: string, errorCode?: string, traceId?: string }}
 */
export function getApiErrorDetails(err) {
  const data = err?.response?.data ?? {};
  const errorCode = data.errorCode ?? data.code;
  const traceId = data.traceId ?? null;
  let message =
    (errorCode != null && ApiCodeMessages[errorCode]) ||
    (typeof data.message === "string" && data.message.trim() ? data.message : null) ||
    data.error ||
    data.detail;
  if (typeof message !== "string" || !message.trim()) {
    if (err?.response?.status === 401) message = "Please log in again.";
    else if (err?.response?.status === 403) message = "You don't have permission.";
    else if (err?.response?.status === 404) message = "Not found.";
    else if (err?.response?.status === 429) message = "Too many requests. Please try again later.";
    else if (err?.response?.status === 500)
      message = "Server error. Please try again or contact support.";
    else if (err?.code === "ERR_NETWORK" || err?.message === "Network Error")
      message = "Cannot reach the server. Check that the backend is running and try again.";
    else message = err?.message || "Something went wrong. Please try again.";
  }
  return { message: message.trim(), errorCode: errorCode ?? undefined, traceId: traceId ?? undefined };
}

/**
 * Get user-friendly error message only (backward compatible).
 * @param {import('axios').AxiosError} err
 * @param {string} fallback
 * @returns {string}
 */
export function getApiErrorMessage(err, fallback = "Something went wrong. Please try again.") {
  return getApiErrorDetails(err).message || fallback;
}

/**
 * Get traceId from error response for display and logging.
 * @param {import('axios').AxiosError} err
 * @returns {string|null}
 */
export function getApiErrorTraceId(err) {
  return err?.response?.data?.traceId ?? null;
}

/**
 * Format error details for user display (message + optional error code and reference ID).
 * @param {{ message: string, errorCode?: string, traceId?: string }} details
 * @returns {string}
 */
export function formatErrorForDisplay(details) {
  if (!details?.message) return "Something went wrong. Please try again.";
  let text = details.message;
  if (details.errorCode) text += `\nError Code: ${details.errorCode}`;
  if (details.traceId) text += `\nReference ID: ${details.traceId}`;
  return text;
}
