import { z } from "zod";

const envSchema = z.object({
  // Required for contact form
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY required for contact form"),
  CONTACT_EMAIL: z.string().email("CONTACT_EMAIL must be valid email"),

  // Required for Keystatic CMS
  NEXT_PUBLIC_GITHUB_OWNER: z.string().min(1, "NEXT_PUBLIC_GITHUB_OWNER required"),
  NEXT_PUBLIC_GITHUB_REPO: z.string().min(1, "NEXT_PUBLIC_GITHUB_REPO required"),

  // Optional - Sentry error tracking
  SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

function loadEnv() {
  const parsed = envSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    NEXT_PUBLIC_GITHUB_OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER,
    NEXT_PUBLIC_GITHUB_REPO: process.env.NEXT_PUBLIC_GITHUB_REPO,
    SENTRY_DSN: process.env.SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });

  if (!parsed.success) {
    const issues = parsed.error.issues.map(i => `  - ${i.path.join('.')}: ${i.message}`).join("\n");

    // In build/CI, warn but don't throw (env may be injected at runtime on CF Workers)
    if (process.env.NODE_ENV === "production" && !process.env.CI) {
      console.warn(`[env] Missing or invalid env vars:\n${issues}`);
      console.warn("[env] Using empty fallbacks - some features may not work");
    } else if (process.env.CI) {
      // In CI, just warn - secrets not available during build
      console.warn(`[env] CI build - env validation skipped`);
    } else {
      // In dev, throw to catch issues early
      throw new Error(`[env] Validation failed:\n${issues}`);
    }

    return {
      RESEND_API_KEY: "",
      CONTACT_EMAIL: "",
      NEXT_PUBLIC_GITHUB_OWNER: "",
      NEXT_PUBLIC_GITHUB_REPO: "",
      SENTRY_DSN: undefined,
      NEXT_PUBLIC_SENTRY_DSN: undefined,
    };
  }

  return parsed.data;
}

export const env = loadEnv();

// Type-safe env access
export type Env = z.infer<typeof envSchema>;
