"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Eye } from "lucide-react";
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

function CoverArt({ accent, title }: { accent: string; title: string }) {
  const initials = getInitials(title);

  return (
    <div
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

export default function FeaturedPost({ post }: { post: Blog }) {
  const [hov, setHov] = useState(false);
  const accent = getAccentColor(post.category ?? "");
  const readTime = Math.ceil(post.content.split(" ").length / 200);
  const excerpt = post.content.replace(/<[^>]*>/g, "").slice(0, 200) + "...";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-[10px] mb-[20px]">
        <span
          className="font-mono text-[8px] tracking-[.14em] uppercase inline-flex items-center gap-[6px]"
          style={{
            color: accent,
            background: `${accent}12`,
            border: `1px solid ${accent}28`,
            borderRadius: "4px",
            padding: "3px 9px",
          }}
        >
          <span
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: accent,
              display: "inline-block",
              animation: "pulse-glow 2s ease infinite",
            }}
          />
          Featured Post
        </span>
      </div>

      <Link
        href={`/blog/${post.$id}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          borderRadius: "18px",
          overflow: "hidden",
          border: `1px solid ${hov ? `${accent}30` : "rgba(99,102,241,0.14)"}`,
          background: hov
            ? "rgba(255,255,255,0.022)"
            : "rgba(255,255,255,0.014)",
          textDecoration: "none",
          transition: "border-color .3s, background .3s",
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
            background: hov
              ? `linear-gradient(90deg, ${accent}, ${accent}44, transparent)`
              : `linear-gradient(90deg, ${accent}66, transparent)`,
            transition: "background .3s",
            zIndex: 1,
          }}
        />

        <div style={{ minHeight: "280px" }}>
          <CoverArt accent={accent} title={post.postTitle} />
        </div>

        <div
          style={{
            padding: "clamp(28px,3.5vw,44px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div>
            <div className="flex items-center gap-[10px] flex-wrap mb-[18px]">
              <span
                className="font-mono text-[9px] tracking-[.1em] uppercase"
                style={{
                  color: accent,
                  background: `${accent}10`,
                  border: `1px solid ${accent}22`,
                  borderRadius: "3px",
                  padding: "2px 8px",
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
              <span
                className="font-mono text-[9px] tracking-[.05em] inline-flex items-center gap-[4px]"
                style={{ color: "rgba(255,255,255,.2)" }}
              >
                <Eye size={10} strokeWidth={1.8} />
                {post.viewCount || 0}
              </span>
            </div>

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
              {post.postTitle}
            </h3>

            <p
              className="font-mono mb-[16px]"
              style={{
                fontSize: "clamp(11px,1.2vw,12px)",
                lineHeight: 1.9,
                color: "rgba(255,255,255,.38)",
                letterSpacing: ".015em",
              }}
            >
              {excerpt}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <time
              className="font-mono text-[10px] tracking-[.06em]"
              style={{ color: "rgba(255,255,255,.22)" }}
              dateTime={post.publishDate}
            >
              {new Date(post.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span
              className="font-mono text-[10px] tracking-[.1em] uppercase inline-flex items-center gap-[7px]"
              style={{
                color: hov ? accent : "rgba(255,255,255,.3)",
                transition: "color .2s",
              }}
            >
              Read post
              <ArrowUpRight size={11} strokeWidth={1.8} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
