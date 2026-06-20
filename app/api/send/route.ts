import { Resend } from "resend";
import { env } from "@/lib/env";
import { getClientIp } from "@/lib/ip";
import { checkRateLimit, type KvBinding } from "@/lib/rate-limit";
import {
  EMAIL_REGEX,
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  escapeHtml,
} from "@/lib/validation";

// ── Resend client (lazy init) ───────────────────────────────────────────────

function getResend(): Resend {
  const key = env.RESEND_API_KEY;
  if (!key) throw new Error("Resend API key not configured");
  return new Resend(key);
}

// ── Sender email ─────────────────────────────────────────────────────────────

const SENDER_EMAIL = env.CONTACT_EMAIL || "admin@xenzee.site";
const SENDER_NAME = "Portfolio Contact";
const FROM_ADDRESS = `${SENDER_NAME} <contact@xenzee.site>`;
const TO_ADDRESS = SENDER_EMAIL;

// ── Rate limiter — get KV binding from Cloudflare context ────────────────────

type KvLookup =
  | { ok: true; kv: KvBinding | undefined }
  | { ok: false; error: unknown };

function getKvBinding(): KvLookup {
  try {
    // getCloudflareContext throws when no CF binding (local dev)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getCloudflareContext } = require("@opennextjs/cloudflare");
    const ctx = getCloudflareContext();
    const kv = (ctx.env as { RATE_LIMIT?: KvBinding }).RATE_LIMIT;

    if (!kv && process.env.NODE_ENV === "production") {
      return { ok: false, error: new Error("RATE_LIMIT binding missing") };
    }

    return { ok: true, kv };
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, error };
    }

    return { ok: true, kv: undefined }; // local dev/test fallback
  }
}

// ── POST handler ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const kvLookup = getKvBinding();

    if (!kvLookup.ok) {
      console.error("Rate limiter unavailable:", kvLookup.error);
      return Response.json(
        { error: "Service temporarily unavailable. Please try again later." },
        { status: 503 },
      );
    }

    if (await checkRateLimit(kvLookup.kv, ip)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const honeypot = typeof body.company === "string" ? body.company.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    // Honeypot: silently "succeed" for bots
    if (honeypot) {
      return Response.json({ success: true });
    }

    // Validations
    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (name.length > MAX_NAME_LENGTH) {
      return Response.json(
        { error: `Name must be ${MAX_NAME_LENGTH} characters or fewer.` },
        { status: 400 },
      );
    }

    if (email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
      return Response.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return Response.json(
        { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` },
        { status: 400 },
      );
    }

    const resend = getResend();

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New Contact Form Message
          </h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; color: #555;">${escapeHtml(message)}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px;">
            Sent from the portfolio contact form at xenzee.site
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email." }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return Response.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
