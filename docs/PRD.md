# Product Requirements Document — Zee Portfolio

## 1. Product Overview

**Product Name:** Zee Portfolio
**URL:** https://xenzee.site
**Repository:** https://github.com/KanekiCraynet/zee-portfolio
**Target Audience:** Recruiters, hiring managers, prospective clients, technical peers
**Current Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, OpenNext (Cloudflare Workers adapter), pnpm

---

## 2. Personas

| Persona | Goal | Pain Point |
|---|---|---|
| **Recruiter / HRD** | Quickly assess skill fit for Web Developer / IT Support role | Slow loading, hard-to-find contact info, irrelevant content |
| **Prospective Client** | Evaluate reliability, see past work, submit project request | No clear CTA, no portfolio detail pages |
| **Technical Peer** | Inspect code quality, SEO implementation, deployment setup | Missing docs, boilerplate README |
| **Owner (Zee)** | Maintain site easily, update content via Keystatic | CMS friction, manual deploy steps |

---

## 3. Use Cases

| UC | Description | Priority |
|---|---|---|
| UC-01 | Homepage loads with hero, about, projects, skills, experience, testimonials, contact | P0 |
| UC-02 | User views project detail pages at `/projects/[slug]` | P0 |
| UC-03 | User sends contact message via form; email sent via Resend | P0 |
| UC-04 | User reads blog posts at `/blog` | P1 |
| UC-05 | Search engines index all pages with proper meta, OG, JSON-LD | P0 |
| UC-06 | User accesses the site via `xenzee.site` and `www.xenzee.site` | P0 |
| UC-07 | Site responds with health-check endpoint at `/api/health` | P1 |
| UC-08 | Owner updates content via Keystatic CMS | P1 |
| UC-09 | Error monitoring via Sentry | P2 |

---

## 4. Functional Requirements

| FR | Description | UC |
|---|---|---|
| FR-01 | Hero section displays name, tagline, bio, avatar, social links, CTA buttons | UC-01 |
| FR-02 | About section highlights skills, experience summary, strengths | UC-01 |
| FR-03 | Projects section lists featured projects with title, description, tags, links | UC-01 |
| FR-04 | Project detail page shows full project info, live demo & GitHub links | UC-02 |
| FR-05 | Skills section shows categorized skills with proficiency | UC-01 |
| FR-06 | Experience section shows timeline of work history | UC-01 |
| FR-07 | Contact form validates input client + server side, rate-limits per IP, sends via Resend | UC-03 |
| FR-08 | Blog listing page renders markdown posts | UC-04 |
| FR-09 | JSON-LD structured data injected on homepage (Person, Website, Service) | UC-05 |
| FR-10 | Sitemap.xml and robots.txt served for search engines | UC-05 |
| FR-11 | `/api/health` returns service name, version, runtime, timestamp, config status | UC-07 |
| FR-12 | Security headers served (CSP, HSTS, X-Frame-Options, etc.) | UC-06 |

---

## 5. Non-Functional Requirements

| NFR | Target | Notes |
|---|---|---|
| NFR-01 | Lighthouse Performance >= 90 | Edge rendering, image optimization |
| NFR-02 | Lighthouse Accessibility >= 90 | Semantic HTML, ARIA labels, skip-link, reduced motion |
| NFR-03 | Lighthouse Best Practices >= 95 | CSP headers, no mixed content |
| NFR-04 | Contact form success rate >= 95% | KV rate limit, Resend reliability |
| NFR-05 | Page load < 2s (TTFB + FCP) | Cloudflare Workers edge deployment |
| NFR-06 | Build passes 100% CI | GitHub Actions + pnpm |
| NFR-07 | Frontend errors captured via Sentry | `@sentry/nextjs` integration |
| NFR-08 | Rate limit: 5 req/hour per IP on contact form | Cloudflare KV |

---

## 6. User Journeys

**Recruiter Journey:**
```
Landing → Hero (name/role) → About → Scroll Projects → Click project → See detail → Contact
```
**Client Journey:**
```
Landing → Hero → Projects → Contact → Submit form → Receive confirmation → Email sent to Zee
```

---

## 7. Data Model

Content managed via `content/` JSON files:
- `site-config.json` — global config (name, tagline, social links, stats)
- `projects/*.json` — per-project (title, slug, description, tags, URLs)
- `experience/*.json` — per-experience (company, role, period, description)
- `skills.json` — categorized skills array
- `testimonials/*.json` — per-testimonial (name, role, content, avatar)

Generated output in `generated/content.ts`.

---

## 8. Deployment Architecture

```
                    ┌──────────────────────┐
                    │  Cloudflare Workers   │
                    │  (zee-portfolio)      │
                    │                       │
                    │  .open-next/worker.js │
                    │  .open-next/assets/   │
                    └───────┬───────────────┘
                            │
              ┌─────────────┴──────────────┐
              │                            │
     ┌────────▼────────┐         ┌─────────▼─────────┐
     │ Cloudflare KV   │         │   Resend API      │
     │ (RATE_LIMIT)    │         │   (email sending)  │
     └─────────────────┘         └───────────────────┘

Routes: xenzee.site/*, www.xenzee.site/*
```

---

## 9. Out of Scope

- User authentication / login
- Database-backed CMS (Keystatic uses local JSON)
- E-commerce / payment
- Multi-language (static ID content with some EN)

---

## 10. Acceptance Criteria

- [x] Homepage renders all sections
- [x] Contact form submits and sends email
- [x] Security headers present on all responses
- [x] `/api/health` responds 200 with valid JSON
- [x] Rate limiting active on contact API
- [x] SEO content + JSON-LD present
- [x] Deployable via OpenNext to Cloudflare Workers
- [x] Project detail pages render correctly

---

## 11. Metrics & KPIs

| KPI | Target | Source |
|---|---|---|
| Lighthouse Performance | >= 90 | Local / PageSpeed |
| Lighthouse Accessibility | >= 90 | Local / axe-core |
| Contact deliverability | >= 95% | Resend dashboard |
| CI build pass | >= 99% | GitHub Actions |
| Time to Interactive | < 2s | Web Vitals |

---

## 12. Risks

| Risk | Mitigation |
|---|---|
| Cloudflare Workers CPU limit exceeded | Optimize edge computation, keep middleware lean |
| KV rate limit availability in dev | Fallback to in-memory with dev warning |
| Resend API key rotation | Environment secrets via `wrangler secret put` |
| SEO regression after refactor | Preserve JSON-LD, meta, sitemap, robots |

---

## 13. Glossary

| Term | Definition |
|---|---|
| OpenNext | Adapter for deploying Next.js on non-Vercel platforms |
| Cloudflare Workers | Edge compute platform |
| KV | Cloudflare Key-Value store for distributed data |
| Resend | Email API service for transactional emails |
| Keystatic | File-based CMS for Git-backed content management |
