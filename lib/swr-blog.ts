"use client";

import useSWR from "swr";
import type { BlogPost } from "@/lib/content";

const fetcher = async (url: string): Promise<BlogPost[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  return response.json();
};

export function useBlogPosts(fallbackData: BlogPost[]) {
  const { data, error, isLoading } = useSWR<BlogPost[]>("/api/blog", fetcher, {
    fallbackData,
    revalidateOnFocus: false,
  });

  return {
    posts: data ?? fallbackData,
    error,
    isLoading,
  };
}
