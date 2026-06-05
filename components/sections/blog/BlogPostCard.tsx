"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Blog } from "@/types/blog";

function getAccentColor(category: string): string {
  const colors: Record<string, string> = {
    technology: "#8b5cf6",
    lifestyle: "#ec489a",
    finance: "#10b981",
    health: "#ef4444",
    education: "#f59e0b",
    frontend: "#06b6d4",
    backend: "#6b7280",
    database: "#14b8a6",
    ai: "#a855f7",
    fullstack: "#f97316",
    optimization: "#84cc16",
    interview: "#6366f1",
  };
  return colors[category] || "#6366f1";
}

function getInitials(title: string): string {
  return title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function CoverArt({ accent, title, imageUrl }: { accent: string; title: string; imageUrl?: string | null }) {
  const initials = getInitials(title);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "80px",
        background: `
          radial-gradient(ellipse at 20% 50%, ${accent}20 0%, transparent 65%),
          radial-gradient(ellipse at 85% 30%, ${accent}0c 0%, transparent 55%),
          rgba(7,8,15,0.6)
        `,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.65,
            zIndex: 0,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: [
            "repeating-linear-gradient(90deg, rgba(129,140,248,0.03) 0px, rgba(129,140,248,0.03) 1px, transparent 1px, transparent 28px)",
            "repeating-linear-gradient(0deg, rgba(129,140,248,0.02) 0px, rgba(129,140,248,0.02) 1px, transparent 1px, transparent 28px)",
          ].join(", "),
          zIndex: 1,
        }}
      />

      {!imageUrl && (
        <span
          style={{
            position: "absolute",
            right: "16px",
            bottom: "10px",
            fontFamily: "'Anton', 'Impact', sans-serif",
            fontSize: "2.2rem",
            color: `${accent}18`,
            letterSpacing: "-.02em",
            lineHeight: 1,
            userSelect: "none",
            zIndex: 2,
          }}
        >
          {initials}
        </span>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40px",
          background: "linear-gradient(to bottom, transparent, rgba(7,8,15,0.7))",
          zIndex: 2,
        }}
      />
    </div>
  );
}

export default function BlogPostCard({ post }: { post: Blog }) {
  const [hov, setHov] = useState(false);
  const accent = getAccentColor(post.category ?? "");
  const readTime = Math.ceil(post.content.split(" ").length / 200);
  const excerpt = post.content.replace(/<[^>]*>/g, "").slice(0, 120) + "...";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/blog/${post.$id}`}
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
          border: `1px solid ${hov ? `${accent}28` : "rgba(99,102,241,0.12)"}`,
          transition: "border-color .25s, background .25s",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, ${accent}, ${accent}44, transparent)`,
            opacity: hov ? 1 : 0,
            transition: "opacity .25s",
            zIndex: 1,
          }}
        />

        <CoverArt
          accent={accent}
          title={post.postTitle}
          imageUrl={post.featuredImage}
        />

        <div
          style={{
            padding: "clamp(18px,2.2vw,24px)",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "12px",
          }}
        >
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
                color: accent,
                background: `${accent}10`,
                border: `1px solid ${accent}20`,
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
              {readTime} min read
            </span>
          </div>

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
            {post.postTitle}
          </h3>

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
            {excerpt}
          </p>

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
                dateTime={post.publishDate}
              >
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span
                className="font-mono text-[9px] tracking-[.05em] inline-flex items-center gap-[4px]"
                style={{ color: "rgba(255,255,255,.2)" }}
              >
                <Eye size={10} strokeWidth={1.8} />
                {post.viewCount || 0}
              </span>
            </div>

            <span
              className="font-mono text-[9px] tracking-[.08em] uppercase"
              style={{
                color: hov ? accent : "rgba(255,255,255,.2)",
                transition: "color .2s",
              }}
            >
              Read →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
