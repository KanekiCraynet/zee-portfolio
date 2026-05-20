"use client";

import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/keystatic";

interface ProjectsSectionProps { projects: Project[]; }

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeader
            label="Portofolio Proyek"
            title="Proyek nyata yang mencerminkan kemampuan teknis dan pengalaman kerja."
            description="Setiap proyek dibangun dengan standar produksi: company profile berbasis Laravel, platform konten digital, dan sistem pembayaran PPOB."
          />
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {featured.map((project, idx) => (
            <FadeIn key={project.slug} delay={idx * 0.08} className={cn(idx === 0 ? "lg:col-span-12" : "lg:col-span-6")}>
              <ProjectCard project={project} index={idx} large={idx === 0} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, large = false }: { project: Project; index: number; large?: boolean }) {
  return (
    <article className={cn("group surface-card relative overflow-hidden rounded-[2rem] p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8", large && "lg:p-10")}>
      <div className="absolute right-0 top-0 h-36 w-36 translate-x-12 -translate-y-12 rounded-full bg-accent/15 blur-2xl transition-opacity group-hover:opacity-80" />
      <div className={cn("relative grid gap-8", large && "lg:grid-cols-[0.7fr_1.3fr] lg:items-end")}>
        <div>
          <div className="mb-8 flex items-start justify-between gap-4">
            <div className="font-mono text-sm text-muted-foreground">0{index + 1}</div>
            <div className="flex items-center gap-2">
              {project.githubUrl && <ProjectLink href={project.githubUrl} label="GitHub"><Github className="h-4 w-4" /></ProjectLink>}
              {project.liveUrl && <ProjectLink href={project.liveUrl} label="Live"><ExternalLink className="h-4 w-4" /></ProjectLink>}
            </div>
          </div>
          <h3 className={cn("max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.04em]", large && "sm:text-4xl")}>
            {project.title}
          </h3>
        </div>
        <div>
          <p className={cn("text-sm leading-7 text-muted-foreground", large && "sm:text-base sm:leading-8")}>
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => <Badge key={tag} variant="outline" className="rounded-full bg-background/55 px-3 py-1">{tag}</Badge>)}
          </div>
          {(project.githubUrl || project.liveUrl) && (
            <a href={project.githubUrl ?? project.liveUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent">
              Lihat Detail Proyek <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/55 text-muted-foreground transition-colors hover:border-accent hover:text-accent">
      {children}
    </a>
  );
}
