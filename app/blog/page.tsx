import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/keystatic";
import { buildPageMetadata } from "@/lib/seo";
import { BlogPageClient } from "./page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog Web Developer Pekalongan",
  description:
    "Catatan Dzakri Phalosa Nugroho tentang Laravel, WordPress, CodeIgniter, Next.js, TypeScript, dan praktik pengembangan website modern.",
  path: "/blog",
});

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogPageClient initialPosts={posts} />;
}
