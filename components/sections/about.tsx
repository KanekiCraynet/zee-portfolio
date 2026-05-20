"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { MapPin, Mail, Briefcase, Languages, GraduationCap } from "lucide-react";
import type { SiteConfig } from "@/lib/keystatic";

interface AboutSectionProps { config: SiteConfig; }

export function AboutSection({ config }: AboutSectionProps) {
  const infoItems = [
    { icon: MapPin, label: "Lokasi", value: config.location },
    { icon: Mail, label: "Email", value: config.email },
    { icon: Briefcase, label: "Status", value: config.availability },
    { icon: Languages, label: "Bahasa", value: config.languages },
  ];

  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <FadeIn className="lg:col-span-5">
            <SectionHeader label="Tentang Saya" title="Pengembang web yang memahami kebutuhan teknis dan operasional." />
          </FadeIn>
          <FadeIn delay={0.12} className="lg:col-span-7">
            <div className="surface-card rounded-[2rem] p-6 sm:p-8">
              <p className="text-lg leading-9 text-muted-foreground">{config.longBio}</p>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {infoItems.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border/70 bg-background/55 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <item.icon className="h-4 w-4 text-accent" />
                      {item.label}
                    </div>
                    <p className="break-words text-sm leading-6 text-muted-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 rounded-[2rem] border border-border bg-foreground p-6 text-background shadow-2xl shadow-foreground/10 sm:p-8">
            <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background/10">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-background/60">Pendidikan</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">S1 Teknik Informatika — Universitas Muhammadiyah Kendal Batang</h3>
                <p className="mt-2 text-sm leading-6 text-background/70">Mahasiswa S1 Teknik Informatika dengan fokus pada pengembangan web, basis data, analisis sistem, dan administrasi jaringan. Terbiasa mengerjakan project berbasis Laravel, WordPress, dan CodeIgniter.</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
