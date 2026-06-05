"use client";

import { useRef } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import theme from "@/config/theme.config";
import FlowVisual from "./FlowVisual";

const c = theme.accent.primary;

const cards = [
  {
    index: "01",
    title: "Launch New Products",
    problem: "Turn ideas into real software.",
    body: "Whether it's a startup MVP, internal platform, SaaS product, or customer portal — I help transform requirements into production-ready applications that ship.",
    steps: ["Idea", "Design", "Build", "Launch"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2.5L13 8H18.5L14 11.5L16 18L10 14L4 18L6 11.5L1.5 8H7L10 2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Build Scalable Systems",
    problem: "Software often works at first.",
    body: "The challenge begins when users, traffic, and complexity increase. I design architectures that remain maintainable and performant as products grow.",
    steps: ["Users", "API", "Cache", "Queue", "Workers"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <rect
          x="2"
          y="13"
          width="4"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="8"
          y="9"
          width="4"
          height="9"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="4"
          width="4"
          height="14"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Integrate AI Into Products",
    problem: "AI is most valuable inside real workflows.",
    body: "From intelligent search and document processing to automation and LLM-powered features — I help teams integrate AI into products users actually use.",
    steps: ["Data", "AI Model", "Insights", "Users"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 2V5M10 15V18M2 10H5M15 10H18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4.93 4.93L7.05 7.05M12.95 12.95L15.07 15.07M4.93 15.07L7.05 12.95M12.95 7.05L15.07 4.93"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    index: "04",
    title: "Improve Existing Applications",
    problem: "Not every project starts from scratch.",
    body: "Sometimes the highest impact comes from improving architecture, performance, developer experience, and system reliability of what already exists.",
    steps: ["Current System", "Analysis", "Refactor", "Improved"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 10C3 6.13 6.13 3 10 3C12.76 3 15.16 4.56 16.4 6.86"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17 10C17 13.87 13.87 17 10 17C7.24 17 4.84 15.44 3.6 13.14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14.5 4L17 6.86L14.5 6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 16L3 13.14L5.5 13.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function SeamlessBackground() {
  const dim = "rgba(255,255,255,0.03)";
  const ac = theme.accent.primary;
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${theme.bg.base} 0%, ${theme.bg.subtle} 40%, ${theme.bg.muted} 100%)`,
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wib-circuit-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="30%" stopColor="white" stopOpacity="0.6" />
            <stop offset="55%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="wib-circuit-mask">
            <rect width="1200" height="900" fill="url(#wib-circuit-fade)" />
          </mask>
          <linearGradient id="wib-dot-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="35%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="wib-dot-mask">
            <rect width="1200" height="900" fill="url(#wib-dot-fade)" />
          </mask>
          <pattern
            id="wib-dots"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0.8" cy="0.8" r="0.8" fill="rgba(255,255,255,0.032)" />
          </pattern>
        </defs>

        <g mask="url(#wib-circuit-mask)">
          <line
            x1="0"
            y1="100"
            x2="1200"
            y2="100"
            stroke={dim}
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="280"
            x2="1200"
            y2="280"
            stroke={dim}
            strokeWidth="1"
          />
          <line
            x1="150"
            y1="0"
            x2="150"
            y2="500"
            stroke={dim}
            strokeWidth="1"
          />
          <line
            x1="400"
            y1="0"
            x2="400"
            y2="500"
            stroke={dim}
            strokeWidth="1"
          />
          <line
            x1="800"
            y1="0"
            x2="800"
            y2="500"
            stroke={dim}
            strokeWidth="1"
          />
          <line
            x1="1050"
            y1="0"
            x2="1050"
            y2="500"
            stroke={dim}
            strokeWidth="1"
          />
          <path
            d="M150 100 L150 180 L260 180 L260 280"
            stroke={`${ac}18`}
            strokeWidth="1.5"
          />
          <path
            d="M400 100 L400 180 L540 180"
            stroke={`${ac}15`}
            strokeWidth="1.5"
          />
          <path
            d="M800 100 L800 180 L940 180 L940 280 L1050 280"
            stroke={`${ac}18`}
            strokeWidth="1.5"
          />
          <path
            d="M150 280 L280 280 L280 380 L400 380 L400 280"
            stroke={`${ac}12`}
            strokeWidth="1.5"
          />
          <circle
            cx="150"
            cy="100"
            r="4"
            fill="none"
            stroke={`${ac}30`}
            strokeWidth="1.5"
          />
          <circle cx="150" cy="100" r="1.5" fill={`${ac}50`} />
          <circle
            cx="400"
            cy="100"
            r="4"
            fill="none"
            stroke={`${ac}30`}
            strokeWidth="1.5"
          />
          <circle cx="400" cy="100" r="1.5" fill={`${ac}50`} />
          <circle
            cx="800"
            cy="100"
            r="4"
            fill="none"
            stroke={`${ac}28`}
            strokeWidth="1.5"
          />
          <circle cx="800" cy="100" r="1.5" fill={`${ac}45`} />
          <circle
            cx="260"
            cy="180"
            r="3.5"
            fill="none"
            stroke={`${ac}22`}
            strokeWidth="1.5"
          />
          <circle cx="260" cy="180" r="1.5" fill={`${ac}38`} />
          <circle
            cx="940"
            cy="180"
            r="3.5"
            fill="none"
            stroke={`${ac}22`}
            strokeWidth="1.5"
          />
          <circle cx="940" cy="180" r="1.5" fill={`${ac}38`} />
          <circle
            cx="400"
            cy="280"
            r="5"
            fill="none"
            stroke={`${ac}28`}
            strokeWidth="1.5"
          />
          <circle cx="400" cy="280" r="2" fill={`${ac}45`} />
          <rect
            x="142"
            y="92"
            width="16"
            height="16"
            rx="2"
            fill="none"
            stroke={`${ac}18`}
            strokeWidth="1"
          />
          <rect
            x="392"
            y="92"
            width="16"
            height="16"
            rx="2"
            fill="none"
            stroke={`${ac}18`}
            strokeWidth="1"
          />
          <rect
            x="792"
            y="92"
            width="16"
            height="16"
            rx="2"
            fill="none"
            stroke={`${ac}15`}
            strokeWidth="1"
          />
          <rect
            x="1042"
            y="272"
            width="16"
            height="16"
            rx="2"
            fill="none"
            stroke={`${ac}12`}
            strokeWidth="1"
          />
        </g>

        <rect
          width="1200"
          height="900"
          fill="url(#wib-dots)"
          mask="url(#wib-dot-mask)"
        />

        <circle
          cx="950"
          cy="200"
          r="120"
          fill="none"
          stroke={`${ac}06`}
          strokeWidth="1"
        />
        <circle
          cx="950"
          cy="200"
          r="180"
          fill="none"
          stroke={`${ac}04`}
          strokeWidth="1"
        />
        <circle
          cx="250"
          cy="700"
          r="100"
          fill="none"
          stroke={`${ac}05`}
          strokeWidth="1"
        />
        <circle
          cx="250"
          cy="700"
          r="160"
          fill="none"
          stroke={`${ac}03`}
          strokeWidth="1"
        />
      </svg>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 38% at 88% 18%, ${theme.accent.glowSubtle}, transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 45% 42% at 8% 82%, ${theme.accent.glowSubtle}, transparent 60%)`,
        }}
      />
    </>
  );
}

function CardCornerDecor({ index }: { index: number }) {
  const patterns = [
    <svg
      key="0"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <line x1="0" y1="20" x2="20" y2="0" stroke={`${c}12`} strokeWidth="1" />
      <line x1="0" y1="36" x2="36" y2="0" stroke={`${c}10`} strokeWidth="1" />
      <line x1="0" y1="52" x2="52" y2="0" stroke={`${c}08`} strokeWidth="1" />
      <line x1="0" y1="68" x2="68" y2="0" stroke={`${c}06`} strokeWidth="1" />
      <circle
        cx="18"
        cy="18"
        r="2.5"
        fill="none"
        stroke={`${c}30`}
        strokeWidth="1"
      />
      <circle cx="18" cy="18" r="1" fill={`${c}50`} />
      <circle
        cx="34"
        cy="6"
        r="2"
        fill="none"
        stroke={`${c}22`}
        strokeWidth="1"
      />
      <circle
        cx="8"
        cy="34"
        r="1.5"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1"
      />
      <path
        d="M18 18 L34 6"
        stroke={`${c}15`}
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <path
        d="M18 18 L8 34"
        stroke={`${c}12`}
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <rect
        x="10"
        y="10"
        width="16"
        height="16"
        rx="2"
        fill="none"
        stroke={`${c}10`}
        strokeWidth="0.8"
      />
    </svg>,

    <svg
      key="1"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 0 Q20 20 0 40"
        stroke={`${c}10`}
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M0 0 Q35 35 0 70"
        stroke={`${c}08`}
        strokeWidth="1"
        fill="none"
      />
      <line x1="0" y1="0" x2="60" y2="0" stroke={`${c}10`} strokeWidth="1" />
      <line x1="0" y1="0" x2="0" y2="60" stroke={`${c}10`} strokeWidth="1" />
      <circle
        cx="28"
        cy="12"
        r="3"
        fill="none"
        stroke={`${c}28`}
        strokeWidth="1.2"
      />
      <circle cx="28" cy="12" r="1" fill={`${c}45`} />
      <circle
        cx="12"
        cy="28"
        r="3"
        fill="none"
        stroke={`${c}28`}
        strokeWidth="1.2"
      />
      <circle cx="12" cy="28" r="1" fill={`${c}45`} />
      <line
        x1="28"
        y1="12"
        x2="12"
        y2="28"
        stroke={`${c}18`}
        strokeWidth="1"
        strokeDasharray="3 2"
      />
      <rect
        x="6"
        y="6"
        width="10"
        height="10"
        rx="1.5"
        fill="none"
        stroke={`${c}15`}
        strokeWidth="0.8"
      />
    </svg>,

    <svg
      key="2"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="0"
        cy="0"
        r="30"
        fill="none"
        stroke={`${c}08`}
        strokeWidth="1"
      />
      <circle
        cx="0"
        cy="0"
        r="50"
        fill="none"
        stroke={`${c}05`}
        strokeWidth="1"
      />
      <line x1="0" y1="16" x2="16" y2="0" stroke={`${c}14`} strokeWidth="1" />
      <line x1="0" y1="32" x2="32" y2="0" stroke={`${c}10`} strokeWidth="1" />
      <line x1="0" y1="48" x2="48" y2="0" stroke={`${c}07`} strokeWidth="1" />
      <circle
        cx="22"
        cy="8"
        r="2.5"
        fill="none"
        stroke={`${c}32`}
        strokeWidth="1"
      />
      <circle cx="22" cy="8" r="1" fill={`${c}55`} />
      <circle
        cx="8"
        cy="22"
        r="2.5"
        fill="none"
        stroke={`${c}28`}
        strokeWidth="1"
      />
      <circle cx="8" cy="22" r="1" fill={`${c}45`} />
      <path
        d="M22 8 L8 22"
        stroke={`${c}20`}
        strokeWidth="1"
        strokeDasharray="2 2"
      />
    </svg>,

    <svg
      key="3"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 10 L10 0 L30 0 L0 30 Z" fill={`${c}04`} />
      <line x1="0" y1="24" x2="24" y2="0" stroke={`${c}12`} strokeWidth="1" />
      <line x1="0" y1="42" x2="42" y2="0" stroke={`${c}09`} strokeWidth="1" />
      <line x1="0" y1="58" x2="58" y2="0" stroke={`${c}06`} strokeWidth="1" />
      <circle
        cx="16"
        cy="16"
        r="3.5"
        fill="none"
        stroke={`${c}30`}
        strokeWidth="1.2"
      />
      <circle cx="16" cy="16" r="1.2" fill={`${c}50`} />
      <circle
        cx="32"
        cy="4"
        r="2"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1"
      />
      <circle
        cx="4"
        cy="32"
        r="2"
        fill="none"
        stroke={`${c}20`}
        strokeWidth="1"
      />
      <line
        x1="16"
        y1="16"
        x2="32"
        y2="4"
        stroke={`${c}16`}
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <line
        x1="16"
        y1="16"
        x2="4"
        y2="32"
        stroke={`${c}14`}
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <rect
        x="8"
        y="8"
        width="14"
        height="14"
        rx="2"
        fill="none"
        stroke={`${c}10`}
        strokeWidth="0.8"
      />
    </svg>,
  ];
  return (
    <div
      className="absolute top-0 left-0 pointer-events-none overflow-hidden rounded-tl-2xl"
      style={{ width: 80, height: 80 }}
    >
      {patterns[index % 4]}
    </div>
  );
}

function Card({
  card,
  index: cardIndex,
  inView,
}: {
  card: (typeof cards)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={
        {
          duration: 0.55,
          delay: 0.2 + cardIndex * 0.13,
          ease: "easeOut",
        } as Transition
      }
      className="group relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: theme.surface[0],
        border: `1px solid ${theme.border.soft}`,
        boxShadow: `0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${c}55 35%, ${c}85 52%, ${c}55 68%, transparent 100%)`,
          opacity: 0.75,
        }}
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 55% at 50% 0%, ${c}06, transparent 75%)`,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${c}90, transparent)`,
        }}
      />

      <CardCornerDecor index={cardIndex} />

      <div className="relative z-10 flex flex-col h-full p-5 gap-0">
        <div className="flex items-start justify-between mb-4 pl-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: theme.accent.tintStrong,
              border: `1px solid ${theme.accent.border}`,
              color: c,
            }}
          >
            {card.icon}
          </div>
          <span
            className="text-[30px] font-bold leading-none select-none"
            style={{
              color: `${c}10`,
              fontFamily: "Syne, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            {card.index}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 mb-3">
          <h3
            className="text-[15px] font-bold leading-snug"
            style={{
              color: theme.text.primary,
              fontFamily: "Syne, sans-serif",
            }}
          >
            {card.title}
          </h3>
          <p
            className="text-[11px] font-medium"
            style={{
              color: c,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.01em",
            }}
          >
            {card.problem}
          </p>
        </div>

        <p
          className="text-[13px] leading-relaxed mb-5 flex-1"
          style={{ color: theme.text.secondary, lineHeight: "1.75" }}
        >
          {card.body}
        </p>

        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: theme.bg.base,
            border: `1px solid ${theme.border.subtle}`,
          }}
        >
          <div
            className="flex items-center gap-2 px-3.5 pt-2.5 pb-2"
            style={{ borderBottom: `1px solid ${theme.border.subtle}` }}
          >
            <div className="flex gap-1">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: `${c}60` }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: `${c}35` }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: `${c}18` }}
              />
            </div>
            <span
              className="text-[9px] font-semibold tracking-[0.2em] uppercase flex-1 text-center"
              style={{
                color: theme.text.muted,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              pipeline
            </span>
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: c }}
              animate={inView ? { opacity: [0.4, 1, 0.4] } : {}}
              transition={
                {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: cardIndex * 0.3,
                } as Transition
              }
            />
          </div>
          <div className="px-3 py-3">
            <FlowVisual
              steps={card.steps}
              inView={inView}
              cardIndex={cardIndex}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhatIBuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.25 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.08 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28 lg:py-36"
    >
      <SeamlessBackground />

      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.border.soft} 50%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div
          ref={headerRef}
          className="grid lg:grid-cols-[1fr_auto] gap-10 items-end mb-16 lg:mb-20"
        >
          <div className="flex flex-col gap-5 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={
                headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
              }
              transition={
                { duration: 0.5, delay: 0, ease: "easeOut" } as Transition
              }
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
                What I Build
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
              className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-[1.06] tracking-tight"
              style={{
                color: theme.text.primary,
                fontFamily: "Syne, sans-serif",
              }}
            >
              From Early Ideas To{" "}
              <span className="relative inline-block" style={{ color: c }}>
                Production-Ready
                <svg
                  viewBox="0 0 260 10"
                  fill="none"
                  className="absolute left-0 w-full"
                  style={{ bottom: "-5px", height: "9px" }}
                  aria-hidden="true"
                >
                  <motion.path
                    d="M2 6 C50 2, 100 8, 150 5 C200 2, 232 7, 258 6"
                    stroke={c}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      headerInView ? { pathLength: 1, opacity: 0.65 } : {}
                    }
                    transition={
                      {
                        duration: 1,
                        delay: 0.55,
                        ease: "easeInOut",
                      } as Transition
                    }
                  />
                </svg>
              </span>{" "}
              Software.
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
              Every product starts with a problem. Some teams need a scalable
              backend. Some need an MVP to validate an idea. Others need AI
              capabilities integrated into an existing product.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={
              headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
            }
            transition={
              { duration: 0.55, delay: 0.3, ease: "easeOut" } as Transition
            }
            className="hidden lg:flex flex-col gap-4 items-end"
          >
            <div
              className="flex flex-col gap-0 rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${theme.border.soft}`,
                minWidth: "200px",
              }}
            >
              {[
                { label: "Concept → MVP", pct: "100%" },
                { label: "MVP → Scale", pct: "75%" },
                { label: "Scale → AI", pct: "50%" },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 px-4 py-2.5"
                  style={{
                    background: i === 0 ? theme.surface[1] : theme.surface[0],
                    borderTop:
                      i > 0 ? `1px solid ${theme.border.subtle}` : "none",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: i === 0 ? c : theme.border.medium }}
                  />
                  <span
                    className="text-[10px] flex-1"
                    style={{
                      color: i === 0 ? theme.text.secondary : theme.text.muted,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {row.label}
                  </span>
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ width: "48px", background: theme.surface[3] }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: i === 0 ? c : `${c}40` }}
                      initial={{ width: 0 }}
                      animate={headerInView ? { width: row.pct } : { width: 0 }}
                      transition={
                        {
                          duration: 0.8,
                          delay: 0.5 + i * 0.15,
                          ease: "easeOut",
                        } as Transition
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {cards.map((card, i) => (
            <Card key={card.index} card={card} index={i} inView={cardsInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={
            { duration: 0.55, delay: 0.75, ease: "easeOut" } as Transition
          }
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-8"
          style={{ borderTop: `1px solid ${theme.border.soft}` }}
        >
          <div className="flex flex-col gap-1">
            <p
              className="text-sm font-semibold"
              style={{
                color: theme.text.primary,
                fontFamily: "Syne, sans-serif",
              }}
            >
              Ready to solve a problem together?
            </p>
            <p
              className="text-[11px]"
              style={{
                color: theme.text.muted,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Let&apos;s talk about what you&apos;re building.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              {["MVP", "SaaS", "AI", "Platform"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-md"
                  style={{
                    color: theme.text.muted,
                    background: theme.surface[1],
                    border: `1px solid ${theme.border.soft}`,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200 group"
              style={{
                background: theme.accent.tintStrong,
                color: c,
                border: `1px solid ${theme.accent.border}`,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Let&apos;s Talk
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
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
        </motion.div>
      </div>
    </section>
  );
}
