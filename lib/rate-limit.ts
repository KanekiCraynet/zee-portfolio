const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_WINDOW_S = 3600;
const RATE_LIMIT_MAX = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

export type KvBinding = {
  get(key: string, type: "json"): Promise<unknown>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>;
};

function isRateLimitEntry(value: unknown): value is RateLimitEntry {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as RateLimitEntry).count === "number" &&
    typeof (value as RateLimitEntry).resetAt === "number"
  );
}

/**
 * Check if an IP is rate-limited.
 *
 * @param kv   KV namespace binding (undefined = dev fallback, allow)
 * @param ip   Client IP string
 * @param now  Optional epoch ms override for tests
 * @returns    true if rate limited, false if allowed
 */
export async function checkRateLimit(
  kv: KvBinding | undefined,
  ip: string,
  now = Date.now(),
): Promise<boolean> {
  // Dev fallback: no KV binding available, allow through.
  if (!kv) return false;

  const key = `rl:${ip}`;
  const entry = (await kv.get(key, "json")) as unknown;

  if (!isRateLimitEntry(entry) || now > entry.resetAt) {
    await kv.put(
      key,
      JSON.stringify({ count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS }),
      { expirationTtl: RATE_LIMIT_WINDOW_S },
    );
    return false;
  }

  const nextEntry = { ...entry, count: entry.count + 1 };
  await kv.put(key, JSON.stringify(nextEntry), {
    expirationTtl: RATE_LIMIT_WINDOW_S,
  });

  return nextEntry.count > RATE_LIMIT_MAX;
}
