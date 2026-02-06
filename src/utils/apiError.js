/**
 * Get user-friendly error message from API error or fallback.
 * @param {import('axios').AxiosError} err
 * @param {string} fallback
 * @returns {string}
 */
export function getApiErrorMessage(err, fallback = "Something went wrong") {
  const msg = err.response?.data?.message;
  if (typeof msg === "string") return msg;
  if (err.response?.status === 401) return "Please log in again.";
  if (err.response?.status === 403) return "You don't have permission.";
  if (err.response?.status === 404) return "Not found.";
  if (err.message) return err.message;
  return fallback;
}
