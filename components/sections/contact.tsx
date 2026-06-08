"use client";

import { useState, type FormEvent } from "react";
import { Send, Loader2, CheckCircle, AlertCircle, Mail } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/lib/keystatic";

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
            <div className="mt-8 flex flex-wrap gap-3">
              {config.githubUrl && (
                <a href={config.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card/70 px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:bg-card hover:text-accent"
                  aria-label="GitHub">
                  <span className="text-xs font-bold uppercase">GH</span>
                </a>
              )}
              {config.linkedinUrl && (
                <a href={config.linkedinUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card/70 px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:bg-card hover:text-accent"
                  aria-label="LinkedIn">
                  <span className="text-xs font-bold uppercase">LI</span>
                </a>
              )}
              {config.instagramUrl && (
                <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card/70 px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:bg-card hover:text-accent"
                  aria-label="Instagram">
                  <span className="text-xs font-bold uppercase">IG</span>
                </a>
              )}
              {config.email && (
                <a href={`mailto:${config.email}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card/70 px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:bg-card hover:text-accent"
                  aria-label="Email">
                  <Mail className="h-4 w-4" />
                  {config.email.split("@")[0]}
                </a>
              )}
            </div>
          </FadeIn>

          <FadeIn>
            <form onSubmit={handleSubmit} className="surface-card rounded-3xl p-8">
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
