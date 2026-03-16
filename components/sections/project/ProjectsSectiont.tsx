"use client";

import {
  fadeUp,
  listItem,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import { PROJECTS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Star, Users, Layers } from "lucide-react";
import { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";

// ─── Filter types ─────────────────────────────────────────────────────────────
const FILTERS = [
  { key: "all", label: "All", icon: <Layers size={11} /> },
  { key: "featured", label: "Featured", icon: <Star size={11} /> },
  { key: "solo", label: "Solo", icon: null },
  { key: "group", label: "Group", icon: <Users size={11} /> },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

// ─── Aggregate stats ──────────────────────────────────────────────────────────
const TOTAL_STARS = PROJECTS.reduce((acc, p) => acc + p.stats.stars, 0);
const TOTAL_FORKS = PROJECTS.reduce((acc, p) => acc + p.stats.forks, 0);

// ─── Section header ───────────────────────────────────────────────────────────
function ProjectsHeader() {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{ marginBottom: "clamp(40px,6vw,64px)" }}
    >
      {/* Eyebrow */}
      <motion.div
        variants={fadeUp}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            height: "1px",
            width: "32px",
            flexShrink: 0,
            background: "linear-gradient(to right, var(--accent), transparent)",
          }}
        />
        <span
          className="font-mono"
          style={{
            fontSize: "9px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent-light)",
          }}
        >
          Shipped Work
        </span>
      </motion.div>

      {/* Title + stats side-by-side */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <motion.div variants={fadeUp}>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.8rem,4.5vw,3rem)",
              letterSpacing: "-.02em",
              lineHeight: 1,
              marginBottom: "10px",
              color: "rgba(255,255,255,.95)",
            }}
          >
            PROJECTS
          </h2>
          <p
            className="font-mono"
            style={{
              fontSize: "clamp(10px,1.2vw,12px)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.22)",
            }}
          >
            Things I've built — solo and with others
          </p>
        </motion.div>

        {/* Aggregate stat pills */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {[
            { icon: <Star size={11} />, val: `${TOTAL_STARS}+`, lbl: "Stars" },
            {
              icon: <Github size={11} />,
              val: `${PROJECTS.length}`,
              lbl: "Projects",
            },
          ].map(({ icon, val, lbl }) => (
            <div
              key={lbl}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.16)",
              }}
            >
              <span style={{ color: "var(--accent-light)" }}>{icon}</span>
              <span
                className="font-display"
                style={{
                  fontSize: "1.1rem",
                  letterSpacing: "-.01em",
                  color: "rgba(255,255,255,.8)",
                }}
              >
                {val}
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.25)",
                }}
              >
                {lbl}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Filter bar ───────────────────────────────────────────────────────────────
function FilterBar({
  active,
  onChange,
}: {
  active: FilterKey;
  onChange: (k: FilterKey) => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        display: "flex",
        gap: "8px",
        marginBottom: "clamp(32px,5vw,52px)",
        flexWrap: "wrap",
      }}
    >
      {FILTERS.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`project-filter-btn${active === key ? " active" : ""}`}
        >
          {icon}
          {label}
          {key !== "all" && (
            <span
              style={{
                marginLeft: "2px",
                fontSize: "8px",
                color: "rgba(255,255,255,.2)",
                fontFamily: "monospace",
              }}
            >
              /
              {
                PROJECTS.filter((p) =>
                  key === "featured"
                    ? p.featured
                    : key === "solo"
                      ? p.type === "solo"
                      : key === "group"
                        ? p.type === "group"
                        : true,
                ).length
              }
            </span>
          )}
        </button>
      ))}
    </motion.div>
  );
}

// ─── ProjectsSection ──────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [filter, setFilter] = useState<FilterKey>("all");

  const visible = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (filter === "featured") return p.featured;
      if (filter === "solo") return p.type === "solo";
      if (filter === "group") return p.type === "group";
      return true;
    });
  }, [filter]);

  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <div
      id="projects"
      aria-label="Projects"
      style={{
        background: "var(--bg)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        zIndex: 2,
      }}
    >
      {/* Background layers — mirrors AboutSection style */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: [
            "radial-gradient(58% 40% at 82%  6%,  rgba(99,102,241,0.11) 0%, rgba(99,102,241,0) 72%)",
            "radial-gradient(44% 36% at 10% 14%,  rgba(0,229,255,0.05)  0%, rgba(0,229,255,0)  76%)",
            "radial-gradient(110% 60% at 50% 108%, rgba(7,8,15,1)        0%, rgba(7,8,15,0)    55%)",
          ].join(", "),
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: [
            "repeating-linear-gradient(  0deg, rgba(129,140,248,0.011) 0px, rgba(129,140,248,0.011) 1px, transparent 1px, transparent 28px)",
            "repeating-linear-gradient( 90deg, rgba(129,140,248,0.005) 0px, rgba(129,140,248,0.005) 1px, transparent 1px, transparent 28px)",
          ].join(", "),
        }}
      />
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
        {/* Top section separator */}
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

        <ProjectsHeader />
        <FilterBar active={filter} onChange={setFilter} />

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {/* ── Featured row: 2-col on large screens ── */}
            {featured.length > 0 && (
              <motion.div
                variants={staggerContainer(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%,460px), 1fr))",
                  gap: "clamp(14px,2vw,20px)",
                  marginBottom: rest.length > 0 ? "clamp(14px,2vw,20px)" : 0,
                }}
              >
                {featured.map((p) => (
                  <ProjectCard key={p.id} project={p as any} />
                ))}
              </motion.div>
            )}

            {/* ── Regular grid: 3-col on large screens ── */}
            {rest.length > 0 && (
              <motion.div
                variants={staggerContainer(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(100%,300px), 1fr))",
                  gap: "clamp(14px,2vw,20px)",
                }}
              >
                {rest.map((p) => (
                  <ProjectCard key={p.id} project={p as any} />
                ))}
              </motion.div>
            )}

            {/* Empty state */}
            {visible.length === 0 && (
              <motion.div
                variants={fadeUp}
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "rgba(255,255,255,.2)",
                }}
              >
                <p
                  className="font-mono"
                  style={{ fontSize: "12px", letterSpacing: "0.08em" }}
                >
                  No projects in this filter yet.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          style={{
            marginTop: "clamp(40px,6vw,64px)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            href="https://github.com/bhupeshb7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ minWidth: 0, gap: "10px" }}
          >
            <Github size={13} strokeWidth={1.8} />
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
}
