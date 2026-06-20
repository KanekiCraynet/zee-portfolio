import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { ExperienceSection } from "@/components/sections/experience";
import { ContactSection } from "@/components/sections/contact";
import { SeoContentSection } from "@/components/sections/seo-content";
import {
  getSiteConfig,
  getProjects,
  getSkillCategories,
  getExperiences,
} from "@/lib/content";
import {
  buildFaqJsonLd,
  buildPersonJsonLd,
  buildProjectItemListJsonLd,
  buildServiceJsonLd,
  buildWebsiteJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo";

export default async function Home() {
  const [config, projects, skillCategories, experiences] = await Promise.all([
    getSiteConfig(),
    getProjects(),
    getSkillCategories(),
    getExperiences(),
  ]);

  const featuredProjects = projects.filter((project) => project.featured);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebsiteJsonLd(),
      buildWebPageJsonLd(),
      buildPersonJsonLd(config),
      buildServiceJsonLd(),
      buildProjectItemListJsonLd(featuredProjects),
      buildFaqJsonLd(),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection config={config} />
      <AboutSection config={config} />
      <ProjectsSection projects={featuredProjects} />
      <SkillsSection categories={skillCategories} />
      <ExperienceSection experiences={experiences} />
      <SeoContentSection />
      <ContactSection config={config} />
    </>
  );
}
