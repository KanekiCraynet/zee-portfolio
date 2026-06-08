// ─── Re-exports for backward compatibility ────────────────────────────────────
export type {
  SiteConfig,
  Skill,
  SkillCategory,
  Project,
  Experience,
  Testimonial,
  BlogPost,
  BlogPostWithContent,
} from "./types";

export { getSiteConfig } from "./site";
export { getProjects, getProjectBySlug, getRelatedProjects } from "./projects";
export { getSkillCategories } from "./skills";
export { getExperiences } from "./experience";
export {
  getBlogPosts,
  getBlogPost,
  getBlogPostSlugs,
  getTestimonials,
} from "./blog";
