import Link from "next/link";
import theme from "@/config/theme.config";
import { SITE } from "@/config/site.config";

type LegalPageProps = {
  title: string;
  intro: string;
  sections: Array<{
    id?: string;
    title: string;
    body: string;
  }>;
};

export default function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <main style={{ background: theme.bg.base, color: theme.text.primary }}>
      <section className="mx-auto w-full max-w-4xl px-6 pt-32 pb-24 lg:pt-40">
        <p
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: theme.accent.text, fontFamily: "'DM Mono', monospace" }}
        >
          {SITE.name}
        </p>
        <h1
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {title}
        </h1>
        <p className="mt-5 text-base leading-relaxed" style={{ color: theme.text.secondary }}>
          {intro}
        </p>
        <div className="mt-12 grid gap-6">
          {sections.map((section) => (
            <section
              key={section.title}
              id={section.id}
              className="rounded-2xl p-6"
              style={{
                background: theme.surface[1],
                border: `1px solid ${theme.border.soft}`,
              }}
            >
              <h2 className="mb-3 text-xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: theme.text.secondary }}>
                {section.body}
              </p>
            </section>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex rounded-xl px-5 py-3 text-sm font-semibold"
            style={{
              background: theme.accent.primary,
              color: theme.accent.primaryForeground,
            }}
          >
            Contact {SITE.legalName}
          </Link>
        </div>
      </section>
    </main>
  );
}
