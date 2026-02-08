import { ApiCodeMessages } from "../constants";

/**
 * Get user-friendly error message from API error or fallback.
 * Uses central ApiCodeMessages when response has a known code.
 * @param {import('axios').AxiosError} err
 * @param {string} fallback
 * @returns {string}
 */
export function getApiErrorMessage(err, fallback = "Something went wrong. Please try again.") {
  const data = err.response?.data;
  const code = data?.code;
  if (code != null && ApiCodeMessages[code]) return ApiCodeMessages[code];
  const msg = data?.message;
  if (typeof msg === "string" && msg.trim()) return msg.trim();
  if (err.response?.status === 401) return "Please log in again.";
  if (err.response?.status === 403) return "You don't have permission.";
  if (err.response?.status === 404) return "Not found.";
  if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
    return "Cannot reach the server. Check that the backend is running and try again.";
  }
  if (err.message && typeof err.message === "string") return err.message;
  return fallback;
}
