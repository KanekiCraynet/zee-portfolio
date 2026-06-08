import type { SiteConfig } from "./types";

const SITE_CONFIG: SiteConfig = {
  name: "Dzakri Phalosa Nugroho",
  role: "Web Developer Pekalongan | Laravel, WordPress & IT Support",
  bio: "Web Developer Pekalongan yang membangun website Laravel, WordPress, CodeIgniter, dashboard admin, dan mendukung operasional IT.",
  longBio:
    "Saya mahasiswa S1 Informatika tingkat akhir di Universitas Muhammadiyah Kendal Batang dan Web Developer berbasis Pekalongan, Jawa Tengah. Saya berpengalaman membangun website company profile berbasis Laravel, mengelola platform WordPress, membuat kebutuhan dashboard/admin, serta menangani struktur database, konten, integrasi API, dan troubleshooting operasional IT. Saya terbiasa bekerja rapi, mendokumentasikan pekerjaan, dan menyelesaikan tugas sampai bisa digunakan.",
  email: "osanugroho03@gmail.com",
  location: "Pekalongan Timur, Jawa Tengah",
  availability: "Open to opportunities",
  languages: "Indonesia (Asli), Inggris (Kerja Profesional)",
  avatarUrl: "/avatar.png",
  resumeUrl: "/resume.pdf",
  githubUrl: "https://github.com/KanekiCraynet",
  linkedinUrl: "https://www.linkedin.com/in/phalosa-nugroho/",
  instagramUrl: "https://www.instagram.com/its.zeein/",
  statsProjects: "3+",
  statsYears: "2+",
  statsSkills: "18+",
  tagline: "Full-stack dev, production-ready",
  profileLabel: "Available for work",
};

export async function getSiteConfig(): Promise<SiteConfig> {
  return SITE_CONFIG;
}
