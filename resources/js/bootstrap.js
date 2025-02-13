import axios from "axios";

// Add debug logging
console.log("Environment URL:", import.meta.env.VITE_APP_URL);
console.log("Current window location:", window.location.href);

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true; // Add this for cookie handling

// Ensure HTTPS
const baseURL =
  import.meta.env.VITE_APP_URL || "https://your-production-domain.com";
window.axios.defaults.baseURL = baseURL.replace("http://", "https://");

// Add request interceptor for debugging
window.axios.interceptors.request.use((request) => {
  console.log("Axios Request:", {
    url: request.url,
    baseURL: request.baseURL,
    fullUrl: request.baseURL + request.url,
    protocol: new URL(request.baseURL + request.url).protocol,
  });
  return request;
});

// Add response interceptor to catch protocol issues
window.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network Error") {
      console.error("Network Error Details:", {
        config: error.config,
        baseURL: error.config?.baseURL,
        url: error.config?.url,
        headers: error.config?.headers,
      });
    }
    return Promise.reject(error);
  },
);
