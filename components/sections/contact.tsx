"use client";

import { useState, type FormEvent } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SocialLinks } from "@/components/layout/social-links";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/lib/content";

type FormState = "idle" | "loading" | "success" | "error";

interface ContactSectionProps { config: SiteConfig; }

export function ContactSection({ config }: ContactSectionProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      // honeypot — empty for real users, non-empty for bots
      company: formData.get("company") as string,
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Failed to send message");
      }
      setFormState("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setFormState("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
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
            <form onSubmit={handleSubmit} className="surface-card rounded-3xl p-8">
              {/* Honeypot: invisible to humans, bots may fill it */}
              <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] -top-[9999px] h-0 w-0 opacity-0">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Nama" id="name" placeholder="Nama Anda" />
                <Field label="Email" id="email" type="email" placeholder="you@example.com" />
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">Pesan</label>
                <textarea id="message" name="message" required rows={6} maxLength={2000}
                  placeholder="Ceritakan kebutuhan atau pertanyaan Anda..."
                  className="min-h-40 w-full resize-none rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm leading-6 text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30" />
              </div>

              <button type="submit" disabled={formState === "loading" || formState === "success"}
                className={cn(
                  "mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}>
                {formState === "loading" && <><Loader2 className="h-4 w-4 animate-spin" /> Mengirim...</>}
                {formState === "idle" && <><Send className="h-4 w-4" /> Kirim Pesan</>}
                {formState === "success" && <><CheckCircle className="h-4 w-4" /> Berhasil Terkirim!</>}
                {formState === "error" && <><AlertCircle className="h-4 w-4" /> Kirim Ulang</>}
              </button>

              {formState === "error" && errorMessage && (
                <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
              )}
              {formState === "success" && (
                <p className="mt-4 text-center text-sm text-emerald-600 dark:text-emerald-400">
                  Terima kasih! Saya akan merespons secepatnya.
                </p>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, type = "text", placeholder }: { label: string; id: string; type?: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">{label}</label>
      <input type={type} id={id} name={id} required maxLength={type === "email" ? 254 : 100}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-border bg-background/60 px-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30" />
    </div>
  );
}
