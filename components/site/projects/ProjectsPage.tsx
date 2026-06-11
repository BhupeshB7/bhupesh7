"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  type Transition,
  type TargetAndTransition,
  AnimatePresence,
} from "framer-motion";
import {
  Cloud,
  Lock,
  FolderOpen,
  Share2,
  Search,
  Trash2,
  Server,
  Zap,
  Database,
  Shield,
  GitBranch,
  Layers,
  Code2,
  ShoppingCart,
  Package,
  BarChart3,
  ArrowRight,
  MessageSquare,
  Mail,
  CheckCircle,
  ChevronDown,
  Network,
  Cpu,
  FileCode,
  Users,
  Settings,
  AlertCircle,
  TrendingUp,
  Clock,
  Star,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import theme from "@/config/theme.config";

const c = theme.accent.primary;

const FADE_UP = (
  delay = 0,
): {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
} => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const FADE_UP_INVIEW = (
  inView: boolean,
  delay = 0,
): {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
} => ({
  initial: { opacity: 0, y: 28 },
  animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-px w-8 flex-shrink-0"
        style={{ background: `linear-gradient(to right, ${c}, transparent)` }}
      />
      <span
        className="text-[10px] font-semibold tracking-[0.22em] uppercase"
        style={{ color: theme.accent.text, fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </span>
    </div>
  );
}

function TechStackSVG() {
  const nodes = [
    { x: 200, y: 140, label: "Node.js", sub: "Runtime", size: 38 },
    { x: 340, y: 80, label: "MongoDB", sub: "Database", size: 32 },
    { x: 460, y: 140, label: "Redis", sub: "Cache", size: 28 },
    { x: 400, y: 240, label: "gRPC", sub: "Protocol", size: 30 },
    { x: 260, y: 270, label: "BullMQ", sub: "Queue", size: 26 },
    { x: 130, y: 240, label: "JWT", sub: "Auth", size: 28 },
    { x: 100, y: 140, label: "Express", sub: "Framework", size: 30 },
    { x: 340, y: 190, label: "Zod", sub: "Validation", size: 22 },
    { x: 480, y: 60, label: "React", sub: "UI", size: 26 },
    { x: 90, y: 70, label: "Tailwind", sub: "Styling", size: 24 },
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [1, 7],
    [1, 8],
    [2, 3],
    [5, 6],
    [4, 3],
  ];
  return (
    <svg
      viewBox="0 0 580 320"
      className="w-full h-full"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c} stopOpacity="0.18" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </radialGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={`${c}20`}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.size + 12} fill="url(#node-glow)" />
          <circle
            cx={n.x}
            cy={n.y}
            r={n.size}
            fill={theme.surface[1]}
            stroke={i === 0 ? `${c}50` : `${c}20`}
            strokeWidth={i === 0 ? "1.5" : "1"}
          />
          <text
            x={n.x}
            y={n.y - 3}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={i === 0 ? "9" : "8"}
            fontWeight={i === 0 ? "600" : "500"}
            fill={i === 0 ? c : theme.text.secondary}
            fontFamily="DM Mono, monospace"
          >
            {n.label}
          </text>
          <text
            x={n.x}
            y={n.y + 8}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="7"
            fill={theme.text.muted}
            fontFamily="DM Mono, monospace"
          >
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: theme.bg.base }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% -5%, ${theme.accent.glow}, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.accent.border}, transparent)`,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-28">
        <div className="grid lg:grid-cols-[1fr_480px] gap-14 items-center">
          <div className="flex flex-col gap-6">
            <motion.div {...FADE_UP_INVIEW(inView, 0)}>
              <span
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  color: theme.accent.text,
                  border: `1px solid ${theme.accent.border}`,
                  background: theme.accent.tint,
                }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: c }}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity } as Transition}
                />
                Backend Engineering · Systems · APIs
              </span>
            </motion.div>
            <motion.h1
              {...FADE_UP_INVIEW(inView, 0.1)}
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.06] tracking-tight"
              style={{
                color: theme.text.primary,
                fontFamily: "Syne, sans-serif",
              }}
            >
              Building Systems That{" "}
              <span className="relative inline-block" style={{ color: c }}>
                Solve Real Problems
                <svg
                  viewBox="0 0 380 12"
                  fill="none"
                  className="absolute left-0 w-full"
                  style={{ bottom: "-7px", height: "10px" }}
                  aria-hidden="true"
                >
                  <motion.path
                    d="M2 7 Q80 3 190 7 Q300 11 378 7"
                    stroke={c}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
                    transition={
                      {
                        duration: 1.2,
                        delay: 0.8,
                        ease: "easeInOut",
                      } as Transition
                    }
                  />
                </svg>
              </span>
            </motion.h1>
            <motion.p
              {...FADE_UP_INVIEW(inView, 0.2)}
              className="text-base lg:text-[17px] leading-relaxed max-w-[520px]"
              style={{ color: theme.text.secondary }}
            >
              I focus on backend engineering, scalable APIs, distributed
              systems, and data-intensive applications. Each project below is a
              full case study — architecture decisions, challenges solved, and
              lessons learned.
            </motion.p>
            <motion.div
              {...FADE_UP_INVIEW(inView, 0.3)}
              className="flex flex-wrap gap-3 pt-1"
            >
              <a
                href="#case-studies"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200"
                style={{
                  background: c,
                  color: theme.accent.primaryForeground,
                  boxShadow: `0 0 24px ${c}40`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    theme.accent.primaryHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = c;
                }}
              >
                View Case Studies <ArrowRight size={14} />
              </a>
              <a
                href="/work-with-me"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200"
                style={{
                  color: theme.text.primary,
                  border: `1px solid ${theme.border.default}`,
                  background: theme.surface[1],
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    theme.accent.border;
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    theme.surface[2];
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    theme.border.default;
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    theme.surface[1];
                }}
              >
                Work With Me
              </a>
            </motion.div>
            <motion.div
              {...FADE_UP_INVIEW(inView, 0.4)}
              className="flex flex-wrap items-center gap-2 pt-1"
            >
              {[
                "3 Case Studies",
                "Production-Grade",
                "Security First",
                "Open Source Principles",
              ].map((tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-medium px-2.5 py-1 rounded-md"
                    style={{
                      color: theme.text.tertiary,
                      background: theme.surface[1],
                      border: `1px solid ${theme.border.soft}`,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {tag}
                  </span>
                  {i < 3 && (
                    <span
                      style={{ color: theme.border.medium }}
                      className="text-xs select-none"
                    >
                      ·
                    </span>
                  )}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={
              { duration: 0.8, delay: 0.25, ease: "easeOut" } as Transition
            }
            className="hidden lg:flex flex-col gap-4"
          >
            <span
              className="text-[10px] font-semibold tracking-[0.2em] uppercase text-center"
              style={{
                color: theme.text.muted,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Tech Stack
            </span>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: theme.surface[0],
                border: `1px solid ${theme.border.soft}`,
                height: "340px",
                boxShadow: `0 0 40px ${c}10`,
              }}
            >
              <TechStackSVG />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: "3", l: "Projects" },
                { v: "10+", l: "Tech Used" },
                { v: "2024", l: "Active" },
              ].map((m) => (
                <div
                  key={m.l}
                  className="flex flex-col items-center py-3 rounded-xl"
                  style={{
                    background: theme.surface[1],
                    border: `1px solid ${theme.border.soft}`,
                  }}
                >
                  <span
                    className="text-[16px] font-bold"
                    style={{ color: c, fontFamily: "Syne, sans-serif" }}
                  >
                    {m.v}
                  </span>
                  <span
                    className="text-[9px] mt-0.5"
                    style={{
                      color: theme.text.muted,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {m.l}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${theme.bg.base})`,
        }}
      />
    </section>
  );
}

function Divider() {
  return (
    <div
      className="w-full h-px"
      style={{
        background: `linear-gradient(90deg, transparent, ${theme.border.soft} 30%, ${theme.border.medium} 50%, ${theme.border.soft} 70%, transparent)`,
      }}
    />
  );
}

function KeyFeatureItem({
  icon,
  label,
  detail,
  inView,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  detail: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      {...FADE_UP_INVIEW(inView, delay)}
      className="flex items-start gap-3"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: theme.accent.tintStrong,
          border: `1px solid ${theme.accent.border}`,
          color: c,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          className="text-[13px] font-semibold leading-snug"
          style={{ color: theme.text.primary, fontFamily: "Syne, sans-serif" }}
        >
          {label}
        </p>
        <p
          className="text-[12px] mt-0.5 leading-relaxed"
          style={{ color: theme.text.secondary }}
        >
          {detail}
        </p>
      </div>
    </motion.div>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <span
      className="text-[10px] font-medium px-2.5 py-1 rounded-lg"
      style={{
        color: c,
        background: theme.accent.tint,
        border: `1px solid ${theme.accent.border}`,
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {name}
    </span>
  );
}

function InfoBadge({ name }: { name: string }) {
  return (
    <span
      className="text-[10px] font-medium px-2.5 py-1 rounded-lg"
      style={{
        color: theme.text.secondary,
        background: theme.surface[1],
        border: `1px solid ${theme.border.soft}`,
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {name}
    </span>
  );
}

function MetricCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col gap-1.5 p-4 rounded-xl"
      style={{
        background: theme.surface[1],
        border: `1px solid ${theme.border.soft}`,
      }}
    >
      {icon && <div style={{ color: c }}>{icon}</div>}
      <span
        className="text-[20px] font-bold leading-none"
        style={{ color: c, fontFamily: "Syne, sans-serif" }}
      >
        {value}
      </span>
      <span
        className="text-[10px] leading-snug"
        style={{ color: theme.text.muted, fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </span>
    </div>
  );
}

function SectionDividerLine({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-2">
      <div
        className="flex-1 h-px"
        style={{ background: theme.border.subtle }}
      />
      <span
        className="text-[9px] font-semibold tracking-[0.2em] uppercase"
        style={{ color: theme.text.faint, fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: theme.border.subtle }}
      />
    </div>
  );
}

function BlockquoteInsight({ text }: { text: string }) {
  return (
    <div
      className="flex gap-3 p-5 rounded-xl"
      style={{
        background: theme.bg.base,
        border: `1px solid ${theme.border.subtle}`,
      }}
    >
      <div
        className="w-1 flex-shrink-0 rounded-full self-stretch"
        style={{ background: c }}
      />
      <p
        className="text-[13px] leading-relaxed"
        style={{ color: theme.text.secondary, fontStyle: "italic" }}
      >
        {text}
      </p>
    </div>
  );
}

function ChallengeItem({
  icon,
  title,
  solution,
  inView,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  solution: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      {...FADE_UP_INVIEW(inView, delay)}
      className="relative pl-5"
      style={{ borderLeft: `2px solid ${theme.border.soft}` }}
    >
      <div
        className="absolute -left-[9px] top-0 w-4 h-4 rounded-full flex items-center justify-center"
        style={{
          background: theme.surface[1],
          border: `1px solid ${theme.accent.border}`,
          color: c,
        }}
      >
        {icon}
      </div>
      <p
        className="text-[13px] font-semibold mb-1"
        style={{ color: theme.text.primary, fontFamily: "Syne, sans-serif" }}
      >
        {title}
      </p>
      <p
        className="text-[12.5px] leading-relaxed"
        style={{ color: theme.text.secondary }}
      >
        {solution}
      </p>
    </motion.div>
  );
}

function Project01() {
  const headerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });
  const overviewInView = useInView(overviewRef, { once: true, amount: 0.15 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.1 });
  const challengesInView = useInView(challengesRef, {
    once: true,
    amount: 0.15,
  });
  const archInView = useInView(archRef, { once: true, amount: 0.15 });
  const learnInView = useInView(learnRef, { once: true, amount: 0.2 });

  return (
    <div className="flex flex-col gap-16">
      <div ref={headerRef} className="flex flex-col gap-5">
        <motion.div {...FADE_UP_INVIEW(headerInView, 0)}>
          <SectionLabel label="Case Study 01" />
        </motion.div>
        <motion.div
          {...FADE_UP_INVIEW(headerInView, 0.08)}
          className="flex flex-wrap items-center gap-3"
        >
          <span
            className="text-[9px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              color: c,
              background: theme.accent.tint,
              border: `1px solid ${theme.accent.border}`,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Storage
          </span>
          <span
            className="text-[9px] px-2.5 py-1 rounded-full"
            style={{
              color: theme.text.muted,
              background: theme.surface[1],
              border: `1px solid ${theme.border.soft}`,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            2024
          </span>
          <span
            className="text-[9px] px-2.5 py-1 rounded-full"
            style={{
              color: theme.text.muted,
              background: theme.surface[1],
              border: `1px solid ${theme.border.soft}`,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Full Stack
          </span>
        </motion.div>
        <motion.h2
          {...FADE_UP_INVIEW(headerInView, 0.12)}
          className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.08] tracking-tight"
          style={{ color: theme.text.primary, fontFamily: "Syne, sans-serif" }}
        >
          Cloud Storage Platform
        </motion.h2>
        <motion.p
          {...FADE_UP_INVIEW(headerInView, 0.18)}
          className="text-[15px] lg:text-[17px] leading-relaxed max-w-3xl"
          style={{ color: theme.text.secondary }}
        >
          A scalable cloud storage platform inspired by modern file management
          systems — designed to handle file uploads, directory structures,
          sharing, authentication, and storage management at scale. Built with a
          strong focus on security, performance, and maintainability.
        </motion.p>
        <motion.div
          {...FADE_UP_INVIEW(headerInView, 0.24)}
          className="flex flex-wrap gap-2"
        >
          {[
            "Node.js",
            "Express.js",
            "MongoDB",
            "JWT",
            "Zod",
            "React",
            "Tailwind CSS",
            "Google OAuth",
            "GitHub OAuth",
          ].map((s) => (
            <TechBadge key={s} name={s} />
          ))}
        </motion.div>
      </div>

      <Divider />

      <div ref={overviewRef} className="grid lg:grid-cols-[1fr_320px] gap-10">
        <div className="flex flex-col gap-6">
          <motion.div {...FADE_UP_INVIEW(overviewInView, 0)}>
            <SectionLabel label="Overview" />
          </motion.div>
          <motion.p
            {...FADE_UP_INVIEW(overviewInView, 0.08)}
            className="text-[14px] leading-[1.9]"
            style={{ color: theme.text.secondary }}
          >
            The platform enables users to organize, share, and manage digital
            assets through a seamless web experience. The system was designed
            from the ground up to support a rich set of user-facing features
            while maintaining clean backend architecture, security best
            practices, and data integrity.
          </motion.p>
          <motion.p
            {...FADE_UP_INVIEW(overviewInView, 0.14)}
            className="text-[14px] leading-[1.9]"
            style={{ color: theme.text.secondary }}
          >
            Unlike traditional storage solutions, this platform supports both
            personal and shared workspaces with fine-grained access control —
            enabling users to create public sharing links with configurable
            permissions while keeping private data fully isolated.
          </motion.p>
          <motion.div {...FADE_UP_INVIEW(overviewInView, 0.2)}>
            <BlockquoteInsight text="Security was treated as a first-class concern throughout development — not an afterthought. Every route, token, and data access path was evaluated for injection, traversal, and privilege escalation risks." />
          </motion.div>
        </div>
        <motion.div
          {...FADE_UP_INVIEW(overviewInView, 0.1)}
          className="flex flex-col gap-3"
        >
          <SectionDividerLine label="Key Metrics" />
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              value="99.9%"
              label="Uptime design target"
              icon={<TrendingUp size={14} />}
            />
            <MetricCard
              value="<50ms"
              label="Query response target"
              icon={<Clock size={14} />}
            />
            <MetricCard
              value="6+"
              label="Auth flows supported"
              icon={<Lock size={14} />}
            />
            <MetricCard
              value="RBAC"
              label="Access control model"
              icon={<Shield size={14} />}
            />
          </div>
        </motion.div>
      </div>

      <div ref={featuresRef} className="flex flex-col gap-8">
        <motion.div {...FADE_UP_INVIEW(featuresInView, 0)}>
          <SectionLabel label="Key Features" />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
          <KeyFeatureItem
            inView={featuresInView}
            delay={0.06}
            icon={<Lock size={14} />}
            label="Multi-Provider Authentication"
            detail="Secure login via Google OAuth, GitHub OAuth, and email OTP verification — all backed by JWT-based session management."
          />
          <KeyFeatureItem
            inView={featuresInView}
            delay={0.1}
            icon={<FolderOpen size={14} />}
            label="Hierarchical File System"
            detail="Parent-child folder relationships with recursive traversal, mirroring a real OS file system at the database layer."
          />
          <KeyFeatureItem
            inView={featuresInView}
            delay={0.14}
            icon={<Share2 size={14} />}
            label="Access-Controlled Sharing"
            detail="Generate secure, token-scoped public links for files or folders with configurable visibility and expiry."
          />
          <KeyFeatureItem
            inView={featuresInView}
            delay={0.18}
            icon={<Search size={14} />}
            label="Advanced Search & Filtering"
            detail="Real-time search across file names, types, and metadata — powered by indexed MongoDB queries."
          />
          <KeyFeatureItem
            inView={featuresInView}
            delay={0.22}
            icon={<Trash2 size={14} />}
            label="Trash & Recovery System"
            detail="Soft-delete mechanism with a recoverable trash bin — ensuring no accidental permanent data loss."
          />
          <KeyFeatureItem
            inView={featuresInView}
            delay={0.26}
            icon={<Star size={14} />}
            label="Starred & Recent Tracking"
            detail="User activity tracking for recently accessed and starred files — improving navigation efficiency."
          />
        </div>
      </div>

      <Divider />

      <div ref={challengesRef} className="flex flex-col gap-8">
        <motion.div {...FADE_UP_INVIEW(challengesInView, 0)}>
          <SectionLabel label="Technical Challenges & Solutions" />
        </motion.div>
        <motion.p
          {...FADE_UP_INVIEW(challengesInView, 0.07)}
          className="text-[14px] leading-[1.85]"
          style={{ color: theme.text.secondary }}
        >
          One of the major challenges was designing a scalable file and folder
          hierarchy while maintaining fast retrieval and navigation. Below are
          the critical problems identified and the solutions implemented.
        </motion.p>
        <div className="flex flex-col gap-7">
          <ChallengeItem
            inView={challengesInView}
            delay={0.12}
            icon={<Database size={10} />}
            title="Scalable Hierarchical Data Model"
            solution="Designed a parent-child MongoDB schema where each file and folder stores a reference to its parent ID. This allows O(1) lookups per level, and efficient recursive traversal for operations like folder size calculation or bulk deletion — without expensive recursive joins."
          />
          <ChallengeItem
            inView={challengesInView}
            delay={0.18}
            icon={<Shield size={10} />}
            title="Secure Public File Sharing"
            solution="Implemented token-based public sharing where each shareable link contains a signed, time-scoped token. Access to shared resources is isolated from private user sessions — even if a private file ID is guessed, it cannot be accessed without the valid share token."
          />
          <ChallengeItem
            inView={challengesInView}
            delay={0.24}
            icon={<Lock size={10} />}
            title="NoSQL Injection & XSS Prevention"
            solution="All user inputs are sanitized before reaching the MongoDB query layer. Mongoose schema validation combined with Zod boundary validation ensures no malformed operators can manipulate queries. Helmet.js and Content-Security-Policy headers protect against XSS vectors."
          />
          <ChallengeItem
            inView={challengesInView}
            delay={0.3}
            icon={<Zap size={10} />}
            title="Performance-Optimized Queries"
            solution="Strategic MongoDB indexing on parent IDs, user IDs, and file names reduces query time for folder listing from O(n) table scans to near-constant lookups. Lean queries strip Mongoose overhead for read-heavy operations."
          />
        </div>
      </div>

      <Divider />

      <div ref={archRef} className="flex flex-col gap-8">
        <motion.div {...FADE_UP_INVIEW(archInView, 0)}>
          <SectionLabel label="Architecture & Security" />
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-5">
            <motion.p
              {...FADE_UP_INVIEW(archInView, 0.08)}
              className="text-[14px] leading-[1.85]"
              style={{ color: theme.text.secondary }}
            >
              The backend follows an API-first architecture with a clean
              separation between controllers, services, and data access layers.
              The authentication system is stateless — all session state lives
              inside signed JWTs — making horizontal scaling straightforward.
            </motion.p>
            <motion.div
              {...FADE_UP_INVIEW(archInView, 0.14)}
              className="flex flex-col gap-2.5"
            >
              {[
                {
                  label: "Auth Strategy",
                  value: "JWT stateless + OAuth provider delegation",
                },
                {
                  label: "Data Model",
                  value: "MongoDB parent-child with compound indexing",
                },
                {
                  label: "API Style",
                  value: "RESTful with resource-based routing",
                },
                {
                  label: "Validation",
                  value: "Zod schemas at every request boundary",
                },
                {
                  label: "Rate Limiting",
                  value: "Ready architecture with middleware hooks",
                },
              ].map((row, i) => (
                <motion.div
                  key={row.label}
                  {...FADE_UP_INVIEW(archInView, 0.14 + i * 0.05)}
                  className="flex items-center gap-3 py-2.5"
                  style={{ borderBottom: `1px solid ${theme.border.subtle}` }}
                >
                  <span
                    className="text-[11px] font-semibold w-32 flex-shrink-0"
                    style={{
                      color: theme.text.muted,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    className="text-[12.5px]"
                    style={{ color: theme.text.secondary }}
                  >
                    {row.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div
            {...FADE_UP_INVIEW(archInView, 0.1)}
            className="flex flex-col gap-3"
          >
            <SectionDividerLine label="Security Measures" />
            <div className="flex flex-col gap-2.5">
              {[
                "NoSQL injection prevention via schema enforcement",
                "Cross-site scripting (XSS) protection with Helmet.js",
                "Request sanitization on all user-controlled inputs",
                "Secure authentication workflows with short-lived tokens",
                "Protected API endpoints with JWT middleware",
                "Access-controlled shared resources via signed tokens",
                "Secure token validation with signature verification",
                "Rate-limiting ready architecture",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  {...FADE_UP_INVIEW(archInView, 0.12 + i * 0.04)}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: c }}
                  />
                  <span
                    className="text-[12.5px]"
                    style={{ color: theme.text.secondary }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Divider />

      <div ref={learnRef} className="flex flex-col gap-6">
        <motion.div {...FADE_UP_INVIEW(learnInView, 0)}>
          <SectionLabel label="What I Learned" />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            "Backend architecture design",
            "Secure authentication systems",
            "Data modeling for hierarchical structures",
            "API design best practices",
            "Scalable file management systems",
            "Role-based access control patterns",
            "NoSQL query optimization",
            "OAuth integration flows",
          ].map((item, i) => (
            <motion.div
              key={item}
              {...FADE_UP_INVIEW(learnInView, 0.06 + i * 0.04)}
              className="flex items-start gap-2.5 p-3.5 rounded-xl"
              style={{
                background: theme.surface[1],
                border: `1px solid ${theme.border.soft}`,
              }}
            >
              <BookOpen
                size={12}
                className="flex-shrink-0 mt-0.5"
                style={{ color: c }}
              />
              <span
                className="text-[12px] leading-relaxed"
                style={{ color: theme.text.secondary }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Project02() {
  const headerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });
  const overviewInView = useInView(overviewRef, { once: true, amount: 0.15 });
  const problemInView = useInView(problemRef, { once: true, amount: 0.1 });
  const archInView = useInView(archRef, { once: true, amount: 0.1 });
  const challengesInView = useInView(challengesRef, {
    once: true,
    amount: 0.15,
  });
  const learnInView = useInView(learnRef, { once: true, amount: 0.2 });

  return (
    <div className="flex flex-col gap-16">
      <div ref={headerRef} className="flex flex-col gap-5">
        <motion.div {...FADE_UP_INVIEW(headerInView, 0)}>
          <SectionLabel label="Case Study 02" />
        </motion.div>
        <motion.div
          {...FADE_UP_INVIEW(headerInView, 0.08)}
          className="flex flex-wrap items-center gap-3"
        >
          <span
            className="text-[9px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              color: c,
              background: theme.accent.tint,
              border: `1px solid ${theme.accent.border}`,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Distributed
          </span>
          <span
            className="text-[9px] px-2.5 py-1 rounded-full"
            style={{
              color: theme.text.muted,
              background: theme.surface[1],
              border: `1px solid ${theme.border.soft}`,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            2024
          </span>
          <span
            className="text-[9px] px-2.5 py-1 rounded-full"
            style={{
              color: theme.text.muted,
              background: theme.surface[1],
              border: `1px solid ${theme.border.soft}`,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Backend Systems
          </span>
        </motion.div>
        <motion.h2
          {...FADE_UP_INVIEW(headerInView, 0.12)}
          className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.08] tracking-tight"
          style={{ color: theme.text.primary, fontFamily: "Syne, sans-serif" }}
        >
          Distributed Ticket Booking System
        </motion.h2>
        <motion.p
          {...FADE_UP_INVIEW(headerInView, 0.18)}
          className="text-[15px] lg:text-[17px] leading-relaxed max-w-3xl"
          style={{ color: theme.text.secondary }}
        >
          A distributed ticket booking platform designed to handle
          high-concurrency reservation requests while preventing double bookings
          and maintaining data consistency across services. This project
          explores the real complexities of distributed computing in a domain
          where correctness is non-negotiable.
        </motion.p>
        <motion.div
          {...FADE_UP_INVIEW(headerInView, 0.24)}
          className="flex flex-wrap gap-2"
        >
          {[
            "Node.js",
            "gRPC",
            "Protocol Buffers",
            "MongoDB",
            "Distributed Architecture",
            "Saga Pattern",
          ].map((s) => (
            <TechBadge key={s} name={s} />
          ))}
        </motion.div>
      </div>

      <Divider />

      <div ref={problemRef} className="flex flex-col gap-8">
        <motion.div {...FADE_UP_INVIEW(problemInView, 0)}>
          <SectionLabel label="Problem Statement" />
        </motion.div>
        <div className="grid lg:grid-cols-[1fr_300px] gap-10">
          <div className="flex flex-col gap-5">
            <motion.p
              {...FADE_UP_INVIEW(problemInView, 0.08)}
              className="text-[14px] leading-[1.9]"
              style={{ color: theme.text.secondary }}
            >
              Ticket booking systems operate in one of the most adversarial
              concurrency environments in software engineering. During a popular
              event sale, thousands of users may attempt to reserve the same
              seat within milliseconds of each other. A naive implementation
              will fail — producing double bookings, phantom confirmations, or
              inconsistent inventory.
            </motion.p>
            <motion.p
              {...FADE_UP_INVIEW(problemInView, 0.14)}
              className="text-[14px] leading-[1.9]"
              style={{ color: theme.text.secondary }}
            >
              The challenge intensifies in a distributed architecture: unlike a
              monolith where you can wrap an operation in a database
              transaction, microservices with their own databases cannot share a
              transaction boundary. A booking spans account validation, seat
              allocation, and payment — three services, three databases, zero
              atomicity guarantees by default.
            </motion.p>
            <motion.div {...FADE_UP_INVIEW(problemInView, 0.2)}>
              <BlockquoteInsight text="The core insight: distributed systems don't fail at the happy path — they fail at partial failures. The real engineering is designing systems that degrade gracefully and maintain consistency even when services are unreachable." />
            </motion.div>
          </div>
          <motion.div
            {...FADE_UP_INVIEW(problemInView, 0.1)}
            className="flex flex-col gap-3"
          >
            <SectionDividerLine label="Challenges Addressed" />
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <Users size={13} />,
                  label: "Simultaneous booking attempts",
                },
                {
                  icon: <AlertCircle size={13} />,
                  label: "Seat conflict prevention",
                },
                { icon: <Zap size={13} />, label: "Service failure tolerance" },
                {
                  icon: <GitBranch size={13} />,
                  label: "Distributed TX management",
                },
                {
                  icon: <CheckCircle size={13} />,
                  label: "Consistency across services",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  {...FADE_UP_INVIEW(problemInView, 0.12 + i * 0.06)}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg"
                  style={{
                    background: theme.surface[1],
                    border: `1px solid ${theme.border.soft}`,
                  }}
                >
                  <span style={{ color: c }}>{item.icon}</span>
                  <span
                    className="text-[12px]"
                    style={{ color: theme.text.secondary }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Divider />

      <div ref={overviewRef} className="flex flex-col gap-8">
        <motion.div {...FADE_UP_INVIEW(overviewInView, 0)}>
          <SectionLabel label="Core Features" />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
          <KeyFeatureItem
            inView={overviewInView}
            delay={0.06}
            icon={<Zap size={14} />}
            label="Real-Time Seat Availability"
            detail="Inventory state is read and locked atomically — users see accurate availability without stale cache reads causing phantom confirmations."
          />
          <KeyFeatureItem
            inView={overviewInView}
            delay={0.1}
            icon={<Network size={14} />}
            label="Distributed Service Architecture"
            detail="Three independent services (Account, Booking, Transaction) communicate exclusively via gRPC — no shared database, no shared memory."
          />
          <KeyFeatureItem
            inView={overviewInView}
            delay={0.14}
            icon={<GitBranch size={14} />}
            label="Saga Pattern for Transactions"
            detail="Multi-step booking flows use the Saga pattern — each step has a compensating transaction to roll back partial completions on failure."
          />
          <KeyFeatureItem
            inView={overviewInView}
            delay={0.18}
            icon={<Shield size={14} />}
            label="Fault Tolerance Mechanisms"
            detail="Service-level circuit breakers and retry strategies prevent cascading failures when downstream services degrade under load."
          />
          <KeyFeatureItem
            inView={overviewInView}
            delay={0.22}
            icon={<FileCode size={14} />}
            label="Protocol Buffers"
            detail="All inter-service communication uses strongly-typed Protocol Buffer schemas — reducing payload size and eliminating serialization ambiguity."
          />
          <KeyFeatureItem
            inView={overviewInView}
            delay={0.26}
            icon={<BarChart3 size={14} />}
            label="Transaction Tracking"
            detail="Every booking lifecycle event is recorded — from initial reservation through payment confirmation — enabling full auditability and debugging."
          />
        </div>
      </div>

      <Divider />

      <div ref={archRef} className="flex flex-col gap-8">
        <motion.div {...FADE_UP_INVIEW(archInView, 0)}>
          <SectionLabel label="Architecture Breakdown" />
        </motion.div>
        <motion.p
          {...FADE_UP_INVIEW(archInView, 0.07)}
          className="text-[14px] leading-[1.85]"
          style={{ color: theme.text.secondary }}
        >
          The system is decomposed into three bounded-context microservices,
          each owning its own data store. Communication is exclusively
          synchronous via gRPC for request-response flows, ensuring type safety
          and performance at the protocol layer.
        </motion.p>
        <div className="grid lg:grid-cols-3 gap-4">
          {[
            {
              title: "Account Service",
              icon: <Users size={16} />,
              items: [
                "User registration and profile management",
                "Login and session token issuance",
                "OAuth provider integration",
                "Account status and suspension logic",
              ],
            },
            {
              title: "Booking Service",
              icon: <Server size={16} />,
              items: [
                "Reservation creation and validation",
                "Seat allocation with conflict detection",
                "Booking lifecycle state machine",
                "Inventory locking mechanisms",
              ],
            },
            {
              title: "Transaction Service",
              icon: <BarChart3 size={16} />,
              items: [
                "Payment state tracking and updates",
                "Booking confirmation orchestration",
                "Full transaction history ledger",
                "Saga coordinator for distributed TX",
              ],
            },
          ].map((svc, i) => (
            <motion.div
              key={svc.title}
              {...FADE_UP_INVIEW(archInView, 0.1 + i * 0.1)}
              className="relative rounded-2xl p-6 flex flex-col gap-4 overflow-hidden"
              style={{
                background: theme.surface[0],
                border: `1px solid ${theme.border.soft}`,
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${c}50, transparent)`,
                }}
              />
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: theme.accent.tintStrong,
                    border: `1px solid ${theme.accent.border}`,
                    color: c,
                  }}
                >
                  {svc.icon}
                </div>
                <h4
                  className="text-[14px] font-bold"
                  style={{
                    color: theme.text.primary,
                    fontFamily: "Syne, sans-serif",
                  }}
                >
                  {svc.title}
                </h4>
              </div>
              <div className="flex flex-col gap-2">
                {svc.items.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0 mt-2"
                      style={{ background: c }}
                    />
                    <span
                      className="text-[12px] leading-relaxed"
                      style={{ color: theme.text.secondary }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...FADE_UP_INVIEW(archInView, 0.35)}
          className="grid lg:grid-cols-2 gap-8"
        >
          <div className="flex flex-col gap-5">
            <SectionDividerLine label="Distributed Systems Concepts Applied" />
            <div className="flex flex-col gap-2.5">
              {[
                "gRPC for synchronous inter-service communication",
                "Protocol Buffers for typed, compact serialization",
                "Service isolation with independent data stores",
                "Saga pattern for distributed transaction coordination",
                "Validation checkpoints at every service boundary",
                "Controlled state transitions to prevent illegal states",
                "Conflict prevention via optimistic concurrency control",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  {...FADE_UP_INVIEW(archInView, 0.38 + i * 0.04)}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: c }}
                  />
                  <span
                    className="text-[12.5px]"
                    style={{ color: theme.text.secondary }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            {...FADE_UP_INVIEW(archInView, 0.2)}
            className="flex flex-col gap-3"
          >
            <SectionDividerLine label="System Metrics" />
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                value="Saga"
                label="Transaction pattern used"
                icon={<GitBranch size={14} />}
              />
              <MetricCard
                value="gRPC"
                label="Inter-process protocol"
                icon={<Network size={14} />}
              />
              <MetricCard
                value="3"
                label="Independent microservices"
                icon={<Server size={14} />}
              />
              <MetricCard
                value="Zero"
                label="Double bookings by design"
                icon={<Shield size={14} />}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Divider />

      <div ref={challengesRef} className="flex flex-col gap-8">
        <motion.div {...FADE_UP_INVIEW(challengesInView, 0)}>
          <SectionLabel label="The Hardest Problem: Consistency Under Concurrency" />
        </motion.div>
        <motion.p
          {...FADE_UP_INVIEW(challengesInView, 0.08)}
          className="text-[14px] leading-[1.85]"
          style={{ color: theme.text.secondary }}
        >
          The biggest engineering challenge was maintaining data consistency
          when multiple users simultaneously attempted to reserve the same
          resource. Standard database transactions don't cross service
          boundaries — so the problem required designing a consistency protocol
          at the application layer.
        </motion.p>
        <div className="flex flex-col gap-7">
          <ChallengeItem
            inView={challengesInView}
            delay={0.12}
            icon={<Database size={10} />}
            title="Reservation Locking Strategy"
            solution="Before confirming a seat, the Booking Service acquires an optimistic lock on the seat record. If the lock fails (another process already holds it), the request is rejected immediately with a clear conflict error — no partial state is written."
          />
          <ChallengeItem
            inView={challengesInView}
            delay={0.18}
            icon={<GitBranch size={10} />}
            title="Saga-Based Compensating Transactions"
            solution="When a step in the booking flow fails (e.g. payment rejected after seat was allocated), the Saga coordinator triggers compensating transactions to release the seat and update inventory — ensuring the system never gets stuck in an inconsistent partial state."
          />
          <ChallengeItem
            inView={challengesInView}
            delay={0.24}
            icon={<AlertCircle size={10} />}
            title="Service Failure Handling"
            solution="Each gRPC call has a defined timeout and retry policy. If the Transaction Service is temporarily unreachable, the Booking Service will not proceed — preserving the booking in a pending state for retry rather than assuming success."
          />
        </div>
      </div>

      <Divider />

      <div ref={learnRef} className="flex flex-col gap-6">
        <motion.div {...FADE_UP_INVIEW(learnInView, 0)}>
          <SectionLabel label="Key Learnings" />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            "Distributed systems design patterns",
            "Inter-service communication protocols",
            "Transaction consistency guarantees",
            "High-concurrency backend architecture",
            "Saga and compensating transaction patterns",
            "gRPC service design and protobuf schemas",
            "Fault tolerance and circuit breaker patterns",
            "Service isolation and bounded contexts",
          ].map((item, i) => (
            <motion.div
              key={item}
              {...FADE_UP_INVIEW(learnInView, 0.06 + i * 0.04)}
              className="flex items-start gap-2.5 p-3.5 rounded-xl"
              style={{
                background: theme.surface[1],
                border: `1px solid ${theme.border.soft}`,
              }}
            >
              <BookOpen
                size={12}
                className="flex-shrink-0 mt-0.5"
                style={{ color: c }}
              />
              <span
                className="text-[12px] leading-relaxed"
                style={{ color: theme.text.secondary }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Project03() {
  const headerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });
  const overviewInView = useInView(overviewRef, { once: true, amount: 0.15 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.1 });
  const archInView = useInView(archRef, { once: true, amount: 0.1 });
  const challengesInView = useInView(challengesRef, {
    once: true,
    amount: 0.15,
  });
  const learnInView = useInView(learnRef, { once: true, amount: 0.2 });

  return (
    <div className="flex flex-col gap-16">
      <div ref={headerRef} className="flex flex-col gap-5">
        <motion.div {...FADE_UP_INVIEW(headerInView, 0)}>
          <SectionLabel label="Case Study 03" />
        </motion.div>
        <motion.div
          {...FADE_UP_INVIEW(headerInView, 0.08)}
          className="flex flex-wrap items-center gap-3"
        >
          <span
            className="text-[9px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              color: c,
              background: theme.accent.tint,
              border: `1px solid ${theme.accent.border}`,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Commerce
          </span>
          <span
            className="text-[9px] px-2.5 py-1 rounded-full"
            style={{
              color: theme.text.muted,
              background: theme.surface[1],
              border: `1px solid ${theme.border.soft}`,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            2024
          </span>
          <span
            className="text-[9px] px-2.5 py-1 rounded-full"
            style={{
              color: theme.text.muted,
              background: theme.surface[1],
              border: `1px solid ${theme.border.soft}`,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Backend Architecture
          </span>
        </motion.div>
        <motion.h2
          {...FADE_UP_INVIEW(headerInView, 0.12)}
          className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.08] tracking-tight"
          style={{ color: theme.text.primary, fontFamily: "Syne, sans-serif" }}
        >
          E-Commerce Backend Platform
        </motion.h2>
        <motion.p
          {...FADE_UP_INVIEW(headerInView, 0.18)}
          className="text-[15px] lg:text-[17px] leading-relaxed max-w-3xl"
          style={{ color: theme.text.secondary }}
        >
          A production-style backend system for managing products, users,
          orders, inventory, payments, and business workflows commonly found in
          modern e-commerce platforms. Designed following clean architecture
          principles with a focus on maintainability, scalability, and
          performance.
        </motion.p>
        <motion.div
          {...FADE_UP_INVIEW(headerInView, 0.24)}
          className="flex flex-wrap gap-2"
        >
          {["Node.js", "Express.js", "MongoDB", "JWT", "Zod", "REST APIs"].map(
            (s) => (
              <TechBadge key={s} name={s} />
            ),
          )}
        </motion.div>
      </div>

      <Divider />

      <div ref={overviewRef} className="flex flex-col gap-8">
        <motion.div {...FADE_UP_INVIEW(overviewInView, 0)}>
          <SectionLabel label="Business Context & Goals" />
        </motion.div>
        <div className="grid lg:grid-cols-[1fr_300px] gap-10">
          <div className="flex flex-col gap-5">
            <motion.p
              {...FADE_UP_INVIEW(overviewInView, 0.08)}
              className="text-[14px] leading-[1.9]"
              style={{ color: theme.text.secondary }}
            >
              Modern e-commerce platforms must support large product catalogs,
              complex user management, real-time inventory tracking, and secure
              payment processing — all simultaneously. The typical approach of
              bolting these together results in tightly coupled systems that
              break when requirements change.
            </motion.p>
            <motion.p
              {...FADE_UP_INVIEW(overviewInView, 0.14)}
              className="text-[14px] leading-[1.9]"
              style={{ color: theme.text.secondary }}
            >
              This project was built around a core principle: every major
              concern (users, products, orders, payments) should be
              independently modifiable without touching adjacent modules. Clean
              architecture is not about perfection — it's about making future
              changes cheaper.
            </motion.p>
            <motion.div {...FADE_UP_INVIEW(overviewInView, 0.2)}>
              <BlockquoteInsight text="The goal wasn't to build a feature-complete platform. It was to build an architecture that could become one — where adding a new payment provider or changing inventory logic doesn't require understanding the entire codebase." />
            </motion.div>
          </div>
          <motion.div
            {...FADE_UP_INVIEW(overviewInView, 0.1)}
            className="flex flex-col gap-3"
          >
            <SectionDividerLine label="Platform Metrics" />
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                value="4-Tier"
                label="Layered architecture"
                icon={<Layers size={14} />}
              />
              <MetricCard
                value="Lean"
                label="Query optimization model"
                icon={<Database size={14} />}
              />
              <MetricCard
                value="JWT"
                label="Stateless auth model"
                icon={<Lock size={14} />}
              />
              <MetricCard
                value="REST"
                label="API paradigm"
                icon={<Code2 size={14} />}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <Divider />

      <div ref={featuresRef} className="flex flex-col gap-8">
        <motion.div {...FADE_UP_INVIEW(featuresInView, 0)}>
          <SectionLabel label="Feature Surface" />
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-10">
          {[
            {
              label: "User Management",
              icon: <Users size={15} />,
              items: [
                "Registration, login, and email verification",
                "JWT-based stateless authentication",
                "Role-based access (admin vs. customer)",
                "Profile management and password handling",
              ],
            },
            {
              label: "Product Management",
              icon: <Package size={15} />,
              items: [
                "Full product CRUD with category support",
                "Real-time inventory tracking on updates",
                "Bulk product operations for admin workflows",
                "Search and filtering with indexed queries",
              ],
            },
            {
              label: "Order Management",
              icon: <ShoppingCart size={15} />,
              items: [
                "Cart creation and checkout workflow",
                "Order status lifecycle (pending → shipped → delivered)",
                "Full purchase history with pagination",
                "Cancellation and refund request handling",
              ],
            },
            {
              label: "Administrative Controls",
              icon: <Settings size={15} />,
              items: [
                "Product and user administration panel APIs",
                "Inventory monitoring and threshold alerts",
                "Operational reporting endpoints",
                "Audit logging for sensitive operations",
              ],
            },
          ].map((section, i) => (
            <motion.div
              key={section.label}
              {...FADE_UP_INVIEW(featuresInView, 0.08 + i * 0.08)}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    background: theme.accent.tintStrong,
                    border: `1px solid ${theme.accent.border}`,
                    color: c,
                  }}
                >
                  {section.icon}
                </div>
                <h4
                  className="text-[14px] font-bold"
                  style={{
                    color: theme.text.primary,
                    fontFamily: "Syne, sans-serif",
                  }}
                >
                  {section.label}
                </h4>
              </div>
              <div className="flex flex-col gap-2 pl-9">
                {section.items.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0 mt-2"
                      style={{ background: `${c}60` }}
                    />
                    <span
                      className="text-[12.5px] leading-relaxed"
                      style={{ color: theme.text.secondary }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Divider />

      <div ref={archRef} className="flex flex-col gap-8">
        <motion.div {...FADE_UP_INVIEW(archInView, 0)}>
          <SectionLabel label="Clean Architecture & Performance" />
        </motion.div>
        <motion.p
          {...FADE_UP_INVIEW(archInView, 0.08)}
          className="text-[14px] leading-[1.85]"
          style={{ color: theme.text.secondary }}
        >
          The application is structured into four distinct layers — each with a
          single, well-defined responsibility. This separation means controllers
          never talk to the database, and services never parse HTTP requests.
          Changes in one layer don't cascade into others.
        </motion.p>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            {[
              {
                num: "01",
                label: "Controllers",
                desc: "Handle HTTP request parsing, response formatting, and route-level validation. No business logic lives here.",
              },
              {
                num: "02",
                label: "Services",
                desc: "Contain all business logic and workflow orchestration. This is where orders are processed and inventory is decremented.",
              },
              {
                num: "03",
                label: "Data Layer",
                desc: "Responsible for persistence and retrieval. Uses lean queries, projections, and compound indexes to minimize payload and query time.",
              },
              {
                num: "04",
                label: "Validation Layer",
                desc: "Zod schemas enforce data shape and type at every service boundary — inbound and outbound — before any logic runs.",
              },
            ].map((layer, i) => (
              <motion.div
                key={layer.label}
                {...FADE_UP_INVIEW(archInView, 0.1 + i * 0.08)}
                className="flex items-start gap-4 py-4"
                style={{ borderBottom: `1px solid ${theme.border.subtle}` }}
              >
                <span
                  className="text-[11px] font-bold flex-shrink-0 w-8 pt-0.5"
                  style={{
                    color: `${c}60`,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {layer.num}
                </span>
                <div>
                  <p
                    className="text-[13px] font-bold mb-1"
                    style={{
                      color: theme.text.primary,
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    {layer.label}
                  </p>
                  <p
                    className="text-[12.5px] leading-relaxed"
                    style={{ color: theme.text.secondary }}
                  >
                    {layer.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <SectionDividerLine label="Performance Optimizations" />
            <div className="flex flex-col gap-2.5">
              {[
                "Strategic MongoDB indexing on high-traffic query fields",
                "Lean queries to strip Mongoose document overhead",
                "Efficient pagination with cursor-based navigation",
                "Projection-only queries to avoid over-fetching data",
                "Modular service design for isolated caching",
                "Input validation before any database call is made",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  {...FADE_UP_INVIEW(archInView, 0.12 + i * 0.05)}
                  className="flex items-start gap-2.5"
                >
                  <Zap
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: c }}
                  />
                  <span
                    className="text-[12.5px]"
                    style={{ color: theme.text.secondary }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
            <SectionDividerLine label="Security Features" />
            <div className="flex flex-col gap-2.5">
              {[
                "JWT authentication with route-level middleware",
                "Zod request validation on every endpoint",
                "Input sanitization against injection attacks",
                "Protected admin routes with role verification",
                "Secure password hashing with bcrypt",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  {...FADE_UP_INVIEW(archInView, 0.3 + i * 0.05)}
                  className="flex items-start gap-2.5"
                >
                  <Shield
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: c }}
                  />
                  <span
                    className="text-[12.5px]"
                    style={{ color: theme.text.secondary }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <div ref={challengesRef} className="flex flex-col gap-8">
        <motion.div {...FADE_UP_INVIEW(challengesInView, 0)}>
          <SectionLabel label="Core Engineering Challenge" />
        </motion.div>
        <motion.p
          {...FADE_UP_INVIEW(challengesInView, 0.08)}
          className="text-[14px] leading-[1.85]"
          style={{ color: theme.text.secondary }}
        >
          Designing an extensible order-processing workflow was the most
          structurally demanding part of this project. The goal: make every
          major dependency replaceable without touching unrelated code.
        </motion.p>
        <div className="flex flex-col gap-7">
          <ChallengeItem
            inView={challengesInView}
            delay={0.12}
            icon={<ShoppingCart size={10} />}
            title="Replaceable Payment Providers"
            solution="The payment layer is defined as an abstract interface. The concrete implementation (Stripe, Razorpay, etc.) is injected at runtime. Swapping providers requires changing one configuration value — not refactoring order logic."
          />
          <ChallengeItem
            inView={challengesInView}
            delay={0.18}
            icon={<Package size={10} />}
            title="Isolated Business Rules"
            solution="Inventory decrement, order status transitions, and discount calculations all live in their own service modules. Each rule is tested independently and can be updated without understanding the broader request lifecycle."
          />
          <ChallengeItem
            inView={challengesInView}
            delay={0.24}
            icon={<TrendingUp size={10} />}
            title="Non-Breaking Feature Addition"
            solution="The layered architecture means new features — like loyalty points, bulk orders, or subscription products — can be introduced as new service modules without modifying existing controllers, routes, or data schemas."
          />
        </div>
      </div>

      <Divider />

      <div ref={learnRef} className="flex flex-col gap-6">
        <motion.div {...FADE_UP_INVIEW(learnInView, 0)}>
          <SectionLabel label="Key Learnings" />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            "Large-scale backend architecture",
            "Service-oriented design patterns",
            "E-commerce workflow modeling",
            "Clean architecture principles",
            "API scalability patterns",
            "Security best practices",
            "MongoDB optimization strategies",
            "Dependency injection and testability",
          ].map((item, i) => (
            <motion.div
              key={item}
              {...FADE_UP_INVIEW(learnInView, 0.06 + i * 0.04)}
              className="flex items-start gap-2.5 p-3.5 rounded-xl"
              style={{
                background: theme.surface[1],
                border: `1px solid ${theme.border.soft}`,
              }}
            >
              <BookOpen
                size={12}
                className="flex-shrink-0 mt-0.5"
                style={{ color: c }}
              />
              <span
                className="text-[12px] leading-relaxed"
                style={{ color: theme.text.secondary }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadCTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ background: theme.bg.base }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 65% at 50% 50%, ${c}08, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.border.soft} 50%, transparent 100%)`,
        }}
      />
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          {...FADE_UP_INVIEW(inView, 0)}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <SectionLabel label="Interested in building something similar?" />
        </motion.div>
        <motion.h2
          {...FADE_UP_INVIEW(inView, 0.1)}
          className="text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.08] tracking-tight mb-5"
          style={{ color: theme.text.primary, fontFamily: "Syne, sans-serif" }}
        >
          Some of the best products start with a{" "}
          <span style={{ color: c }}>simple conversation.</span>
        </motion.h2>
        <motion.p
          {...FADE_UP_INVIEW(inView, 0.18)}
          className="text-base lg:text-[17px] leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: theme.text.secondary }}
        >
          Whether you're building a scalable backend, a distributed system, or a
          data-driven application — I'd love to discuss your project and explore
          how I can help turn your ideas into reliable software.
        </motion.p>
        <motion.div
          {...FADE_UP_INVIEW(inView, 0.26)}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <a
            href="/work-with-me"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[12px] font-semibold transition-all duration-200"
            style={{
              background: c,
              color: theme.accent.primaryForeground,
              boxShadow: `0 0 32px ${c}40`,
              fontFamily: "'DM Mono', monospace",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                theme.accent.primaryHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = c;
            }}
          >
            <MessageSquare size={13} /> Work With Me
          </a>
          <a
            href="mailto:contact@bhupesh.me"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[12px] font-semibold transition-all duration-200"
            style={{
              color: theme.text.primary,
              border: `1px solid ${theme.border.default}`,
              background: theme.surface[1],
              fontFamily: "'DM Mono', monospace",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                theme.accent.border;
              (e.currentTarget as HTMLAnchorElement).style.background =
                theme.surface[2];
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                theme.border.default;
              (e.currentTarget as HTMLAnchorElement).style.background =
                theme.surface[1];
            }}
          >
            <Mail size={13} /> Send an Email
          </a>
        </motion.div>
        <motion.div
          {...FADE_UP_INVIEW(inView, 0.34)}
          className="flex items-center justify-center gap-3"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Scalable backends",
              "Distributed systems",
              "AI integrations",
              "API architecture",
              "Security engineering",
            ].map((tag) => (
              <InfoBadge key={tag} name={tag} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const caseStudies = [
  {
    id: "01",
    title: "Cloud Storage Platform",
    tag: "Storage",
    component: <Project01 />,
  },
  {
    id: "02",
    title: "Distributed Ticket Booking",
    tag: "Distributed",
    component: <Project02 />,
  },
  {
    id: "03",
    title: "E-Commerce Backend",
    tag: "Commerce",
    component: <Project03 />,
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("01");

  return (
    <main>
      <HeroSection />

      <section
        id="case-studies"
        className="relative overflow-hidden"
        style={{ background: theme.bg.subtle }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${theme.bg.base} 0%, ${theme.bg.subtle} 8%, ${theme.bg.muted} 100%)`,
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${theme.border.soft} 50%, transparent 100%)`,
          }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8">
          <div
            className="sticky top-0 py-4 z-20"
            style={{
              background: `${theme.bg.subtle}ee`,
              backdropFilter: "blur(12px)",
              borderBottom: `1px solid ${theme.border.subtle}`,
            }}
          >
            <div className="flex items-center gap-1">
              {caseStudies.map((cs) => (
                <button
                  key={cs.id}
                  onClick={() => setActiveTab(cs.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-semibold transition-all duration-200"
                  style={{
                    color: activeTab === cs.id ? c : theme.text.muted,
                    background:
                      activeTab === cs.id
                        ? theme.accent.tintStrong
                        : "transparent",
                    border: `1px solid ${activeTab === cs.id ? theme.accent.border : "transparent"}`,
                    fontFamily: "'DM Mono', monospace",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      color:
                        activeTab === cs.id
                          ? `${c}70`
                          : `${theme.text.muted}60`,
                    }}
                  >
                    {cs.id}
                  </span>
                  <span className="hidden sm:inline">{cs.title}</span>
                  <span className="sm:hidden">{cs.tag}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {caseStudies.map(
              (cs) =>
                cs.id === activeTab && (
                  <motion.div
                    key={cs.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={
                      { duration: 0.4, ease: "easeOut" } as Transition
                    }
                    className="py-20 lg:py-28"
                  >
                    {cs.component}
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </section>

      <LeadCTASection />
    </main>
  );
}
