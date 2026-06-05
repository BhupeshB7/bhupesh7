"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  ImageOff,
  Layers,
  Users,
  X,
  Star,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Project } from "@/types/project";

function getAccentColor(category: string): string {
  const colors: Record<string, string> = {
    web: "#8b5cf6",
    mobile: "#ec489a",
    ai: "#06b6d4",
    blockchain: "#f97316",
    devops: "#10b981",
    design: "#a855f7",
    opensource: "#6366f1",
    game: "#ef4444",
    iot: "#14b8a6",
    security: "#84cc16",
    frontend: "#8b5cf6",
    backend: "#6b7280",
    fullstack: "#f97316",
    database: "#14b8a6",
  };
  return colors[category] || "#6366f1";
}

function ProjectImage({
  src,
  alt,
  accent,
  height = 200,
}: {
  src?: string | null;
  alt: string;
  accent: string;
  height?: number;
}) {
  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
        style={{
          fontSize: "9px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.2)",
          fontFamily: "monospace",
        }}
      >
        no preview
      </span>
    </div>
  );
}

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
        style={{
          fontSize: "10px",
          color: "rgba(255,255,255,.5)",
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: "9px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.2)",
          fontFamily: "monospace",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ProjectDrawer({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const accent = getAccentColor(project.category);

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

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const content = (
    <>
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
          zIndex: 9998,
        }}
      />

      <motion.div
        key="drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: isMobile ? "100%" : "60%",
          maxWidth: isMobile ? "100%" : "600px",
          background: "rgba(9,10,20,0.98)",
          borderLeft: `1px solid ${accent}28`,
          boxShadow: `-8px 0 32px rgba(0,0,0,.5)`,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg,${accent}90,transparent)`,
          }}
        />

        <button
          onClick={onClose}
          aria-label="Close details"
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
            zIndex: 10,
          }}
        >
          <X size={14} />
        </button>

        <div
          style={{
            overflowY: "auto",
            padding: "clamp(24px,4vw,42px)",
            flex: 1,
          }}
        >
          <div style={{ marginBottom: "26px" }}>
            <ProjectImage
              src={project.imageUrl}
              alt={project.title}
              accent={accent}
              height={220}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "7px",
              marginBottom: "12px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: project.projectType === "team" ? "#00e5ff" : accent,
                background:
                  project.projectType === "team"
                    ? "rgba(0,229,255,.08)"
                    : `${accent}10`,
                border: `1px solid ${project.projectType === "team" ? "rgba(0,229,255,.2)" : `${accent}22`}`,
                borderRadius: "3px",
                padding: "2px 8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontFamily: "monospace",
              }}
            >
              {project.projectType === "team" && <Users size={9} />}
              {project.projectType === "team" ? "Team Project" : "Solo Project"}
            </span>

            {project.isFeatured && (
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#fbbf24",
                  background: "rgba(251,191,36,0.08)",
                  border: "1px solid rgba(251,191,36,0.3)",
                  borderRadius: "3px",
                  padding: "2px 8px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontFamily: "monospace",
                }}
              >
                <Star size={9} />
                Featured
              </span>
            )}
          </div>

          <h2
            style={{
              fontSize: "clamp(1.6rem,3.5vw,2.2rem)",
              letterSpacing: "-.01em",
              color: "rgba(255,255,255,.92)",
              marginBottom: "10px",
              fontFamily: "var(--font-display)",
            }}
          >
            {project.title}
          </h2>

          <div
            className="project-description"
            style={{
              fontSize: "clamp(11px,1.3vw,13px)",
              lineHeight: 1.85,
              color: "rgba(255,255,255,.42)",
              letterSpacing: ".015em",
              marginBottom: "24px",
              fontFamily: "monospace",
            }}
            dangerouslySetInnerHTML={{ __html: project.description }}
          />

          {project.projectType === "team" &&
            project.contributors &&
            project.contributors.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.22)",
                    marginBottom: "12px",
                    fontFamily: "monospace",
                  }}
                >
                  Contributors
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {project.contributors.map((member) => (
                    <div
                      key={member.name}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "8px",
                        background: "rgba(99,102,241,.04)",
                        border: "1px solid rgba(99,102,241,.12)",
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${accent}40, ${accent}20)`,
                          border: `1px solid ${accent}30`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          color: accent,
                          fontFamily: "monospace",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "11px",
                            color: "rgba(255,255,255,.7)",
                            fontWeight: 700,
                            letterSpacing: ".04em",
                            fontFamily: "monospace",
                          }}
                        >
                          {member.name}
                        </p>
                        <p
                          style={{
                            fontSize: "9px",
                            color: "rgba(255,255,255,.3)",
                            letterSpacing: ".04em",
                            fontFamily: "monospace",
                          }}
                        >
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {project.projectType === "solo" && (
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(99,102,241,.04)",
                  border: "1px solid rgba(99,102,241,.12)",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${accent}40, ${accent}20)`,
                    border: `1px solid ${accent}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color: accent,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  B
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,.7)",
                      fontWeight: 700,
                      letterSpacing: ".04em",
                      fontFamily: "monospace",
                    }}
                  >
                    BhupeshB7
                  </p>
                  <p
                    style={{
                      fontSize: "9px",
                      color: "rgba(255,255,255,.3)",
                      letterSpacing: ".04em",
                      fontFamily: "monospace",
                    }}
                  >
                    Creator & Maintainer
                  </p>
                </div>
              </div>
            </div>
          )}

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
              value={project.category}
              label="Category"
            />
            <MetricPill
              icon={<Users size={11} />}
              value={
                project.projectType === "team"
                  ? project.contributors?.length || 0
                  : 1
              }
              label="Contributors"
            />
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                  borderRadius: "8px",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#fff",
                  textDecoration: "none",
                  transition: "all .2s",
                }}
              >
                <ExternalLink size={11} /> View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "8px",
                  fontSize: "11px",
                  color: "rgba(255,255,255,.7)",
                  textDecoration: "none",
                  transition: "all .2s",
                }}
              >
                <Github size={11} /> GitHub Repo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : null;
}

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const accent = getAccentColor(project.category);
  const hasImage = !!project.imageUrl && !imageError;
  const excerpt = project.description.replace(/<[^>]*>/g, "").slice(0, 100);

  useEffect(() => {
    setImageError(false);
  }, [project.imageUrl]);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          position: "relative",
          background: "rgba(255,255,255,0.016)",
          border: `1px solid ${accent}28`,
          borderRadius: "14px",
          overflow: "hidden",
          transition: "all .3s ease",
        }}
        whileHover={{ y: -4, borderColor: `${accent}50` }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg,${accent}80,transparent)`,
          }}
        />

        <div style={{ padding: "clamp(20px,2.6vw,30px)" }}>
          <div style={{ marginBottom: "18px" }}>
            {hasImage ? (
              <ProjectImage
                src={project.imageUrl}
                alt={project.title}
                accent={accent}
                height={160}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "160px",
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
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.2)",
                    fontFamily: "monospace",
                  }}
                >
                  no preview
                </span>
              </div>
            )}
          </div>

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
            <div
              style={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: project.projectType === "team" ? "#00e5ff" : accent,
                  background:
                    project.projectType === "team"
                      ? "rgba(0,229,255,.07)"
                      : `${accent}0d`,
                  border: `1px solid ${project.projectType === "team" ? "rgba(0,229,255,.18)" : `${accent}1e`}`,
                  borderRadius: "3px",
                  padding: "2px 7px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontFamily: "monospace",
                }}
              >
                {project.projectType === "team" && <Users size={8} />}
                {project.projectType === "team" ? "Team" : "Solo"}
              </span>

              {project.isFeatured && (
                <span
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#fbbf24",
                    background: "rgba(251,191,36,0.08)",
                    border: "1px solid rgba(251,191,36,0.3)",
                    borderRadius: "3px",
                    padding: "2px 7px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontFamily: "monospace",
                  }}
                >
                  <Star size={8} />
                  Featured
                </span>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,.28)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontFamily: "monospace",
                }}
              >
                <Users size={10} strokeWidth={1.7} />
                {project.projectType === "team"
                  ? project.contributors?.length || 0
                  : 1}
              </span>
            </div>
          </div>

          <h3
            style={{
              fontSize: "clamp(1.05rem,1.9vw,1.3rem)",
              letterSpacing: "-.01em",
              color: "rgba(255,255,255,.88)",
              marginBottom: "4px",
              fontFamily: "var(--font-display)",
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: "11px",
              letterSpacing: ".03em",
              color: accent,
              opacity: 0.7,
              marginBottom: "10px",
              fontFamily: "monospace",
            }}
          >
            {project.category}
          </p>

          <p
            style={{
              fontSize: "clamp(10px,1.1vw,11.5px)",
              lineHeight: 1.85,
              color: "rgba(255,255,255,.35)",
              letterSpacing: ".015em",
              marginBottom: "18px",
              fontFamily: "monospace",
            }}
          >
            {excerpt}...
          </p>

          {project.projectType === "team" &&
            project.contributors &&
            project.contributors.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "18px",
                }}
              >
                <div style={{ display: "flex" }}>
                  {project.contributors.slice(0, 3).map((member, i) => (
                    <div
                      key={member.name}
                      title={member.name}
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${accent}80, ${accent}40)`,
                        border: `2px solid #0a0a14`,
                        marginLeft: i === 0 ? 0 : "-7px",
                        zIndex: 3 - i,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "8px",
                        color: "#fff",
                        fontFamily: "monospace",
                        fontWeight: 700,
                        opacity: 0.85,
                      }}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  ))}
                </div>
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,.28)",
                    fontFamily: "monospace",
                  }}
                >
                  {project.contributors.length} contributors
                </span>
              </div>
            )}

          {project.projectType === "solo" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${accent}80, ${accent}40)`,
                  border: `2px solid #0a0a14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  color: "#fff",
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                B
              </div>
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,.28)",
                  fontFamily: "monospace",
                }}
              >
                BhupeshB7
              </span>
            </div>
          )}

          <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
            <button
              onClick={() => setOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: 500,
                color: "#fff",
                border: "none",
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              Details <ArrowUpRight size={10} />
            </button>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "6px",
                  fontSize: "10px",
                  color: "rgba(255,255,255,.7)",
                  textDecoration: "none",
                  transition: "all .2s",
                }}
              >
                <ExternalLink size={10} /> Live
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "6px",
                  fontSize: "10px",
                  color: "rgba(255,255,255,.7)",
                  textDecoration: "none",
                  transition: "all .2s",
                }}
              >
                <Github size={10} /> Repo
              </a>
            )}
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {open && (
          <ProjectDrawer project={project} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
