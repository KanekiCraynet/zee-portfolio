import { FALLBACK_BLOG_POSTS, getFallbackBlogPost } from "./blog-content";

/**
 * Content Reader API
 * Reads content directly from JSON files — bundled at build time.
 * All functions are server-side only.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  name: string;
  role: string;
  bio: string;
  longBio: string;
  email: string;
  location: string;
  availability: string;
  languages: string;
  avatarUrl: string | null;
  resumeUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
  statsProjects: string;
  statsYears: string;
  statsSkills: string;
}

export interface Skill {
  name: string;
  iconKey: string | null;
}

export interface SkillCategory {
  category: string;
  iconKey: string | null;
  skills: Skill[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  coverImageUrl: string | null;
  coverColor: string;
  sortOrder: number;
  status: string;
}

export interface Experience {
  slug: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  sortOrder: number;
}

export interface Testimonial {
  slug: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string | null;
  show: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  published: boolean;
  coverImageUrl: string | null;
  readingTime: string;
}

export interface BlogPostWithContent extends BlogPost {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: () => Promise<any>;
}

type BlogEntry = {
  slug: string;
  entry: {
    title?: string;
    excerpt?: string;
    date?: string;
    tags?: string[];
    published?: boolean;
    coverImageUrl?: string | null;
  };
};

// ─── Inline Content Data ─────────────────────────────────────────────────────
// Embedded directly so it's bundled into the Worker — no filesystem needed.

const SITE_CONFIG: SiteConfig = {
  "name": "Dzakri Phalosa Nugroho",
  "role": "Web Developer Pekalongan | Laravel, WordPress & IT Support",
  "bio": "Web Developer Pekalongan yang membangun website Laravel, WordPress, CodeIgniter, dashboard admin, dan mendukung operasional IT.",
  "longBio": "Saya mahasiswa S1 Informatika tingkat akhir di Universitas Muhammadiyah Kendal Batang dan Web Developer berbasis Pekalongan, Jawa Tengah. Saya berpengalaman membangun website company profile berbasis Laravel, mengelola platform WordPress, membuat kebutuhan dashboard/admin, serta menangani struktur database, konten, integrasi API, dan troubleshooting operasional IT. Saya terbiasa bekerja rapi, mendokumentasikan pekerjaan, dan menyelesaikan tugas sampai bisa digunakan.",
  "email": "osanugroho03@gmail.com",
  "location": "Pekalongan Timur, Jawa Tengah",
  "availability": "Open to opportunities",
  "languages": "Indonesia (Asli), Inggris (Kerja Profesional)",
  "avatarUrl": "/avatar.png",
  "resumeUrl": "/resume.pdf",
  "githubUrl": "https://github.com/KanekiCraynet",
  "linkedinUrl": "https://www.linkedin.com/in/phalosa-nugroho/",
  "instagramUrl": "https://www.instagram.com/its.zeein/",
  "statsProjects": "3+",
  "statsYears": "2+",
  "statsSkills": "18+"
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    "category": "Web Development",
    "iconKey": "SiLaravel",
    "skills": [
      {
        "name": "PHP",
        "iconKey": "SiPhp"
      },
      {
        "name": "Laravel 12",
        "iconKey": "SiLaravel"
      },
      {
        "name": "CodeIgniter 4",
        "iconKey": "SiCodeigniter"
      },
      {
        "name": "JavaScript",
        "iconKey": "SiJavascript"
      },
      {
        "name": "Alpine.js",
        "iconKey": null
      },
      {
        "name": "Tailwind CSS v4",
        "iconKey": null
      },
      {
        "name": "HTML / CSS",
        "iconKey": "SiHtml5"
      },
      {
        "name": "Vite",
        "iconKey": null
      },
      {
        "name": "Chart.js",
        "iconKey": null
      },
      {
        "name": "Axios",
        "iconKey": null
      }
    ]
  },
  {
    "category": "Backend, Database & Infra",
    "iconKey": "SiMysql",
    "skills": [
      {
        "name": "MySQL",
        "iconKey": "SiMysql"
      },
      {
        "name": "SQLite",
        "iconKey": null
      },
      {
        "name": "Redis",
        "iconKey": null
      },
      {
        "name": "Laravel Sanctum",
        "iconKey": null
      },
      {
        "name": "Spatie Permissions",
        "iconKey": null
      },
      {
        "name": "Spatie Media Library",
        "iconKey": null
      },
      {
        "name": "Git / GitHub",
        "iconKey": "SiGithub"
      },
      {
        "name": "Dasar Linux",
        "iconKey": "SiLinux"
      },
      {
        "name": "WordPress",
        "iconKey": "SiWordpress"
      }
    ]
  },
  {
    "category": "Administrasi & Operasional",
    "iconKey": "SiLibreoffice",
    "skills": [
      {
        "name": "Pengelolaan Dokumen",
        "iconKey": null
      },
      {
        "name": "Pengarsipan",
        "iconKey": null
      },
      {
        "name": "Koordinasi Operasional",
        "iconKey": null
      },
      {
        "name": "Sistem Billing",
        "iconKey": null
      },
      {
        "name": "Komunikasi Jelas",
        "iconKey": null
      },
      {
        "name": "Teliti & Andal",
        "iconKey": null
      }
    ]
  },
  {
    "category": "IT Support",
    "iconKey": "SiLinux",
    "skills": [
      {
        "name": "Troubleshooting Jaringan",
        "iconKey": null
      },
      {
        "name": "Setup Perangkat Keras",
        "iconKey": null
      },
      {
        "name": "Monitoring Sistem",
        "iconKey": null
      },
      {
        "name": "Workstation Check",
        "iconKey": null
      }
    ]
  }
];

const PROJECTS: Project[] = [{
  "slug": "company-profile-lestari-jaya-bangsa",
  "title": "Website Company Profile — PT Lestari Jaya Bangsa",
  "description": "Aplikasi web full-stack untuk profil perusahaan yang dibangun mandiri dari nol saat magang, mencakup backend Laravel, RBAC, media library, dan frontend modern.",
  "tags": [
    "Laravel",
    "Tailwind CSS",
    "Redis",
    "SQLite",
    "Alpine.js"
  ],
  "liveUrl": null,
  "githubUrl": "https://github.com/KanekiCraynet/profile-company",
  "featured": true,
  "coverImageUrl": null,
  "coverColor": "emerald",
  "sortOrder": 1,
  "status": "published"
},
{
  "slug": "manga-platform",
  "title": "Platform Baca Manga Online",
  "description": "Membangun dan mengelola platform baca manga dengan lebih dari 1.000 pengguna aktif, termasuk integrasi cloud storage untuk hosting gambar dan otomatisasi unggah konten.",
  "tags": [
    "WordPress",
    "PHP",
    "Cloud Storage"
  ],
  "liveUrl": "https://kuromanga.me",
  "githubUrl": null,
  "featured": true,
  "coverImageUrl": null,
  "coverColor": "indigo",
  "sortOrder": 2,
  "status": "published"
},
{
  "slug": "ppob-platform",
  "title": "Platform Top-up & Pembayaran Tagihan (PPOB)",
  "description": "Platform multi-layanan untuk top-up game, isi ulang dompet digital, dan pembayaran tagihan dengan integrasi API payment gateway dan validasi input transaksi.",
  "tags": [
    "CodeIgniter 4",
    "MySQL",
    "Payment API"
  ],
  "liveUrl": null,
  "githubUrl": null,
  "featured": true,
  "coverImageUrl": null,
  "coverColor": "violet",
  "sortOrder": 3,
  "status": "published"
}];

const EXPERIENCES: Experience[] = [{
  "slug": "lestari-jaya-bangsa",
  "company": "PT Lestari Jaya Bangsa",
  "role": "Magang Web Developer (Program Kampus)",
  "period": "Feb 2025 — Jul 2025",
  "description": "Membangun website company profile secara mandiri dari nol sebagai developer tunggal. Backend menggunakan Laravel 12.x, SQLite, Redis queue/cache, Laravel Sanctum, Spatie Permissions untuk RBAC 3 level, dan Spatie Media Library; frontend menggunakan Tailwind CSS v4, Alpine.js, Chart.js, Vite, dan Axios.",
  "technologies": [
    "Laravel 12",
    "SQLite",
    "Redis",
    "Sanctum",
    "Spatie Permissions",
    "Tailwind CSS",
    "Alpine.js",
    "Chart.js"
  ],
  "sortOrder": 1
},
{
  "slug": "komdigi",
  "company": "Kementerian Komunikasi dan Digital RI (KOMDIGI)",
  "role": "Magang — Administrasi & IT Support",
  "period": "Jun 2023 — Des 2023",
  "description": "Mengelola administrasi harian seperti penyusunan berkas, pengarsipan dokumen resmi, serta penanganan surat masuk/keluar. Sesekali membantu penanganan masalah jaringan dan perangkat IT staf, serta berkoordinasi dengan tim untuk memastikan operasional kantor berjalan lancar.",
  "technologies": [
    "Administrasi",
    "IT Support",
    "Troubleshooting",
    "Jaringan"
  ],
  "sortOrder": 2
},
{
  "slug": "warnet",
  "company": "Warnet (Internet Cafe)",
  "role": "Staf Part-time",
  "period": "Jan 2025 — Agu 2025",
  "description": "Melayani pelanggan di kasir, input billing, pengantaran pesanan, dan penanganan permintaan langsung. Memantau jaringan warnet, mendiagnosis gangguan koneksi umum, serta melakukan pengecekan rutin workstation dan perangkat.",
  "technologies": [
    "Jaringan",
    "Billing System",
    "Hardware",
    "Troubleshooting"
  ],
  "sortOrder": 3
}];

// ─── Reader Functions ────────────────────────────────────────────────────────

export async function getSiteConfig(): Promise<SiteConfig> {
  return SITE_CONFIG;
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
  return SKILL_CATEGORIES;
}

export async function getProjects(): Promise<Project[]> {
  return PROJECTS;
}

export async function getExperiences(): Promise<Experience[]> {
  return EXPERIENCES;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return [];
}

// ─── Blog (still reads from filesystem at build time for SSG) ────────────────

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
    const entries = (await reader.collections.blog.all()) as BlogEntry[];
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
    console.error("getBlogPosts failed, returning fallback:", error instanceof Error ? error.message : error);
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
      return fallback ? { ...fallback, content: async () => fallback.body } : null;
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
    console.error(`getBlogPost("${slug}") failed, returning fallback:`, error instanceof Error ? error.message : error);
    return fallback ? { ...fallback, content: async () => fallback.body } : null;
  }
}

export async function getBlogPostSlugs(): Promise<string[]> {
  try {
    const reader = getBlogReader();
    const slugs = await reader.collections.blog.list();
    return slugs.length > 0 ? slugs : FALLBACK_BLOG_POSTS.map((post) => post.slug);
  } catch (error) {
    console.error("getBlogPostSlugs failed, returning fallback:", error instanceof Error ? error.message : error);
    return FALLBACK_BLOG_POSTS.map((post) => post.slug);
  }
}
