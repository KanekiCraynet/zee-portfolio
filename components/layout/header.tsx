"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "#about", label: "Tentang" },
  { href: "#projects", label: "Portofolio" },
  { href: "#skills", label: "Keahlian" },
  { href: "#experience", label: "Pengalaman" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Kontak" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.filter((l) => l.href.startsWith("#")).map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-3 sm:px-6">
      <nav
        className={cn(
          "mx-auto max-w-6xl rounded-full border px-3 transition-all duration-300",
          isScrolled
            ? "border-border/80 bg-background/78 shadow-lg shadow-foreground/5 backdrop-blur-xl"
            : "border-transparent bg-background/30 backdrop-blur-sm"
        )}
      >
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 rounded-full pr-3 text-sm font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover:rotate-6">
              Z
            </span>
            <span>Dzakri</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith("#") && activeSection === link.href.slice(1);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                    isActive ? "text-foreground" : "text-muted-foreground hover:bg-card/70 hover:text-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-card shadow-sm"
                      transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
            <div className="ml-1"><ThemeToggle /></div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 transition-colors hover:bg-accent/20"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="grid gap-1 border-t border-border/60 py-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
