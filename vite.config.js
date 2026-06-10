import { resolve } from "node:path";
import { defineConfig } from "vite";

const cleanPageRoutes = new Map([
  ["/mb-creative-enterprises", "/mb-creative-enterprises/index.html"],
  ["/privacy", "/privacy/index.html"],
  ["/terms", "/terms/index.html"],
]);

const companyHosts = new Set([
  "mbcreativeenterprises.com",
  "www.mbcreativeenterprises.com",
]);

const siteHosts = [
  ...companyHosts,
  "mayabello.com",
  "www.mayabello.com",
];

function cleanPageRoutesPlugin() {
  const rewriteCleanPageRoute = (request, _response, next) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      next();
      return;
    }

    const requestUrl = new URL(request.url ?? "/", "http://vite.local");
    const requestHost = request.headers.host?.split(":")[0].toLowerCase();
    const isCompanyHost = companyHosts.has(requestHost);
    const destination =
      isCompanyHost && requestUrl.pathname === "/"
        ? "/mb-creative-enterprises/index.html"
        : cleanPageRoutes.get(requestUrl.pathname);

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
  server: {
    allowedHosts: siteHosts,
  },
  preview: {
    allowedHosts: siteHosts,
  },
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
