"use client";

import { useState, useRef, type FormEvent } from "react";
import { Send, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SocialLinks } from "@/components/layout/social-links";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/lib/content";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FETCH_TIMEOUT = 15_000; // 15s

type FormState = "idle" | "loading" | "success" | "error";

interface ContactSectionProps { config: SiteConfig; }

export function ContactSection({ config }: ContactSectionProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  function validateField(name: string, value: string): string | null {
    if (!value.trim()) return "Wajib diisi";
    if (name === "email" && !EMAIL_REGEX.test(value))
      return "Format email tidak valid";
    if (name === "name" && value.trim().length > 100)
      return "Nama maksimal 100 karakter";
    if (name === "message" && value.trim().length < 10)
      return "Pesan minimal 10 karakter";
    if (name === "message" && value.length > 2000)
      return "Pesan maksimal 2000 karakter";
    return null;
  }

  function validateForm(form: HTMLFormElement): boolean {
    const fd = new FormData(form);
    const errors: Record<string, string> = {};

    for (const field of ["name", "email", "message"] as const) {
      const val = fd.get(field) as string || "";
      const err = validateField(field, val);
      if (err) errors[field] = err;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!validateForm(form)) return;

    setFormState("loading");
    setErrorMessage("");
    setFieldErrors({});

    // Cancel previous request if any
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    const formData = new FormData(form);
    const data = {
      name: (formData.get("name") as string).trim(),
      email: (formData.get("email") as string).trim(),
      message: (formData.get("message") as string).trim(),
      company: (formData.get("company") as string) || "",
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      const body = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(body?.error || "Gagal mengirim pesan. Silakan coba lagi.");
      }

      setFormState("success");
      form.reset();
      setFieldErrors({});
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setErrorMessage("Koneksi timeout. Silakan coba lagi.");
      } else {
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan. Silakan coba lagi."
        );
      }
      setFormState("error");
    } finally {
      clearTimeout(timeout);
      abortRef.current = null;
    }
  }

  function dismissError() {
    setErrorMessage("");
    setFormState("idle");
  }

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <FadeIn>
            <SectionHeader
              label="Kontak"
              title="Terbuka untuk peluang kerja dan kolaborasi"
              description="Kirim pesan via form, atau hubungi langsung lewat email: osanugroho03@gmail.com"
            />
            <SocialLinks config={config} showLabels className="mt-8" />
          </FadeIn>

          <FadeIn>
            <form ref={formRef} onSubmit={handleSubmit} noValidate
              className="surface-card rounded-3xl p-8 relative"
            >
              {/* Honeypot: invisible to humans, bots may fill it */}
              <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] -top-[9999px] h-0 w-0 opacity-0">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Success banner */}
              {formState === "success" && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-3xl bg-background/95 backdrop-blur-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                    <CheckCircle className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-center text-lg font-semibold text-foreground">
                    Pesan terkirim!
                  </p>
                  <p className="text-center text-sm text-muted-foreground max-w-xs">
                    Terima kasih! Saya akan merespons secepatnya ke email Anda.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormState("idle")}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-foreground/10 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Kirim pesan lain
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  label="Nama"
                  id="name"
                  placeholder="Nama Anda"
                  disabled={formState === "loading" || formState === "success"}
                  error={fieldErrors.name}
                />
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  disabled={formState === "loading" || formState === "success"}
                  error={fieldErrors.email}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  maxLength={2000}
                  disabled={formState === "loading" || formState === "success"}
                  placeholder="Ceritakan kebutuhan atau pertanyaan Anda..."
                  className={cn(
                    "min-h-40 w-full resize-none rounded-2xl border bg-background/60 px-4 py-3 text-sm leading-6 text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2",
                    fieldErrors.message
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      : "border-border focus:border-accent focus:ring-ring/30",
                    (formState === "loading" || formState === "success") && "cursor-not-allowed opacity-60"
                  )}
                />
                {fieldErrors.message && (
                  <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{fieldErrors.message}</p>
                )}
              </div>

              {/* Error banner */}
              {formState === "error" && errorMessage && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">Pesan gagal dikirim</p>
                    <p className="mt-0.5 text-sm text-red-700 dark:text-red-400">{errorMessage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={dismissError}
                    className="shrink-0 rounded-full p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={formState === "loading" || formState === "success"}
                className={cn(
                  "mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
                  formState === "loading"
                    ? "bg-foreground/70 text-background cursor-wait"
                    : formState === "success"
                      ? "bg-emerald-600 text-white"
                      : formState === "error"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-foreground text-background hover:-translate-y-0.5 active:translate-y-0",
                  "disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                {formState === "loading" && <><Loader2 className="h-4 w-4 animate-spin" /> Mengirim...</>}
                {formState === "idle" && <><Send className="h-4 w-4" /> Kirim Pesan</>}
                {formState === "success" && <><CheckCircle className="h-4 w-4" /> Terkirim</>}
                {formState === "error" && <><AlertCircle className="h-4 w-4" /> Coba Lagi</>}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, id, type = "text", placeholder, disabled, error,
}: {
  label: string; id: string; type?: string; placeholder: string;
  disabled?: boolean; error?: string | null;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        required
        maxLength={type === "email" ? 254 : 100}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "h-12 w-full rounded-2xl border bg-background/60 px-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
            : "border-border focus:border-accent focus:ring-ring/30",
          disabled && "cursor-not-allowed opacity-60"
        )}
      />
      {error && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
