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
            label="Pengalaman"
            title="Perjalanan profesional di web dev, administrasi, dan IT"
            description="Setiap entri menyertakan tanggung jawab konkret, teknologi, dan hasil nyata."
          />
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:gap-8">
          {experiences.map((exp) => (
            <FadeIn key={exp.slug}>
              <article className="surface-card group relative overflow-hidden rounded-3xl p-6 sm:p-8">
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-accent/10 blur-2xl transition-opacity group-hover:opacity-80" />
                <div className="relative grid gap-6 lg:grid-cols-[14rem_1fr]">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {exp.period}
                    </div>
                    <p className="mt-3 text-lg font-semibold text-foreground">{exp.company}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{exp.role}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                      {exp.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="rounded-lg border border-border/70 bg-background/50 px-3 py-1 text-sm"
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
