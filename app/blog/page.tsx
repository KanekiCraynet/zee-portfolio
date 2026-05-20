import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/stagger-children";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { getBlogPosts } from "@/lib/keystatic";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog Web Developer Pekalongan",
  description:
    "Catatan Dzakri Phalosa Nugroho tentang Laravel, WordPress, CodeIgniter, Next.js, TypeScript, dan praktik pengembangan website modern.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

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
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readingTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                      {post.title}
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h2>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
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
