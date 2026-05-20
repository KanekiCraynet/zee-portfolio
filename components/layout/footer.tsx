import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { getSiteConfig } from "@/lib/keystatic";

export async function Footer() {
  const config = await getSiteConfig();

  const socialLinks = [
    config.githubUrl && { href: config.githubUrl, icon: Github, label: "GitHub" },
    config.linkedinUrl && { href: config.linkedinUrl, icon: Linkedin, label: "LinkedIn" },
    config.instagramUrl && { href: config.instagramUrl, icon: Instagram, label: "Instagram" },
    config.email && { href: `mailto:${config.email}`, icon: Mail, label: "Email" },
  ].filter(Boolean) as { href: string; icon: typeof Github; label: string }[];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="gradient-text">{config.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-6">
              Web Developer & IT Support berbasis di Pekalongan, Jawa Tengah. Spesialisasi Laravel, WordPress, CodeIgniter, dan operasional IT.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Navigasi
            </h3>
            <ul className="space-y-2">
              {[
                { href: "#about", label: "Tentang Saya" },
                { href: "#projects", label: "Portofolio Proyek" },
                { href: "#skills", label: "Keahlian Teknis" },
                { href: "#experience", label: "Pengalaman Kerja" },
                { href: "#services", label: "Layanan Web Developer" },
                { href: "/blog", label: "Blog" },
                { href: "#contact", label: "Hubungi Saya" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Media Sosial
            </h3>
            <div className="flex gap-2 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {config.name}. Seluruh hak dilindungi.
          </p>
          <p className="text-sm text-muted-foreground">
            Dibangun dengan Next.js &amp; Tailwind CSS · Pekalongan, Jawa Tengah
          </p>
        </div>
      </div>
    </footer>
  );
}
