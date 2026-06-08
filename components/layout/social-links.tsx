"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import type { SiteConfig } from "@/lib/content";

interface SocialLinksProps {
  config: SiteConfig;
  showLabels?: boolean;
  className?: string;
}

export function SocialLinks({ config, showLabels = false, className = "" }: SocialLinksProps) {
  const links = [
    { url: config.githubUrl, label: "GitHub", icon: SiGithub },
    { url: config.linkedinUrl, label: "LinkedIn", icon: FaLinkedin },
    { url: config.instagramUrl, label: "Instagram", icon: SiInstagram },
    { url: config.email ? `mailto:${config.email}` : null, label: "Email", icon: Mail },
    { url: "https://wa.me/6283833912229?text=Halo%20Dzakri%2C%20saya%20tertarik%20dengan%20jasa%20Anda", label: "WhatsApp", icon: FaWhatsapp },
  ]
    .filter((l): l is { url: string; label: string; icon: typeof SiGithub } => Boolean(l.url))
    .map((link) => ({
      url: link.url,
      label: link.label,
      Icon: link.icon,
    }));

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:bg-card hover:text-accent"
        >
          <link.Icon className="h-4 w-4" />
          {showLabels && <span className="ml-1 text-xs">{link.label}</span>}
        </Link>
      ))}
    </div>
  );
}