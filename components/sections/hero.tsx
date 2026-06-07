"use client";

import Image from "next/image";
import { ArrowRight, FileDown, Github, Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/lib/keystatic";

interface HeroSectionProps { config: SiteConfig; }

export function HeroSection({ config }: HeroSectionProps) {
  const socials = [
    config.githubUrl && { href: config.githubUrl, label: "GitHub", icon: Github },
    config.linkedinUrl && { href: config.linkedinUrl, label: "LinkedIn", icon: Linkedin },
    config.instagramUrl && { href: config.instagramUrl, label: "Instagram", icon: Instagram },
    config.email && { href: `mailto:${config.email}`, label: "Email", icon: Mail },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github }[];

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for work
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {config.location}
              </span>
            </div>
          </FadeIn>

          <FadeIn className="mt-6">
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.08em] text-foreground sm:text-7xl lg:text-8xl">
              {config.name}
              <span className="mt-4 block max-w-3xl text-xl font-medium leading-tight tracking-[-0.04em] text-muted-foreground sm:text-3xl lg:text-4xl">
                Web Developer, WordPress Specialist, IT Support
              </span>
            </h1>
          </FadeIn>

          <FadeIn className="mt-8">
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              {config.bio}
            </p>
          </FadeIn>

          <FadeIn className="mt-8">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium text-foreground">
                {config.role}
              </span>
              <span className="rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium text-muted-foreground">
                2+ tahun pengalaman praktis
              </span>
            </div>
          </FadeIn>

          <FadeIn className="mt-10">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Lihat Portofolio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              {config.resumeUrl && (
                <a
                  href={config.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <FileDown className="h-4 w-4" />
                  Unduh CV
                </a>
              )}
            </div>
          </FadeIn>

          <FadeIn className="mt-10">
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn className="lg:col-span-5">
          <div className="surface-card overflow-hidden rounded-[2rem] p-3">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-border/60 bg-muted/40">
              {config.avatarUrl ? (
                <Image
                  src={config.avatarUrl}
                  alt={`Foto ${config.name}`}
                  width={520}
                  height={620}
                  priority
                  className="h-[30rem] w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-[30rem] items-center justify-center text-7xl font-semibold text-foreground">D</div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Professional Profile</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">Build clean, usable, production-ready websites</h3>
                <p className="mt-2 text-sm leading-6 text-white/80">Laravel, WordPress, dashboard admin, deployment, maintenance.</p>
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-border/70 pt-3 text-center">
              {[
                { value: config.statsProjects, label: "Projects" },
                { value: config.statsYears, label: "Years" },
                { value: config.statsSkills, label: "Skills" },
              ].map((stat) => (
                <div key={stat.label} className="px-2 py-3">
                  <div className="text-2xl font-semibold tracking-tight text-foreground">{stat.value}</div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
