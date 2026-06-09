/** Extract client IP from request headers. Prefers Cloudflare's spoof-proof
 *  CF-Connecting-IP, falls back to x-forwarded-for, then "unknown". */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
