import AppConfig from "../config/appConfig";

/** Verbose logs only when REACT_APP_DEBUG=true or NODE_ENV !== production */
const isVerbose = () =>
  process.env.NODE_ENV !== "production" || AppConfig.debug;

const logger = {
  error(message, context = {}) {
    const payload = { message, ...context };
    if (isVerbose()) {
      console.error("[ERROR]", payload);
    } else {
      console.error(JSON.stringify({ level: "ERROR", ...payload }));
    }
  },

  warn(message, context = {}) {
    const payload = { message, ...context };
    if (isVerbose()) {
      console.warn("[WARN]", payload);
    } else {
      console.warn(JSON.stringify({ level: "WARN", ...payload }));
    }
  },

  info(message, context = {}) {
    if (!isVerbose()) return;
    console.info("[INFO]", message, context);
  },

  debug(message, context = {}) {
    if (!isVerbose()) return;
    console.debug("[DEBUG]", message, context);
  },

  /**
   * Log an API failure with errorCode and traceId for support/debugging.
   * Call from global API error handler or after getApiErrorDetails.
   */
  apiError(err, context = {}) {
    const data = err?.response?.data;
    const traceId = data?.traceId || err?.config?.headers?.["X-Trace-Id"];
    const errorCode = data?.errorCode ?? data?.code;
    const url = err?.config?.url ?? context.url;
    logger.error("API request failed", {
      url,
      status: err?.response?.status,
      errorCode,
      traceId,
      message: data?.message || err?.message,
      ...context,
    });
  },
};

export default logger;
