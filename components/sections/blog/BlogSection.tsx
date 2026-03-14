"use client";

import { fadeIn, fadeUp, VIEWPORT } from "@/components/animations/variants";
import { BLOG_POSTS } from "@/lib/constants";
import { motion } from "framer-motion";
import BlogGrid from "./BlogGrid";
import BlogNewsletter from "./BlogNewsletter";
import FeaturedPost from "./FeaturedPost";

// ─── BlogSection ──────────────────────────────────────────────────────────────
export default function BlogSection() {
  const featured = BLOG_POSTS.find((p) => p.featured)!;

  return (
    <div
      id="blog"
      aria-label="Blog posts"
      style={{
        background: "var(--bg)", // #07080f
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        zIndex: 2,
      }}
    >
      {/*
       * Background layers — all rgba values use (7,8,15) for --bg.
       * Radial positions differ from AboutSection so sections feel distinct.
       * Accent hues: indigo (99,102,241) + cyan (0,229,255) only.
       */}

      {/* Layer 1 — accent radial glows, positioned right-bottom + far left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: [
            "radial-gradient(55% 40% at 92% 10%,  rgba(99,102,241,0.11) 0%, rgba(99,102,241,0) 70%)",
            "radial-gradient(45% 35% at 6%  88%,  rgba(0,229,255,0.05)  0%, rgba(0,229,255,0)  72%)",
            "radial-gradient(100% 55% at 50% 108%, rgba(7,8,15,1)        0%, rgba(7,8,15,0)    52%)",
          ].join(", "),
        }}
      />

      {/* Layer 2 — crosshatch grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: [
            "repeating-linear-gradient(  0deg, rgba(129,140,248,0.012) 0px, rgba(129,140,248,0.012) 1px, transparent 1px, transparent 28px)",
            "repeating-linear-gradient( 90deg, rgba(129,140,248,0.006) 0px, rgba(129,140,248,0.006) 1px, transparent 1px, transparent 28px)",
          ].join(", "),
        }}
      />

      {/* Layer 3 — top fade from previous section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "140px",
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(7,8,15,0.92), rgba(7,8,15,0))",
        }}
      />

      {/* Layer 4 — bottom fade into next section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(7,8,15,0), rgba(7,8,15,0.88))",
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "clamp(72px,9vw,120px) clamp(1.5rem,5vw,4rem)",
        }}
      >
        {/* Top separator line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "clamp(1.5rem,5vw,4rem)",
            right: "clamp(1.5rem,5vw,4rem)",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.18), transparent)",
          }}
        />

        {/* ── Section header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
            marginBottom: "clamp(40px,5.5vw,60px)",
          }}
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-[10px] mb-[14px]">
              <div
                className="h-px w-8 shrink-0"
                style={{
                  background:
                    "linear-gradient(to right, var(--accent), transparent)",
                }}
              />
              <span
                className="font-mono text-[9px] tracking-[.14em] uppercase"
                style={{ color: "var(--accent-light)" }}
              >
                Writing
              </span>
            </div>

            <h2
              className="font-display mb-[10px]"
              style={{
                fontSize: "clamp(1.8rem,4.5vw,3rem)",
                letterSpacing: "-.01em",
                lineHeight: 1,
              }}
            >
              LATEST POSTS
            </h2>
            <p
              className="font-mono text-[clamp(10px,1.2vw,12px)] tracking-[.06em] uppercase"
              style={{ color: "rgba(255,255,255,.22)" }}
            >
              Thoughts on code, architecture, and shipping
            </p>
          </motion.div>

          {/* Post count + all posts link */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-[14px]"
          >
            <span
              className="font-mono text-[10px] tracking-[.06em]"
              style={{ color: "rgba(255,255,255,.2)" }}
              aria-label={`${BLOG_POSTS.length} posts published`}
            >
              {BLOG_POSTS.length} posts
            </span>
            <a
              href="#"
              className="font-mono text-[10px] tracking-[.1em] uppercase no-underline"
              style={{
                color: "var(--accent-light)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "5px",
                padding: "8px 14px",
                background: "rgba(99,102,241,0.06)",
                whiteSpace: "nowrap",
              }}
              aria-label="View all blog posts"
            >
              All posts ↗
            </a>
          </motion.div>
        </div>

        {/* ── Featured post ── */}
        <div style={{ marginBottom: "clamp(32px,4vw,48px)" }}>
          <FeaturedPost post={featured} />
        </div>

        {/* ── Divider ── */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.14), transparent)",
            marginBottom: "clamp(32px,4vw,48px)",
          }}
        />

        {/* ── Grid: remaining posts ── */}
        <div style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
          <BlogGrid />
        </div>

        {/* ── Newsletter CTA ── */}
        <BlogNewsletter />
      </div>
    </div>
  );
}
