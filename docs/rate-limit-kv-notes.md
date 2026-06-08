# Rate limiting KV migration notes

Phase 1 complete: Cloudflare KV binding prepared. Runtime code unchanged.

Required later code changes:

1. Replace in-memory `Map<string, RateLimitEntry>` in `app/api/send/route.ts` with Cloudflare KV access via `RATE_LIMIT`.
2. Use client IP as KV key.
3. Store value with request count and expiry/reset time, for example:
   - key: `<ip>`
   - value: `{ "count": number, "resetAt": number }`
4. Use KV read/write flow:
   - `RATE_LIMIT.get(ip, "json")`
   - increment count or initialize new window
   - `RATE_LIMIT.put(ip, JSON.stringify(value), { expirationTtl: 3600 })`
5. TTL target: 1 hour (`3600` seconds), matching current `RATE_LIMIT_WINDOW_MS`.
6. Keep 429 behavior unchanged.
7. Remove in-memory cleanup timer logic after KV migration.

Reason:

In-memory state in Workers not reliable across isolates/instances. KV gives shared cross-instance state for rate limiting.
