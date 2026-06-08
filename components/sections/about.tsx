import { SectionHeader } from "@/components/ui/section-header";
import { MapPin, Mail, Briefcase, Languages, GraduationCap, Calendar } from "lucide-react";
import type { SiteConfig } from "@/lib/content";

interface AboutSectionProps { config: SiteConfig; }

export function AboutSection({ config }: AboutSectionProps) {
  const infoItems = [
    { icon: MapPin, label: "Lokasi", value: config.location },
    { icon: Mail, label: "Email", value: config.email },
    { icon: Briefcase, label: "Status", value: config.availability },
    { icon: Languages, label: "Bahasa", value: config.languages },
  ];

  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              label="Tentang Saya"
              title="Pengembang web yang memahami kebutuhan teknis dan operasional"
            />
          </div>

          <div className="lg:col-span-7">
            <div className="surface-card rounded-3xl p-8">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {config.longBio}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 p-5 transition-all hover:border-accent/40 hover:bg-card/70"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform group-hover:scale-110">
                        <item.icon className="h-4 w-4" strokeWidth={2.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="break-words text-sm font-medium leading-relaxed text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card to-muted/30 shadow-lg">
          <div className="p-8 sm:p-10">
            <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent shadow-lg shadow-accent/10">
                <GraduationCap className="h-7 w-7" strokeWidth={2} />
              </div>

              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    <Calendar className="h-3 w-3" />
                    Expected 2026
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Pendidikan
                  </span>
                </div>

                <h3 className="text-2xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-3xl">
                  S1 Teknik Informatika
                </h3>
                <p className="mt-2 text-base font-medium text-muted-foreground">
                  Universitas Muhammadiyah Kendal Batang
                </p>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Mahasiswa tingkat akhir dengan fokus pada pengembangan web, basis data, analisis sistem,
                  dan administrasi jaringan. Berpengalaman membangun aplikasi berbasis Laravel, WordPress,
                  dan CodeIgniter dengan standar produksi.
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {["Web Development", "Database Design", "System Analysis", "Network Administration"].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border/70 bg-background/80 px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
