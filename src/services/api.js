import axios from "axios";
import logger from "../utils/logger";
import AppConfig from "../config/appConfig";

const api = axios.create({
  baseURL: AppConfig.apiBaseUrl,
  headers: { "Content-Type": "application/json" },
  timeout: AppConfig.requestTimeoutMs,
});

let onUnauthorized = null;

export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize success response: backend returns { success: true, data } – expose data as response.data for backward compatibility
api.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (body && typeof body === "object" && body.success === true && "data" in body) {
      response.data = body.data !== undefined ? body.data : body;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && onUnauthorized) {
      onUnauthorized();
    }
    logger.apiError(error);
    return Promise.reject(error);
  }
);

export default api;
