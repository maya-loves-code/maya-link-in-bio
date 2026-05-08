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

function desktopIconMarkup(item, index) {
  return `
    <a
      class="desktop-icon${item.featured ? " featured" : ""}"
      style="--delay: ${index * 80 + 520}ms"
      href="${safeHref(item.url)}"
      ${targetAttrs(item.url)}
      aria-label="${item.label}: ${item.detail}"
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
      class="dock-icon"
      style="--delay: ${index * 70 + 960}ms"
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
    <section class="laptop" aria-labelledby="profile-title">
      <div class="screen">
        <div class="boot-gloss" aria-hidden="true"></div>

        <header class="menu-bar" aria-label="MayaDesk menu bar">
          <span class="menu-brand">MayaDesk</span>
          <span class="menu-site">mayabello.com</span>
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
              <span class="window-title">profile.exe</span>
            </div>
            <div class="profile-body">
              <img src="${content.profile.photo}" alt="${content.profile.name}" />
              <div class="profile-copy">
                <p class="tiny-label">currently online</p>
                <h1 id="profile-title">${content.profile.name}</h1>
                <p>${content.profile.bio}</p>
              </div>
            </div>
          </section>

          <aside class="window sticky-window" aria-label="MayaDesk note">
            <div class="window-bar" aria-hidden="true">
              <span class="traffic red"></span>
              <span class="traffic yellow"></span>
              <span class="traffic green"></span>
              <span class="window-title">note.txt</span>
            </div>
            <p>Tap an icon. Go somewhere useful.</p>
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
