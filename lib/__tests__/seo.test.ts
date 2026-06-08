import { describe, it, expect } from "vitest";
import { buildPageMetadata, buildArticleMetadata } from "../seo/metadata";

describe("buildPageMetadata", () => {
  it("returns metadata with title and description", () => {
    const meta = buildPageMetadata({ title: "Test", description: "Desc" });
    expect(meta.title).toBe("Test");
    expect(meta.description).toBe("Desc");
  });

  it("sets canonical from path", () => {
    const meta = buildPageMetadata({
      title: "Blog",
      description: "Blog page",
      path: "/blog",
    });
    expect(meta.alternates?.canonical).toBe("/blog");
  });

  it("defaults path to /", () => {
    const meta = buildPageMetadata({ title: "Home", description: "Home" });
    expect(meta.alternates?.canonical).toBe("/");
  });
});

describe("buildArticleMetadata", () => {
  const base = {
    title: "Post",
    description: "Post desc",
    slug: "my-post",
    publishedTime: "2026-01-01",
  };

  it("sets article OG type", () => {
    const meta = buildArticleMetadata(base);
    expect(meta.openGraph?.type).toBe("article");
  });

  it("sets canonical to /blog/slug", () => {
    const meta = buildArticleMetadata(base);
    expect(meta.alternates?.canonical).toBe("/blog/my-post");
  });

  it("includes publishedTime", () => {
    const meta = buildArticleMetadata(base);
    expect(meta.openGraph?.publishedTime).toBe("2026-01-01");
  });
});
