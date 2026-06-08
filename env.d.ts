// Cloudflare Workers environment bindings
// These are injected at runtime by the Workers runtime; this file provides TypeScript type safety.

interface CloudflareEnv {
  // KV namespace for rate limiting the contact form API
  // Binding name must match wrangler.jsonc: kv_namespaces[].binding
  RATE_LIMIT: KVNamespace;
}
