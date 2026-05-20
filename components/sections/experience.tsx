"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/lib/keystatic";

interface ExperienceSectionProps { experiences: Experience[]; }

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeader
            label="Pengalaman Kerja"
            title="Rekam jejak profesional di bidang web development, administrasi, dan IT."
            description="Setiap entri menyertakan tanggung jawab konkret, teknologi yang digunakan, dan kontribusi nyata selama periode kerja."
          />
        </FadeIn>

        <div className="mt-12 divide-y divide-border rounded-[2rem] border border-border bg-card/55 backdrop-blur">
          {experiences.map((exp, idx) => (
            <FadeIn key={exp.slug} delay={idx * 0.08}>
              <article className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[14rem_1fr]">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{exp.period}</p>
                  <p className="mt-3 text-sm font-medium text-muted-foreground">{exp.company}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">{exp.role}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{exp.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => <Badge key={tech} className="rounded-full px-3 py-1">{tech}</Badge>)}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
