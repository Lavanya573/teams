# Teamworks — premium white website redesign

React 18 + Vite + React Router + Three.js (React Three Fiber) + Framer Motion. Plain CSS design system, no CSS framework.

## 1. Run locally

Requirements: **Node.js 18 or newer** (https://nodejs.org, choose LTS).

```bash

```

Open the address printed in the terminal (normally http://localhost:5173).

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Creates the production site in `dist/` |
| `npm run preview` | Serves the production build locally to test it |
| `npm run fetch-assets` | Downloads the original logo, service images and client logos into `public/visuals` |

## 2. The original logo and images

By default the site loads the **original logo, service images and client logos directly from https://www.eteamworks.com/visuals/**. Nothing is redrawn or recoloured.

For a production site you should host them yourself:

```bash
npm run fetch-assets
cp .env.example .env.local      # Windows: copy .env.example .env.local
# edit .env.local and set:  VITE_ASSET_BASE=/visuals
```

**Check the logo on white.** The live site has a dark theme, so confirm `teamworks-logo-clean.png` is legible on a white header. If it is a white-only logo, put the dark/colour version in `public/visuals/` and change the file names in `logoSources` inside `src/config/site.js`. Do not recolour or redraw it.

## 3. Contact form

The form posts JSON to `/api/contact` (a Vercel serverless function in `api/contact.js`) or to any URL you set in `VITE_FORM_ENDPOINT` (Formspree, Web3Forms, your CRM).
It only shows "success" after the server returns a successful response. Until an endpoint is configured it shows an error with the email and phone as fallback.

Using the included function (Vercel):
1. Create a free account at https://resend.com and verify your sending domain.
2. In Vercel → Project → Settings → Environment Variables add `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (e.g. info@eteamworks.com) and `CONTACT_FROM_EMAIL` (an address on your verified domain).
3. Redeploy.

Using Formspree instead: create a form at https://formspree.io, copy its URL, set `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx` and rebuild.

## 4. Deploy and host

The site is a static single-page app. `vercel.json` and `public/_redirects` already handle page refreshes on deep links.

### Option A: Vercel (recommended, supports the contact form function)
1. Push this folder to a GitHub repository (`git init`, `git add .`, `git commit`, push).
2. Go to https://vercel.com → Add New → Project → import the repository.
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`. Deploy.
4. Add the environment variables from `.env.example`, then redeploy.
5. Project → Settings → Domains → add `www.eteamworks.com` and follow the DNS instructions shown.

### Option B: Netlify
1. Push to GitHub, then Netlify → Add new site → Import from Git.
2. Build command `npm run build`, publish directory `dist`.
3. Netlify does not run `api/contact.js`. Use Formspree/Web3Forms via `VITE_FORM_ENDPOINT`.

### Option C: Your own server (Nginx / cPanel / any hosting)
1. Run `npm run build` and upload the **contents of `dist/`** to the web root.
2. Make every unknown path serve `index.html`. Nginx example:
   ```nginx
   location / { try_files $uri /index.html; }
   ```
3. The contact form needs a backend you provide: set `VITE_FORM_ENDPOINT` to its URL before building.

### Before replacing the live site
- Keep the existing URLs: `/about-us`, `/services`, `/services/<slug>`, `/contact` are preserved. `/360`, `/blog` and `/privacy-policy` are linked to the existing live pages and are not rebuilt here.
- Add the Google Tag Manager snippet (the live site uses `GTM-W9DDMPSM`) in `index.html`.
- Because this is a client-rendered React app, ask your developer to add pre-rendering (e.g. `vite-plugin-ssg` or Vercel prerender) if search-engine snapshots matter.

## 5. Where to edit content

| What | File |
| --- | --- |
| Phone, email, address, social links, stats, process, FAQs | `src/config/site.js` |
| Six services (copy, deliverables) | `src/data/services.js` |
| Portfolio projects | `src/data/projects.js` |
| Client logos | `src/data/clients.js` |
| Colours, spacing, type | top of `src/styles.css` |
| 3D sculpture (materials, lights, motion) | `src/components/HeroScene.jsx` |

## 6. Content that needs the client's input

- **Portfolio**: no real case studies were supplied, so `projects.js` holds six clearly labelled *Concept project* entries using the service imagery. Replace them with approved work (set `concept: false`).
- **Address**: the live site shows two addresses (Tagore Tower in the header, SV Chambers in the footer). The footer one is used; confirm which is correct.
- **Service pages**: the one-line descriptions are the company's own. Headlines, deliverables and applications are draft wording derived from them; please confirm.
- **Not included (no verified content)**: industries section, testimonials, team photos, blog pages, favicon. Add them when real material exists.
- **Terms of Use** links to the contact page, as on the live site.
