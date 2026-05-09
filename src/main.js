import { content } from "./content.js";
import "./styles.css";

const app = document.querySelector("#app");

const isPlaceholderUrl = (url = "") =>
  !url || /^[A-Z0-9_]+$/.test(url) || url === "#";

const safeHref = (url) => (isPlaceholderUrl(url) ? "#" : url);

const targetAttrs = (url) =>
  url?.startsWith("mailto:")
    ? ""
    : isPlaceholderUrl(url)
    ? 'aria-disabled="true"'
    : 'target="_blank" rel="noreferrer"';

const iconMarkup = {
  play: '<span class="glyph play-glyph"></span>',
  app: '<span class="glyph coming-soon-glyph">Coming Soon</span>',
  rocket: '<span class="glyph rocket-glyph"></span>',
  spark: '<span class="glyph spark-glyph"></span>',
  coffee: '<span class="glyph coffee-glyph"></span>',
  bag: '<span class="glyph bag-glyph"></span>',
  mail: '<span class="glyph mail-glyph"></span>',
};

const socialIconMarkup = {
  youtube: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.4 7.1a3 3 0 0 0-2.1-2.1C17.5 4.5 12 4.5 12 4.5s-5.5 0-7.3.5a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2.1 12a31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.1c1.8.5 7.3.5 7.3.5s5.5 0 7.3-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9Z" />
      <path class="icon-cutout" d="m10.2 15.4 5.1-3.4-5.1-3.4v6.8Z" />
    </svg>
  `,
  instagram: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle class="icon-cutout" cx="12" cy="12" r="3.2" />
      <circle class="icon-cutout" cx="16.7" cy="7.3" r="1.1" />
    </svg>
  `,
  tiktok: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.3 3.8h3a5.6 5.6 0 0 0 3.6 3.9v3a8.2 8.2 0 0 1-3.7-.9v5.3a5.3 5.3 0 1 1-5.3-5.3c.4 0 .8 0 1.1.1v3.2a2.1 2.1 0 1 0 1.3 2V3.8Z" />
    </svg>
  `,
};

function desktopIconMarkup(item, index) {
  return `
    <a
      class="desktop-icon${item.featured ? " featured" : ""}"
      style="--delay: ${index * 80 + 520}ms"
      href="${safeHref(item.url)}"
      ${targetAttrs(item.url)}
      aria-label="${item.ariaLabel ?? `${item.label}: ${item.detail}`}"
    >
      <span class="icon-tile ${item.icon}" aria-hidden="true">
        ${iconMarkup[item.icon] ?? ""}
      </span>
      <span class="icon-label">${item.label}</span>
      <span class="icon-detail">${item.detail}</span>
    </a>
  `;
}

function dockMarkup(item, index) {
  return `
    <a
      class="dock-icon ${item.platform}"
      style="--delay: ${index * 70 + 960}ms"
      href="${safeHref(item.url)}"
      ${targetAttrs(item.url)}
      aria-label="${item.label}"
    >
      ${socialIconMarkup[item.platform] ?? ""}
    </a>
  `;
}

app.innerHTML = `
  <main class="page-shell">
    <section class="laptop" aria-labelledby="profile-title">
      <div class="screen">
        <div class="boot-gloss" aria-hidden="true"></div>

        <header class="menu-bar" aria-label="Creator Workspace">
          <span class="menu-brand">Creator Workspace</span>
          <span class="menu-controls" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </header>

        <div class="desktop-space">
          <section class="window profile-window" aria-label="${content.profile.name} profile">
            <div class="window-bar" aria-hidden="true">
              <span class="traffic red"></span>
              <span class="traffic yellow"></span>
              <span class="traffic green"></span>
              <span class="window-title">About Maya</span>
            </div>
            <div class="profile-body">
              <img src="${content.profile.photo}" alt="${content.profile.name}" />
              <div class="profile-copy">
                <h1 id="profile-title">${content.profile.name}</h1>
                <p>${content.profile.bio}</p>
              </div>
            </div>
          </section>

          <aside class="window sticky-window" aria-label="Creator note">
            <div class="window-bar" aria-hidden="true">
              <span class="traffic red"></span>
              <span class="traffic yellow"></span>
              <span class="traffic green"></span>
              <span class="window-title">Latest</span>
            </div>
            <p>Join the Side Quest Slayer beta</p>
          </aside>

          <nav class="desktop-icons" aria-label="Primary links">
            ${content.apps.map(desktopIconMarkup).join("")}
          </nav>
        </div>

        <footer class="taskbar">
          <nav class="social-dock" aria-label="Social links">
            ${content.socials.map(dockMarkup).join("")}
          </nav>
          <p class="disclosure">${content.affiliateDisclosure}</p>
        </footer>
      </div>
      <div class="laptop-base" aria-hidden="true"></div>
    </section>
  </main>
`;

document.querySelectorAll('a[aria-disabled="true"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
