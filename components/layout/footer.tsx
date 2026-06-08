import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { getSiteConfig } from "@/lib/content";

export async function Footer() {
  const config = await getSiteConfig();

  const socialLinks = [
    config.githubUrl && { href: config.githubUrl, icon: Github, label: "GitHub" },
    config.linkedinUrl && { href: config.linkedinUrl, icon: Linkedin, label: "LinkedIn" },
    config.instagramUrl && { href: config.instagramUrl, icon: Instagram, label: "Instagram" },
    config.email && { href: `mailto:${config.email}`, icon: Mail, label: "Email" },
  ].filter(Boolean) as { href: string; icon: typeof Github; label: string }[];

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              {config.name}
            </Link>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Web Developer & IT Support berbasis Pekalongan. Fokus pada website profesional, dashboard admin, WordPress, dan maintenance operasional.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Navigasi
            </h3>
            <ul className="grid gap-2 text-sm text-muted-foreground">
              {[
                { href: "#about", label: "Tentang" },
                { href: "#projects", label: "Portofolio" },
                { href: "#skills", label: "Keahlian" },
                { href: "#experience", label: "Pengalaman" },
                { href: "/blog", label: "Blog" },
                { href: "#contact", label: "Kontak" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background/60 px-3 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {config.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <p>Built with Next.js · Deployed on Cloudflare</p>
            <Link href="#top" className="rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent">
              Kembali ke atas
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
