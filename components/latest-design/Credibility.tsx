"use client";

import { useRef } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import theme from "@/config/theme.config";

const expertise = [
  { label: "Full Stack Development", delay: 0 },
  { label: "Backend Architecture", delay: 0.07 },
  { label: "AI Integrations", delay: 0.14 },
  { label: "System Design", delay: 0.21 },
  { label: "Product Engineering", delay: 0.28 },
  { label: "Open Source", delay: 0.35 },
];

const stats = [
  { value: "10+", label: "Projects Shipped" },
  { value: "2+", label: "Years Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

function CircuitBackground() {
  const c = theme.accent.primary;
  const dim = "rgba(255,255,255,0.03)";

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="0" y1="120" x2="1200" y2="120" stroke={dim} strokeWidth="1" />
      <line x1="0" y1="350" x2="1200" y2="350" stroke={dim} strokeWidth="1" />
      <line x1="0" y1="580" x2="1200" y2="580" stroke={dim} strokeWidth="1" />
      <line x1="160" y1="0" x2="160" y2="700" stroke={dim} strokeWidth="1" />
      <line x1="420" y1="0" x2="420" y2="700" stroke={dim} strokeWidth="1" />
      <line x1="780" y1="0" x2="780" y2="700" stroke={dim} strokeWidth="1" />
      <line x1="1040" y1="0" x2="1040" y2="700" stroke={dim} strokeWidth="1" />
      <path
        d="M160 120 L160 200 L260 200 L260 350"
        stroke={`${c}18`}
        strokeWidth="1.5"
      />
      <path
        d="M420 350 L420 240 L560 240 L560 120"
        stroke={`${c}18`}
        strokeWidth="1.5"
      />
      <path
        d="M780 120 L780 200 L900 200 L900 350 L1040 350"
        stroke={`${c}18`}
        strokeWidth="1.5"
      />
      <path
        d="M160 580 L300 580 L300 480 L420 480 L420 350"
        stroke={`${c}14`}
        strokeWidth="1.5"
      />
      <path
        d="M780 580 L780 480 L920 480 L920 350"
        stroke={`${c}14`}
        strokeWidth="1.5"
      />
      <circle
        cx="160"
        cy="120"
        r="4"
        fill="none"
        stroke={`${c}30`}
        strokeWidth="1.5"
      />
      <circle cx="160" cy="120" r="1.5" fill={`${c}50`} />
      <circle
        cx="420"
        cy="120"
        r="4"
        fill="none"
        stroke={`${c}30`}
        strokeWidth="1.5"
      />
      <circle cx="420" cy="120" r="1.5" fill={`${c}50`} />
      <circle
        cx="780"
        cy="120"
        r="4"
        fill="none"
        stroke={`${c}30`}
        strokeWidth="1.5"
      />
      <circle cx="780" cy="120" r="1.5" fill={`${c}50`} />
      <circle
        cx="1040"
        cy="120"
        r="4"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1.5"
      />
      <circle
        cx="260"
        cy="200"
        r="3.5"
        fill="none"
        stroke={`${c}25`}
        strokeWidth="1.5"
      />
      <circle cx="260" cy="200" r="1.5" fill={`${c}40`} />
      <circle
        cx="560"
        cy="240"
        r="3.5"
        fill="none"
        stroke={`${c}25`}
        strokeWidth="1.5"
      />
      <circle cx="560" cy="240" r="1.5" fill={`${c}40`} />
      <circle
        cx="900"
        cy="200"
        r="3.5"
        fill="none"
        stroke={`${c}25`}
        strokeWidth="1.5"
      />
      <circle cx="900" cy="200" r="1.5" fill={`${c}40`} />
      <circle
        cx="420"
        cy="350"
        r="5"
        fill="none"
        stroke={`${c}35`}
        strokeWidth="1.5"
      />
      <circle cx="420" cy="350" r="2" fill={`${c}55`} />
      <circle
        cx="780"
        cy="350"
        r="5"
        fill="none"
        stroke={`${c}35`}
        strokeWidth="1.5"
      />
      <circle cx="780" cy="350" r="2" fill={`${c}55`} />
      <circle
        cx="1040"
        cy="350"
        r="4"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1.5"
      />
      <circle
        cx="300"
        cy="480"
        r="3.5"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1.5"
      />
      <circle
        cx="920"
        cy="480"
        r="3.5"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1.5"
      />
      <circle
        cx="160"
        cy="580"
        r="3.5"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1.5"
      />
      <circle
        cx="780"
        cy="580"
        r="3.5"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1.5"
      />
      <rect
        x="152"
        y="112"
        width="16"
        height="16"
        rx="2"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1"
      />
      <rect
        x="412"
        y="342"
        width="16"
        height="16"
        rx="2"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1"
      />
      <rect
        x="772"
        y="112"
        width="16"
        height="16"
        rx="2"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1"
      />
      <rect
        x="772"
        y="342"
        width="16"
        height="16"
        rx="2"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1"
      />
      <line
        x1="140"
        y1="200"
        x2="152"
        y2="200"
        stroke={`${c}18`}
        strokeWidth="1.5"
      />
      <line
        x1="168"
        y1="200"
        x2="180"
        y2="200"
        stroke={`${c}18`}
        strokeWidth="1.5"
      />
      <rect
        x="126"
        y="192"
        width="14"
        height="16"
        rx="2"
        fill="none"
        stroke={`${c}18`}
        strokeWidth="1"
      />
      <line
        x1="404"
        y1="240"
        x2="392"
        y2="240"
        stroke={`${c}15`}
        strokeWidth="1.5"
      />
      <line
        x1="436"
        y1="240"
        x2="448"
        y2="240"
        stroke={`${c}15`}
        strokeWidth="1.5"
      />
      <rect
        x="404"
        y="232"
        width="16"
        height="16"
        rx="2"
        fill="none"
        stroke={`${c}15`}
        strokeWidth="1"
      />
      <line
        x1="884"
        y1="350"
        x2="872"
        y2="350"
        stroke={`${c}15`}
        strokeWidth="1.5"
      />
      <line
        x1="916"
        y1="350"
        x2="928"
        y2="350"
        stroke={`${c}15`}
        strokeWidth="1.5"
      />
      <rect
        x="884"
        y="342"
        width="16"
        height="16"
        rx="2"
        fill="none"
        stroke={`${c}15`}
        strokeWidth="1"
      />
      <circle
        cx="600"
        cy="350"
        r="60"
        fill="none"
        stroke={`${c}08`}
        strokeWidth="1"
      />
      <circle
        cx="600"
        cy="350"
        r="100"
        fill="none"
        stroke={`${c}05`}
        strokeWidth="1"
      />
      <circle
        cx="600"
        cy="350"
        r="140"
        fill="none"
        stroke={`${c}04`}
        strokeWidth="1"
      />
    </svg>
  );
}

function ArchDiagram({ inView }: { inView: boolean }) {
  const c = theme.accent.primary;

  const nodeConfigs = [
    {
      id: "client",
      x: 200,
      y: 52,
      label: "CLIENT",
      sub: "Browser / App",
      isPrimary: true,
    },
    {
      id: "gateway",
      x: 200,
      y: 148,
      label: "API GATEWAY",
      sub: "Rate limit · Auth",
      isPrimary: false,
    },
    {
      id: "auth",
      x: 82,
      y: 252,
      label: "AUTH",
      sub: "JWT · OAuth",
      isPrimary: false,
    },
    {
      id: "logic",
      x: 200,
      y: 252,
      label: "CORE LOGIC",
      sub: "Business layer",
      isPrimary: false,
    },
    {
      id: "ai",
      x: 318,
      y: 252,
      label: "AI ENGINE",
      sub: "LLM · Vectors",
      isPrimary: false,
    },
    {
      id: "db",
      x: 116,
      y: 356,
      label: "DATABASE",
      sub: "Postgres · Redis",
      isPrimary: false,
    },
    {
      id: "cache",
      x: 284,
      y: 356,
      label: "CACHE",
      sub: "In-memory store",
      isPrimary: false,
    },
  ];

  const edges = [
    { x1: 200, y1: 76, x2: 200, y2: 124 },
    { x1: 200, y1: 172, x2: 82, y2: 228 },
    { x1: 200, y1: 172, x2: 200, y2: 228 },
    { x1: 200, y1: 172, x2: 318, y2: 228 },
    { x1: 82, y1: 276, x2: 116, y2: 332 },
    { x1: 200, y1: 276, x2: 116, y2: 332 },
    { x1: 200, y1: 276, x2: 284, y2: 332 },
    { x1: 318, y1: 276, x2: 284, y2: 332 },
  ];

  return (
    <svg
      viewBox="0 0 400 420"
      className="w-full h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="primaryGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c} stopOpacity="0.25" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nodeBg" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor={theme.surface[2] || "#1a1a1a"}
            stopOpacity="1"
          />
          <stop
            offset="100%"
            stopColor={theme.surface[1] || "#111"}
            stopOpacity="1"
          />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {edges.map((e, i) => {
        const dx = e.x2 - e.x1;
        const dy = e.y2 - e.y1;
        const mx = e.x1 + dx * 0.5;
        const my = e.y1 + dy * 0.5;
        const pathD = `M ${e.x1} ${e.y1} C ${e.x1} ${my} ${e.x2} ${my} ${e.x2} ${e.y2}`;
        return (
          <motion.path
            key={i}
            d={pathD}
            stroke={`${c}28`}
            strokeWidth={1.5}
            strokeDasharray="5 4"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={
              {
                duration: 0.6,
                delay: 0.3 + i * 0.07,
                ease: "easeInOut",
              } as Transition
            }
          />
        );
      })}

      {edges.map((e, i) => {
        const dx = e.x2 - e.x1;
        const dy = e.y2 - e.y1;
        const mx = e.x1 + dx * 0.5;
        const my = e.y1 + dy * 0.5;
        const pathD = `M ${e.x1} ${e.y1} C ${e.x1} ${my} ${e.x2} ${my} ${e.x2} ${e.y2}`;
        return (
          <motion.path
            key={`glow-${i}`}
            d={pathD}
            stroke={`${c}15`}
            strokeWidth={4}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={
              {
                duration: 0.6,
                delay: 0.3 + i * 0.07,
                ease: "easeInOut",
              } as Transition
            }
          />
        );
      })}

      {nodeConfigs.map((n, i) => {
        const w = n.isPrimary ? 112 : 100;
        const h = n.isPrimary ? 48 : 48;
        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={
              inView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.8, y: 8 }
            }
            transition={
              {
                duration: 0.45,
                delay: 0.15 + i * 0.1,
                ease: "easeOut",
              } as Transition
            }
            style={{ originX: `${n.x}px`, originY: `${n.y}px` }}
          >
            {n.isPrimary && (
              <rect
                x={n.x - w / 2 - 4}
                y={n.y - h / 2 - 4}
                width={w + 8}
                height={h + 8}
                rx={12}
                fill={`${c}08`}
                stroke={`${c}20`}
                strokeWidth={1}
              />
            )}

            <rect
              x={n.x - w / 2}
              y={n.y - h / 2}
              width={w}
              height={h}
              rx={8}
              fill="url(#nodeBg)"
              stroke={
                n.isPrimary ? `${c}60` : `${theme.border?.default || "#333"}60`
              }
              strokeWidth={n.isPrimary ? 1.5 : 1}
            />

            {n.isPrimary && (
              <>
                <rect
                  x={n.x - w / 2}
                  y={n.y - h / 2}
                  width={w}
                  height={h}
                  rx={8}
                  fill="none"
                  stroke={c}
                  strokeWidth={1}
                  opacity={0.3}
                />
                <rect
                  x={n.x - 20}
                  y={n.y - h / 2}
                  width={40}
                  height={2}
                  rx={1}
                  fill={c}
                  opacity={0.8}
                />
              </>
            )}

            {!n.isPrimary && (
              <rect
                x={n.x - w / 2}
                y={n.y - h / 2}
                width={w}
                height={2}
                rx={1}
                fill={`${c}30`}
              />
            )}

            <text
              x={n.x}
              y={n.y - 7}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={n.isPrimary ? 9.5 : 8.5}
              fontFamily="'DM Mono', monospace"
              fill={n.isPrimary ? c : theme.text?.primary || "#fff"}
              fontWeight="600"
              letterSpacing="0.08em"
            >
              {n.label}
            </text>

            <text
              x={n.x}
              y={n.y + 9}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={7.5}
              fontFamily="'DM Mono', monospace"
              fill={theme.text?.muted || "#666"}
              fontWeight="400"
            >
              {n.sub}
            </text>

            {n.isPrimary && (
              <motion.circle
                cx={n.x + w / 2 - 10}
                cy={n.y - h / 2 + 10}
                r={3}
                fill={c}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={
                  {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  } as Transition
                }
              />
            )}
          </motion.g>
        );
      })}

      <motion.circle
        cx={200}
        r={3.5}
        fill={c}
        filter="url(#glow)"
        initial={{ opacity: 0, cy: 76 }}
        animate={
          inView
            ? {
                cy: [76, 124, 148, 172, 252, 332, 356],
                opacity: [0, 1, 1, 1, 1, 1, 0],
              }
            : { opacity: 0, cy: 76 }
        }
        transition={
          {
            duration: 2.8,
            delay: 1.4,
            repeat: Infinity,
            repeatDelay: 2.2,
            ease: "linear",
            times: [0, 0.15, 0.25, 0.35, 0.6, 0.85, 1],
          } as Transition
        }
      />

      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1.8 } as Transition}
      >
        <rect
          x="10"
          y="390"
          width="10"
          height="10"
          rx="2"
          fill="none"
          stroke={`${c}40`}
          strokeWidth="1"
        />
        <text
          x="26"
          y="399"
          fontSize="8"
          fontFamily="'DM Mono', monospace"
          fill={theme.text?.muted || "#555"}
        >
          Request flow
        </text>
        <line
          x1="100"
          y1="395"
          x2="114"
          y2="395"
          stroke={`${c}28`}
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <text
          x="120"
          y="399"
          fontSize="8"
          fontFamily="'DM Mono', monospace"
          fill={theme.text?.muted || "#555"}
        >
          Data layer
        </text>
        <circle cx="195" cy="395" r="3" fill={c} opacity="0.7" />
        <text
          x="204"
          y="399"
          fontSize="8"
          fontFamily="'DM Mono', monospace"
          fill={theme.text?.muted || "#555"}
        >
          Active
        </text>
      </motion.g>
    </svg>
  );
}

export default function Credibility() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 32 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
    transition: { duration: 0.65, delay, ease: "easeOut" } as Transition,
  });

  return (
    <section
      ref={sectionRef}
      style={{ background: theme.bg.base }}
      className="relative overflow-hidden py-12 lg:py-18"
    >
      <CircuitBackground />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${theme.accent.glow}, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 35% 40% at 15% 50%, ${theme.accent.glowSubtle}, transparent)`,
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.accent.border} 40%, ${theme.accent.border} 60%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.border.soft} 50%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_280px] gap-16 items-start">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <motion.div {...fadeUp(0)}>
                <span
                  className="inline-flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full"
                  style={{
                    color: theme.accent.text,
                    border: `1px solid ${theme.accent.border}`,
                    background: theme.accent.tint,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <rect
                      x="1"
                      y="1"
                      width="6"
                      height="6"
                      rx="1"
                      stroke={theme.accent.primary}
                      strokeWidth="1.5"
                    />
                    <rect
                      x="2.5"
                      y="2.5"
                      width="3"
                      height="3"
                      rx="0.5"
                      fill={theme.accent.primary}
                    />
                  </svg>
                  Trusted Expertise
                </span>
              </motion.div>

              <motion.h2
                {...fadeUp(0.08)}
                className="text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.08] tracking-tight"
                style={{
                  color: theme.text.primary,
                  fontFamily: "Syne, sans-serif",
                }}
              >
                Building Products With{" "}
                <span
                  className="relative inline-block"
                  style={{ color: theme.accent.primary }}
                >
                  Engineering
                  <svg
                    viewBox="0 0 210 8"
                    fill="none"
                    className="absolute left-0 w-full"
                    style={{ bottom: "-4px", height: "8px" }}
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M2 5 C40 2, 80 7, 120 4 C160 1, 185 6, 208 5"
                      stroke={theme.accent.primary}
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
                      transition={
                        {
                          duration: 0.9,
                          delay: 0.5,
                          ease: "easeInOut",
                        } as Transition
                      }
                    />
                  </svg>
                </span>{" "}
                First Principles.
              </motion.h2>

              <motion.p
                {...fadeUp(0.16)}
                className="text-base lg:text-[17px] leading-relaxed max-w-[520px]"
                style={{ color: theme.text.secondary }}
              >
                From scalable backend systems and modern full-stack applications
                to AI-powered experiences, I focus on building software that is
                reliable, maintainable, and designed for long-term growth.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 } as Transition}
              className="flex flex-wrap gap-3"
            >
              {expertise.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16, scale: 0.94 }}
                  animate={
                    inView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 16, scale: 0.94 }
                  }
                  transition={
                    {
                      duration: 0.45,
                      delay: 0.35 + item.delay,
                      ease: "easeOut",
                    } as Transition
                  }
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="group relative cursor-default"
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                    style={{ background: theme.accent.glowStrong }}
                  />
                  <span
                    className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                    style={{
                      color: theme.text.secondary,
                      border: `1px solid ${theme.border.default}`,
                      background: theme.surface[1],
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "12.5px",
                    }}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: theme.accent.primary }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={
                        {
                          duration: 2,
                          delay: item.delay,
                          repeat: Infinity,
                          ease: "easeInOut",
                        } as Transition
                      }
                    />
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              {...fadeUp(0.55)}
              className="grid grid-cols-3 gap-0 pt-4"
              style={{ borderTop: `1px solid ${theme.border.soft}` }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-1 pt-6 pr-8"
                  style={{
                    borderRight:
                      i < 2 ? `1px solid ${theme.border.soft}` : "none",
                    paddingLeft: i > 0 ? "2rem" : 0,
                  }}
                >
                  <span
                    className="text-3xl font-bold tracking-tight"
                    style={{
                      color: theme.accent.primary,
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-xs leading-snug"
                    style={{
                      color: theme.text.muted,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={
              { duration: 0.7, delay: 0.25, ease: "easeOut" } as Transition
            }
            className="flex flex-col gap-4 lg:sticky lg:top-24 mt-4 lg:mt-0"
          >
            <div
              className="relative rounded-2xl overflow-hidden p-5"
              style={{
                background: theme.surface[0],
                border: `1px solid ${theme.border.soft}`,
                boxShadow: `0 0 60px ${theme.accent.glowSubtle}, 0 8px 32px rgba(0,0,0,0.5)`,
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${theme.accent.border}, transparent)`,
                }}
              />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center"
                    style={{
                      background: theme.accent.tintStrong,
                      border: `1px solid ${theme.accent.border}`,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <rect
                        x="1"
                        y="1"
                        width="3.5"
                        height="3.5"
                        rx="0.8"
                        fill={theme.accent.primary}
                        opacity="0.9"
                      />
                      <rect
                        x="5.5"
                        y="1"
                        width="3.5"
                        height="3.5"
                        rx="0.8"
                        fill={theme.accent.primary}
                        opacity="0.5"
                      />
                      <rect
                        x="1"
                        y="5.5"
                        width="3.5"
                        height="3.5"
                        rx="0.8"
                        fill={theme.accent.primary}
                        opacity="0.5"
                      />
                      <rect
                        x="5.5"
                        y="5.5"
                        width="3.5"
                        height="3.5"
                        rx="0.8"
                        fill={theme.accent.primary}
                        opacity="0.9"
                      />
                    </svg>
                  </div>
                  <span
                    className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                    style={{
                      color: theme.text.muted,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    System Arch
                  </span>
                </div>
                <span
                  className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full"
                  style={{
                    color: theme.accent.textMuted,
                    fontFamily: "'DM Mono', monospace",
                    background: theme.accent.tint,
                    border: `1px solid ${theme.accent.border}`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: theme.accent.primary }}
                  />
                  live
                </span>
              </div>

              <ArchDiagram inView={inView} />

              <div
                className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to top, ${theme.surface[0]}, transparent)`,
                }}
              />
            </div>

            <div
              className="rounded-xl px-4 py-3 flex items-start gap-3"
              style={{
                background: theme.surface[1],
                border: `1px solid ${theme.border.soft}`,
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{
                  background: theme.accent.tintStrong,
                  border: `1px solid ${theme.accent.border}`,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 6 L5 10 L11 2"
                    stroke={theme.accent.primary}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-xs font-medium"
                  style={{
                    color: theme.text.primary,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  Production-Ready
                </span>
                <span
                  className="text-[11px] leading-relaxed"
                  style={{ color: theme.text.muted }}
                >
                  Every system designed to scale, fail gracefully, and ship
                  fast.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
