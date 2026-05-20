import { config, collection, singleton, fields } from "@keystatic/core";

const techOptions = [
  { label: "TypeScript", value: "TypeScript" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "React", value: "React" },
  { label: "Next.js", value: "Next.js" },
  { label: "Tailwind CSS", value: "Tailwind CSS" },
  { label: "Node.js", value: "Node.js" },
  { label: "PHP / Laravel", value: "PHP / Laravel" },
  { label: "Ruby on Rails", value: "Ruby on Rails" },
  { label: "Python / Django", value: "Python / Django" },
  { label: "PostgreSQL", value: "PostgreSQL" },
  { label: "MySQL", value: "MySQL" },
  { label: "SQLite", value: "SQLite" },
  { label: "Prisma", value: "Prisma" },
  { label: "Supabase", value: "Supabase" },
  { label: "Redis", value: "Redis" },
  { label: "Docker", value: "Docker" },
  { label: "AWS", value: "AWS" },
  { label: "Vercel", value: "Vercel" },
  { label: "Stripe", value: "Stripe" },
  { label: "GraphQL", value: "GraphQL" },
  { label: "REST APIs", value: "REST APIs" },
  { label: "Socket.io", value: "Socket.io" },
  { label: "D3.js", value: "D3.js" },
  { label: "FastAPI", value: "FastAPI" },
  { label: "WebRTC", value: "WebRTC" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "Heroku", value: "Heroku" },
  { label: "MDX", value: "MDX" },
  { label: "HTML/CSS", value: "HTML/CSS" },
  { label: "Framer Motion", value: "Framer Motion" },
  { label: "Nginx", value: "Nginx" },
  { label: "CI/CD", value: "CI/CD" },
  { label: "Git & GitHub", value: "Git & GitHub" },
  { label: "Linux/Ubuntu", value: "Linux/Ubuntu" },
];

const blogTagOptions = [
  { label: "Next.js", value: "Next.js" },
  { label: "React", value: "React" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "CSS", value: "CSS" },
  { label: "Tailwind CSS", value: "Tailwind CSS" },
  { label: "Tutorial", value: "Tutorial" },
  { label: "Best Practices", value: "Best Practices" },
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
  { label: "DevOps", value: "DevOps" },
  { label: "Performance", value: "Performance" },
  { label: "Open Source", value: "Open Source" },
];

export default config({
  storage:
    process.env.NODE_ENV === "production"
      ? {
          kind: "github",
          repo: {
            owner: process.env.NEXT_PUBLIC_GITHUB_OWNER ?? "zee",
            name: process.env.NEXT_PUBLIC_GITHUB_REPO ?? "zee-portfolio",
          },
        }
      : { kind: "local" },

  ui: {
    brand: { name: "Zee Portfolio CMS" },
    navigation: {
      Site: ["siteConfig", "skills"],
      Content: ["projects", "experience", "testimonials"],
      Blog: ["blog"],
    },
  },

  // ── Singletons ─────────────────────────────────────────────
  singletons: {
    siteConfig: singleton({
      label: "Site Configuration",
      path: "content/site-config",
      format: "json",
      schema: {
        name: fields.text({ label: "Your Name", defaultValue: "Zee" }),
        role: fields.text({
          label: "Job Title",
          defaultValue: "Full-Stack Developer",
        }),
        bio: fields.text({
          label: "Short Bio (shown in Hero section)",
          multiline: true,
          defaultValue: "",
        }),
        longBio: fields.text({
          label: "Full Bio (shown in About section)",
          multiline: true,
          defaultValue: "",
        }),
        email: fields.text({ label: "Email Address" }),
        location: fields.text({ label: "Location", defaultValue: "Indonesia" }),
        availability: fields.text({
          label: "Availability Status",
          defaultValue: "Open to opportunities",
        }),
        languages: fields.text({
          label: "Languages spoken",
          defaultValue: "English, Bahasa Indonesia",
        }),
        avatarUrl: fields.url({ label: "Profile Photo URL (absolute)" }),
        resumeUrl: fields.url({ label: "Resume / CV URL (absolute or /resume.pdf)" }),
        githubUrl: fields.url({ label: "GitHub Profile URL" }),
        linkedinUrl: fields.url({ label: "LinkedIn Profile URL" }),
        instagramUrl: fields.url({ label: "Instagram Profile URL" }),
        statsProjects: fields.text({
          label: "Projects count (e.g. 20+)",
          defaultValue: "20+",
        }),
        statsYears: fields.text({
          label: "Years of experience (e.g. 4+)",
          defaultValue: "4+",
        }),
        statsSkills: fields.text({
          label: "Skills count (e.g. 15+)",
          defaultValue: "15+",
        }),
      },
    }),

    skills: singleton({
      label: "Skills",
      path: "content/skills",
      format: "json",
      schema: {
        categories: fields.array(
          fields.object({
            category: fields.text({ label: "Category Name" }),
            iconKey: fields.text({
              label: "Category Icon (e.g. SiReact)",
              defaultValue: "",
            }),
            skills: fields.array(
              fields.object({
                name: fields.text({ label: "Skill Name" }),
                iconKey: fields.text({
                  label: "Icon Key from react-icons/si (e.g. SiTypescript)",
                  defaultValue: "",
                }),
              }),
              {
                label: "Skills",
                itemLabel: (props) => props.fields.name.value || "Skill",
              }
            ),
          }),
          {
            label: "Skill Categories",
            itemLabel: (props) => props.fields.category.value || "Category",
          }
        ),
      },
    }),
  },

  // ── Collections ─────────────────────────────────────────────
  collections: {
    projects: collection({
      label: "Projects",
      path: "content/projects/*",
      format: "json",
      slugField: "title",
      schema: {
        title: fields.slug({ name: { label: "Project Title" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { length: { min: 10, max: 300 } },
        }),
        tags: fields.multiselect({
          label: "Tech Stack",
          options: techOptions,
        }),
        liveUrl: fields.url({ label: "Live URL" }),
        githubUrl: fields.url({ label: "GitHub URL" }),
        featured: fields.checkbox({
          label: "Featured on homepage",
          defaultValue: false,
        }),
        coverImageUrl: fields.url({
          label: "Cover Image URL",
        }),
        coverColor: fields.select({
          label: "Cover Accent Color",
          description: "Used when no cover image is provided",
          options: [
            { label: "Indigo", value: "indigo" },
            { label: "Violet", value: "violet" },
            { label: "Sky", value: "sky" },
            { label: "Emerald", value: "emerald" },
            { label: "Rose", value: "rose" },
            { label: "Amber", value: "amber" },
          ],
          defaultValue: "indigo",
        }),
        sortOrder: fields.integer({
          label: "Sort Order (lower = shown first)",
          defaultValue: 99,
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
          ],
          defaultValue: "published",
        }),
      },
    }),

    experience: collection({
      label: "Experience",
      path: "content/experience/*",
      format: "json",
      slugField: "company",
      schema: {
        company: fields.slug({ name: { label: "Company Name" } }),
        role: fields.text({ label: "Job Title / Role" }),
        period: fields.text({
          label: "Period (e.g. 2022 — 2024)",
          description: "Use em dash (—) for date range",
        }),
        description: fields.text({
          label: "Role Description",
          multiline: true,
        }),
        technologies: fields.multiselect({
          label: "Technologies Used",
          options: techOptions,
        }),
        sortOrder: fields.integer({
          label: "Sort Order (lower = shown first / most recent)",
          defaultValue: 99,
        }),
      },
    }),

    testimonials: collection({
      label: "Testimonials",
      path: "content/testimonials/*",
      format: "json",
      slugField: "name",
      schema: {
        name: fields.slug({ name: { label: "Full Name" } }),
        role: fields.text({ label: "Job Title" }),
        company: fields.text({ label: "Company / Organization" }),
        content: fields.text({
          label: "Testimonial Text",
          multiline: true,
          validation: { length: { min: 20, max: 500 } },
        }),
        avatarUrl: fields.url({ label: "Avatar Image URL (optional)" }),
        show: fields.checkbox({
          label: "Show on website",
          defaultValue: true,
        }),
      },
    }),

    blog: collection({
      label: "Blog Posts",
      path: "content/blog/*",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Post Title" } }),
        excerpt: fields.text({
          label: "Excerpt / Summary",
          multiline: true,
          validation: { length: { min: 20, max: 300 } },
        }),
        date: fields.date({ label: "Publish Date" }),
        tags: fields.multiselect({
          label: "Tags",
          options: blogTagOptions,
        }),
        published: fields.checkbox({
          label: "Published",
          defaultValue: false,
        }),
        coverImageUrl: fields.url({ label: "Cover Image URL (optional)" }),
        content: fields.document({
          label: "Content",
          formatting: {
            inlineMarks: {
              bold: true,
              italic: true,
              strikethrough: true,
              code: true,
            },
            listTypes: { ordered: true, unordered: true },
            headingLevels: [2, 3, 4],
            blockTypes: { blockquote: true, code: true },
            softBreaks: true,
          },
          dividers: true,
          links: true,
          images: {
            directory: "public/images/blog",
            publicPath: "/images/blog/",
            schema: {
              alt: fields.text({ label: "Alt Text" }),
            },
          },
        }),
      },
    }),
  },
});
