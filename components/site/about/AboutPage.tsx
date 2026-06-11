"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import theme from "@/config/theme.config";
import { SITE } from "@/config/site.config";

const c = theme.accent.primary;

const stack = [
  "Node.js",
  "TypeScript",
  "React",
  "Next.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "REST APIs",
  "System Design",
  "AI Workflows",
  "Cloud Deployments",
];

const workModes = [
  {
    title: "Backend Architecture",
    body: "Designing APIs, data models, authentication, queues, file workflows, and service boundaries that can be understood later.",
  },
  {
    title: "Product Engineering",
    body: "Turning a business goal into screens, workflows, constraints, releases, and maintainable implementation decisions.",
  },
  {
    title: "Technical Consulting",
    body: "Helping founders and teams clarify what to build, what to skip, how to phase scope, and what risks need attention.",
  },
];

const timeline = [
  {
    label: "Identity",
    title: "Bhupesh Kumar / BhupeshB7",
    body: "A personal engineering brand focused on practical software, backend depth, and clear project communication.",
  },
  {
    label: "Focus",
    title: "Backend-heavy full-stack systems",
    body: "Web applications, SaaS MVPs, APIs, dashboards, AI workflows, and internal tools for real business use cases.",
  },
  {
    label: "Approach",
    title: "Clarity before code",
    body: "I prefer understanding users, workflows, budget, timeline, and constraints before choosing architecture.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden" style={{ background: theme.bg.base, color: theme.text.primary }}>
      <section className="relative min-h-screen overflow-hidden pt-32 pb-20 lg:pt-40">
        <AboutBackground />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p
              className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: theme.accent.text, fontFamily: "'DM Mono', monospace" }}
            >
              About BhupeshB7
            </p>
            <h1
              className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[76px]"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              I build software where backend decisions shape the product.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed" style={{ color: theme.text.secondary }}>
              I am {SITE.legalName}, also known as {SITE.name}. I work on
              backend systems, MERN applications, SaaS MVPs, APIs, AI-assisted
              workflows, and internal business tools with a bias toward clarity,
              reliability, and practical shipping.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/project"
                className="rounded-xl px-5 py-3 text-sm font-semibold"
                style={{ background: c, color: theme.accent.primaryForeground }}
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="rounded-xl px-5 py-3 text-sm font-semibold"
                style={{
                  background: theme.surface[1],
                  color: theme.text.primary,
                  border: `1px solid ${theme.border.soft}`,
                }}
              >
                Reach Out
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative rounded-2xl p-6"
            style={{
              background: `${theme.surface[0]}dd`,
              border: `1px solid ${theme.border.soft}`,
              boxShadow: "0 30px 110px rgba(0,0,0,0.48)",
            }}
          >
            <div
              className="absolute inset-x-8 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }}
            />
            <p
              className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: theme.text.muted, fontFamily: "'DM Mono', monospace" }}
            >
              Engineering Profile
            </p>
            <div className="grid gap-4">
              {timeline.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.1, duration: 0.45 }}
                  className="rounded-xl p-4"
                  style={{
                    background: theme.surface[1],
                    border: `1px solid ${theme.border.soft}`,
                  }}
                >
                  <p
                    className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: c, fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.label}
                  </p>
                  <h2 className="text-lg font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: theme.text.secondary }}>
                    {item.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="mb-10 max-w-3xl"
          >
            <p
              className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: theme.accent.text, fontFamily: "'DM Mono', monospace" }}
            >
              What I care about
            </p>
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl" style={{ fontFamily: "Syne, sans-serif" }}>
              Useful systems are built from good constraints, not just good code.
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {workModes.map((mode, index) => (
              <motion.article
                key={mode.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl p-6"
                style={{
                  background: theme.surface[1],
                  border: `1px solid ${theme.border.soft}`,
                }}
              >
                <div
                  className="mb-5 h-10 w-10 rounded-xl"
                  style={{
                    background: theme.accent.tintStrong,
                    border: `1px solid ${theme.accent.border}`,
                  }}
                />
                <h3 className="mb-3 text-xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
                  {mode.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: theme.text.secondary }}>
                  {mode.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p
              className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: theme.text.muted, fontFamily: "'DM Mono', monospace" }}
            >
              Stack and domains
            </p>
            <h2 className="text-4xl font-bold leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>
              The tools change. The core stays: data, workflows, reliability.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {stack.map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.025 }}
                className="rounded-xl px-4 py-3 text-sm font-semibold"
                style={{
                  background: theme.surface[1],
                  border: `1px solid ${theme.border.soft}`,
                  color: theme.text.secondary,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function AboutBackground() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 72% 48% at 45% 0%, ${theme.accent.glow}, transparent 72%)`,
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <path d="M120 650C260 470 390 405 555 445C730 487 795 270 1050 210" stroke={`${c}22`} strokeWidth="1.2" />
        <path d="M-80 330C180 360 320 280 480 150C650 12 845 80 1280 40" stroke={`${c}12`} strokeWidth="1" />
        <circle cx="555" cy="445" r="140" stroke={`${c}10`} />
        <circle cx="555" cy="445" r="260" stroke={`${c}07`} />
        <circle cx="555" cy="445" r="5" fill={c} />
        <circle cx="1050" cy="210" r="6" fill={c} />
      </svg>
    </>
  );
}
