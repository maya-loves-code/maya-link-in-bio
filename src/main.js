import { content } from "./content.js";
import "./styles.css";

const app = document.querySelector("#app");

const isPlaceholderUrl = (url = "") =>
  !url || /^[A-Z0-9_]+$/.test(url) || url === "#";

const safeHref = (url) => (isPlaceholderUrl(url) ? "#" : url);

const targetAttrs = (url) =>
  isPlaceholderUrl(url)
    ? 'aria-disabled="true" tabindex="-1"'
    : 'target="_blank" rel="noreferrer"';

const iconMarkup = {
  youtube: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.4 7.1a3 3 0 0 0-2.1-2.1C17.5 4.5 12 4.5 12 4.5s-5.5 0-7.3.5a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2.1 12a31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.1c1.8.5 7.3.5 7.3.5s5.5 0 7.3-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9Z" />
      <path class="icon-cutout" d="m10.2 15.4 5.1-3.4-5.1-3.4v6.8Z" />
    </svg>
  `,
  phone: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="2.8" width="10" height="18.4" rx="2.4" />
      <path class="icon-cutout" d="M10 5h4v1.2h-4zM11 18.2h2v1.2h-2z" />
    </svg>
  `,
  flask: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3.5h6v2h-1v4.2l4.6 7.8a2 2 0 0 1-1.7 3H7.1a2 2 0 0 1-1.7-3L10 9.7V5.5H9v-2Z" />
      <path class="icon-cutout" d="M8.2 16h7.6l1.2 2.1H7l1.2-2.1Z" />
    </svg>
  `,
  coffee: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.8 8h11.4v5.3a5.2 5.2 0 0 1-5.2 5.2H10a5.2 5.2 0 0 1-5.2-5.2V8Zm12.3 2h1.1a3.2 3.2 0 0 1 0 6.4h-1.1v-2.2h1.1a1 1 0 1 0 0-2h-1.1V10Z" />
    </svg>
  `,
  bag: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 8.5h10l1 11H6l1-11Zm2.8 0a2.2 2.2 0 0 1 4.4 0h2a4.2 4.2 0 0 0-8.4 0h2Z" />
    </svg>
  `,
  rocket: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 3.4c2.4.2 4.1 1.9 4.3 4.3.3 3.2-2.4 6.4-5.1 8.1l-2.2-2.2c1.7-2.7 4.9-5.4 8.1-5.1-3.2-.3-6.4 2.4-8.1 5.1L8.2 10.3c1.7-2.7 4.9-5.4 6.3-6.9Z" />
      <path class="icon-cutout" d="M14.7 7.1a1.4 1.4 0 1 0 2 2 1.4 1.4 0 0 0-2-2Z" />
      <path d="M7.7 13.7 5.4 16l2.6.8.8 2.6 2.3-2.3-3.4-3.4Z" />
    </svg>
  `,
  ai: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.7 13.9 8l5.4 1.9-5.4 1.9L12 17.3 10.1 12 4.7 10.1 10.1 8 12 2.7Zm6 11.3.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4Z" />
    </svg>
  `,
  code: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8.4 7.2-4.2 4.4 4.2 4.5 1.6-1.5-2.8-3 2.8-2.9-1.6-1.5Zm7.2 0L14 8.7l2.8 2.9-2.8 3 1.6 1.5 4.2-4.5-4.2-4.4ZM12.4 6l-2.2 12h1.9l2.2-12h-1.9Z" />
    </svg>
  `,
  x: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 10.6 21.1 3h-2.5l-5.7 6.1L8.4 3H3l7.3 9.8L2.9 21h2.5l6-6.6 4.9 6.6H22l-8-10.4Zm-2 2.2-1.1-1.5L6.8 5h.7l10.7 14h-.8L12 12.8Z" />
    </svg>
  `,
  email: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 6.5h17v11h-17v-11Zm2.3 2 6.2 4.2 6.2-4.2H5.8Zm12.7 7V10l-6.5 4.4L5.5 10v5.5h13Z" />
    </svg>
  `,
};

function actionMarkup(action, className = "button") {
  const disabled = isPlaceholderUrl(action.url);
  if (disabled) {
    return `<button class="${className} ${action.variant ?? ""}" type="button" disabled>${action.label}<span>${action.placeholderLabel ?? "Coming soon"}</span></button>`;
  }

  return `<a class="${className} ${action.variant ?? ""}" href="${safeHref(action.url)}" ${targetAttrs(action.url)}>${action.label}</a>`;
}

function clickableCardMarkup(item) {
  const disabled = isPlaceholderUrl(item.url);
  const inner = `
    <span class="card-icon ${item.icon}" aria-hidden="true">${iconMarkup[item.icon] ?? ""}</span>
    <span>
      <strong>${item.title}</strong>
      <small>${item.subtitle}</small>
    </span>
    ${disabled ? `<em>${item.placeholderLabel ?? "Coming soon"}</em>` : `<span class="card-arrow" aria-hidden="true">-></span>`}
  `;

  if (disabled) {
    return `<button class="explore-card disabled-card" type="button" disabled>${inner}</button>`;
  }

  return `<a class="explore-card" href="${safeHref(item.url)}" ${targetAttrs(item.url)}>${inner}</a>`;
}

function latestCardMarkup(item) {
  const disabled = isPlaceholderUrl(item.url);
  const inner = `
    <span class="latest-thumb ${item.icon}" aria-hidden="true">${iconMarkup[item.icon] ?? ""}</span>
    <span class="latest-meta">${item.category}</span>
    <strong>${item.title}</strong>
    <small>${item.date}</small>
  `;

  if (disabled) {
    return `<button class="latest-card disabled-card" type="button" disabled>${inner}</button>`;
  }

  return `<a class="latest-card" href="${safeHref(item.url)}" ${targetAttrs(item.url)}>${inner}</a>`;
}

function socialMarkup(item) {
  const disabled = isPlaceholderUrl(item.url);
  if (disabled) {
    return `
      <button class="social-button ${item.platform} disabled-card" type="button" disabled aria-label="${item.label} coming soon">
        ${iconMarkup[item.platform] ?? ""}
      </button>
    `;
  }

  return `
    <a class="social-button ${item.platform}" href="${safeHref(item.url)}" ${targetAttrs(item.url)} aria-label="${item.label}">
      ${iconMarkup[item.platform] ?? ""}
    </a>
  `;
}

app.innerHTML = `
  <main class="page-shell">
    <section class="workspace" aria-labelledby="profile-title">
      <div class="screen">
        <header class="menu-bar" aria-label="Creator Workspace">
          <span class="menu-brand">Creator Workspace</span>
          <span class="menu-controls" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </header>

        <div class="dashboard">
          <section class="hero-section" aria-labelledby="profile-title">
            <div class="hero-copy">
              <p class="eyebrow">Creator Workspace</p>
              <h1 id="profile-title">${content.profile.name}</h1>
              <p class="tagline">${content.profile.bio}</p>
              <p class="supporting-line">${content.profile.supportingLine}</p>
              <div class="hero-actions">
                ${content.heroActions.map((action) => actionMarkup(action)).join("")}
              </div>
            </div>
            <div class="hero-photo">
              <img src="${content.profile.photo}" alt="${content.profile.name}" />
            </div>
          </section>

          <section class="section-block" aria-labelledby="explore-title">
            <div class="section-heading">
              <p class="eyebrow">Start here</p>
              <h2 id="explore-title">Explore More</h2>
            </div>
            <div class="explore-grid">
              ${content.exploreCards.map(clickableCardMarkup).join("")}
            </div>
          </section>

          <section class="dashboard-grid" aria-label="Dashboard highlights">
            <article class="insight-card wide-card">
              <span class="insight-icon ${content.currentlyBuilding.icon}" aria-hidden="true">${iconMarkup[content.currentlyBuilding.icon] ?? ""}</span>
              <div>
                <p class="eyebrow">${content.currentlyBuilding.title}</p>
                <p>${content.currentlyBuilding.text}</p>
              </div>
              ${actionMarkup(
                {
                  label: content.currentlyBuilding.ctaLabel,
                  url: content.currentlyBuilding.url,
                  variant: "compact",
                  placeholderLabel: content.currentlyBuilding.placeholderLabel,
                },
                "button small-button",
              )}
            </article>

            <article class="insight-card">
              <span class="insight-icon ${content.weeklyObsession.icon}" aria-hidden="true">${iconMarkup[content.weeklyObsession.icon] ?? ""}</span>
              <div>
                <p class="eyebrow">${content.weeklyObsession.title}</p>
                <p>${content.weeklyObsession.text}</p>
              </div>
            </article>
          </section>

          <section class="section-block" aria-labelledby="latest-title">
            <div class="section-heading split-heading">
              <div>
                <p class="eyebrow">Updates</p>
                <h2 id="latest-title">${content.latest.title}</h2>
              </div>
              <a class="text-link" href="${safeHref(content.latest.viewAllUrl)}" ${targetAttrs(content.latest.viewAllUrl)}>View all</a>
            </div>
            <div class="latest-grid">
              ${content.latest.items.map(latestCardMarkup).join("")}
            </div>
          </section>

          <footer class="footer-section">
            <div>
              <h2>Let's connect</h2>
              <p>${content.footerQuote}</p>
            </div>
            <nav class="social-row" aria-label="Social links">
              ${content.socials.map(socialMarkup).join("")}
            </nav>
            <p class="disclosure">${content.affiliateDisclosure}</p>
          </footer>
        </div>
      </div>
    </section>
  </main>
`;

document.querySelectorAll('a[aria-disabled="true"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
