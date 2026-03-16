"use client";

import { listItem } from "@/components/animations/variants";
import type { Project } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  ImageOff,
  Layers,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  active: { label: "Active", color: "#00ff88", bg: "rgba(0,255,136,0.08)" },
  wip: { label: "In Progress", color: "#fbbf24", bg: "rgba(251,191,36,0.08)" },
  archived: {
    label: "Archived",
    color: "rgba(255,255,255,.3)",
    bg: "rgba(255,255,255,0.04)",
  },
} as const;

// ─── Code preview ─────────────────────────────────────────────────────────────
function CodePreview({ code, accent }: { code: string; accent: string }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "10px",
        background: "rgba(0,0,0,0.55)",
        border: `1px solid ${accent}18`,
        overflow: "hidden",
        fontFamily: "var(--font-brand-mono),'JetBrains Mono',monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "10px 14px 8px",
          borderBottom: `1px solid ${accent}12`,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div
            key={c}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: c,
              opacity: 0.7,
            }}
          />
        ))}
        <span
          className="font-mono"
          style={{
            marginLeft: "auto",
            fontSize: "9px",
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,.18)",
            textTransform: "uppercase",
          }}
        >
          preview
        </span>
      </div>
      <pre
        style={{
          margin: 0,
          padding: "14px 16px",
          fontSize: "11px",
          lineHeight: 1.75,
          color: "rgba(255,255,255,.52)",
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        <code>{code}</code>
      </pre>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "28px",
          background: "linear-gradient(to top,rgba(0,0,0,.55),transparent)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── Project image with fallback ──────────────────────────────────────────────
// Priority: real image → code preview → placeholder block
function ProjectImage({
  src,
  alt,
  accent,
  code,
  height = 200,
}: {
  src?: string | null;
  alt: string;
  accent: string;
  code?: string;
  height?: number;
}) {
  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Reset error state if src changes (e.g. navigating between projects)
  useEffect(() => {
    setErr(false);
    setLoaded(false);
  }, [src]);

  if (src && !err) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height,
          borderRadius: "10px",
          overflow: "hidden",
          background: `linear-gradient(135deg,${accent}12,rgba(7,8,15,.6))`,
          border: `1px solid ${accent}18`,
        }}
      >
        {/* Loading shimmer */}
        {!loaded && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(90deg,${accent}06 25%,${accent}14 50%,${accent}06 75%)`,
              backgroundSize: "200% 100%",
              animation: "shimmer 1.6s ease infinite",
            }}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setErr(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity .4s ease",
          }}
        />
        {/* Bottom gradient */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom,transparent 50%,rgba(7,8,15,.55))",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  // Fallback 1: code preview
  if (code) return <CodePreview code={code} accent={accent} />;

  // Fallback 2: styled placeholder
  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: "10px",
        background: `linear-gradient(135deg,${accent}10,rgba(7,8,15,.8))`,
        border: `1px solid ${accent}18`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <ImageOff size={20} style={{ color: `${accent}40` }} />
      <span
        className="font-mono"
        style={{
          fontSize: "9px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.2)",
        }}
      >
        no preview
      </span>
    </div>
  );
}

// ─── Metric pill (replaces stars/forks) ──────────────────────────────────────
function MetricPill({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <span style={{ color: "rgba(255,255,255,.25)", display: "inline-flex" }}>
        {icon}
      </span>
      <span
        className="font-mono"
        style={{
          fontSize: "10px",
          color: "rgba(255,255,255,.5)",
          fontWeight: 700,
        }}
      >
        {value}
      </span>
      <span
        className="font-mono"
        style={{
          fontSize: "9px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.2)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Modal (portal-rendered) ──────────────────────────────────────────────────
// Key fixes vs old version:
//   1. AnimatePresence moved to ProjectCard (parent) — exit animations now fire correctly
//   2. Rendered via createPortal at document.body — no z-index / stacking context issues
//   3. Centering done with flexbox on the overlay div, NOT CSS transform on the panel
//      → no conflict with Framer Motion's own transform used for the y entrance animation
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const status = STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG];

  // Escape key + body scroll lock
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [handleKey]);

  const content = (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(7,8,15,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 9998,
        }}
      />

      {/*
        Centering wrapper — fixed overlay that centers its child with flex.
        Framer Motion animates `y` on the inner panel without any CSS transform conflict.
      */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px",
          pointerEvents: "none",
        }}
      >
        <motion.div
          key="panel"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} details`}
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(740px, 100%)",
            maxHeight: "88vh",
            overflowY: "auto",
            background: "rgba(9,10,20,0.99)",
            border: `1px solid ${project.accent}28`,
            borderRadius: "18px",
            boxShadow: `0 48px 120px rgba(0,0,0,.85), 0 0 0 1px ${project.accent}14, 0 0 80px ${project.accent}08`,
            padding: "clamp(24px,4vw,42px)",
            position: "relative",
            pointerEvents: "auto",
          }}
        >
          {/* Top accent bar */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              borderRadius: "18px 18px 0 0",
              background: `linear-gradient(90deg,${project.accent}90,transparent)`,
            }}
          />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close project details"
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,.1)",
              background: "rgba(255,255,255,.04)",
              color: "rgba(255,255,255,.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all .2s",
            }}
          >
            <X size={14} />
          </button>

          {/* Image / preview */}
          <div style={{ marginBottom: "26px" }}>
            <ProjectImage
              src={"image" in project ? (project as any).image : null}
              alt={project.name}
              accent={project.accent}
              code={
                "previewCode" in project
                  ? (project as any).previewCode
                  : undefined
              }
              height={220}
            />
          </div>

          {/* Badges */}
          <div
            style={{
              display: "flex",
              gap: "7px",
              marginBottom: "12px",
              flexWrap: "wrap",
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: "9px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: project.type === "group" ? "#00e5ff" : project.accent,
                background:
                  project.type === "group"
                    ? "rgba(0,229,255,.08)"
                    : `${project.accent}10`,
                border: `1px solid ${project.type === "group" ? "rgba(0,229,255,.2)" : `${project.accent}22`}`,
                borderRadius: "3px",
                padding: "2px 8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {project.type === "group" && <Users size={9} />}
              {project.type === "group" ? "Group Project" : "Solo Project"}
            </span>

            <span
              className="font-mono"
              style={{
                fontSize: "9px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: status.color,
                background: status.bg,
                border: `1px solid ${status.color}30`,
                borderRadius: "3px",
                padding: "2px 8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: status.color,
                  animation:
                    project.status === "active"
                      ? "pulse-glow 2s ease infinite"
                      : "none",
                }}
              />
              {status.label}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.6rem,3.5vw,2.2rem)",
              letterSpacing: "-.01em",
              color: "rgba(255,255,255,.92)",
              marginBottom: "10px",
            }}
          >
            {project.name}
          </h2>

          {/* Long description */}
          <p
            className="font-mono"
            style={{
              fontSize: "clamp(11px,1.3vw,13px)",
              lineHeight: 1.85,
              color: "rgba(255,255,255,.42)",
              letterSpacing: ".015em",
              marginBottom: "24px",
            }}
          >
            {project.longDesc}
          </p>

          {/* Highlights */}
          {"highlights" in project &&
            Array.isArray((project as any).highlights) && (
              <div
                style={{
                  display: "flex",
                  gap: "7px",
                  flexWrap: "wrap",
                  marginBottom: "24px",
                }}
              >
                {((project as any).highlights as string[]).map((h) => (
                  <span
                    key={h}
                    className="font-mono"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: `${project.accent}bb`,
                      border: `1px solid ${project.accent}20`,
                      borderRadius: "3px",
                      padding: "3px 9px",
                      background: `${project.accent}07`,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Zap size={8} /> {h}
                  </span>
                ))}
              </div>
            )}

          {/* Team — group projects */}
          {"team" in project &&
            Array.isArray((project as any).team) &&
            (project as any).team.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <p
                  className="font-mono"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.22)",
                    marginBottom: "12px",
                  }}
                >
                  Team
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {(
                    (project as any).team as {
                      name: string;
                      role: string;
                      handle: string;
                    }[]
                  ).map((m) => (
                    <div
                      key={m.handle}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "8px",
                        background: "rgba(0,229,255,.04)",
                        border: "1px solid rgba(0,229,255,.12)",
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: "rgba(99,102,241,.2)",
                          border: "1px solid rgba(99,102,241,.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          color: "var(--accent-light)",
                          fontFamily: "monospace",
                          flexShrink: 0,
                        }}
                      >
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <p
                          className="font-mono"
                          style={{
                            fontSize: "10px",
                            color: "rgba(255,255,255,.7)",
                            fontWeight: 700,
                            letterSpacing: ".04em",
                          }}
                        >
                          {m.name}
                        </p>
                        <p
                          className="font-mono"
                          style={{
                            fontSize: "9px",
                            color: "rgba(255,255,255,.3)",
                            letterSpacing: ".04em",
                          }}
                        >
                          {m.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Metrics row */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
              paddingBottom: "20px",
              borderBottom: "1px solid rgba(255,255,255,.06)",
              flexWrap: "wrap",
            }}
          >
            <MetricPill
              icon={<Layers size={11} />}
              value={project.stack.length}
              label="Technologies"
            />
            {"highlights" in project && (
              <MetricPill
                icon={<CheckCircle2 size={11} />}
                value={((project as any).highlights as string[]).length}
                label="Features"
              />
            )}
            {"team" in project && Array.isArray((project as any).team) && (
              <MetricPill
                icon={<Users size={11} />}
                value={(project as any).team.length}
                label="Contributors"
              />
            )}
          </div>

          {/* Stack pills */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              marginBottom: "28px",
            }}
          >
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="font-mono"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.45)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "3px",
                  padding: "3px 8px",
                  background: "rgba(255,255,255,.03)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sm btn-sm-accent"
              >
                <ExternalLink size={11} /> View Live
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sm btn-sm-ghost"
            >
              <Github size={11} /> GitHub Repo
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : null;
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const status = STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG];

  const hasImage = "image" in project && !!(project as any).image;
  const hasCode = "previewCode" in project && !!(project as any).previewCode;
  const showPreview = hasImage || (project.featured && hasCode);

  return (
    <>
      <motion.article
        variants={listItem}
        className="project-card"
        aria-label={`Project: ${project.name}`}
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
            background: `linear-gradient(90deg,${project.accent}80,transparent)`,
          }}
        />

        <div style={{ padding: "clamp(20px,2.6vw,30px)" }}>
          {/* Image or code preview (featured + has image/code, or has image always) */}
          {showPreview && (
            <div style={{ marginBottom: "18px" }}>
              <ProjectImage
                src={hasImage ? (project as any).image : null}
                alt={project.name}
                accent={project.accent}
                code={hasCode ? (project as any).previewCode : undefined}
                height={160}
              />
            </div>
          )}

          {/* Badges + metrics row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "10px",
              marginBottom: "12px",
              flexWrap: "wrap",
            }}
          >
            {/* Left: type + status badges */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: project.type === "group" ? "#00e5ff" : project.accent,
                  background:
                    project.type === "group"
                      ? "rgba(0,229,255,.07)"
                      : `${project.accent}0d`,
                  border: `1px solid ${project.type === "group" ? "rgba(0,229,255,.18)" : `${project.accent}1e`}`,
                  borderRadius: "3px",
                  padding: "2px 7px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {project.type === "group" && <Users size={8} />}
                {project.type === "group" ? "Group" : "Solo"}
              </span>

              <span
                className="font-mono"
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: status.color,
                  background: status.bg,
                  border: `1px solid ${status.color}28`,
                  borderRadius: "3px",
                  padding: "2px 7px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: status.color,
                    animation:
                      project.status === "active"
                        ? "pulse-glow 2s ease infinite"
                        : "none",
                  }}
                />
                {status.label}
              </span>
            </div>

            {/* Right: stack count + feature count — meaningful for solo dev */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span
                className="font-mono"
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,.28)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
                title={`${project.stack.length} technologies`}
              >
                <Layers size={10} strokeWidth={1.7} />
                {project.stack.length}
              </span>
              {"highlights" in project && (
                <span
                  className="font-mono"
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,.28)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                  title={`${((project as any).highlights as string[]).length} key features`}
                >
                  <CheckCircle2 size={10} strokeWidth={1.7} />
                  {((project as any).highlights as string[]).length}
                </span>
              )}
            </div>
          </div>

          {/* Name */}
          <h3
            className="font-display"
            style={{
              fontSize: "clamp(1.05rem,1.9vw,1.3rem)",
              letterSpacing: "-.01em",
              color: "rgba(255,255,255,.88)",
              marginBottom: "4px",
            }}
          >
            {project.name}
          </h3>

          {/* Tagline */}
          <p
            className="font-mono"
            style={{
              fontSize: "11px",
              letterSpacing: ".03em",
              color: project.accent,
              opacity: 0.7,
              marginBottom: "10px",
            }}
          >
            {project.tagline}
          </p>

          {/* Desc */}
          <p
            className="font-mono"
            style={{
              fontSize: "clamp(10px,1.1vw,11.5px)",
              lineHeight: 1.85,
              color: "rgba(255,255,255,.35)",
              letterSpacing: ".015em",
              marginBottom: "18px",
            }}
          >
            {project.desc}
          </p>

          {/* Stack tags */}
          <ul
            style={{
              display: "flex",
              gap: "5px",
              flexWrap: "wrap",
              marginBottom: "18px",
              padding: 0,
              listStyle: "none",
            }}
            aria-label="Tech stack"
          >
            {project.stack.map((tag) => (
              <li key={tag}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.38)",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: "3px",
                    padding: "2px 6px",
                    background: "rgba(255,255,255,.022)",
                  }}
                >
                  {tag}
                </span>
              </li>
            ))}
          </ul>

          {/* Group: team avatar stack */}
          {project.type === "group" &&
            "team" in project &&
            Array.isArray((project as any).team) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "18px",
                }}
              >
                <div style={{ display: "flex" }}>
                  {((project as any).team as { name: string }[])
                    .slice(0, 3)
                    .map((m, i) => (
                      <div
                        key={m.name}
                        title={m.name}
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: `hsl(${[260, 180, 50][i % 3]},60%,55%)`,
                          border: "2px solid var(--bg)",
                          marginLeft: i === 0 ? 0 : "-7px",
                          zIndex: 3 - i,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "8px",
                          color: "#fff",
                          fontFamily: "monospace",
                          opacity: 0.85,
                        }}
                      >
                        {m.name.charAt(0)}
                      </div>
                    ))}
                </div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,.28)",
                  }}
                >
                  {(project as any).team.length} contributors
                </span>
              </div>
            )}

          {/* Actions */}
          <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
            <button
              onClick={() => setOpen(true)}
              className="btn-sm btn-sm-accent"
              style={{ cursor: "pointer" }}
              aria-haspopup="dialog"
            >
              Details <ArrowUpRight size={11} />
            </button>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sm btn-sm-ghost"
              >
                <ExternalLink size={10} /> Live
              </a>
            )}

            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sm btn-sm-ghost"
              aria-label={`${project.name} on GitHub`}
            >
              <Github size={10} /> Repo
            </a>
          </div>
        </div>
      </motion.article>

      {/*
        AnimatePresence MUST be in the parent, not inside the portal component.
        When `open` goes false, AnimatePresence detects the child disappearing
        and runs exit animations before unmounting.
      */}
      <AnimatePresence>
        {open && (
          <ProjectModal project={project} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
