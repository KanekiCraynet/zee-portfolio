import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content";

interface ProjectsSectionProps { projects: Project[]; }

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Portofolio"
          title="Proyek yang mencerminkan kemampuan teknis dan pengalaman kerja"
          description="Setiap proyek dibangun dengan standar produksi: Laravel, WordPress, CodeIgniter, deployment, dan maintenance."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {featured.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} large={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, large = false }: { project: Project; index: number; large?: boolean }) {
  return (
    <article className={cn(
      "group surface-card relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
      large && "lg:p-8"
    )}>
      <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-accent/10 blur-3xl transition-opacity group-hover:opacity-80" />
      
      <div className={cn(
        "relative grid gap-x-10 gap-y-6",
        large && "lg:grid-cols-[0.7fr_1.3fr] lg:items-start"
      )}>
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-xs font-medium text-accent">
              {index + 1}
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/60 text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Demo"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/60 text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          <h3 className={cn(
            "max-w-2xl text-3xl font-bold leading-tight tracking-[-0.02em]",
            large && "sm:text-5xl"
          )}>
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {project.title}
            </Link>
          </h3>
        </div>

        <div>
          <p className={cn(
            "text-sm leading-6 text-muted-foreground",
            large && "sm:text-base sm:leading-7"
          )}>
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-full border-border/70 bg-background/80 px-3 py-1 text-xs font-medium transition-colors hover:border-accent/40 hover:bg-accent/5"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-full border border-border bg-background/60 text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              View Details
            </Link>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-full border border-accent bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              >
                <Github className="h-3 w-3" /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-full border border-accent bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              >
                <ExternalLink className="h-3 w-3" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}