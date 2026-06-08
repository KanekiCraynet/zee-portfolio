import { FALLBACK_BLOG_POSTS, getFallbackBlogPost } from "../blog-content";
import type { BlogPost, BlogPostWithContent } from "./types";

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function getBlogReader() {
  // Only used at build time (generateStaticParams + SSG).
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createReader } = require("@keystatic/core/reader");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const keystaticConfig = require("@/keystatic.config").default;
  return createReader(process.cwd(), keystaticConfig);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const reader = getBlogReader();
    const entries = (await reader.collections.blog.all()) as {
      slug: string;
      entry: {
        title?: string;
        excerpt?: string;
        date?: string;
        tags?: string[];
        published?: boolean;
        coverImageUrl?: string | null;
      };
    }[];
    const posts = entries
      .filter((e) => e.entry.published !== false)
      .map((e) => ({
        slug: e.slug,
        title: e.entry.title || e.slug,
        excerpt: e.entry.excerpt || "",
        date: e.entry.date || "",
        tags: (e.entry.tags as string[]) || [],
        published: e.entry.published ?? true,
        coverImageUrl: e.entry.coverImageUrl ?? null,
        readingTime: estimateReadingTime(e.entry.excerpt || ""),
      }))
      .sort(
        (a: BlogPost, b: BlogPost) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    return posts.length > 0 ? posts : FALLBACK_BLOG_POSTS;
  } catch (error) {
    console.error(
      "getBlogPosts failed, returning fallback:",
      error instanceof Error ? error.message : error
    );
    return FALLBACK_BLOG_POSTS;
  }
}

export async function getBlogPost(
  slug: string
): Promise<BlogPostWithContent | null> {
  const fallback = getFallbackBlogPost(slug);

  try {
    const reader = getBlogReader();
    const entry = await reader.collections.blog.read(slug, {
      resolveLinkedFiles: true,
    });

    if (!entry || entry.published === false) {
      return fallback
        ? { ...fallback, content: async () => fallback.body }
        : null;
    }

    return {
      slug,
      title: entry.title || fallback?.title || slug,
      excerpt: entry.excerpt || fallback?.excerpt || "",
      date: entry.date || fallback?.date || "",
      tags: (entry.tags as string[]) || fallback?.tags || [],
      published: entry.published ?? true,
      coverImageUrl: entry.coverImageUrl ?? fallback?.coverImageUrl ?? null,
      readingTime: estimateReadingTime(entry.excerpt || fallback?.body || ""),
      content: async () => entry.content || fallback?.body || "",
    };
  } catch (error) {
    console.error(
      `getBlogPost("${slug}") failed, returning fallback:`,
      error instanceof Error ? error.message : error
    );
    return fallback
      ? { ...fallback, content: async () => fallback.body }
      : null;
  }
}

export async function getBlogPostSlugs(): Promise<string[]> {
  try {
    const reader = getBlogReader();
    const slugs = await reader.collections.blog.list();
    return slugs.length > 0
      ? slugs
      : FALLBACK_BLOG_POSTS.map((post) => post.slug);
  } catch (error) {
    console.error(
      "getBlogPostSlugs failed, returning fallback:",
      error instanceof Error ? error.message : error
    );
    return FALLBACK_BLOG_POSTS.map((post) => post.slug);
  }
}

export async function getTestimonials(): Promise<import("./types").Testimonial[]> {
  return [];
}
