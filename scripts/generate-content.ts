#!/usr/bin/env tsx
import * as fs from "node:fs";
import * as path from "node:path";

const CONTENT_DIR = path.resolve(import.meta.dirname, "..", "content");
const OUT_DIR = path.resolve(import.meta.dirname, "..", "generated");
const OUT_FILE = path.join(OUT_DIR, "content.ts");

// ─── Types inline (mirrors lib/keystatic.ts) ─────────────────────────────────

const TYPES = `
// ─── Types ──────────────────────────────────────────────────────────────────────

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

export interface SkillsData {
  categories: SkillCategory[];
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

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  published: boolean;
  coverImageUrl: string | null;
}
`;

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseFrontmatter(content: string): {
  frontmatter: Record<string, unknown>;
  body: string;
} {
  const lines = content.split("\n");
  if (lines[0]?.trim() !== "---") {
    return { frontmatter: {}, body: content };
  }
  const endIdx = lines.findIndex(
    (l, i) => i > 0 && l.trim() === "---"
  );
  if (endIdx === -1) {
    return { frontmatter: {}, body: content };
  }
  const fmLines = lines.slice(1, endIdx);
  const body = lines.slice(endIdx + 1).join("\n");
  const frontmatter: Record<string, unknown> = {};
  // Simple YAML-like parser (enough for our fields)
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;
  for (const line of fmLines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)/);
    if (keyMatch) {
      if (currentKey && currentArray !== null) {
        frontmatter[currentKey] = currentArray;
        currentArray = null;
      }
      currentKey = keyMatch[1];
      const val = keyMatch[2].trim();
      if (val === "") {
        // Might be a multiline >- or array
        currentArray = [];
      } else if (val === "null") {
        frontmatter[currentKey] = null;
        currentArray = null;
      } else if (val === "true") {
        frontmatter[currentKey] = true;
        currentArray = null;
      } else if (val === "false") {
        frontmatter[currentKey] = false;
        currentArray = null;
      } else if (val.startsWith(">")) {
        // Multiline scalar (folded block)
        frontmatter[currentKey] = ""; // placeholder, filled by next lines
        currentArray = null;
      } else {
        frontmatter[currentKey] = val.replace(/^["']|["']$/g, "");
        currentArray = null;
      }
    } else {
      const trimmed = line.trim();
      if (trimmed.startsWith("- ")) {
        const item = trimmed.slice(2).trim().replace(/^["']|["']$/g, "");
        if (currentArray !== null) {
          currentArray.push(item);
        }
      } else if (currentKey && typeof frontmatter[currentKey] === "string" && frontmatter[currentKey] === "") {
        // Continuation of a folded block (>-)
        // Keystatic's >- produces a single line, so we just skip continuation
      }
    }
  }
  if (currentKey && currentArray !== null) {
    frontmatter[currentKey] = currentArray;
  }
  return { frontmatter, body };
}

function readJSON<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function indent(val: unknown, depth = 2): string {
  const prefix = " ".repeat(depth);
  const closeIndent = Math.max(0, depth - 2);
  if (val === null) return "null";
  if (typeof val === "string") {
    // Escape backslashes, backticks, and ${} for template literals
    const escaped = val
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\${/g, "\\${");
    return `\`${escaped}\``;
  }
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "number") return String(val);
  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    const items = val.map((v) => `${prefix}${indent(v, depth + 2)}`);
    return `[\n${items.join(",\n")}\n${" ".repeat(closeIndent)}]`;
  }
  if (typeof val === "object") {
    const entries = Object.entries(val as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const props = entries.map(
      ([k, v]) => `${prefix}${k}: ${indent(v, depth + 2)}`
    );
    return `{\n${props.join(",\n")}\n${" ".repeat(closeIndent)}}`;
  }
  return String(val);
}

function generateContent(): void {
  // ── 1. Site Config ──────────────────────────────────────────────────────────
  const siteConfigPath = path.join(CONTENT_DIR, "site-config.json");
  let siteConfig: Record<string, unknown> = {};
  if (fs.existsSync(siteConfigPath)) {
    siteConfig = readJSON<Record<string, unknown>>(siteConfigPath);
  }

  // ── 2. Skills ───────────────────────────────────────────────────────────────
  const skillsPath = path.join(CONTENT_DIR, "skills.json");
  let skillsData: { categories: unknown[] } = { categories: [] };
  if (fs.existsSync(skillsPath)) {
    skillsData = readJSON<{ categories: unknown[] }>(skillsPath);
  }

  // ── 3. Projects ─────────────────────────────────────────────────────────────
  const projectsDir = path.join(CONTENT_DIR, "projects");
  const projects: Record<string, unknown>[] = [];
  if (fs.existsSync(projectsDir)) {
    const projectFiles = fs
      .readdirSync(projectsDir)
      .filter((f) => f.endsWith(".json"))
      .sort();
    for (const file of projectFiles) {
      const proj = readJSON<Record<string, unknown>>(
        path.join(projectsDir, file)
      );
      // Derive slug from filename (strip .json)
      const slug = path.basename(file, ".json");
      projects.push({ slug, ...proj });
    }
  }

  // ── 4. Experience ───────────────────────────────────────────────────────────
  const expDir = path.join(CONTENT_DIR, "experience");
  const experiences: Record<string, unknown>[] = [];
  if (fs.existsSync(expDir)) {
    const expFiles = fs
      .readdirSync(expDir)
      .filter((f) => f.endsWith(".json"))
      .sort();
    for (const file of expFiles) {
      const exp = readJSON<Record<string, unknown>>(path.join(expDir, file));
      const slug = path.basename(file, ".json");
      experiences.push({ slug, ...exp });
    }
  }

  // ── 5. Blog Posts (extract metadata from .mdoc) ─────────────────────────────
  const blogDir = path.join(CONTENT_DIR, "blog");
  const blogPosts: Record<string, unknown>[] = [];
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs
      .readdirSync(blogDir)
      .filter((f) => f.endsWith(".mdoc"))
      .sort();
    for (const file of blogFiles) {
      const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
      const { frontmatter } = parseFrontmatter(raw);
      const slug = path.basename(file, ".mdoc");
      blogPosts.push({
        slug,
        title: frontmatter.title ?? "",
        excerpt: frontmatter.excerpt ?? "",
        date: frontmatter.date ?? "",
        tags: frontmatter.tags ?? [],
        published: frontmatter.published ?? false,
        coverImageUrl: frontmatter.coverImageUrl ?? null,
      });
    }
  }

  // ── 6. Testimonials ─────────────────────────────────────────────────────────
  const testimonialsDir = path.join(CONTENT_DIR, "testimonials");
  const testimonials: Record<string, unknown>[] = [];
  if (fs.existsSync(testimonialsDir)) {
    const testimonialFiles = fs
      .readdirSync(testimonialsDir)
      .filter((f) => f.endsWith(".json"))
      .sort();
    for (const file of testimonialFiles) {
      const t = readJSON<Record<string, unknown>>(
        path.join(testimonialsDir, file)
      );
      const slug = path.basename(file, ".json");
      testimonials.push({ slug, ...t });
    }
  }

  // ── Generate output ─────────────────────────────────────────────────────────
  const lines: string[] = [];
  lines.push("// ═══════════════════════════════════════════════════════════════════");
  lines.push("// AUTO-GENERATED by scripts/generate-content.ts");
  lines.push(`// Generated: ${new Date().toISOString()}`);
  lines.push("// ═══════════════════════════════════════════════════════════════════");
  lines.push("");

  // Inline types
  lines.push(TYPES);
  lines.push("");

  // Site Config
  lines.push("export const siteConfig: SiteConfig =");
  lines.push(indent(siteConfig, 0) + ";");
  lines.push("");

  // Skills
  lines.push("export const skills: SkillsData =");
  lines.push(indent(skillsData, 0) + ";");
  lines.push("");

  // Projects
  lines.push("export const projects: Project[] =");
  lines.push(indent(projects, 0) + ";");
  lines.push("");

  // Experiences
  lines.push("export const experiences: Experience[] =");
  lines.push(indent(experiences, 0) + ";");
  lines.push("");

  // Blog Posts
  lines.push("export const blogPosts: BlogPostMeta[] =");
  lines.push(indent(blogPosts, 0) + ";");
  lines.push("");

  // Testimonials
  lines.push("export const testimonials: Testimonial[] =");
  lines.push(indent(testimonials, 0) + ";");
  lines.push("");

  // Helper: get site config
  lines.push("export function getSiteConfig(): SiteConfig {");
  lines.push("  return siteConfig;");
  lines.push("}");
  lines.push("");

  lines.push("export function getSkills(): SkillsData {");
  lines.push("  return skills;");
  lines.push("}");
  lines.push("");

  lines.push("export function getProjects(): Project[] {");
  lines.push("  return projects;");
  lines.push("}");
  lines.push("");

  lines.push("export function getExperiences(): Experience[] {");
  lines.push("  return experiences;");
  lines.push("}");
  lines.push("");

  lines.push("export function getBlogPosts(): BlogPostMeta[] {");
  lines.push("  return blogPosts;");
  lines.push("}");
  lines.push("");

  lines.push("export function getTestimonials(): Testimonial[] {");
  lines.push("  return testimonials;");
  lines.push("}");
  lines.push("");

  // Lookup helpers
  lines.push(
    "export function getBlogPostBySlug(slug: string): BlogPostMeta | undefined {"
  );
  lines.push("  return blogPosts.find((p) => p.slug === slug);");
  lines.push("}");
  lines.push("");

  lines.push(
    "export function getProjectBySlug(slug: string): Project | undefined {"
  );
  lines.push("  return projects.find((p) => p.slug === slug);");
  lines.push("}");
  lines.push("");

  const output = lines.join("\n");

  // Write
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }
  fs.writeFileSync(OUT_FILE, output, "utf-8");
  console.log(`✅ Generated: ${OUT_FILE}`);
  console.log(`   Site config: ${Object.keys(siteConfig).length} fields`);
  console.log(`   Skills: ${skillsData.categories.length} categories`);
  console.log(`   Projects: ${projects.length}`);
  console.log(`   Experiences: ${experiences.length}`);
  console.log(`   Blog posts: ${blogPosts.length}`);
  console.log(`   Testimonials: ${testimonials.length}`);
}

generateContent();
