"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { iconMap } from "@/lib/icons";
import type { SkillCategory } from "@/lib/keystatic";

interface SkillsSectionProps { categories: SkillCategory[]; }

export function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4">
            <SectionHeader
              label="Keahlian Teknis"
              title="Teknologi yang dikuasai dalam pengembangan web dan operasional IT."
              description="Mencakup web stack, backend, basis data, administrasi sistem, dan IT support — disusun agar mudah dipahami."
            />
          </FadeIn>
          <div className="grid grid-cols-1 gap-4 lg:col-span-8 sm:grid-cols-2">
            {categories.map((category, idx) => (
              <FadeIn key={category.category} delay={idx * 0.08}>
                <div className="surface-card h-full rounded-[1.75rem] p-5">
                  <h3 className="mb-5 flex items-center gap-3 text-base font-semibold">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
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
                        <span key={skill.name} className="inline-flex items-center gap-2 rounded-full border border-border bg-background/55 px-3 py-2 text-sm font-medium text-muted-foreground">
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
