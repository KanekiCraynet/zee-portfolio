import { describe, expect, it } from "vitest";
import { checkRateLimit } from "../rate-limit";

class MockKV {
  store = new Map<string, string>();

  async get(key: string): Promise<unknown> {
    const raw = this.store.get(key);
    return raw != null ? JSON.parse(raw) : null;
  }

  async put(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }
}

describe("checkRateLimit", () => {
  it("allows requests until the limit is exceeded", async () => {
    const kv = new MockKV();

    for (let i = 0; i < 5; i += 1) {
      await expect(checkRateLimit(kv, "203.0.113.10", 0)).resolves.toBe(false);
    }

    await expect(checkRateLimit(kv, "203.0.113.10", 0)).resolves.toBe(true);
  });

  it("starts a new window after resetAt expires", async () => {
    const kv = new MockKV();

    for (let i = 0; i < 6; i += 1) {
      await checkRateLimit(kv, "203.0.113.10", 0);
    }

    await expect(checkRateLimit(kv, "203.0.113.10", 60 * 60 * 1000 + 1)).resolves.toBe(false);
  });

  it("fails open when KV binding is unavailable", async () => {
    await expect(checkRateLimit(undefined, "203.0.113.10", 0)).resolves.toBe(false);
  });
});
