/**
 * Validation constants and helpers for API routes.
 */

// ── Limits ───────────────────────────────────────────────────────────────────
export const MAX_NAME_LENGTH = 100;
export const MAX_EMAIL_LENGTH = 254; // RFC 5321
export const MAX_MESSAGE_LENGTH = 2000;

// ── Email validation ─────────────────────────────────────────────────────────
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Basic HTML‑escape helper to prevent XSS in email content.
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}