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
  tagline: string;
  profileLabel: string;
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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