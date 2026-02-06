import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && onUnauthorized) {
      onUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default api;
