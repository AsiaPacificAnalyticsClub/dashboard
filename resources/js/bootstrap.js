import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

window.axios.defaults.baseURL =
  import.meta.env.APP_URL || "https://your-production-domain.com";
