import { content } from "./content.js";
import "./styles.css";

const app = document.querySelector("#app");

const isPlaceholderUrl = (url = "") =>
  !url || /^[A-Z0-9_]+$/.test(url) || url === "#";

const safeHref = (url) => (isPlaceholderUrl(url) ? "#" : url);

const targetAttrs = (url) =>
  isPlaceholderUrl(url)
    ? 'aria-disabled="true"'
    : 'target="_blank" rel="noreferrer"';

const iconMarkup = {
  play: '<span class="glyph play-glyph"></span>',
  rocket: '<span class="glyph rocket-glyph"></span>',
  spark: '<span class="glyph spark-glyph"></span>',
  coffee: '<span class="glyph coffee-glyph"></span>',
  bag: '<span class="glyph bag-glyph"></span>',
};

function appIconMarkup(item, index) {
  return `
    <a
      class="os-app${item.featured ? " featured" : ""}"
      style="--delay: ${index * 80 + 520}ms"
      href="${safeHref(item.url)}"
      ${targetAttrs(item.url)}
      aria-label="${item.label}: ${item.detail}"
    >
      <span class="app-icon ${item.icon}" aria-hidden="true">
        ${iconMarkup[item.icon] ?? ""}
      </span>
      <span class="app-label">${item.label}</span>
      <span class="app-detail">${item.detail}</span>
    </a>
  `;
}

function socialMarkup(item, index) {
  return `
    <a
      class="dock-app"
      style="--delay: ${index * 70 + 940}ms"
      href="${safeHref(item.url)}"
      ${targetAttrs(item.url)}
      aria-label="${item.label}"
    >
      <span aria-hidden="true">${item.shortLabel}</span>
    </a>
  `;
}

app.innerHTML = `
  <main class="page-shell">
    <section class="phone-shell" aria-labelledby="profile-title">
      <div class="phone-screen">
        <div class="scanline" aria-hidden="true"></div>

        <header class="status-bar" aria-label="MayaOS status">
          <span>mayabello.com</span>
          <span class="status-icons" aria-hidden="true">
            <span class="signal"></span>
            <span class="wifi"></span>
            <span class="battery"></span>
          </span>
        </header>

        <section class="profile-widget" aria-label="${content.profile.name} profile">
          <div class="widget-copy">
            <p class="os-label">MayaOS</p>
            <h1 id="profile-title">${content.profile.name}</h1>
            <p>${content.profile.bio}</p>
          </div>
          <img src="${content.profile.photo}" alt="${content.profile.name}" />
        </section>

        <nav class="app-grid" aria-label="Primary links">
          ${content.apps.map(appIconMarkup).join("")}
        </nav>

        <nav class="social-dock" aria-label="Social links">
          ${content.socials.map(socialMarkup).join("")}
        </nav>

        <p class="disclosure">${content.affiliateDisclosure}</p>
      </div>
    </section>
  </main>
`;

document.querySelectorAll('a[aria-disabled="true"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
