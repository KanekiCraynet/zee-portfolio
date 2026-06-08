import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { FadeIn } from "@/components/animations/fade-in";
import { Badge } from "@/components/ui/badge";
import { getBlogPost, getBlogPostSlugs } from "@/lib/content";
import { buildArticleMetadata, buildArticleJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

// ── Static params for SSG ────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return buildArticleMetadata({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    publishedTime: post.date,
    tags: post.tags,
    image: post.coverImageUrl ?? undefined,
  });
}

// ── Fallback markdown renderer ───────────────────────────────────────────────

function MarkdownContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/).filter(Boolean);

  return (
    <>
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="mt-10 text-2xl font-semibold tracking-tight">
              {block.replace(/^## /, "")}
            </h2>
          );
        }

        if (block.startsWith("### ")) {
          return (
            <h3 key={index} className="mt-8 text-xl font-semibold tracking-tight">
              {block.replace(/^### /, "")}
            </h3>
          );
        }

        if (block.startsWith("```")) {
          const code = block.replace(/^```[a-z]*\n?/, "").replace(/```$/, "");
          return (
            <pre key={index} className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-sm">
              <code>{code}</code>
            </pre>
          );
        }

        if (block.split("\n").every((line) => line.startsWith("- "))) {
          return (
            <ul key={index} className="my-6 list-disc space-y-2 pl-6">
              {block.split("\n").map((line, itemIndex) => (
                <li key={itemIndex}>{line.replace(/^- /, "")}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="leading-8 text-muted-foreground">
            {block}
          </p>
        );
      })}
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  // Resolve the document content from Keystatic
  const content = await post.content();

  const jsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    publishedTime: post.date,
    image: post.coverImageUrl ?? undefined,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article className="py-24 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to blog
            </Link>
          </FadeIn>

          {/* Header */}
          <FadeIn delay={0.05}>
            <header className="mb-12">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
                {post.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="primary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <hr className="mt-8 border-border" />
            </header>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={0.1}>
            <div className="prose">
              {typeof content === "string" ? (
                <MarkdownContent content={content} />
              ) : (
                <DocumentRenderer document={content} />
              )}
            </div>
          </FadeIn>

          {/* Footer nav */}
          <FadeIn delay={0.15}>
            <div className="mt-16 pt-8 border-t border-border">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                All articles
              </Link>
            </div>
          </FadeIn>
        </div>
      </article>
    </>
  );
}
