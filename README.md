# Imam Travels & Tours — v2.0

Premium, SEO-optimised, mobile-first marketing website for **Imam Travels & Tours Nig. Ltd.** — a Nigerian travel agency specialising in Hajj, Umrah, flights, visa processing, corporate travel and bespoke tour packages.

> Built with Angular 21 (zoneless + signals), Tailwind CSS v4, server-side rendering with prerendering, and EmailJS for contact forms.

---

## ✨ Tech stack

| Layer | Choice |
|---|---|
| Framework | Angular 21.2 (standalone components, signals, zoneless) |
| Rendering | Hybrid SSR + Prerender (deployed as prerender on Cloudflare Pages) |
| Styling | Tailwind CSS v4 + design tokens via `@theme` |
| Forms | Reactive Forms (Angular built-in) |
| Email | EmailJS (`@emailjs/browser`) |
| Icons | `lucide-angular` |
| Testing | Vitest (Angular 21 default) |
| Hosting | Cloudflare Pages (static prerender output) |

## 🎨 Brand

| Token | Value |
|---|---|
| Primary green | `#009C49` |
| Deep green | `#006B32` |
| Accent gold | `#C9A227` |
| Surface ivory | `#FAF8F3` |
| Display font | Playfair Display |
| Body font | Inter |

---

## 🚀 Getting started

### Prerequisites

- Node.js **22.12+** (or 20.19+) — check with `node -v`
- npm **10+**
- Angular CLI 21 (optional global install): `npm i -g @angular/cli@21`

### Install

```bash
git clone https://github.com/surdbells/imamtravels.git
cd imamtravels
npm install
```

### Configure EmailJS

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create an Email Service (Gmail, Zoho, etc.)
3. Create two templates:
   - **Contact form** template
   - **Hajj 2026 registration** template
4. Copy your IDs into `src/environments/environment.ts` (development) and `src/environments/environment.production.ts` (production)

### Run locally (dev)

```bash
npm start
# → http://localhost:4200
```

### Build for production (with prerendering)

```bash
npm run build
# → dist/imam-travels/browser   ← static HTML, ready to deploy
```

### Run tests

```bash
npm test
```

### Run SSR server locally (optional, after build)

```bash
npm run serve:ssr:imam-travels
# → http://localhost:4000
```

---

## 📁 Project structure

```
src/
├── app/
│   ├── core/                    # Singletons: services, models, tokens
│   │   ├── services/            # SeoService, JsonLdService, EmailService
│   │   ├── models/              # TypeScript interfaces
│   │   └── tokens/              # Injection tokens
│   ├── shared/                  # Reusable UI: Header, Footer, cards, etc.
│   │   └── components/
│   ├── layouts/
│   │   └── main-layout/         # Wraps routes with header + footer
│   ├── pages/
│   │   ├── home/
│   │   ├── about/
│   │   ├── services/
│   │   ├── contact/
│   │   ├── hajj-2026/
│   │   └── not-found/
│   ├── app.config.ts            # Browser providers (router, hydration)
│   ├── app.config.server.ts     # Server providers
│   ├── app.routes.ts            # Public routes
│   ├── app.routes.server.ts     # Per-route render mode (prerender/SSR)
│   ├── app.ts                   # Root component (router-outlet only)
│   └── app.html
├── assets/
│   └── images/                  # Logo, hero images, service images
├── environments/                # Dev + prod environment configs
├── index.html                   # SEO foundation: meta, fonts, canonical
├── main.ts / main.server.ts     # Entry points
├── server.ts                    # Express SSR server
└── styles.css                   # Global styles + Tailwind v4 + design tokens
```

---

## 🔍 SEO

- **Per-route meta** via a `SeoService` that wraps Angular's `Title` and `Meta`
- **JSON-LD structured data** for `TravelAgency`, `LocalBusiness` (per office), `Service`, `BreadcrumbList`, `FAQPage`
- **`sitemap.xml`** and **`robots.txt`** generated at build time
- **Open Graph** and **Twitter Card** tags per route
- **Canonical URLs** per route
- **Semantic HTML5** throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)

## ⚡ Performance

- Lazy-loaded routes (`loadComponent`)
- Tailwind v4's lightweight runtime
- WebP images with `loading="lazy"` and explicit width/height
- Prerendered HTML for instant TTFB
- Zoneless change detection for better INP
- Initial bundle target: **< 150 kB transfer**

---

## ☁️ Deployment (Cloudflare Pages)

This project is configured for prerender output, perfect for Cloudflare Pages.

**Pages settings:**
- Build command: `npm run build`
- Build output directory: `dist/imam-travels/browser`
- Node version: `22`

Full deploy details, redirect rules, and headers config land in **Phase 9**.

---

## 📞 Business contact

| Office | Address | Phone |
|---|---|---|
| **Abuja HQ** | Suite A50 H & A Plaza, Olusegun Obasanjo Way, Wuye District | +234 703 199 5432 |
| **Ijebu-Ode** | 14 Motubo Street, Awokoya Isale, Ijebu-Ode, Ogun State | +234 803 924 3459 |

---

## 📜 License

© 2026 Imam Travels & Tours Nig. Ltd. All rights reserved.
