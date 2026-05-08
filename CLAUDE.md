# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Project

A polished marketing-site clone of **https://tenxerp.com** (Tenx IT Solutions — an ERP company). Same routes, same brand assets, same data shape — but everything served from a client-side mock HTTP API. Built fresh in Angular 21 with refined typography and design polish that the source site lacks.

The clone is a marketing site, not the ERP product itself. It exists for evaluation, demos, and as a reference implementation of a modern Angular marketing surface.

## Stack

- **Angular 21.2** — standalone components only, **zoneless** change detection, signals everywhere (`signal()`, `computed()`, `input()`, `output()`)
- **Tailwind CSS 4.2** — utility layer; brand tokens live in `src/styles/tokens.css` and are mapped into `@theme` in `src/styles.css`
- **@ngx-translate** v17 — `en` + `ar` JSON, RTL handled by toggling `<html dir>`
- **No zone.js** — every async path must use signals, RxJS, or fetch with explicit change detection compatibility (the SDK's signal interop is sufficient).

Node ≥ 22 is the supported runtime (we run on 23 with EBADENGINE warnings — harmless).

## Brand

Sourced verbatim from tenxerp.com's logo and stylesheet. Don't introduce new brand colors without checking the source first (`https://www.tenxerp.com/` → inspect logo + the linked CSS file for `--bs-*` variables).

| Token | Value | Use |
|---|---|---|
| `--color-navy` | `#25255C` | Primary — wordmark, headings, dark surfaces |
| `--color-amber` | `#ED1C3A` | Accent — every CTA, badges, highlights. **This is the logo red, not amber.** Variable name is legacy; do not rename without a sweep. |
| `--color-cyan` | `#077765` | Teal — supporting flourish only (about-us imagery, decorative gradients) |
| `--color-text` | `#0B163F` | Heading dark navy |
| `--color-text-soft` | `#575757` | Body |

**Primary buttons use white text** on the red background. Don't use navy text on red — fails contrast and was rejected during build.

## Typography

- Display: **Bricolage Grotesque** (variable, opsz 12..96)
- Body: **Manrope**
- Mono / numerals: **JetBrains Mono**
- Arabic: **Cairo** (auto-swapped via `tokens.css` when `lang=ar` / `dir=rtl`)

Loaded via Google Fonts in `src/index.html`. Don't switch to Inter — explicitly avoided.

## Routes (must match tenxerp.com)

| URL | Component |
|---|---|
| `/` | `HomeComponent` |
| `/about` | `AboutComponent` |
| `/contact` | `ContactComponent` |
| `/faqs` | `FaqsComponent` |
| `/privacy-policy` | `PrivacyComponent` |
| `/Home/Solutioninner/:id` (1–26) | `SolutionDetailComponent` |
| `/Home/Cart` | `CartComponent` |
| `**` | `NotFoundComponent` |

The mixed-case `Home/Solutioninner` and `Home/Cart` paths are intentional — they preserve URL parity with the source site. Don't normalize.

## Mock API

All HTTP traffic is intercepted by `src/app/core/http/mock-api.interceptor.ts`. Endpoints:

| Method | Path | Mock data file |
|---|---|---|
| GET | `/api/solutions` | `mock-data/solutions.mock.ts` (26 entries) |
| GET | `/api/solutions/:id` | same |
| GET | `/api/testimonials` | `mock-data/testimonials.mock.ts` |
| GET | `/api/team` | `mock-data/team.mock.ts` |
| GET | `/api/faqs` | `mock-data/faqs.mock.ts` |
| GET | `/api/clients` | `mock-data/clients.mock.ts` |
| GET | `/api/stats` | `mock-data/stats.mock.ts` |
| POST | `/api/contact` | returns `{ ok, ticketId }` after 700 ms |
| POST | `/api/newsletter` | returns `{ ok }` after 480 ms |
| POST | `/api/cart/checkout` | returns `{ ok, quoteId }` after 800 ms |

Toggled by `environment.useMockApi` in `src/environments/`. When you wire a real backend, set `useMockApi: false` and the interceptor passes through.

## Images

Real assets downloaded from tenxerp.com live in `public/images/`:

- `tenx-logo.png`, `tenx-logo-white.png` — header / footer logos
- `banner.jpg` — homepage hero background (used as full-width photo with navy scrim, matching tenxerp.com's pattern)
- `about-us.jpg` — about page side visual
- `solutions/` — 6 line-art illustrations (HR, Powerful Features, Contract, Fleet, Property, Retail). Mapped to all 26 modules in `solutions.mock.ts` via `HERO[id]`. When adding a new module, pick the closest semantic match.
- `clients/` — 6 real client logos (RTA, Takaful Emarat, ENOC, Evolution, Fujairah Charity, Sharjah City Municipality), shown in the homepage marquee.

Don't introduce Picsum, Unsplash placeholders, or random stock imagery. The brief is "images must same as the website."

## Folder Layout

```
src/app/
├─ app.ts, app.config.ts, app.routes.ts
├─ core/
│  ├─ http/                   mock-api.interceptor.ts + mock-data/
│  ├─ i18n/                   ngx-translate config + LangService (en/ar/RTL)
│  ├─ layout/                 marketing-layout, header, footer
│  ├─ models/                 solution, testimonial, team, faq, client, contact, cart, stats
│  └─ services/               solutions, testimonials, team, faq, clients, stats, contact, cart, toast, seo
├─ shared/
│  ├─ components/             ui-button, ui-input, ui-textarea, ui-select, ui-accordion, ui-toast,
│  │                          solution-card, stat-counter, testimonial-card, client-marquee, section-eyebrow
│  ├─ directives/             reveal-on-scroll.directive.ts (IntersectionObserver fade-up)
│  └─ icon/                   icon.component.ts + icon.registry.ts (inline SVG paths, lucide-derived)
└─ features/
   ├─ home/                   hero + sections (value props, solutions grid w/ filter, stats, clients, testimonials, CTA)
   ├─ about/                  mission, vision, story, team
   ├─ contact/                reactive form w/ honeypot + mock POST + toast
   ├─ faqs/                   category sidebar + accordion (single-open)
   ├─ privacy/                long-form copy
   ├─ solution-detail/        renders 1 of 26 modules from `:id` param
   ├─ cart/                   signal-based cart, seat +/-, bundle discount, mock checkout
   └─ not-found/              404
```

## Conventions to Preserve

- **`<app-section-eyebrow>`** has only a `label` input. Do not re-introduce numbered prefixes ("No.01") — they were explicitly removed.
- **Standalone components only.** No `NgModule`s. Use `imports: [...]` arrays.
- **Signals over `BehaviorSubject`** for component-local state. Use `inject()` over constructor params.
- **Reactive Forms** for the contact and cart forms. Both have a hidden honeypot field — keep it.
- **Lazy-load every feature route** via `loadComponent: () => import(...)`. Don't eager-import feature components into `app.routes.ts`.
- **Translation keys** in `public/i18n/{en,ar}.json`. Keep both files in sync — every English key must have an Arabic counterpart.
- **`prefers-reduced-motion`** is respected by `RevealOnScrollDirective` and `StatCounterComponent`. Maintain that contract on any new animation.

## Common Tasks

```bash
# Dev server (4200 was occupied during initial setup, so we use 4300)
npx ng serve --port 4300

# Production build
npm run build

# Add a new solution module:
#   1. Append to MOCK_SOLUTIONS in src/app/core/http/mock-data/solutions.mock.ts (id = next integer)
#   2. Add a HERO[id] mapping for one of the 6 illustrations
#   3. Add an iconKey from src/app/shared/icon/icon.registry.ts (or extend the registry)
#   4. Translation strings live in en.json/ar.json under `common.category` (no other strings needed; description/features are inline in the mock)

# Add a new translation key:
#   Edit BOTH public/i18n/en.json and public/i18n/ar.json. Use {{ 'a.b.c' | translate }} in templates.
```

## Source-of-Truth Reference

- Original site: https://www.tenxerp.com — fetch with `curl -L -k --ssl-revoke-best-effort` (revocation check fails on Windows otherwise)
- Their main CSS bundle is referenced from `<head>` as `styles-XXXXXXX.css` — that's where `--bs-primary`, `--bs-accent`, etc. live
- Their main JS bundle (`main-XXXXXXX.js`) contains references to all `assets/img/*` paths if you need to find more logos or solution illustrations
