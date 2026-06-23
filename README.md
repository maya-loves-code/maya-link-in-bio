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

Edit `src/content.js` to replace the placeholder values:

- `profile.photo`: current profile image path, now set to `public/maya-bello-profile.jpg`.
- `LATEST_YOUTUBE_URL`: latest YouTube video URL.
- The “Build Your First App” launch CTA links to the Studio app landing page.
- `APP_TWO_TESTER_FORM_URL`: app currently recruiting testers.
- `BUY_ME_A_COFFEE_URL`: Buy Me a Coffee profile or support link.
- `AMAZON_AFFILIATE_LINKS`: Amazon affiliate/storefront URL.
- `INSTAGRAM_URL`, `TIKTOK_URL`, `YOUTUBE_URL`: social profile URLs.

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
