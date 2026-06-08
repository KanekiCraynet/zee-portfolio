import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import type { Experience } from "@/lib/content";

interface ExperienceSectionProps { experiences: Experience[]; }

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeader
            label="Pengalaman"
            title="Perjalanan profesional di web dev, administrasi, dan IT"
            description="Setiap entri menyertakan tanggung jawab konkret, teknologi, dan hasil nyata."
          />
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:gap-8">
          {experiences.map((exp) => (
            <FadeIn key={exp.slug}>
              <article className="surface-card group relative overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:border-accent/30 sm:p-8 lg:p-10">
                <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
                <div className="relative grid gap-x-10 gap-y-6 lg:grid-cols-[15rem_1fr]">
                  <div className="lg:border-r lg:border-border/60 lg:pr-8">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      <Calendar className="h-3 w-3" strokeWidth={2.5} />
                      {exp.period}
                    </span>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Perusahaan
                    </p>
                    <p className="mt-1.5 text-lg font-semibold leading-snug tracking-[-0.01em] text-foreground">
                      {exp.company}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                      {exp.role}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                      {exp.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {exp.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="rounded-full border border-border/70 bg-background/80 px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
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
