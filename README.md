# Zee Portfolio

Next.js 16 personal portfolio deployed on **Cloudflare Workers** via **OpenNext**. Features project showcase, contact form with KV rate limiting, SEO, and Keystatic CMS.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (React 19) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Package Manager | pnpm |
| Deployment | Cloudflare Workers (OpenNext adapter) |
| Edge Data | Cloudflare KV (rate limiting) |
| Email | Resend API |
| CMS | Keystatic (file-based, Git-backed) |
| Monitoring | Sentry |

## Quick Start

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

### Environment Variables

Create `.env.local`:

```env
# Required for local dev — set values via `wrangler secret put` for production
RESEND_API_KEY=re_xxx
SENTRY_DSN=https://xxx@xxx.ingest.us.sentry.io/xxx
CONTACT_EMAIL=admin@xenzee.site
NEXT_PUBLIC_GITHUB_OWNER=KanekiCraynet
NEXT_PUBLIC_GITHUB_REPO=zee-portfolio
```

For production secrets:
```bash
wrangler secret put RESEND_API_KEY
wrangler secret put SENTRY_DSN
# KV RATE_LIMIT binding is configured in wrangler.jsonc
```

## Commands

```bash
pnpm run dev        # Development server (Turbopack)
pnpm run build      # Production build
pnpm run lint       # ESLint
pnpm run test       # Vitest
pnpm run preview    # Preview OpenNext build locally
```

## Project Structure

```
app/
├── layout.tsx          # Root layout: fonts, meta, theme
├── page.tsx            # Homepage sections + JSON-LD
├── not-found.tsx       # 404 page
├── api/
│   ├── health/route.ts # /api/health endpoint
│   └── send/route.ts   # Contact form handler
├── projects/[slug]/
├── blog/
├── sitemap.ts          # /sitemap.xml
├── robots.ts           # /robots.txt
└── manifest.ts         # /manifest.json

content/
├── site-config.json    # Global site config
├── projects/*.json     # Per-project data
├── experience/*.json   # Work history
├── skills.json         # Skills list
└── testimonials/*.json # Testimonials

components/
├── layout/ (header, footer, social-links)
├── sections/ (hero, about, projects, skills, experience, contact, testimonials, seo-content)
├── ui/ (badge, section-header)
└── animations/ (fade-in, stagger-children)

lib/
├── content.ts          # Content loader
├── validation.ts       # Contact validation constants + escapeHtml
├── rate-limit.ts       # KV rate limit helper
├── ip.ts               # IP extraction from headers
├── env.ts              # Zod env validation
└── utils.ts            # cn() utility
```

## Architecture

```
Cloudflare Workers Edge
├── Static assets (.open-next/assets/)
├── Dynamic routes (SSR)
├── API routes (/api/send, /api/health)
└── KV (RATE_LIMIT binding)

Routes:
  xenzee.site/*        → Worker
  www.xenzee.site/*    → Worker (redirect)
```

## API

### POST /api/send
Contact form handler.

**Request body:**
```json
{ "name": "", "email": "", "message": "", "company": "" }
```

**Validation:** name/email/message required; email regex; max lengths; honeypot `company` field.

**Rate limit:** 5 requests/hour per IP (KV-backed).

**Responses:**
- `200 { "success": true }` — delivered
- `400 { "error": "..." }` — validation error
- `429 { "error": "..." }` — rate limited
- `503 { "error": "..." }` — KV not configured (production)
- `500 { "error": "..." }` — server error

### GET /api/health
Service health check.

**Response:**
```json
{ "status": "ok", "service": "zee-portfolio", "version": "1.0.0", "runtime": "edge", "timestamp": "2026-06-20T..." }
```

## Security

| Measure | Implementation |
|---|---|
| CSP headers | `next.config.ts` + `public/_headers` |
| HSTS | `Strict-Transport-Security` header |
| Rate limiting | Cloudflare KV — 5 req/h per IP on contact form |
| Input validation | Client (React) + server (API route) |
| HTML escaping | `escapeHtml()` on all user input used in emails |
| Honeypot | Hidden form field `company` traps bots |
| Secrets | `wrangler secret put` — not in config files |

## Deployment

1. Build: `pnpm run build`
2. Preview: `pnpm run preview`
3. Deploy: `npx opennext deploy`

Build output goes to `.open-next/` (worker + assets). The `wrangler.jsonc` config points to `.open-next/worker.js` as the main entry.

## Content Management

Content lives in `content/` as JSON files. Edit directly or use Keystatic (accessible at `/keystatic` in dev mode). After editing:

1. `pnpm run build` — generates `generated/content.ts`
2. Commit + push — triggers CI deploy

## License

MIT — see `LICENSE`.
