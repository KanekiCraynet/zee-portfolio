import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

export const metadata: Metadata = {
  title: "404 | Halaman Tidak Ditemukan",
  description: "Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="text-center">
          <p className="text-8xl font-bold gradient-text mb-6">404</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Page not found
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
