import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { iconMap } from "@/lib/icons";
import type { SkillCategory } from "@/lib/keystatic";

interface SkillsSectionProps { categories: SkillCategory[]; }

export function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-4">
            <SectionHeader
              label="Keahlian"
              title="Stack yang dipakai untuk build, maintain, dan scale web project"
              description="Mencakup frontend, backend, database, tools deployment, serta operasional IT support."
            />
          </FadeIn>

          <div className="grid grid-cols-1 gap-5 lg:col-span-8 sm:grid-cols-2">
            {categories.map((category) => (
              <FadeIn key={category.category}>
                <div className="surface-card h-full rounded-[1.75rem] p-6">
                  <h3 className="mb-5 flex items-center gap-3 text-base font-semibold text-foreground">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      {category.iconKey && iconMap[category.iconKey] ? (() => {
                        const Icon = iconMap[category.iconKey];
                        return <Icon className="h-4 w-4" />;
                      })() : <span className="h-2 w-2 rounded-full bg-accent" />}
                    </span>
                    {category.category}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const Icon = skill.iconKey ? iconMap[skill.iconKey] : undefined;
                      return (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background/55 px-3 py-2 text-sm font-medium text-muted-foreground"
                        >
                          {Icon && <Icon className="h-3.5 w-3.5 text-accent" />}
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
