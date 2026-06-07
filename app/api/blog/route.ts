import { getBlogPosts } from "@/lib/keystatic";

export const revalidate = 300;

export async function GET() {
  const posts = await getBlogPosts();

  return Response.json(posts, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
