"use client";

import { listItem } from "@/components/animations/variants";
import type { BlogPost } from "@/lib/constants";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useState } from "react";

export default function BlogPostCard({ post }: { post: BlogPost }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.article variants={listItem}>
      <a
        href={post.url}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          textDecoration: "none",
          borderRadius: "14px",
          overflow: "hidden",
          background: hov
            ? "rgba(255,255,255,0.024)"
            : "rgba(255,255,255,0.016)",
          border: `1px solid ${hov ? `${post.coverAccent}28` : "rgba(99,102,241,0.12)"}`,
          transition: "border-color .25s, background .25s",
          position: "relative",
        }}
        aria-label={post.title}
      >
        {/* ── Hover reading progress bar on top ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, ${post.coverAccent}, ${post.coverAccent}44, transparent)`,
            opacity: hov ? 1 : 0,
            transition: "opacity .25s",
            zIndex: 1,
          }}
        />

        {/* ── Mini cover strip ── */}
        <div
          aria-hidden="true"
          style={{
            height: "80px",
            position: "relative",
            overflow: "hidden",
            background: `
              radial-gradient(ellipse at 20% 50%, ${post.coverAccent}20 0%, transparent 65%),
              radial-gradient(ellipse at 85% 30%, ${post.coverAccent}0c 0%, transparent 55%),
              rgba(7,8,15,0.6)
            `,
            flexShrink: 0,
          }}
        >
          {/* Grid texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(90deg, rgba(129,140,248,0.03) 0px, rgba(129,140,248,0.03) 1px, transparent 1px, transparent 28px)",
            }}
          />
          {/* Category watermark */}
          <span
            style={{
              position: "absolute",
              right: "16px",
              bottom: "10px",
              fontFamily: "'Anton', 'Impact', sans-serif",
              fontSize: "2.2rem",
              color: `${post.coverAccent}18`,
              letterSpacing: "-.02em",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            {post.category.toUpperCase()}
          </span>
          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40px",
              background:
                "linear-gradient(to bottom, transparent, rgba(7,8,15,0.7))",
            }}
          />
        </div>

        {/* ── Content ── */}
        <div
          style={{
            padding: "clamp(18px,2.2vw,24px)",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "12px",
          }}
        >
          {/* Category + read time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <span
              className="font-mono text-[9px] tracking-[.1em] uppercase"
              style={{
                color: post.coverAccent,
                background: `${post.coverAccent}10`,
                border: `1px solid ${post.coverAccent}20`,
                borderRadius: "3px",
                padding: "2px 7px",
              }}
            >
              {post.category}
            </span>
            <span
              className="font-mono text-[9px] tracking-[.05em]"
              style={{ color: "rgba(255,255,255,.2)" }}
            >
              {post.readTime} read
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-display"
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              letterSpacing: "-.005em",
              lineHeight: 1.25,
              color: hov ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.75)",
              transition: "color .2s",
            }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className="font-mono"
            style={{
              fontSize: "11px",
              lineHeight: 1.85,
              color: "rgba(255,255,255,.35)",
              letterSpacing: ".01em",
              flex: 1,
            }}
          >
            {post.excerpt}
          </p>

          {/* Tags */}
          <ul
            style={{
              display: "flex",
              gap: "5px",
              flexWrap: "wrap",
              listStyle: "none",
            }}
            aria-label="Tags"
          >
            {post.tags.map((tag) => (
              <li key={tag}>
                <span
                  className="font-mono text-[8px] tracking-[.08em] uppercase"
                  style={{
                    color: `${post.coverAccent}88`,
                    border: `1px solid ${post.coverAccent}18`,
                    borderRadius: "3px",
                    padding: "2px 6px",
                    background: `${post.coverAccent}06`,
                  }}
                >
                  {tag}
                </span>
              </li>
            ))}
          </ul>

          {/* Footer: date + views + read link */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "12px",
              borderTop: "1px solid rgba(255,255,255,.05)",
            }}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <time
                className="font-mono text-[9px] tracking-[.05em]"
                style={{ color: "rgba(255,255,255,.2)" }}
                dateTime={post.date}
              >
                {post.date}
              </time>
              <span
                className="font-mono text-[9px] tracking-[.05em] inline-flex items-center gap-[4px]"
                style={{ color: "rgba(255,255,255,.2)" }}
                aria-label={`${post.views} views`}
              >
                <Eye size={10} strokeWidth={1.8} aria-hidden="true" />
                {post.views}
              </span>
            </div>

            <span
              className="font-mono text-[9px] tracking-[.08em] uppercase"
              style={{
                color: hov ? post.coverAccent : "rgba(255,255,255,.2)",
                transition: "color .2s",
              }}
              aria-hidden="true"
            >
              Read →
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
