import type { Metadata } from "next";
import type { SiteConfig, Project } from "@/lib/keystatic";

const SITE_URL = "https://xenzee.site";
const SITE_NAME = "Dzakri Phalosa Nugroho";
const SITE_DESCRIPTION =
  "Web Developer Pekalongan untuk Laravel, WordPress, CodeIgniter, dashboard admin, company profile, dan IT support. Lihat proyek nyata Dzakri Phalosa Nugroho.";
const SITE_KEYWORDS = [
  // Nama / identitas
  "Dzakri Phalosa Nugroho",
  "Phalosa Nugroho",
  "Dzakri Nugroho",
  "Zee Developer",
  "xenzee.site",
  // Role utama
  "Web Developer Indonesia",
  "Web Developer Pekalongan",
  "Web Developer Jawa Tengah",
  "Full Stack Developer PHP",
  "Full Stack Developer Indonesia",
  "PHP Developer Indonesia",
  "Frontend Developer Indonesia",
  "Backend Developer Indonesia",
  "Junior Web Developer Indonesia",
  "Junior Developer Pekalongan",
  // Stack teknis
  "Laravel Developer Indonesia",
  "Laravel Developer Pekalongan",
  "WordPress Developer Indonesia",
  "WordPress Developer Pekalongan",
  "CodeIgniter Developer Indonesia",
  "Next.js Developer Indonesia",
  "React Developer Indonesia",
  "Tailwind CSS Developer",
  "Alpine.js Developer",
  "MySQL Developer Indonesia",
  "REST API Developer Indonesia",
  // IT & Administrasi
  "IT Support Indonesia",
  "IT Support Pekalongan",
  "Administrasi Sistem",
  "Operasional IT",
  "Staf IT Pekalongan",
  "Teknisi Komputer Pekalongan",
  "Jaringan Komputer Pekalongan",
  // Jasa / layanan
  "Jasa Pembuatan Website Pekalongan",
  "Jasa Website Murah Pekalongan",
  "Jasa Website UMKM Pekalongan",
  "Jasa Website Company Profile Pekalongan",
  "Jasa Website Toko Online Pekalongan",
  "Jasa Pembuatan Aplikasi Web Indonesia",
  "Jasa Web Developer Freelance Indonesia",
  "Jasa Dashboard Admin",
  "Jasa Integrasi API",
  // Geo — kota-kota sekitar Pekalongan
  "Programmer Pekalongan",
  "Developer Freelance Pekalongan",
  "Jasa Website Jawa Tengah",
  "Web Developer Batang",
  "Web Developer Pemalang",
  "Web Developer Tegal",
  "Web Developer Brebes",
  "Web Developer Kendal",
  "Web Developer Semarang",
  "Web Developer Kajen",
  "Jasa Website Batang",
  "Jasa Website Pemalang",
  "Jasa Website Tegal",
  "Jasa Website Semarang",
  // Status / fresh grad / rekrutmen
  "Fresh Graduate Web Developer",
  "Mahasiswa Informatika Web Developer",
  "Portfolio Mahasiswa Informatika",
  "Web Developer Fresh Graduate Indonesia",
  "Lowongan Web Developer Pekalongan",
  "Hire Web Developer Pekalongan",
  "Cari Web Developer Indonesia",
  "Rekrut Web Developer Indonesia",
  // Portfolio umum
  "Portfolio Web Developer",
  "Portfolio Developer Indonesia",
  "Portfolio PHP Developer",
  "Portofolio Web Developer Indonesia",
  "Portfolio Full Stack Developer",
  "Portfolio Laravel Developer",
  "Portfolio Next.js Developer",
  // Niche / spesifik
  "Website PPOB Indonesia",
  "Aplikasi Kasir Web",
  "Company Profile Website",
  "Dashboard Admin Laravel",
  "Manga Platform Web",
];

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
}): Metadata {
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
}): Metadata {
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

export function buildWebsiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "id-ID",
  };
}

export function buildWebPageJsonLd() {
  return {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "Web Developer Pekalongan | Laravel, WordPress & IT Support",
    description: SITE_DESCRIPTION,
    inLanguage: "id-ID",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: { "@id": `${SITE_URL}/#person` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Beranda",
          item: SITE_URL,
        },
      ],
    },
  };
}

export function buildPersonJsonLd(config: SiteConfig) {
  const sameAs = [
    config.githubUrl,
    config.linkedinUrl,
    config.instagramUrl,
  ].filter(Boolean) as string[];

  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: config.name,
    alternateName: ["Zee", "Dzakri", "Phalosa Nugroho"],
    url: SITE_URL,
    image: {
      "@type": "ImageObject",
      url: config.avatarUrl ?? `${SITE_URL}/avatar.png`,
      width: 400,
      height: 400,
    },
    email: config.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pekalongan",
      addressRegion: "Jawa Tengah",
      addressCountry: "ID",
    },
    sameAs,
    jobTitle: config.role,
    description: config.bio,
    nationality: {
      "@type": "Country",
      name: "Indonesia",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universitas Muhammadiyah Kendal Batang",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Batang",
        addressRegion: "Jawa Tengah",
        addressCountry: "ID",
      },
    },
    knowsAbout: [
      "Web Development",
      "Full Stack Development",
      "PHP",
      "Laravel",
      "CodeIgniter",
      "WordPress",
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Alpine.js",
      "Tailwind CSS",
      "MySQL",
      "SQLite",
      "Redis",
      "REST API",
      "IT Support",
      "Administrasi Sistem",
      "Jaringan Komputer",
      "Linux",
      "Cloudflare Workers",
      "Git",
      "Pembuatan Website",
      "Company Profile Website",
      "Dashboard Admin",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Web Developer",
      occupationLocation: {
        "@type": "City",
        name: "Pekalongan",
      },
      description: "Membangun aplikasi web full-stack dan mendukung operasional IT",
      skills: "Laravel, WordPress, CodeIgniter, PHP, JavaScript, MySQL, IT Support",
    },
  };
}

export function buildProjectItemListJsonLd(projects: Project[]) {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#featured-projects`,
    name: "Portofolio proyek Web Developer Pekalongan",
    itemListElement: projects.slice(0, 6).map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: project.liveUrl ?? project.githubUrl ?? `${SITE_URL}/#projects`,
        about: project.tags,
      },
    })),
  };
}

export function buildServiceJsonLd() {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/#web-development-service`,
    name: "Jasa Web Developer Pekalongan",
    serviceType: "Web Development dan IT Support",
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: [
      { "@type": "City", name: "Pekalongan" },
      { "@type": "City", name: "Batang" },
      { "@type": "City", name: "Pemalang" },
      { "@type": "City", name: "Tegal" },
      { "@type": "City", name: "Brebes" },
      { "@type": "City", name: "Kendal" },
      { "@type": "City", name: "Semarang" },
      { "@type": "AdministrativeArea", name: "Jawa Tengah" },
      { "@type": "Country", name: "Indonesia" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: SITE_URL,
    },
    description:
      "Pembuatan website company profile, dashboard admin, aplikasi Laravel, pengelolaan WordPress, integrasi API, dan dukungan operasional IT.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/#contact`,
      priceCurrency: "IDR",
    },
  };
}

export function buildFaqJsonLd() {
  const questions = [
    {
      question: "Siapa Dzakri Phalosa Nugroho?",
      answer:
        "Mahasiswa informatika dari Pekalongan yang juga kerja sebagai web developer. Pernah magang di KOMDIGI, part-time di warnet, dan ngerjain beberapa proyek web nyata. Stack utamanya Laravel, WordPress, dan sekarang mulai aktif pakai Next.js.",
    },
    {
      question: "Tech stack apa yang dikuasai?",
      answer:
        "Untuk backend: PHP dengan Laravel atau CodeIgniter, MySQL, REST API. Frontend: JavaScript, Alpine.js, Tailwind CSS, dan belakangan Next.js sama React. Untuk deployment sudah coba Cloudflare Workers dan VPS Linux.",
    },
    {
      question: "Bisa diajak freelance atau kerja full-time?",
      answer:
        "Bisa. Untuk freelance bisa langsung kontak lewat form di bawah. Untuk posisi full-time atau magang, lebih enak diskusi dulu soal kecocokan posisi dan lokasi kerja.",
    },
    {
      question: "Jenis proyek apa yang biasa dikerjakan?",
      answer:
        "Company profile, dashboard admin, website toko atau UMKM, integrasi payment gateway, dan pengelolaan WordPress. Juga pernah handle setup jaringan dan IT support operasional sehari-hari.",
    },
    {
      question: "Apakah bisa remote atau harus di Pekalongan?",
      answer:
        "Bisa remote untuk project-based. Kalau on-site, lebih mudah untuk wilayah Pekalongan dan sekitarnya seperti Batang, Pemalang, Tegal, atau Semarang.",
    },
    {
      question: "Kenapa pilih web developer lokal Pekalongan?",
      answer:
        "Komunikasi lebih gampang, bisa meeting langsung, dan lebih paham kebutuhan bisnis lokal seperti UMKM atau toko di daerah. Tidak perlu bayar mahal seperti agensi Jakarta kalau kebutuhannya masih bisa ditangani lokal.",
    },
    {
      question: "Apa yang bisa dilihat dari portofolio ini?",
      answer:
        "Proyek nyata yang pernah dikerjakan, bukan cuma latihan. Stack yang dipakai, cara menjelaskan masalah dan solusinya, serta pengalaman kerja dari magang sampai part-time. Cukup untuk gambaran awal sebelum interview.",
    },
  ];

  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildArticleJsonLd({
  title,
  description,
  slug,
  publishedTime,
  modifiedTime,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: "Dzakri Phalosa Nugroho",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Dzakri Phalosa Nugroho",
      url: SITE_URL,
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
  };
}
