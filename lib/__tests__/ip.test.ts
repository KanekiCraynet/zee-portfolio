import { describe, expect, it } from "vitest";
import { getClientIp } from "../ip";

function requestWithHeaders(headers: Record<string, string>): Request {
  return new Request("https://xenzee.site/api/send", { headers });
}

describe("getClientIp", () => {
  it("prefers Cloudflare CF-Connecting-IP over x-forwarded-for", () => {
    const req = requestWithHeaders({
      "cf-connecting-ip": "203.0.113.10",
      "x-forwarded-for": "198.51.100.20, 198.51.100.21",
    });

    expect(getClientIp(req)).toBe("203.0.113.10");
  });

  it("falls back to first x-forwarded-for IP outside Cloudflare", () => {
    const req = requestWithHeaders({
      "x-forwarded-for": "198.51.100.20, 198.51.100.21",
    });

    expect(getClientIp(req)).toBe("198.51.100.20");
  });

  it("returns unknown when request has no client IP headers", () => {
    expect(getClientIp(requestWithHeaders({}))).toBe("unknown");
  });
});
