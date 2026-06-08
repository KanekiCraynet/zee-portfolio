"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/stagger-children";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/content";
import { useBlogPosts } from "@/lib/swr-blog";
import { formatDate } from "@/lib/utils";

interface BlogPageClientProps {
  initialPosts: BlogPost[];
}

export function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const { posts } = useBlogPosts(initialPosts);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <SectionHeader
            label="Blog Web Development"
            title="Artikel tentang Laravel, WordPress, Next.js, dan pengembangan website."
            description="Catatan praktik teknis dari proyek dan pembelajaran yang relevan untuk Web Developer, terutama di ekosistem PHP dan JavaScript."
          />
        </FadeIn>

        {posts.length === 0 ? (
          <FadeIn delay={0.1}>
            <p className="mt-12 text-muted-foreground text-center">
              No posts yet. Check back soon!
            </p>
          </FadeIn>
        ) : (
          <StaggerChildren className="mt-12 space-y-5">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readingTime}
                      </span>
                    </div>

                    <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold transition-colors group-hover:text-primary">
                      {post.title}
                      <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </h2>

                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>
    </section>
  );
}
