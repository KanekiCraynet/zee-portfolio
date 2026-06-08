import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_KEYWORDS } from "./constants";

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Web Developer Pekalongan | Laravel, WordPress & IT Support",
    template: "%s | Dzakri Phalosa Nugroho",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "Dzakri Phalosa Nugroho", url: SITE_URL }],
  creator: "Dzakri Phalosa Nugroho",
  publisher: "Dzakri Phalosa Nugroho",
  category: "portfolio",
  classification: "Web Development, IT Support, Portfolio",
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Web Developer Pekalongan | Laravel, WordPress & IT Support",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dzakri Phalosa Nugroho — Web Developer & IT Support Pekalongan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Developer Pekalongan | Laravel, WordPress & IT Support",
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: undefined,
  },
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}) {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      ...(image && {
        images: [{ url: image, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export function buildArticleMetadata({
  title,
  description,
  slug,
  publishedTime,
  tags,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  tags?: string[];
  image?: string;
}) {
  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime,
      authors: ["Zee"],
      tags,
      ...(image && {
        images: [{ url: image, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}