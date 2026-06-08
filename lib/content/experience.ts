import type { Experience } from "./types";

const EXPERIENCES: Experience[] = [
  {
    slug: "lestari-jaya-bangsa",
    company: "PT Lestari Jaya Bangsa",
    role: "Magang Web Developer (Program Kampus)",
    period: "Feb 2025 — Jul 2025",
    description:
      "Membangun website company profile secara mandiri dari nol sebagai developer tunggal. Backend menggunakan Laravel 12.x, SQLite, Redis queue/cache, Laravel Sanctum, Spatie Permissions untuk RBAC 3 level, dan Spatie Media Library; frontend menggunakan Tailwind CSS v4, Alpine.js, Chart.js, Vite, dan Axios.",
    technologies: [
      "Laravel 12",
      "SQLite",
      "Redis",
      "Sanctum",
      "Spatie Permissions",
      "Tailwind CSS",
      "Alpine.js",
      "Chart.js",
    ],
    sortOrder: 1,
  },
  {
    slug: "komdigi",
    company: "Kementerian Komunikasi dan Digital RI (KOMDIGI)",
    role: "Magang — Administrasi & IT Support",
    period: "Jun 2023 — Des 2023",
    description:
      "Mengelola administrasi harian seperti penyusunan berkas, pengarsipan dokumen resmi, serta penanganan surat masuk/keluar. Sesekali membantu penanganan masalah jaringan dan perangkat IT staf, serta berkoordinasi dengan tim untuk memastikan operasional kantor berjalan lancar.",
    technologies: ["Administrasi", "IT Support", "Troubleshooting", "Jaringan"],
    sortOrder: 2,
  },
  {
    slug: "warnet",
    company: "Warnet (Internet Cafe)",
    role: "Staf Part-time",
    period: "Jan 2025 — Agu 2025",
    description:
      "Melayani pelanggan di kasir, input billing, pengantaran pesanan, dan penanganan permintaan langsung. Memantau jaringan warnet, mendiagnosis gangguan koneksi umum, serta melakukan pengecekan rutin workstation dan perangkat.",
    technologies: ["Jaringan", "Billing System", "Hardware", "Troubleshooting"],
    sortOrder: 3,
  },
];

export async function getExperiences(): Promise<Experience[]> {
  return EXPERIENCES;
}
