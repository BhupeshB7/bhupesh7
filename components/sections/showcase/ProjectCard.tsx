"use client";

import { listItem } from "@/components/animations/variants";
import type { PROJECTS } from "@/lib/constants";
import { motion } from "framer-motion";
import { ExternalLink, GitFork, Hexagon, Star } from "lucide-react";
import { useState } from "react";

type Project = (typeof PROJECTS)[number];

export default function ProjectCard({ project }: { project: Project }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.a
      href={project.liveUrl ?? project.repoUrl}
      target="_blank"
      rel="noreferrer"
      variants={listItem}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: hov ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.016)",
        border: `1px solid ${hov ? `${project.accent}30` : "var(--border-subtle)"}`,
        borderRadius: "14px",
        padding: "clamp(20px,2.8vw,30px)",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.25s, background 0.25s",
      }}
      aria-label={`${project.name} — ${project.desc}`}
    >
      {/* Top accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: hov
            ? `linear-gradient(90deg, ${project.accent}88, ${project.accent}22, transparent)`
            : `linear-gradient(90deg, ${project.accent}33, transparent)`,
          transition: "background 0.3s ease",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "12px",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "7px",
              background: `${project.accent}12`,
              border: `1px solid ${project.accent}24`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Hexagon size={14} color={project.accent} strokeWidth={1.8} />
          </div>
          <div style={{ minWidth: 0 }}>
            <span
              className="font-mono text-[13px] tracking-[.02em] block"
              style={{ color: "rgba(255,255,255,.88)", fontWeight: 500 }}
            >
              {project.name}
            </span>
            <span
              className="font-mono text-[9px] tracking-[.1em] uppercase"
              style={{ color: project.accent }}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Stars & Forks */}
        <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
            aria-label={`${project.stats.stars} stars`}
          >
            <Star
              size={10}
              color="#fbbf24"
              strokeWidth={1.8}
              fill="#fbbf24"
              aria-hidden="true"
            />
            <span
              className="font-mono text-[10px]"
              style={{ color: "rgba(255,255,255,.3)" }}
            >
              {project.stats.stars}
            </span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
            aria-label={`${project.stats.forks} forks`}
          >
            <GitFork
              size={10}
              color="rgba(255,255,255,.3)"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span
              className="font-mono text-[10px]"
              style={{ color: "rgba(255,255,255,.3)" }}
            >
              {project.stats.forks}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p
        className="font-mono text-[11px] leading-[1.8] tracking-[.01em] mb-[16px]"
        style={{ color: "rgba(255,255,255,.38)" }}
      >
        {project.desc}
      </p>

      {/* Stack tags */}
      <ul
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          listStyle: "none",
        }}
        aria-label="Tech stack"
      >
        {project.stack.map((tag) => (
          <li key={tag}>
            <span
              className="font-mono text-[9px] tracking-[.08em] uppercase"
              style={{
                color: `${project.accent}88`,
                border: `1px solid ${project.accent}1e`,
                borderRadius: "3px",
                padding: "2px 7px",
                background: `${project.accent}08`,
              }}
            >
              {tag}
            </span>
          </li>
        ))}
      </ul>

      {/* GitHub link hint */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "clamp(20px,2.8vw,30px)",
          right: "clamp(20px,2.8vw,30px)",
          color: hov ? project.accent : "rgba(255,255,255,.2)",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "9px",
          letterSpacing: ".08em",
          transition: "color 0.2s",
        }}
      >
        view on github <ExternalLink size={10} strokeWidth={1.8} />
      </div>
    </motion.a>
  );
}
