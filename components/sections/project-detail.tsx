"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import type { Project } from "@/lib/content";

interface ProjectDetailProps {
  project: Project;
  relatedProjects: Project[];
}

export function ProjectDetail({ project, relatedProjects }: ProjectDetailProps) {
  return (
    <article className="py-24 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <FadeIn>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to projects
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={0.05}>
          <header className="mb-12">
            <SectionHeader
              label="Project Detail"
              title={project.title}
              description={project.description}
              className="max-w-none"
            />

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="primary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-accent bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  View Source Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-accent bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
            </div>

            <hr className="mt-8 border-border" />
          </header>
        </FadeIn>

        {/* Cover image */}
        {project.coverImageUrl && (
          <FadeIn delay={0.08}>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border mb-12">
              <Image
                src={project.coverImageUrl}
                alt={`Screenshot of ${project.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </FadeIn>
        )}

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <FadeIn delay={0.15}>
            <section className="mt-16 pt-12 border-t border-border">
              <h2 className="text-2xl font-semibold tracking-tight mb-8">
                Related Projects
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/projects/${rel.slug}`}
                    className="surface-card group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-accent/10 blur-3xl transition-opacity group-hover:opacity-80" />
                    <h3 className="relative text-base font-semibold tracking-tight mb-2 line-clamp-2">
                      {rel.title}
                    </h3>
                    <p className="relative text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                      {rel.description}
                    </p>
                    <div className="relative flex flex-wrap gap-1">
                      {rel.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {rel.tags.length > 3 && (
                        <span className="text-[10px] text-muted-foreground self-center">
                          +{rel.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </FadeIn>
        )}

        {/* Footer nav */}
        <FadeIn delay={0.18}>
          <div className="mt-16 pt-8 border-t border-border">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              All projects
            </Link>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
