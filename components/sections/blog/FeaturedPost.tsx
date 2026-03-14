"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/components/animations/variants";
import type { BlogPost } from "@/lib/constants";

// ─── Generated cover — no image dependency ────────────────────────────────────
function CoverArt({ accent, title }: { accent: string; title: string }) {
  // Derive a second color for the gradient from the accent
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "260px",
        background: `
          radial-gradient(ellipse at 30% 40%, ${accent}28 0%, transparent 60%),
          radial-gradient(ellipse at 80% 70%, ${accent}12 0%, transparent 55%),
          linear-gradient(135deg, rgba(7,8,15,0.95) 0%, rgba(7,8,15,0.7) 100%)
        `,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: [
            "repeating-linear-gradient(0deg,   rgba(129,140,248,0.04) 0px, rgba(129,140,248,0.04) 1px, transparent 1px, transparent 32px)",
            "repeating-linear-gradient(90deg,  rgba(129,140,248,0.02) 0px, rgba(129,140,248,0.02) 1px, transparent 1px, transparent 32px)",
          ].join(", "),
        }}
      />
      {/* Initials watermark */}
      <span
        style={{
          fontFamily: "'Anton', 'Impact', sans-serif",
          fontSize: "clamp(5rem, 12vw, 9rem)",
          color: `${accent}14`,
          letterSpacing: "-.04em",
          lineHeight: 1,
          userSelect: "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        {initials}
      </span>
      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${accent}, ${accent}44, transparent)`,
        }}
      />
    </div>
  );
}

// ─── FeaturedPost ─────────────────────────────────────────────────────────────
export default function FeaturedPost({ post }: { post: BlogPost }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      aria-label={`Featured post: ${post.title}`}
    >
      {/* Featured label */}
      <div className="flex items-center gap-[10px] mb-[20px]">
        <span
          className="font-mono text-[8px] tracking-[.14em] uppercase inline-flex items-center gap-[6px]"
          style={{
            color: post.coverAccent,
            background: `${post.coverAccent}12`,
            border: `1px solid ${post.coverAccent}28`,
            borderRadius: "4px",
            padding: "3px 9px",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "4px", height: "4px", borderRadius: "50%",
              background: post.coverAccent, display: "inline-block",
              animation: "pulse-glow 2s ease infinite",
            }}
          />
          Featured Post
        </span>
      </div>

      {/* Card */}
      <a
        href={post.url}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          borderRadius: "18px",
          overflow: "hidden",
          border: `1px solid ${hov ? `${post.coverAccent}30` : "rgba(99,102,241,0.14)"}`,
          background: hov ? "rgba(255,255,255,0.022)" : "rgba(255,255,255,0.014)",
          textDecoration: "none",
          transition: "border-color .3s, background .3s",
          position: "relative",
        }}
        aria-label={post.title}
      >
        {/* Top accent bar */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: hov
              ? `linear-gradient(90deg, ${post.coverAccent}, ${post.coverAccent}44, transparent)`
              : `linear-gradient(90deg, ${post.coverAccent}66, transparent)`,
            transition: "background .3s",
            zIndex: 1,
          }}
        />

        {/* ── Left: cover art ── */}
        <div style={{ minHeight: "280px" }}>
          <CoverArt accent={post.coverAccent} title={post.title} />
        </div>

        {/* ── Right: content ── */}
        <div
          style={{
            padding: "clamp(28px,3.5vw,44px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          {/* Top: category + meta */}
          <div>
            <div className="flex items-center gap-[10px] flex-wrap mb-[18px]">
              <span
                className="font-mono text-[9px] tracking-[.1em] uppercase"
                style={{
                  color: post.coverAccent,
                  background: `${post.coverAccent}10`,
                  border: `1px solid ${post.coverAccent}22`,
                  borderRadius: "3px",
                  padding: "2px 8px",
                }}
              >
                {post.category}
              </span>
              <span className="font-mono text-[9px] tracking-[.05em]" style={{ color: "rgba(255,255,255,.2)" }}>
                {post.readTime} read
              </span>
              <span className="font-mono text-[9px] tracking-[.05em]" style={{ color: "rgba(255,255,255,.2)" }}>
                {post.views} views
              </span>
            </div>

            {/* Title */}
            <h3
              className="font-display mb-[14px]"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                letterSpacing: "-.01em",
                lineHeight: 1.15,
                color: hov ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.82)",
                transition: "color .2s",
              }}
            >
              {post.title}
            </h3>

            {/* Excerpt */}
            <p
              className="font-mono mb-[16px]"
              style={{
                fontSize: "clamp(11px,1.2vw,12px)",
                lineHeight: 1.9,
                color: "rgba(255,255,255,.38)",
                letterSpacing: ".015em",
              }}
            >
              {post.excerpt}
            </p>

            {/* Tags */}
            <ul style={{ display: "flex", gap: "6px", flexWrap: "wrap", listStyle: "none" }} aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <span className="tag-pill">{tag}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom: date + read CTA */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <time
              className="font-mono text-[10px] tracking-[.06em]"
              style={{ color: "rgba(255,255,255,.22)" }}
              dateTime={post.date}
            >
              {post.date}
            </time>
            <span
              className="font-mono text-[10px] tracking-[.1em] uppercase inline-flex items-center gap-[7px]"
              style={{
                color: hov ? post.coverAccent : "rgba(255,255,255,.3)",
                transition: "color .2s",
              }}
              aria-hidden="true"
            >
              Read post
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
