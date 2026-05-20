import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";

const strengths = [
  {
    title: "Membangun fitur sampai bisa dipakai",
    description:
      "Saya tidak hanya membuat tampilan. Di proyek Laravel, saya ikut menyusun database, autentikasi, role user, dashboard, media, dan alur kerja sampai websitenya siap digunakan.",
  },
  {
    title: "Paham kebutuhan teknis dan operasional",
    description:
      "Pengalaman di administrasi dan IT support membuat saya terbiasa melihat masalah dari sisi pengguna: data harus rapi, proses harus jelas, dan dokumentasi harus mudah diikuti.",
  },
  {
    title: "Terbiasa mengelola website aktif",
    description:
      "Saya pernah mengelola platform berbasis WordPress dengan konten rutin, upload gambar, struktur kategori, dan maintenance dasar. Jadi saya memahami website setelah live, bukan hanya saat dibuat.",
  },
  {
    title: "Siap untuk tim kecil maupun posisi junior",
    description:
      "Saya cocok untuk peran Web Developer junior, PHP/Laravel Developer junior, WordPress Developer, atau IT Support yang membutuhkan orang teknis yang teliti dan mau belajar cepat.",
  },
];

const portfolioNotes = [
  {
    question: "Apa yang bisa dinilai rekruter dari portofolio ini?",
    answer:
      "Rekruter bisa melihat stack yang saya kuasai, jenis proyek yang pernah saya kerjakan, cara saya menjelaskan pengalaman, dan area kerja yang paling relevan untuk posisi junior developer atau IT support.",
  },
  {
    question: "Kenapa proyeknya relevan untuk perusahaan?",
    answer:
      "Proyek yang ditampilkan dekat dengan kebutuhan nyata: company profile, dashboard admin, pengelolaan konten, integrasi API, database, dan support operasional. Ini bukan sekadar latihan UI.",
  },
  {
    question: "Apa efek section ini untuk pengunjung?",
    answer:
      "Pengunjung tidak perlu menebak saya bisa membantu di bagian apa. HRD bisa cepat menilai kecocokan, sedangkan calon klien atau kolaborator bisa memahami jenis masalah yang pernah saya tangani.",
  },
];

export function SeoContentSection() {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeader
            label="Nilai yang Saya Bawa"
            title="Portofolio ini menunjukkan cara saya bekerja, bukan hanya daftar teknologi."
            description="Target utamanya adalah HRD, rekruter, dan tim yang ingin menilai kecocokan saya sebagai Web Developer junior, PHP/Laravel Developer junior, WordPress Developer, atau IT Support."
          />
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {strengths.map((strength, index) => (
            <FadeIn key={strength.title} delay={index * 0.08}>
              <article className="surface-card h-full rounded-[2rem] p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                  {strength.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {strength.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.16}>
          <div className="mt-8 rounded-[2rem] border border-border bg-card/70 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Cara membaca portofolio ini
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {portfolioNotes.map((note) => (
                <div key={note.question}>
                  <h3 className="text-base font-semibold text-foreground">{note.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{note.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
