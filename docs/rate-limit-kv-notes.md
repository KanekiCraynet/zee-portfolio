# Rate Limiting — Cloudflare KV

## Status

**Done.** Cloudflare KV `RATE_LIMIT` binding active in production.

## How It Works

- Key: `<client-ip>`
- Value: `{ count: number, resetAt: number }` (epoch ms)
- TTL: 1 hour (3600s)
- Limit: 5 requests per window per IP
- Checked in `app/api/send/route.ts` via `checkRateLimit()`

## Dev vs Production

| Environment | KV Available | Fallback |
|---|---|---|
| Production (Cloudflare Workers) | Yes | N/A |
| Local (pnpm dev) | No | 503 response if KV not injected |

## KV Binding

Configured in `wrangler.jsonc`:

```json
"kv_namespaces": [
  { "binding": "RATE_LIMIT", "id": "<namespace-id>" }
]
```

Set namespace ID via:
```bash
wrangler kv namespace create RATE_LIMIT
# Copy ID into wrangler.jsonc
```

## Code Reference

- `lib/rate-limit.ts` — `checkRateLimit(kv, ip)`, `RATE_LIMIT_MAX` (5), `RATE_LIMIT_WINDOW` (3600000ms)
- `app/api/send/route.ts` — imports `checkRateLimit`, returns 429 if exceeded

## Related

- Contact form rate limit is separate from any Cloudflare WAF rate limiting rules.
- No in-memory rate limit — KV ensures consistency across Worker isolates.
