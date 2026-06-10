import { next, rewrite } from "@vercel/functions";

const companyHosts = new Set([
  "mbcreativeenterprises.com",
  "www.mbcreativeenterprises.com",
]);

export default function middleware(request) {
  const requestUrl = new URL(request.url);
  const hostname =
    request.headers.get("host")?.split(":")[0].toLowerCase() ??
    requestUrl.hostname.toLowerCase();

  if (!companyHosts.has(hostname)) {
    return next();
  }

  requestUrl.pathname = "/mb-creative-enterprises/index.html";
  return rewrite(requestUrl);
}

export const config = {
  matcher: "/",
};
