import type { Project } from "./types";

const PROJECTS: Project[] = [
  {
    slug: "company-profile-lestari-jaya-bangsa",
    title: "Website Company Profile — PT Lestari Jaya Bangsa",
    description:
      "Aplikasi web full-stack untuk profil perusahaan yang dibangun mandiri dari nol saat magang, mencakup backend Laravel, RBAC, media library, dan frontend modern.",
    tags: ["Laravel", "Tailwind CSS", "Redis", "SQLite", "Alpine.js"],
    liveUrl: null,
    githubUrl: "https://github.com/KanekiCraynet/profile-company",
    featured: true,
    coverImageUrl: null,
    coverColor: "emerald",
    sortOrder: 1,
    status: "published",
  },
  {
    slug: "manga-platform",
    title: "Platform Baca Manga Online",
    description:
      "Membangun dan mengelola platform baca manga dengan lebih dari 1.000 pengguna aktif, termasuk integrasi cloud storage untuk hosting gambar dan otomatisasi unggah konten.",
    tags: ["WordPress", "PHP", "Cloud Storage"],
    liveUrl: "https://kuromanga.me",
    githubUrl: null,
    featured: true,
    coverImageUrl: null,
    coverColor: "indigo",
    sortOrder: 2,
    status: "published",
  },
  {
    slug: "ppob-platform",
    title: "Platform Top-up & Pembayaran Tagihan (PPOB)",
    description:
      "Platform multi-layanan untuk top-up game, isi ulang dompet digital, dan pembayaran tagihan dengan integrasi API payment gateway dan validasi input transaksi.",
    tags: ["CodeIgniter 4", "MySQL", "Payment API"],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    coverImageUrl: null,
    coverColor: "violet",
    sortOrder: 3,
    status: "published",
  },
];

export async function getProjects(): Promise<Project[]> {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  if (!project.tags.length) return [];
  const scored = PROJECTS
    .filter(p => p.slug !== project.slug)
    .map(p => ({
      project: p,
      matches: p.tags.filter(tag => project.tags.includes(tag)).length,
    }))
    .filter(({ matches }) => matches > 0)
    .sort((a, b) => b.matches - a.matches)
    .slice(0, limit)
    .map(({ project }) => project);
  return scored;
}
