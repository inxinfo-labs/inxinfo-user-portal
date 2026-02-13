/**
 * Centralized application configuration. No hardcoded URLs, timeouts, or feature flags in code.
 * All values from environment variables (REACT_APP_*). See .env.example for required vars.
 */

const getEnv = (key, fallback) => {
  const v = process.env[key];
  if (v === undefined || v === "") return fallback;
  return v;
};

const parseNumber = (value, defaultVal) => {
  if (value === undefined || value === "") return defaultVal;
  const n = Number(value);
  return Number.isFinite(n) ? n : defaultVal;
};

export const AppConfig = Object.freeze({
  /** API base URL (e.g. https://api.example.com/api). Required in production. */
  apiBaseUrl: getEnv("REACT_APP_API_URL", "http://localhost:8080/api"),

  /** Request timeout in milliseconds */
  requestTimeoutMs: parseNumber(process.env.REACT_APP_API_TIMEOUT_MS, 30000),

  /** Enable debug logging in UI */
  debug: getEnv("REACT_APP_DEBUG", "false") === "true",

  /** EmailJS (contact form) – optional */
  emailJs: {
    serviceId: getEnv("REACT_APP_EMAILJS_SERVICE_ID", ""),
    templateId: getEnv("REACT_APP_EMAILJS_TEMPLATE_ID", ""),
    publicKey: getEnv("REACT_APP_EMAILJS_PUBLIC_KEY", ""),
  },

  /** Contact page: fallback email when backend contact is unavailable */
  contactEmail: getEnv("REACT_APP_CONTACT_EMAIL", "satish.prasad@inxinfo.com"),
});

/** Validate required config at app load (e.g. in index or App). In production, apiBaseUrl should be set. */
export function validateConfig() {
  if (!AppConfig.apiBaseUrl || AppConfig.apiBaseUrl.trim() === "") {
    console.warn("[Config] REACT_APP_API_URL is not set; API calls may fail.");
  }
  return true;
}

export default AppConfig;
