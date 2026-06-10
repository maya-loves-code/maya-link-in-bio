const companyHosts = new Set([
  "mbcreativeenterprises.com",
  "www.mbcreativeenterprises.com",
]);

if (companyHosts.has(window.location.hostname.toLowerCase())) {
  document.querySelectorAll("[data-company-home]").forEach((link) => {
    link.setAttribute("href", "/");
  });
}
