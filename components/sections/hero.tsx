import Image from "next/image";
import type { ComponentType } from "react";
import { ArrowRight, FileDown, MapPin, Mail } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import type { SiteConfig } from "@/lib/content";

interface HeroSectionProps { config: SiteConfig; }

export function HeroSection({ config }: HeroSectionProps) {
  const badgeClasses = "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium";
  const socials = [
    config.githubUrl && { href: config.githubUrl, label: "GitHub", icon: SiGithub },
    config.linkedinUrl && { href: config.linkedinUrl, label: "LinkedIn", icon: FaLinkedin },
    config.instagramUrl && { href: config.instagramUrl, label: "Instagram", icon: SiInstagram },
    config.email && { href: `mailto:${config.email}`, label: "Email", icon: Mail },
  ].filter(Boolean) as { href: string; label: string; icon: ComponentType<{ className?: string }> }[];

  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-20 sm:px-6 lg:px-8 lg:pb-20 lg:pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className={badgeClasses + " border-accent/30 bg-accent/10 text-accent"}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for work
            </span>
            <span className={badgeClasses + " border-border bg-card/70 text-muted-foreground"}>
              <MapPin className="h-4 w-4" />
              {config.location}
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-6xl font-semibold leading-[0.92] tracking-[-0.08em] text-foreground sm:text-7xl lg:text-8xl">
            {config.name}
            <span className="mt-4 block max-w-3xl text-2xl font-medium leading-tight tracking-[-0.04em] text-muted-foreground sm:text-3xl lg:text-4xl">
              {config.tagline}
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
            {config.bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium text-foreground">{config.role}</span>
            <span className="rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium text-muted-foreground">{config.availability}</span>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5">
              Lihat Portofolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            {config.resumeUrl && (
              <a href={config.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card">
                <FileDown className="h-4 w-4" />
                Unduh CV
              </a>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {socials.map((s) => {
              const Icon = s.icon;

              return (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 text-muted-foreground transition-colors hover:border-accent hover:text-accent">
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card/80">
            <div className="relative overflow-hidden bg-muted/30">
              {config.avatarUrl ? (
                <Image
                  src={config.avatarUrl}
                  alt={`Foto ${config.name}`}
                  width={520}
                  height={620}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iNjIwIiB2aWV3Qm94PSIwIDAgNTIwIDYyMCI+PHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSI2MjAiIGZpbGw9IiMxNzE3MUEiLz48L3N2Zz4="
                  className="h-[32rem] w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-[32rem] items-center justify-center text-7xl font-semibold text-foreground">D</div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Professional Profile</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">{config.profileLabel}</h3>
              </div>
            </div>
            <div className="grid grid-cols-3 border-t border-border/70 text-center">
              {[
                { value: config.statsProjects, label: "Projects" },
                { value: config.statsYears, label: "Years" },
                { value: config.statsSkills, label: "Skills" },
              ].map((stat) => (
                <div key={stat.label} className="border-r border-border/70 px-2 py-4 last:border-r-0">
                  <div className="text-2xl font-semibold tracking-tight text-foreground">{stat.value}</div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
