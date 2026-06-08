import type { SkillCategory } from "./types";

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Web Development",
    iconKey: "SiLaravel",
    skills: [
      { name: "PHP", iconKey: "SiPhp" },
      { name: "Laravel 12", iconKey: "SiLaravel" },
      { name: "CodeIgniter 4", iconKey: "SiCodeigniter" },
      { name: "JavaScript", iconKey: "SiJavascript" },
      { name: "Alpine.js", iconKey: null },
      { name: "Tailwind CSS v4", iconKey: null },
      { name: "HTML / CSS", iconKey: "SiHtml5" },
      { name: "Vite", iconKey: null },
      { name: "Chart.js", iconKey: null },
      { name: "Axios", iconKey: null },
    ],
  },
  {
    category: "Backend, Database & Infra",
    iconKey: "SiMysql",
    skills: [
      { name: "MySQL", iconKey: "SiMysql" },
      { name: "SQLite", iconKey: null },
      { name: "Redis", iconKey: null },
      { name: "Laravel Sanctum", iconKey: null },
      { name: "Spatie Permissions", iconKey: null },
      { name: "Spatie Media Library", iconKey: null },
      { name: "Git / GitHub", iconKey: "SiGithub" },
      { name: "Dasar Linux", iconKey: "SiLinux" },
      { name: "WordPress", iconKey: "SiWordpress" },
    ],
  },
  {
    category: "Administrasi & Operasional",
    iconKey: "SiLibreoffice",
    skills: [
      { name: "Pengelolaan Dokumen", iconKey: null },
      { name: "Pengarsipan", iconKey: null },
      { name: "Koordinasi Operasional", iconKey: null },
      { name: "Sistem Billing", iconKey: null },
      { name: "Komunikasi Jelas", iconKey: null },
      { name: "Teliti & Andal", iconKey: null },
    ],
  },
  {
    category: "IT Support",
    iconKey: "SiLinux",
    skills: [
      { name: "Troubleshooting Jaringan", iconKey: null },
      { name: "Setup Perangkat Keras", iconKey: null },
      { name: "Monitoring Sistem", iconKey: null },
      { name: "Workstation Check", iconKey: null },
    ],
  },
];

export async function getSkillCategories(): Promise<SkillCategory[]> {
  return SKILL_CATEGORIES;
}
