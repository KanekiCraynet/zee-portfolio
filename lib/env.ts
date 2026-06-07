import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_GITHUB_OWNER: z.string().min(1).optional(),
  NEXT_PUBLIC_GITHUB_REPO: z.string().min(1).optional(),
});

const parsed = envSchema.safeParse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  NEXT_PUBLIC_GITHUB_OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER,
  NEXT_PUBLIC_GITHUB_REPO: process.env.NEXT_PUBLIC_GITHUB_REPO,
});

export const env = parsed.success ? parsed.data : {
  RESEND_API_KEY: "",
  CONTACT_EMAIL: "",
  NEXT_PUBLIC_GITHUB_OWNER: "",
  NEXT_PUBLIC_GITHUB_REPO: "",
};
