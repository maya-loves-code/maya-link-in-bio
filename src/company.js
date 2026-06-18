import { initAnalytics } from "./analytics.js";

const companyHosts = new Set([
  "mbcreativeenterprises.com",
  "www.mbcreativeenterprises.com",
]);

initAnalytics();

if (companyHosts.has(window.location.hostname.toLowerCase())) {
  document.querySelectorAll("[data-company-home]").forEach((link) => {
    link.setAttribute("href", "/");
  });
}
