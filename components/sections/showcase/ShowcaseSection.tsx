"use client";

import {
  fadeIn,
  fadeUp,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import SectionHeader from "@/components/ui/SectionHeader";
import { BLOGS, HIGHLIGHTS, PROJECTS } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BlogCard from "./BlogCard";
import HighlightCard from "./HighlightCard";
import ProjectCard from "./ProjectCard";

// ─── Shared section row header (with right-side CTA link) ─────────────────────
function RowHeader({
  eyebrow,
  title,
  sub,
  ctaLabel,
  ctaHref,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "24px",
        flexWrap: "wrap",
        marginBottom: "clamp(36px,5vw,56px)",
      }}
    >
      <SectionHeader eyebrow={eyebrow} title={title} sub={sub} />

      <motion.a
        href={ctaHref}
        target={ctaHref.startsWith("http") ? "_blank" : undefined}
        rel={ctaHref.startsWith("http") ? "noreferrer" : undefined}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        transition={{ delay: 0.3 }}
        className="font-mono text-[10px] tracking-[.1em] uppercase no-underline"
        style={{
          color: "var(--accent-light)",
          border: "1px solid rgba(99,102,241,.2)",
          borderRadius: "5px",
          padding: "8px 14px",
          background: "rgba(99,102,241,.06)",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        <span className="inline-flex items-center gap-[5px]">
          {ctaLabel}
          <ArrowUpRight size={10} strokeWidth={1.8} />
        </span>
      </motion.a>
    </div>
  );
}

// ─── ShowcaseSection ──────────────────────────────────────────────────────────
export default function ShowcaseSection() {
  return (
    <div
      style={{
        background: "var(--bg)",
        color: "#fff",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* ── Projects ── */}
      <section
        id="projects"
        aria-label="Latest projects"
        style={{
          padding: "clamp(72px,9vw,128px) clamp(1.5rem,5vw,4rem)",
          position: "relative",
        }}
      >
        <div className="section-separator" aria-hidden="true" />

        <RowHeader
          eyebrow="Work"
          title="LATEST PROJECTS"
          sub="Things I've shipped recently"
          ctaLabel="all repos"
          ctaHref="https://github.com/bhupeshb7"
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(14px,2vw,20px)",
          }}
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </motion.div>
      </section>

      {/* ── Blog ── */}
      <section
        id="writing"
        aria-label="Latest blog posts"
        style={{
          padding: "clamp(72px,9vw,128px) clamp(1.5rem,5vw,4rem)",
          position: "relative",
        }}
      >
        <div className="section-separator" aria-hidden="true" />

        <RowHeader
          eyebrow="Writing"
          title="LATEST POSTS"
          sub="Thoughts on code, craft, and shipping"
          ctaLabel="all posts"
          ctaHref="#"
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(14px,2vw,20px)",
          }}
        >
          {BLOGS.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </motion.div>
      </section>

      {/* ── Highlights ── */}
      <section
        id="highlights"
        aria-label="Quick facts"
        style={{ padding: "0 clamp(1.5rem,5vw,4rem) clamp(72px,9vw,128px)" }}
      >
        <SectionHeader
          eyebrow="At a Glance"
          title="QUICK FACTS"
          sub="The numbers behind the work"
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "clamp(12px,1.8vw,16px)",
          }}
        >
          {HIGHLIGHTS.map((item) => (
            <HighlightCard key={item.label} item={item} />
          ))}
        </motion.div>

        {/* CTA banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: "clamp(36px,5vw,56px)",
            padding: "clamp(24px,3vw,36px)",
            background: "rgba(99,102,241,.04)",
            border: "1px solid rgba(99,102,241,.12)",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <h3
              className="font-display text-[clamp(1.2rem,2.2vw,1.6rem)] mb-[8px]"
              style={{ color: "rgba(255,255,255,.85)", letterSpacing: ".01em" }}
            >
              Open to work — let's build something.
            </h3>
            <p
              className="font-mono text-[11px] leading-[1.7] tracking-[.02em]"
              style={{ color: "rgba(255,255,255,.28)" }}
            >
              Looking for freelance projects or full-time roles in frontend
              &amp; full-stack engineering.
            </p>
          </div>

          <a
            href="#contact"
            className="font-mono text-[11px] font-bold tracking-[.12em] uppercase no-underline text-white inline-flex items-center gap-2"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-light))",
              borderRadius: "7px",
              padding: "13px 28px",
              flexShrink: 0,
              boxShadow: "0 4px 20px rgba(99,102,241,.25)",
            }}
          >
            Get in Touch
            <ArrowUpRight size={12} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
