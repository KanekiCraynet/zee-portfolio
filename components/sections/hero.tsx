"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { ArrowRight, FileDown, Github, Linkedin, Instagram, Mail } from "lucide-react";
import type { SiteConfig } from "@/lib/keystatic";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 130, damping: 18 } },
};

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
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_75%_8%,color-mix(in_srgb,var(--accent)_24%,transparent),transparent_30rem)]" />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-end gap-12 lg:grid-cols-12">
        <motion.div className="lg:col-span-7" variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Terbuka untuk Peluang Baru
            </span>
          </motion.div>
          <motion.h1 variants={item} className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-foreground sm:text-7xl lg:text-8xl">
            {config.name}
            <span className="mt-3 block text-2xl tracking-[-0.04em] text-muted-foreground sm:text-4xl lg:text-5xl">
              Web Developer Pekalongan
            </span>
          </motion.h1>
          <motion.div variants={item} className="mt-7 max-w-2xl border-l-2 border-accent/60 pl-5">
            <p className="text-xl leading-9 text-muted-foreground sm:text-2xl">
              {config.bio}
            </p>
          </motion.div>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-medium text-foreground">{config.role}</span>
            <span className="rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-medium text-muted-foreground">{config.location}</span>
          </motion.div>
          <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Lihat Portofolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            {config.resumeUrl && (
              <a href={config.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <FileDown className="h-4 w-4" />
                Unduh CV
              </a>
            )}
          </motion.div>
        </motion.div>

        <motion.div className="lg:col-span-5" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
          <div className="surface-card relative rounded-[2rem] p-3">
            <div className="mb-3 flex items-center justify-between rounded-[1.25rem] bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
              <span>Terbuka untuk Peluang Kerja</span>
              <span className="h-2 w-2 rounded-full bg-accent-foreground/70" aria-hidden="true" />
            </div>
            <div className="overflow-hidden rounded-[1.45rem] bg-muted">
              {config.avatarUrl ? (
                <Image src={config.avatarUrl} alt={`Foto ${config.name}`} width={520} height={620} priority className="h-[28rem] w-full object-cover object-center grayscale-[12%]" />
              ) : (
                <div className="flex h-[28rem] items-center justify-center text-7xl font-semibold">D</div>
              )}
            </div>
            <div className="grid grid-cols-3 border-t border-border/70 pt-3 text-center">
              {[
                { value: config.statsProjects, label: "Projects" },
                { value: config.statsYears, label: "Years" },
                { value: config.statsSkills, label: "Skills" },
              ].map((stat) => (
                <div key={stat.label} className="px-2 py-3">
                  <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2 lg:justify-end">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
