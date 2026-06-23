# Maya Bello Link In Bio

A static, tutorial-friendly link-in-bio page for `mayabello.com`.

The project also includes company and legal pages for MB Creative Enterprises
LLC:

- `/mb-creative-enterprises`
- `/privacy`
- `/terms`

Requests to `mbcreativeenterprises.com` and `www.mbcreativeenterprises.com` use
hostname-aware rewrites to render the company page at `/` while keeping the
company-domain URL in the browser.

## Local Setup

```bash
npm install
npm run dev
```

Open the local URL Vite prints in the terminal.

## Update The Content

Edit the exported `content` object in `src/content.js`:

- `profile`: Maya's name, bio, and profile image.
- `socials`: social platform labels, icons, and profile URLs.
- `apps`: primary link cards, including their labels, details, icons, URLs, and the `featuredCta` and `launchCta` notification flags.
- `affiliateDisclosure`: the footer disclosure shown beneath the social dock.

## Deploy To Vercel

1. Push this project to GitHub.
2. Import the repo in Vercel.
3. Keep the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add `mayabello.com` in Vercel project domains.
5. Follow Vercel's DNS instructions wherever the domain is registered.

## Checks

```bash
npm run build
npm audit --omit=optional
```
