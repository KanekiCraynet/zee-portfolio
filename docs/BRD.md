# Business Requirements Document — Zee Portfolio

## 1. Executive Summary

Zee Portfolio is a personal portfolio website for **Zee** (Dzakri) — a Web Developer & IT Support professional based in Pekalongan, Indonesia. The site serves as a professional landing page, project showcase, and contact gateway for recruiters, hiring managers, and prospective clients. It is deployed on Cloudflare Workers via OpenNext for maximum edge performance and zero server maintenance.

---

## 2. Business Goals

| Goal | Description | Success Metric |
|---|---|---|
| BG-01 | Personal branding — establish professional online presence | Site indexed in search, positive feedback |
| BG-02 | Lead generation — convert visitors into contact inquiries | ≥1 contact submission / week (target) |
| BG-03 | Technical proof — demonstrate modern front-end + edge deployment skills | Lighthouse ≥90/90/95, open-source repo |
| BG-04 | Low-maintenance operations — zero server management, cheap hosting | Monthly cost < $1 (Workers free tier) |
| BG-05 | Open-source portfolio — code serves as resume for developer roles | GitHub stars, PRs, issue engagement |

---

## 3. Stakeholders

| Stakeholder | Interest | Influence |
|---|---|---|
| **Zee (Owner)** | Accurate representation of skills, easy content updates, reliable contact form | High |
| **Recruiters / HRD** | Fast loading, clear skill info, easy contact | Medium |
| **Prospective Clients** | See past project examples, submit project requests | Medium |
| **Technical Peers** | Inspect stack, code quality, deployment setup | Low |
| **Cloudflare** | Platform user; no direct stake | None |
| **Visitors** | Usable, accessible, mobile-friendly site | Low per visitor |

---

## 4. Value Proposition

| For | Value |
|---|---|
| **Recruiters** | See projects, skills, experience in one fast page; contact in 2 clicks |
| **Clients** | Review real production projects, submit inquiry directly |
| **Zee** | Zero-hassle deployment, no server cost, Keystatic CMS for content |
| **Open-source community** | Reference implementation: Next.js 16 + OpenNext + Cloudflare Workers |

---

## 5. User Stories

| Story | Priority |
|---|---|
| As a recruiter, I want to see what technologies Zee knows so I can match the job requirements | P0 |
| As a recruiter, I want to see live projects and their GitHub repos to validate skill level | P0 |
| As a visitor, I want to send a message so I can discuss a potential project or job | P0 |
| As Zee, I want to update my projects/skills without touching code | P1 |
| As a search engine, I want structured data so I can index Zee's professional info correctly | P0 |
| As a visitor, I want the site to work on mobile so I can browse on my phone | P0 |
| As Zee, I want to monitor errors so I can fix issues proactively | P2 |

---

## 6. Business Processes

### Content Update Flow
```
User edits content/ JSON locally → GitHub commit → CI build → OpenNext deploy → Cloudflare Workers updated
```
### Lead Capture Flow
```
Visitor fills contact form → Client-side validation → POST /api/send → KV rate limit check → Resend API → Email delivered to admin@xenzee.site
```
### Health Monitoring Flow
```
Uptime monitor hits /api/health expects 200 + valid JSON → Sentry captures frontend errors → Github Actions logs CI status
```

---

## 7. Compliance & Security

| Area | Requirement | Status |
|---|---|---|
| TLS | All traffic served over HTTPS (Cloudflare edge) | ✓ |
| CSP | Content Security Policy headers restrict script/img/connect sources | ✓ (patch needed) |
| HSTS | Strict-Transport-Security header, preload-ready | ✓ (via _headers) |
| Rate Limit | IP-based rate limiting on contact form (5 req/h) | ✓ |
| Input Validation | Client + server side validation with HTML escaping | ✓ |
| Honeypot | Hidden `company` field to trap bots | ✓ |
| GDPR | No analytics cookies, no tracking scripts | ✓ |
| Secrets | API keys via `wrangler secret put`, not in config files | ✓ |

---

## 8. KPI Dashboard

| KPI | Current (Est.) | Target | Measurement |
|---|---|---|---|
| Lighthouse Performance | ~85-95 | >= 90 | Google PageSpeed Insights |
| Lighthouse Accessibility | ~85-95 | >= 90 | axe-core / Lighthouse |
| Lighthouse Best Practices | ~90 | >= 95 | Lighthouse |
| Contact form delivery rate | N/A | >= 95% | Resend dashboard |
| Page load time | ~500-1000ms | < 2s | Web Vitals (RUM) |
| CI build pass rate | N/A | >= 99% | GitHub Actions |
| Uptime | N/A | >= 99.5% | External monitor |

---

## 9. Operational Requirements

| Area | Requirement |
|---|---|
| **Deployment** | GitHub push triggers Cloudflare Workers deploy via OpenNext |
| **Secrets management** | RESEND_API_KEY, SENTRY_DSN, KV namespace ID via `wrangler secret put` |
| **Content management** | Keystatic CMS (file-based), content/ JSON directory |
| **Monitoring** | Sentry for frontend errors, /api/health for uptime checks |
| **CI/CD** | GitHub Actions build + lint + test |
| **Backup** | Git as source of truth for content and code |

---

## 10. Roadmap

| Phase | Timeline | Deliverables |
|---|---|---|
| **Phase 1 — Foundation** | Done | Next.js 16 + OpenNext + Cloudflare Workers, homepage, contact form, SEO |
| **Phase 2 — Polish & Docs** | Current | PRD, BRD, README rewrite, CSP hardening, health route fix, accessibility fixes |
| **Phase 3 — Content** | Next | Blog posts, case studies per project, Keystatic CMS |
| **Phase 4 — Optimization** | Future | RUM monitoring, performance budgets, Lighthouse CI |

---

## 11. Maintenance Plan

| Task | Frequency | Owner |
|---|---|---|
| Dependency updates (pnpm outdated) | Monthly | Zee |
| Sentry error review | Weekly | Zee |
| Content updates (projects, skills) | Per project | Zee |
| Security header review | Quarterly | Zee |
| Lighthouse audit | Quarterly | Zee |
| Workers dashboard check | Monthly | Zee |

---

## 12. Glossary

| Term | Definition |
|---|---|
| OpenNext | Adapter for deploying Next.js to non-Vercel platforms (Cloudflare Workers) |
| Cloudflare Workers | Edge compute platform running JavaScript/WebAssembly at Cloudflare edge |
| KV | Cloudflare Key-Value store — distributed, low-latency data store |
| Resend | Transactional email API service |
| Keystatic | Git-backed CMS for file-based content management |
| CSP | Content Security Policy — HTTP header preventing XSS/data injection |
| HSTS | HTTP Strict-Transport-Security — forces HTTPS connections |
| Honeypot | Hidden form field that traps automated spam bots |
