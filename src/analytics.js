import { inject, track } from "@vercel/analytics";

const isPlaceholderUrl = (url = "") =>
  !url || /^[A-Z0-9_]+$/.test(url) || url === "#";

const getDestinationHost = (url = "") => {
  if (isPlaceholderUrl(url)) {
    return "placeholder";
  }

  if (url.startsWith("mailto:")) {
    return "email";
  }

  try {
    return new URL(url, window.location.href).hostname || "same-origin";
  } catch {
    return "unknown";
  }
};

export function initAnalytics() {
  inject();
}

export function trackLinkClick({
  eventName,
  label,
  placement,
  type,
  url,
}) {
  if (isPlaceholderUrl(url)) {
    return;
  }

  track(eventName, {
    destinationHost: getDestinationHost(url),
    label,
    placement,
    type,
  });
}

export function bindAnalyticsLinks(root = document) {
  root.querySelectorAll("[data-analytics-event]").forEach((link) => {
    if (link.dataset.analyticsBound === "true") {
      return;
    }

    link.dataset.analyticsBound = "true";

    link.addEventListener("click", () => {
      if (link.getAttribute("aria-disabled") === "true") {
        return;
      }

      trackLinkClick({
        eventName: link.dataset.analyticsEvent,
        label: link.dataset.analyticsLabel,
        placement: link.dataset.analyticsPlacement,
        type: link.dataset.analyticsType,
        url: link.dataset.analyticsUrl || link.getAttribute("href"),
      });
    });
  });
}
