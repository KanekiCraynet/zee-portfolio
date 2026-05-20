import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/keystatic/"],
      },
    ],
    host: "https://xenzee.site",
    sitemap: "https://xenzee.site/sitemap.xml",
  };
}
