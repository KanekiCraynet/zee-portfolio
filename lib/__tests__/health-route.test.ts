import { describe, expect, it } from "vitest";
import { GET } from "../../app/api/health/route";

describe("GET /api/health", () => {
  it("returns non-cacheable JSON health payload", async () => {
    const res = await GET();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toContain("no-store");
    expect(body.status).toBe("ok");
    expect(body.service).toBe("zee-portfolio");
    expect(body.runtime).toBe("edge");
    expect(body.version).toMatch(/^\d+\.\d+\.\d+/);
    expect(body.timestamp).toEqual(expect.any(String));
    expect(body).not.toHaveProperty("config");
  });
});

export {};
