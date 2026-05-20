import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dzakri Phalosa Nugroho — Web Developer",
    short_name: "Dzakri",
    description:
      "Portofolio Web Developer, administrasi, dan IT Support — Laravel, WordPress, CodeIgniter, dan operasional IT.",
    start_url: "/",
    display: "standalone",
    background_color: "#0C0C14",
    theme_color: "#4F46E5",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
