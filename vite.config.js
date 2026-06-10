import { resolve } from "node:path";
import { defineConfig } from "vite";

const cleanPageRoutes = new Map([
  ["/mb-creative-enterprises", "/mb-creative-enterprises/index.html"],
  ["/privacy", "/privacy/index.html"],
  ["/terms", "/terms/index.html"],
]);

function cleanPageRoutesPlugin() {
  const rewriteCleanPageRoute = (request, _response, next) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      next();
      return;
    }

    const requestUrl = new URL(request.url ?? "/", "http://vite.local");
    const destination = cleanPageRoutes.get(requestUrl.pathname);

    if (destination) {
      request.url = `${destination}${requestUrl.search}`;
    }

    next();
  };

  return {
    name: "clean-page-routes",
    configureServer(server) {
      server.middlewares.use(rewriteCleanPageRoute);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewriteCleanPageRoute);
    },
  };
}

export default defineConfig({
  appType: "mpa",
  plugins: [cleanPageRoutesPlugin()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        company: resolve(
          import.meta.dirname,
          "mb-creative-enterprises/index.html",
        ),
        privacy: resolve(import.meta.dirname, "privacy/index.html"),
        terms: resolve(import.meta.dirname, "terms/index.html"),
      },
    },
  },
});
