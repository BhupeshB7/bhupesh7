"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Star, Users, Layers, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { fetchProjects } from "@/lib/projectService";
import { Project } from "@/types/project";

const FILTERS = [
  { key: "all", label: "All", icon: <Layers size={11} /> },
  { key: "featured", label: "Featured", icon: <Star size={11} /> },
  { key: "solo", label: "Solo", icon: null },
  { key: "team", label: "Team", icon: <Users size={11} /> },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

function ProjectsHeader({ totalProjects }: { totalProjects: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: "clamp(40px,6vw,64px)" }}
    >
      <div
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
            background: "linear-gradient(to right, #6366f1, transparent)",
          }}
        />
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#818cf8",
            fontFamily: "monospace",
          }}
        >
          Shipped Work
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem,4.5vw,3rem)",
              letterSpacing: "-.02em",
              lineHeight: 1,
              marginBottom: "10px",
              color: "rgba(255,255,255,.95)",
              fontFamily: "var(--font-display)",
            }}
          >
            PROJECTS
          </h2>
          <p
            style={{
              fontSize: "clamp(10px,1.2vw,12px)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.22)",
              fontFamily: "monospace",
            }}
          >
            Things I've built — solo and with others
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div
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
            <span style={{ color: "#818cf8" }}>
              <Star size={11} />
            </span>
            <span
              style={{
                fontSize: "1.1rem",
                letterSpacing: "-.01em",
                color: "rgba(255,255,255,.8)",
                fontFamily: "var(--font-display)",
              }}
            >
              {totalProjects}
            </span>
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.25)",
                fontFamily: "monospace",
              }}
            >
              Projects
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function FilterBar({
  active,
  onChange,
  counts,
  categories,
  selectedCategory,
  onCategoryChange,
}: {
  active: FilterKey;
  onChange: (k: FilterKey) => void;
  counts: Record<FilterKey, number>;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginBottom: "clamp(32px,5vw,52px)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {FILTERS.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              background: active === key ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
              border: active === key ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              fontSize: "10px",
              fontWeight: 500,
              color: active === key ? "#818cf8" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "all .2s",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {icon}
            {label}
            {key !== "all" && (
              <span
                style={{
                  marginLeft: "2px",
                  fontSize: "8px",
                  color: "rgba(255,255,255,.3)",
                }}
              >
                /{counts[key]}
              </span>
            )}
          </button>
        ))}
      </div>

      <div style={{ position: "relative" }}>
        <button
          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            background: selectedCategory ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
            border: selectedCategory ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            fontSize: "10px",
            fontWeight: 500,
            color: selectedCategory ? "#818cf8" : "rgba(255,255,255,0.5)",
            cursor: "pointer",
            transition: "all .2s",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <Layers size={11} />
          {selectedCategory || "All Categories"}
        </button>

        {showCategoryDropdown && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowCategoryDropdown(false)}
            />
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: "8px",
                background: "#1a1a24",
                border: "1px solid #2a2a3a",
                borderRadius: "12px",
                padding: "8px",
                minWidth: "180px",
                zIndex: 20,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <button
                onClick={() => {
                  onCategoryChange("");
                  setShowCategoryDropdown(false);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 12px",
                  background: !selectedCategory ? "rgba(99,102,241,0.1)" : "transparent",
                  borderRadius: "8px",
                  fontSize: "11px",
                  color: !selectedCategory ? "#818cf8" : "rgba(255,255,255,0.7)",
                  fontFamily: "monospace",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onCategoryChange(cat);
                    setShowCategoryDropdown(false);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 12px",
                    background: selectedCategory === cat ? "rgba(99,102,241,0.1)" : "transparent",
                    borderRadius: "8px",
                    fontSize: "11px",
                    color: selectedCategory === cat ? "#818cf8" : "rgba(255,255,255,0.7)",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    transition: "all .2s",
                    textTransform: "capitalize",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(projects.map((p) => p.category));
    return Array.from(unique).sort();
  }, [projects]);

  const counts = useMemo(() => {
    return {
      all: projects.length,
      featured: projects.filter((p) => p.isFeatured).length,
      solo: projects.filter((p) => p.projectType === "solo").length,
      team: projects.filter((p) => p.projectType === "team").length,
    };
  }, [projects]);

  const visible = useMemo(() => {
    let filtered = projects;

    if (filter === "featured") {
      filtered = filtered.filter((p) => p.isFeatured);
    } else if (filter === "solo") {
      filtered = filtered.filter((p) => p.projectType === "solo");
    } else if (filter === "team") {
      filtered = filtered.filter((p) => p.projectType === "team");
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    return filtered;
  }, [projects, filter, selectedCategory]);

  const featured = visible.filter((p) => p.isFeatured);
  const rest = visible.filter((p) => !p.isFeatured);

  if (loading) {
    return (
      <div
        style={{
          background: "#07080f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "2px solid rgba(99,102,241,0.2)",
            borderTopColor: "#6366f1",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div
      id="projects"
      aria-label="Projects"
      style={{
        background: "#07080f",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        zIndex: 2,
      }}
    >
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

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "clamp(72px,9vw,120px) clamp(1.5rem,5vw,4rem)",
        }}
      >
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

        <ProjectsHeader totalProjects={projects.length} />
        <FilterBar
          active={filter}
          onChange={setFilter}
          counts={counts}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${selectedCategory}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {featured.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%,460px), 1fr))",
                  gap: "clamp(14px,2vw,20px)",
                  marginBottom: rest.length > 0 ? "clamp(14px,2vw,20px)" : 0,
                }}
              >
                {featured.map((p) => (
                  <ProjectCard key={p.$id} project={p} />
                ))}
              </motion.div>
            )}

            {rest.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(100%,300px), 1fr))",
                  gap: "clamp(14px,2vw,20px)",
                }}
              >
                {rest.map((p) => (
                  <ProjectCard key={p.$id} project={p} />
                ))}
              </motion.div>
            )}

            {visible.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "rgba(255,255,255,.2)",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    fontFamily: "monospace",
                  }}
                >
                  No projects found matching your filters.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
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
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 24px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              fontSize: "12px",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              transition: "all .2s",
              fontFamily: "monospace",
            }}
          >
            <Github size={13} strokeWidth={1.8} />
            View all on GitHub
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
