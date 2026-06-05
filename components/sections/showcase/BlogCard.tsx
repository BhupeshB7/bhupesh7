"use client";

import { listItem } from "@/components/animations/variants";
import type { BLOGS } from "@/lib/constants";
import { motion } from "framer-motion";
import { useState } from "react";

type Post = (typeof BLOGS)[number];

export default function BlogCard({ post }: { post: Post }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.a
      href={post.url}
      variants={listItem}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: hov ? "rgba(255,255,255,.022)" : "rgba(255,255,255,.014)",
        border: `1px solid ${hov ? "rgba(99,102,241,.22)" : "rgba(99,102,241,.1)"}`,
        borderRadius: "12px",
        padding: "clamp(18px,2.5vw,26px)",
        transition: "border-color .25s, background .25s",
      }}
      aria-label={post.title}
    >
      {/* Tags */}
      <ul
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "10px",
          flexWrap: "wrap",
          listStyle: "none",
        }}
        aria-label="Post tags"
      >
        {post.tags.map((tag) => (
          <li key={tag}>
            <span
              className="font-mono text-[8px] tracking-[.1em] uppercase"
              style={{
                color: "color-mix(in srgb, var(--accent-light) 60%, white)",
                border: "1px solid rgba(99,102,241,.12)",
                borderRadius: "3px",
                padding: "2px 6px",
                background: "rgba(99,102,241,.05)",
              }}
            >
              {tag}
            </span>
          </li>
        ))}
      </ul>

      {/* Title */}
      <h3
        className="font-display text-[clamp(14px,1.5vw,17px)] leading-[1.3] mb-[10px]"
        style={{
          color: hov ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.75)",
          transition: "color .2s",
          letterSpacing: ".01em",
        }}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p
        className="font-mono text-[11px] leading-[1.8] tracking-[.01em] mb-[16px]"
        style={{ color: "rgba(255,255,255,.32)" }}
      >
        {post.excerpt}
      </p>

      {/* Meta */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "14px" }}>
          <time
            className="font-mono text-[9px] tracking-[.06em]"
            style={{ color: "rgba(255,255,255,.2)" }}
          >
            {post.date}
          </time>
          <span
            className="font-mono text-[9px] tracking-[.06em]"
            style={{ color: "rgba(255,255,255,.2)" }}
          >
            {post.readTime} read
          </span>
        </div>
        <span
          className="font-mono text-[9px] tracking-[.06em]"
          style={{
            color: hov ? "var(--accent-light)" : "rgba(255,255,255,.2)",
            transition: "color .2s",
          }}
          aria-hidden="true"
        >
          read →
        </span>
      </div>
    </motion.a>
  );
}
