import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_EMAIL: z.string().email(),
  NEXT_PUBLIC_GITHUB_OWNER: z.string().min(1),
  NEXT_PUBLIC_GITHUB_REPO: z.string().min(1),
  SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

describe("env schema validation", () => {
  it("accepts valid env object", () => {
    const result = envSchema.safeParse({
      RESEND_API_KEY: "re_123abc",
      CONTACT_EMAIL: "hello@xenzee.site",
      NEXT_PUBLIC_GITHUB_OWNER: "KanekiCraynet",
      NEXT_PUBLIC_GITHUB_REPO: "zee-portfolio",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = envSchema.safeParse({
      RESEND_API_KEY: "re_123abc",
      CONTACT_EMAIL: "not-an-email",
      NEXT_PUBLIC_GITHUB_OWNER: "owner",
      NEXT_PUBLIC_GITHUB_REPO: "repo",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty required fields", () => {
    const result = envSchema.safeParse({
      RESEND_API_KEY: "",
      CONTACT_EMAIL: "hello@xenzee.site",
      NEXT_PUBLIC_GITHUB_OWNER: "owner",
      NEXT_PUBLIC_GITHUB_REPO: "repo",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid Sentry DSN when provided", () => {
    const result = envSchema.safeParse({
      RESEND_API_KEY: "re_123",
      CONTACT_EMAIL: "hello@xenzee.site",
      NEXT_PUBLIC_GITHUB_OWNER: "owner",
      NEXT_PUBLIC_GITHUB_REPO: "repo",
      SENTRY_DSN: "https://abc@sentry.io/123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid Sentry DSN", () => {
    const result = envSchema.safeParse({
      RESEND_API_KEY: "re_123",
      CONTACT_EMAIL: "hello@xenzee.site",
      NEXT_PUBLIC_GITHUB_OWNER: "owner",
      NEXT_PUBLIC_GITHUB_REPO: "repo",
      SENTRY_DSN: "not-a-url",
    });
    expect(result.success).toBe(false);
  });
});
