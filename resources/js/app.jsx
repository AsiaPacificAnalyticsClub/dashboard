import "../css/app.css";
import "./bootstrap";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    console.log("Resolving page:", name);
    console.log("Current URL:", window.location.href);

    return resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx"),
    );
  },
  setup({ el, App, props }) {
    console.log("Inertia Setup:", {
      currentUrl: window.location.href,
      baseUrl: window.axios.defaults.baseURL,
      props: props,
    });

    if (import.meta.env.SSR) {
      hydrateRoot(el, <App {...props} />);
      return;
    }

    const root = createRoot(el);

    // Wrap the render in error boundary
    try {
      root.render(<App {...props} />);
    } catch (error) {
      console.error("Render Error:", error);
      throw error;
    }
  },
  progress: {
    color: "#4B5563",
  },
});
