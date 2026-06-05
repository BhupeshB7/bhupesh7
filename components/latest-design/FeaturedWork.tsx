"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import theme from "@/config/theme.config";

const c = theme.accent.primary;

const projects = [
  {
    index: "01",
    title: "Cloud Storage Platform",
    subtitle: "Modern File Management & Collaboration System",
    description:
      "A full-featured cloud storage platform designed for secure file organization, sharing, and collaboration. The platform supports hierarchical folder structures, role-based access control, secure public sharing, recent activity tracking, starred items, trash recovery, and background file processing workflows.",
    challenge:
      "Designing scalable folder hierarchies with secure public file sharing and authentication across distributed environments.",
    highlights: [
      "File & Folder Management",
      "Secure Sharing",
      "JWT Authentication",
      "Background Jobs",
      "Role-Based Access Control",
      "Activity Tracking",
      "Trash Recovery",
      "Scalable Architecture",
    ],
    impact:
      "Created a production-grade storage system demonstrating real-world backend architecture, access control design, and large-scale data organization principles.",
    images: ["/images/project1.png"],
    stack: ["Node.js", "MongoDB", "Redis", "JWT", "BullMQ"],
    accentLabel: "Storage",
  },
  {
    index: "02",
    title: "Distributed Ticket Booking System",
    subtitle: "High-Concurrency Distributed Reservation Platform",
    description:
      "A distributed ticket reservation platform designed to handle thousands of concurrent booking attempts while guaranteeing seat consistency and preventing double bookings. Inspired by systems like BookMyShow, airline reservations, and railway ticketing.",
    challenge:
      "Multiple users attempting to reserve the same seat simultaneously required bulletproof concurrency control across distributed instances.",
    highlights: [
      "Distributed Systems",
      "Concurrency Handling",
      "Redis Locking",
      "Microservices",
      "BullMQ",
      "gRPC",
      "Saga Pattern",
      "System Design",
    ],
    impact:
      "Demonstrates production-grade distributed system design, concurrency management, and high-scale backend engineering concepts used by modern reservation systems.",
    images: ["/images/project2.png"],
    stack: ["Redis", "BullMQ", "gRPC", "MongoDB", "Saga Pattern"],
    accentLabel: "Booking",
  },
  {
    index: "03",
    title: "Smart Administrative Service Platform",
    subtitle: "Digital Workflow & Queue Management System",
    description:
      "A comprehensive platform designed to digitize and automate administrative services for educational institutions. Enables students, staff, and administrators to manage service requests, appointments, virtual queues, document verification, and workflow approvals from a single platform.",
    challenge:
      "Building a configurable workflow engine capable of managing multi-step approvals without code changes while handling real-time virtual queues.",
    highlights: [
      "Workflow Engine",
      "Queue Theory",
      "Appointment Scheduling",
      "AI Integration",
      "RBAC",
      "BullMQ",
      "WebSockets",
      "System Design",
    ],
    impact:
      "Transforms traditionally manual institutional processes into a scalable, workflow-driven digital platform showcasing advanced backend architecture and product engineering.",
    images: ["/images/project3.png"],
    stack: ["React", "Node.js", "MongoDB", "Gemini AI", "WebSockets"],
    accentLabel: "Platform",
  },
];

function HexPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="fw-hex"
          x="0"
          y="0"
          width="56"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M14 4 L28 4 L35 16 L28 28 L14 28 L7 16 Z"
            fill="none"
            stroke="rgba(255,255,255,0.025)"
            strokeWidth="0.8"
          />
        </pattern>
        <radialGradient id="fw-fade-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="65%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="fw-hex-mask">
          <rect width="1200" height="800" fill="url(#fw-fade-center)" />
        </mask>
        <linearGradient id="fw-scan-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c} stopOpacity="0" />
          <stop offset="50%" stopColor={c} stopOpacity="0.06" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fw-scan-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity="0" />
          <stop offset="50%" stopColor={c} stopOpacity="0.05" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect
        width="1200"
        height="800"
        fill="url(#fw-hex)"
        mask="url(#fw-hex-mask)"
      />
      <rect x="0" y="240" width="1200" height="1" fill="url(#fw-scan-h)" />
      <rect x="0" y="540" width="1200" height="1" fill="url(#fw-scan-h)" />
      <rect x="400" y="0" width="1" height="800" fill="url(#fw-scan-v)" />
      <rect x="800" y="0" width="1" height="800" fill="url(#fw-scan-v)" />
      <circle
        cx="200"
        cy="150"
        r="180"
        fill="none"
        stroke={`${c}04`}
        strokeWidth="1"
      />
      <circle
        cx="200"
        cy="150"
        r="280"
        fill="none"
        stroke={`${c}03`}
        strokeWidth="1"
      />
      <circle
        cx="1000"
        cy="650"
        r="200"
        fill="none"
        stroke={`${c}04`}
        strokeWidth="1"
      />
      <circle
        cx="1000"
        cy="650"
        r="300"
        fill="none"
        stroke={`${c}02`}
        strokeWidth="1"
      />
      <path
        d="M0 400 Q200 380 400 400 Q600 420 800 400 Q1000 380 1200 400"
        stroke={`${c}07`}
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M0 410 Q200 430 400 410 Q600 390 800 410 Q1000 430 1200 410"
        stroke={`${c}04`}
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

function ImagePlaceholder({ label, index }: { label: string; index: string }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3 relative overflow-hidden"
      style={{ background: theme.bg.muted }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${c}08, transparent 70%)`,
        }}
      />
      <svg
        viewBox="0 0 80 80"
        className="w-16 h-16 relative z-10"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="8"
          y="8"
          width="64"
          height="48"
          rx="6"
          stroke={`${c}25`}
          strokeWidth="1.5"
          fill={`${c}05`}
        />
        <circle cx="22" cy="20" r="5" fill={`${c}20`} />
        <path
          d="M8 40 L24 28 L38 36 L54 22 L72 34 L72 56 L8 56 Z"
          fill={`${c}10`}
          stroke={`${c}20`}
          strokeWidth="1"
        />
        <rect
          x="28"
          y="64"
          width="24"
          height="8"
          rx="2"
          fill={`${c}15`}
          stroke={`${c}20`}
          strokeWidth="1"
        />
        <line
          x1="40"
          y1="56"
          x2="40"
          y2="64"
          stroke={`${c}20`}
          strokeWidth="1.5"
        />
      </svg>
      <div className="relative z-10 flex flex-col items-center gap-1">
        <span
          className="text-[9px] font-semibold tracking-[0.2em] uppercase"
          style={{
            color: theme.text.muted,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          Project {index}
        </span>
        <span
          className="text-[10px]"
          style={{
            color: theme.text.faint,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {label} Preview
        </span>
      </div>
    </div>
  );
}

function ProjectImageCarousel({
  images,
  label,
  index,
  inView,
}: {
  images: string[];
  label: string;
  index: string;
  inView: boolean;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full overflow-hidden rounded-xl">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={
            inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }
          }
          transition={
            { duration: 0.7, delay: 0.2, ease: "easeOut" } as Transition
          }
          className="w-full h-full"
        >
          <ImagePlaceholder label={label} index={index} />
        </motion.div>
      </div>

      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
        style={{
          background: "rgba(0,0,0,0.55)",
          border: `1px solid ${theme.border.soft}`,
          backdropFilter: "blur(8px)",
        }}
      >
        {[...Array(Math.max(images.length, 1))].map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-200"
            style={{
              width: active === i ? "18px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: active === i ? c : `${c}35`,
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <div
        className="absolute top-3 right-3 px-2 py-1 rounded-lg"
        style={{
          background: "rgba(0,0,0,0.55)",
          border: `1px solid ${theme.border.soft}`,
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          className="text-[9px] font-semibold tracking-[0.18em] uppercase"
          style={{
            color: theme.text.muted,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {active + 1} / {Math.max(images.length, 1)}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  cardIndex,
  inView,
}: {
  project: (typeof projects)[0];
  cardIndex: number;
  inView: boolean;
}) {
  const isEven = cardIndex % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={
        {
          duration: 0.65,
          delay: 0.15 + cardIndex * 0.12,
          ease: "easeOut",
        } as Transition
      }
      className="group relative"
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: theme.surface[0],
          border: `1px solid ${theme.border.soft}`,
          boxShadow: `0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)`,
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[1.5px]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${c}40 30%, ${c}70 52%, ${c}40 72%, transparent 100%)`,
          }}
        />

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at ${isEven ? "20% 0%" : "80% 0%"}, ${c}05, transparent 60%)`,
          }}
        />

        <div
          className={`grid lg:grid-cols-[1fr_420px] ${!isEven ? "lg:grid-cols-[420px_1fr]" : ""} gap-0`}
        >
          {!isEven && (
            <div
              className="hidden lg:block relative h-full min-h-[340px]"
              style={{ borderRight: `1px solid ${theme.border.soft}` }}
            >
              <ProjectImageCarousel
                images={project.images}
                label={project.accentLabel}
                index={project.index}
                inView={inView}
              />
            </div>
          )}

          <div className="flex flex-col gap-5 p-7 lg:p-9">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] font-bold tracking-[0.25em] uppercase"
                    style={{
                      color: `${c}55`,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    Project {project.index}
                  </span>
                  <span
                    className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      color: c,
                      background: theme.accent.tint,
                      border: `1px solid ${theme.accent.border}`,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {project.accentLabel}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold leading-snug"
                  style={{
                    color: theme.text.primary,
                    fontFamily: "Syne, sans-serif",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-[12px]"
                  style={{
                    color: c,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {project.subtitle}
                </p>
              </div>
              <span
                className="text-[52px] font-bold leading-none select-none flex-shrink-0 hidden sm:block"
                style={{
                  color: `${c}08`,
                  fontFamily: "Syne, sans-serif",
                  letterSpacing: "-0.04em",
                  marginTop: "-4px",
                }}
              >
                {project.index}
              </span>
            </div>

            <div
              className="lg:hidden relative rounded-xl overflow-hidden"
              style={{
                height: "220px",
                border: `1px solid ${theme.border.soft}`,
              }}
            >
              <ProjectImageCarousel
                images={project.images}
                label={project.accentLabel}
                index={project.index}
                inView={inView}
              />
            </div>

            <p
              className="text-[13.5px] leading-relaxed"
              style={{ color: theme.text.secondary, lineHeight: "1.8" }}
            >
              {project.description}
            </p>

            <div
              className="rounded-xl p-4"
              style={{
                background: theme.bg.base,
                border: `1px solid ${theme.border.subtle}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div
                  className="w-1 h-3 rounded-full"
                  style={{ background: c }}
                />
                <span
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                  style={{
                    color: theme.text.muted,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  Key Challenge
                </span>
              </div>
              <p
                className="text-[12.5px] leading-relaxed"
                style={{ color: theme.text.secondary, fontStyle: "italic" }}
              >
                {project.challenge}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.highlights.map((tag) => (
                <span
                  key={tag}
                  className="text-[10.5px] font-medium px-2.5 py-1 rounded-lg"
                  style={{
                    color: theme.text.tertiary,
                    background: theme.surface[1],
                    border: `1px solid ${theme.border.soft}`,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4"
              style={{ borderTop: `1px solid ${theme.border.subtle}` }}
            >
              <div className="flex flex-col gap-1 max-w-xs">
                <span
                  className="text-[9px] font-semibold tracking-[0.2em] uppercase"
                  style={{
                    color: theme.text.muted,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  Impact
                </span>
                <p
                  className="text-[12px] leading-relaxed"
                  style={{ color: theme.text.tertiary }}
                >
                  {project.impact}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {project.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-2 py-1 rounded-md font-medium"
                    style={{
                      color: c,
                      background: theme.accent.tint,
                      border: `1px solid ${theme.accent.border}`,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {s}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span
                    className="text-[10px] px-2 py-1 rounded-md"
                    style={{
                      color: theme.text.muted,
                      background: theme.surface[2],
                      border: `1px solid ${theme.border.soft}`,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>

          {isEven && (
            <div
              className="hidden lg:block relative h-full min-h-[340px]"
              style={{ borderLeft: `1px solid ${theme.border.soft}` }}
            >
              <ProjectImageCarousel
                images={project.images}
                label={project.accentLabel}
                index={project.index}
                inView={inView}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function CTABlock({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={
        { duration: 0.65, delay: 0.45, ease: "easeOut" } as Transition
      }
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: theme.surface[0],
        border: `1px solid ${theme.border.soft}`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${c}08, transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[1.5px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${c}60, transparent)`,
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 900 200"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="cta-grid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0L0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.025)"
              strokeWidth="0.8"
            />
          </pattern>
          <radialGradient id="cta-fade" cx="50%" cy="0%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="cta-mask">
            <rect width="900" height="200" fill="url(#cta-fade)" />
          </mask>
        </defs>
        <rect
          width="900"
          height="200"
          fill="url(#cta-grid)"
          mask="url(#cta-mask)"
        />
        <circle
          cx="120"
          cy="100"
          r="60"
          fill="none"
          stroke={`${c}07`}
          strokeWidth="1"
        />
        <circle
          cx="780"
          cy="100"
          r="80"
          fill="none"
          stroke={`${c}06`}
          strokeWidth="1"
        />
        <circle
          cx="780"
          cy="100"
          r="120"
          fill="none"
          stroke={`${c}03`}
          strokeWidth="1"
        />
      </svg>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-10 lg:p-14">
        <div className="flex flex-col gap-3 text-center lg:text-left">
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div
              className="h-px w-6"
              style={{
                background: `linear-gradient(to right, ${c}, transparent)`,
              }}
            />
            <span
              className="text-[10px] font-semibold tracking-[0.22em] uppercase"
              style={{
                color: theme.accent.text,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Open to work
            </span>
          </div>
          <h3
            className="text-3xl sm:text-4xl font-bold leading-tight"
            style={{
              color: theme.text.primary,
              fontFamily: "Syne, sans-serif",
            }}
          >
            Have a challenging <span style={{ color: c }}>product idea?</span>
          </h3>
          <p
            className="text-[14px] leading-relaxed max-w-md"
            style={{ color: theme.text.secondary }}
          >
            I enjoy solving complex engineering problems, designing scalable
            architectures, and building products that create real business
            value.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group"
            style={{
              color: theme.text.primary,
              border: `1px solid ${theme.border.default}`,
              background: theme.surface[2],
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                theme.accent.border;
              (e.currentTarget as HTMLAnchorElement).style.background =
                theme.surface[3];
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                theme.border.default;
              (e.currentTarget as HTMLAnchorElement).style.background =
                theme.surface[2];
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="1"
                y="1"
                width="4"
                height="4"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="7"
                y="1"
                width="4"
                height="4"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="1"
                y="7"
                width="4"
                height="4"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="7"
                y="7"
                width="4"
                height="4"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            View All Work
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group"
            style={{
              background: theme.accent.primary,
              color: theme.accent.primaryForeground,
              boxShadow: `0 0 28px ${theme.accent.glowStrong}`,
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                theme.accent.primaryHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                theme.accent.primary;
            }}
          >
            Work With Me
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                d="M2 6H10M7 3L10 6L7 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.05 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.25 });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden py-12 lg:py-18"
      style={{ background: theme.bg.subtle }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${theme.bg.base} 0%, ${theme.bg.subtle} 8%, ${theme.bg.muted} 100%)`,
        }}
      />

      <HexPattern />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 35% at 90% 15%, ${theme.accent.glowSubtle}, transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 45% 30% at 10% 85%, ${theme.accent.glowSubtle}, transparent 55%)`,
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.border.soft} 50%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.border.soft} 50%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div
          ref={headerRef}
          className="flex flex-col gap-5 mb-16 lg:mb-20 max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
            }
            transition={{ duration: 0.5, ease: "easeOut" } as Transition}
            className="flex items-center gap-3"
          >
            <div
              className="h-px w-8 flex-shrink-0"
              style={{
                background: `linear-gradient(to right, ${c}, transparent)`,
              }}
            />
            <span
              className="text-[10px] font-semibold tracking-[0.22em] uppercase"
              style={{
                color: theme.accent.text,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Featured Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
            }
            transition={
              { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
            }
            className="text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.06] tracking-tight"
            style={{
              color: theme.text.primary,
              fontFamily: "Syne, sans-serif",
            }}
          >
            Selected{" "}
            <span className="relative inline-block" style={{ color: c }}>
              Work
              <svg
                viewBox="0 0 88 10"
                fill="none"
                className="absolute left-0 w-full"
                style={{ bottom: "-4px", height: "9px" }}
                aria-hidden="true"
              >
                <motion.path
                  d="M2 6 C20 2, 44 8, 66 5 C76 3, 82 7, 86 6"
                  stroke={c}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={headerInView ? { pathLength: 1, opacity: 0.65 } : {}}
                  transition={
                    {
                      duration: 0.9,
                      delay: 0.5,
                      ease: "easeInOut",
                    } as Transition
                  }
                />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            transition={
              { duration: 0.6, delay: 0.2, ease: "easeOut" } as Transition
            }
            className="text-base lg:text-[17px] leading-relaxed"
            style={{ color: theme.text.secondary }}
          >
            Building products that solve real-world operational challenges
            through scalable architecture, thoughtful engineering, and
            user-centered design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={
              { duration: 0.5, delay: 0.3, ease: "easeOut" } as Transition
            }
            className="flex items-center gap-2 flex-wrap"
          >
            {["3 Projects", "Production-Grade", "Open Source Principles"].map(
              (tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-medium px-3 py-1 rounded-full"
                    style={{
                      color: theme.text.muted,
                      background: theme.surface[1],
                      border: `1px solid ${theme.border.soft}`,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {tag}
                  </span>
                  {i < 2 && (
                    <span
                      style={{ color: theme.border.medium }}
                      className="text-xs select-none"
                    >
                      ·
                    </span>
                  )}
                </span>
              ),
            )}
          </motion.div>
        </div>

        <div ref={projectsRef} className="flex flex-col gap-5 lg:gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.index}
              project={project}
              cardIndex={i}
              inView={projectsInView}
            />
          ))}
        </div>

        <div ref={ctaRef} className="mt-12 lg:mt-16">
          <CTABlock inView={ctaInView} />
        </div>
      </div>
    </section>
  );
}
