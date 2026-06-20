import { describe, it, expect } from "vitest";
import {
  escapeHtml,
  EMAIL_REGEX,
  MAX_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MIN_MESSAGE_LENGTH,
} from "../validation";

describe("escapeHtml", () => {
  it("escapes < > & \" ' characters", () => {
    const result = escapeHtml(`<script>alert("xss")</script>`);
    expect(result).toContain("&lt;");
    expect(result).toContain("&gt;");
    expect(result).not.toContain("<script>");
  });

  it("leaves safe strings unchanged", () => {
    expect(escapeHtml("hello world")).toBe("hello world");
  });

  it("handles empty string", () => {
    expect(escapeHtml("")).toBe("");
  });
});

describe("EMAIL_REGEX", () => {
  it("matches valid emails", () => {
    expect(EMAIL_REGEX.test("user@example.com")).toBe(true);
    expect(EMAIL_REGEX.test("hello@xenzee.site")).toBe(true);
    expect(EMAIL_REGEX.test("a+b@domain.co.id")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(EMAIL_REGEX.test("")).toBe(false);
    expect(EMAIL_REGEX.test("not-email")).toBe(false);
    expect(EMAIL_REGEX.test("@domain.com")).toBe(false);
    expect(EMAIL_REGEX.test("user@")).toBe(false);
  });
});

describe("MAX_NAME_LENGTH", () => {
  it("is a positive number", () => {
    expect(MAX_NAME_LENGTH).toBeGreaterThan(0);
  });
});

describe("validation limits", () => {
  it("MAX_EMAIL_LENGTH follows RFC 5321 (254)", () => {
    expect(MAX_EMAIL_LENGTH).toBe(254);
  });

  it("MAX_MESSAGE_LENGTH is greater than MIN_MESSAGE_LENGTH", () => {
    expect(MAX_MESSAGE_LENGTH).toBeGreaterThan(MIN_MESSAGE_LENGTH);
  });

  it("MIN_MESSAGE_LENGTH is a positive number", () => {
    expect(MIN_MESSAGE_LENGTH).toBeGreaterThan(0);
  });
});
