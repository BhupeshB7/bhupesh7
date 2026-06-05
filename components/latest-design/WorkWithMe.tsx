"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import theme from "@/config/theme.config";
import CustomScrollbar from "@/components/latest-design/CustomScrollbar";
import ProjectConsultant from "../project-consultant";

const c = theme.accent.primary;

const CONTACT = {
  email: "contact@bhupesh.me",
  whatsapp: "+918581869783",
  whatsappMessage: "Hi Bhupesh, I'd like to discuss a project.",
} as const;

const services = [
  {
    index: "01",
    title: "Web Applications",
    body: "Custom web platforms, dashboards, portals, and business applications designed around your workflow and goals.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <rect
          x="1"
          y="3"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="1"
          y1="7"
          x2="19"
          y2="7"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="4" cy="5" r="1" fill="currentColor" />
        <circle cx="7" cy="5" r="1" fill="currentColor" />
        <rect
          x="4"
          y="10"
          width="5"
          height="4"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    index: "02",
    title: "SaaS Products",
    body: "From idea validation to production-ready software, helping founders turn concepts into real products.",
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
    index: "03",
    title: "Internal Business Tools",
    body: "Replacing repetitive manual processes with systems that save time, reduce errors, and improve efficiency.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <rect
          x="2"
          y="5"
          width="16"
          height="11"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 5V4C6 2.9 6.9 2 8 2H12C13.1 2 14 2.9 14 4V5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7 10H13M7 13H11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    index: "04",
    title: "AI-Powered Solutions",
    body: "Integrating AI into workflows, customer experiences, automation pipelines, and operational processes.",
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
    index: "05",
    title: "Backend Systems & APIs",
    body: "Building scalable systems, integrations, automation services, and infrastructure that power modern applications.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <rect
          x="2"
          y="4"
          width="16"
          height="4"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="2"
          y="12"
          width="16"
          height="4"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="15" cy="6" r="1" fill="currentColor" />
        <circle cx="15" cy="14" r="1" fill="currentColor" />
        <circle cx="12" cy="6" r="1" fill="currentColor" />
        <circle cx="12" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    index: "06",
    title: "Existing Product Improvements",
    body: "Performance optimization, architecture reviews, workflow improvements, feature expansion, and technical guidance.",
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

const audience = [
  {
    title: "Business Owners",
    body: "Businesses often rely on manual processes, spreadsheets, and disconnected tools. Software can streamline operations and create better customer experiences.",
    tag: "Operations",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect
          x="3"
          y="9"
          width="14"
          height="9"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 9V7C6 4.79 7.79 3 10 3C12.21 3 14 4.79 14 7V9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="10" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Startup Founders",
    body: "Have an idea but need an MVP to validate it? Looking for technical guidance before investing heavily in development? Let's find the best path forward.",
    tag: "Growth",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
    title: "Growing Teams",
    body: "As products evolve, systems become more complex. Whether improving architecture, introducing automation, or integrating AI — there are always opportunities ahead.",
    tag: "Scale",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle
          cx="10"
          cy="6"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="4.5"
          cy="13"
          r="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="15.5"
          cy="13"
          r="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 8.5C10 8.5 10 10.5 7 11.5M10 8.5C10 8.5 10 10.5 13 11.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Developers & Teams",
    body: "Sometimes an external perspective helps. Whether facing architectural challenges, evaluating technical decisions, or needing implementation guidance — let's talk.",
    tag: "Technical",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M7 6L3 10L7 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 6L17 10L13 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 4L9 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const collaborationTypes = [
  {
    title: "Project-Based",
    body: "For businesses, founders, and teams looking to build a specific product or solve a defined problem within a clear scope.",
    tag: "Fixed Scope",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <rect
          x="3"
          y="3"
          width="14"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7 7H13M7 10H11M7 13H10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Long-Term Collaboration",
    body: "For teams that need ongoing support, feature development, product evolution, and continuous improvement over time.",
    tag: "Ongoing",
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
  {
    title: "Technical Consulting",
    body: "For discussions around architecture, scalability, AI opportunities, technical strategy, and implementation planning.",
    tag: "Advisory",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <circle
          cx="10"
          cy="10"
          r="7.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 6.5V10.5L12.5 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Product Discovery",
    body: "For early-stage ideas that need technical direction, feasibility analysis, and roadmap planning before development begins.",
    tag: "Exploration",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M13.5 13.5L17 17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 9H11M9 7V11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const steps = [
  {
    num: "01",
    title: "Share Your Idea",
    body: "Tell me about your idea, challenge, or project. No requirements document needed — just explain what you're trying to achieve.",
  },
  {
    num: "02",
    title: "Personal Review",
    body: "I'll review the information personally, evaluate possible approaches, and think through the technical direction.",
  },
  {
    num: "03",
    title: "Schedule a Call",
    body: "If it looks like a good fit, we'll schedule a conversation to discuss goals, requirements, and next steps together.",
  },
  {
    num: "04",
    title: "Recommended Approach",
    body: "You'll receive a clear project direction, implementation plan, and recommended approach tailored to your goals.",
  },
  {
    num: "05",
    title: "Start Building",
    body: "If we're aligned, we move forward and start turning your idea into production-ready software.",
  },
];

const chatMessages = [
  {
    role: "bot",
    text: "Hi! I'm Bhupesh's AI project assistant. Tell me what you're trying to build — no technical knowledge required.",
  },
  {
    role: "bot",
    text: "What kind of challenge or opportunity are you working on?",
  },
  {
    role: "user",
    text: "I want to automate my restaurant's order management and improve the customer experience.",
  },
  {
    role: "bot",
    text: "Great use case. Is this for in-house dining, delivery, or both? And do you have any existing systems, or starting fresh?",
  },
  {
    role: "user",
    text: "Both. We currently use WhatsApp and spreadsheets. I also want a kitchen display and an analytics dashboard.",
  },
  {
    role: "bot",
    text: "Perfect — I have a clear picture. I'll prepare a structured project summary covering the platform, integrations, and a suggested roadmap. Sending it to Bhupesh for review now.",
  },
];

function HeroBg() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${theme.bg.base} 0%, ${theme.bg.subtle} 70%, ${theme.bg.muted} 100%)`,
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-wave-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="15%" stopColor="white" stopOpacity="0.9" />
            <stop offset="85%" stopColor="white" stopOpacity="0.9" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-wave-vfade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="hero-wave-mask">
            <rect width="1200" height="700" fill="url(#hero-wave-fade)" />
          </mask>
        </defs>
        <g mask="url(#hero-wave-mask)">
          <path
            d="M0 140 Q150 100 300 140 Q450 180 600 140 Q750 100 900 140 Q1050 180 1200 140"
            stroke={`${c}13`}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 220 Q150 180 300 220 Q450 260 600 220 Q750 180 900 220 Q1050 260 1200 220"
            stroke={`${c}10`}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 300 Q150 260 300 300 Q450 340 600 300 Q750 260 900 300 Q1050 340 1200 300"
            stroke={`${c}08`}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M0 380 Q150 340 300 380 Q450 420 600 380 Q750 340 900 380 Q1050 420 1200 380"
            stroke={`${c}06`}
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M0 460 Q150 420 300 460 Q450 500 600 460 Q750 420 900 460 Q1050 500 1200 460"
            stroke={`${c}04`}
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M0 540 Q150 500 300 540 Q450 580 600 540 Q750 500 900 540 Q1050 580 1200 540"
            stroke={`${c}03`}
            strokeWidth="1"
            fill="none"
          />
        </g>
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 75% 55% at 50% -5%, ${c}14, transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 38% 42% at 92% 55%, ${c}07, transparent)`,
        }}
      />
    </>
  );
}

function ServicesBg() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${theme.bg.muted} 0%, ${theme.bg.subtle} 30%, ${theme.bg.subtle} 70%, ${theme.bg.base} 100%)`,
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
          <linearGradient id="svc-v-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="20%" stopColor="white" stopOpacity="1" />
            <stop offset="80%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="svc-v-mask">
            <rect width="1200" height="900" fill="url(#svc-v-fade)" />
          </mask>
        </defs>
        <g mask="url(#svc-v-mask)">
          <path
            d="M-80 600 Q200 380 520 520 Q840 660 1100 440 Q1180 400 1280 460"
            stroke={`${c}09`}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-80 700 Q200 480 520 620 Q840 760 1100 540 Q1180 500 1280 560"
            stroke={`${c}07`}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-80 800 Q200 580 520 720 Q840 860 1100 640 Q1180 600 1280 660"
            stroke={`${c}05`}
            strokeWidth="1"
            fill="none"
          />
          <circle cx="520" cy="520" r="4" fill={`${c}22`} />
          <circle cx="840" cy="620" r="3" fill={`${c}18`} />
          <circle cx="280" cy="580" r="3" fill={`${c}15`} />
          <circle cx="960" cy="500" r="2.5" fill={`${c}14`} />
          <circle cx="160" cy="650" r="2.5" fill={`${c}12`} />
          <circle cx="1060" cy="570" r="2.5" fill={`${c}12`} />
        </g>
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 40% at 80% 20%, ${theme.accent.glowSubtle}, transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 45% 35% at 15% 80%, ${theme.accent.glowSubtle}, transparent 60%)`,
        }}
      />
    </>
  );
}

function AudienceBg() {
  const spokes = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${theme.bg.muted} 0%, ${theme.bg.subtle} 30%, ${theme.bg.subtle} 70%, ${theme.bg.base} 100%)`,
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="aud-rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="aud-mask">
            <rect width="1200" height="700" fill="url(#aud-rg)" />
          </mask>
        </defs>
        <g mask="url(#aud-mask)">
          {spokes.map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x2 = 600 + Math.cos(rad) * 520;
            const y2 = 350 + Math.sin(rad) * 520;
            return (
              <line
                key={angle}
                x1={600}
                y1={350}
                x2={x2}
                y2={y2}
                stroke={`${c}07`}
                strokeWidth="1"
              />
            );
          })}
          <circle
            cx="600"
            cy="350"
            r="100"
            fill="none"
            stroke={`${c}09`}
            strokeWidth="1"
          />
          <circle
            cx="600"
            cy="350"
            r="200"
            fill="none"
            stroke={`${c}07`}
            strokeWidth="1"
          />
          <circle
            cx="600"
            cy="350"
            r="320"
            fill="none"
            stroke={`${c}05`}
            strokeWidth="1"
          />
          <circle
            cx="600"
            cy="350"
            r="460"
            fill="none"
            stroke={`${c}03`}
            strokeWidth="1"
          />
        </g>
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 45% at 50% 50%, ${c}05, transparent 70%)`,
        }}
      />
    </>
  );
}

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

function CardBase({
  children,
  delay,
  inView,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  inView: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" } as Transition}
      className={`group relative flex flex-col rounded-2xl overflow-hidden ${className}`}
      style={{
        background: theme.surface[0],
        border: `1px solid ${theme.border.soft}`,
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[1.5px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${c}50 35%, ${c}80 52%, ${c}50 68%, transparent 100%)`,
          opacity: 0.7,
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${c}06, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

function ProjectDiscoveryCard() {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: theme.surface[0],
        border: `1px solid ${theme.border.soft}`,
        boxShadow: `0 0 48px ${c}12, 0 8px 40px rgba(0,0,0,0.45)`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${c}70, transparent)`,
        }}
      />
      <div
        className="flex items-center gap-3 px-4 py-3.5"
        style={{ borderBottom: `1px solid ${theme.border.subtle}` }}
      >
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{
            background: theme.accent.tintStrong,
            border: `1px solid ${theme.accent.border}`,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path
              d="M14 2H2C1.45 2 1 2.45 1 3V10C1 10.55 1.45 11 2 11H5V14.5L9.5 11H14C14.55 11 15 10.55 15 10V3C15 2.45 14.55 2 14 2Z"
              stroke={c}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p
            className="text-[11px] font-bold"
            style={{
              color: theme.text.primary,
              fontFamily: "Syne, sans-serif",
            }}
          >
            AI Project Discovery
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#22c55e" }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity } as Transition}
            />
            <span
              className="text-[9px]"
              style={{
                color: theme.text.muted,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Online · Ready to help
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          {[`${c}60`, `${c}35`, `${c}18`].map((bg, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: bg }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {[
          {
            role: "bot",
            text: "Hi! Tell me what you're trying to build. I'll help structure your idea.",
          },
          {
            role: "user",
            text: "I want to automate my restaurant operations.",
          },
          {
            role: "bot",
            text: "Great! Is this for in-house orders, delivery, or both?",
          },
          { role: "user", text: "Both. Plus kitchen display and analytics." },
        ].map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              {
                delay: 0.5 + i * 0.18,
                duration: 0.4,
                ease: "easeOut",
              } as Transition
            }
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "bot" && (
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: theme.accent.tintStrong,
                  border: `1px solid ${theme.accent.border}`,
                }}
              >
                <span
                  style={{
                    color: c,
                    fontSize: "7px",
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 700,
                  }}
                >
                  AI
                </span>
              </div>
            )}
            <div
              className="rounded-xl px-3 py-2 max-w-[82%]"
              style={
                msg.role === "bot"
                  ? {
                      background: theme.surface[2],
                      border: `1px solid ${theme.border.subtle}`,
                      borderTopLeftRadius: "4px",
                    }
                  : {
                      background: theme.accent.tintStrong,
                      border: `1px solid ${theme.accent.border}`,
                      borderTopRightRadius: "4px",
                    }
              }
            >
              <p
                className="text-[10.5px] leading-relaxed"
                style={{
                  color: msg.role === "bot" ? theme.text.secondary : c,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {msg.text}
              </p>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.4 } as Transition}
          className="flex gap-2"
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              background: theme.accent.tintStrong,
              border: `1px solid ${theme.accent.border}`,
            }}
          >
            <span
              style={{
                color: c,
                fontSize: "7px",
                fontFamily: "'DM Mono', monospace",
                fontWeight: 700,
              }}
            >
              AI
            </span>
          </div>
          <div
            className="rounded-xl px-3 py-2"
            style={{
              background: theme.surface[2],
              border: `1px solid ${theme.border.subtle}`,
              borderTopLeftRadius: "4px",
            }}
          >
            <div className="flex gap-1 items-center h-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: theme.text.muted }}
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                  transition={
                    {
                      duration: 1,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    } as Transition
                  }
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-4 pb-4">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: theme.bg.base,
            border: `1px solid ${theme.border.default}`,
          }}
        >
          <span
            className="text-[10px] flex-1"
            style={{
              color: theme.text.muted,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Describe your idea...
          </span>
          <div
            className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: c }}
          >
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6H10M7 3L10 6L7 9"
                stroke={theme.accent.primaryForeground}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: theme.bg.base }}
    >
      <HeroBg />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${c}30, transparent)`,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-28">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 } as Transition}
            >
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
                Let's Build
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
              }
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] tracking-tight"
              style={{
                color: theme.text.primary,
                fontFamily: "Syne, sans-serif",
              }}
            >
              Tell Me What{" "}
              <span className="relative inline-block" style={{ color: c }}>
                You're Trying
                <svg
                  viewBox="0 0 300 12"
                  fill="none"
                  className="absolute left-0 w-full"
                  style={{ bottom: "-6px", height: "10px" }}
                  aria-hidden="true"
                >
                  <motion.path
                    d="M2 7 Q50 3 100 7 Q150 11 200 7 Q250 3 298 7"
                    stroke={c}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={
                      {
                        duration: 1.1,
                        delay: 0.65,
                        ease: "easeInOut",
                      } as Transition
                    }
                  />
                </svg>
              </span>{" "}
              To Build.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                { duration: 0.6, delay: 0.2, ease: "easeOut" } as Transition
              }
              className="text-base lg:text-[17px] leading-relaxed max-w-[520px]"
              style={{ color: theme.text.secondary }}
            >
              Whether it's an idea, a business challenge, or an existing process
              you'd like to improve — you don't need technical requirements or
              architecture diagrams. Just explain what you're trying to achieve.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                { duration: 0.55, delay: 0.3, ease: "easeOut" } as Transition
              }
              className="flex flex-wrap gap-3 pt-1"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("chat")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: c,
                  color: theme.accent.primaryForeground,
                  boxShadow: `0 0 24px ${c}40`,
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    theme.accent.primaryHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = c;
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M14 2H2C1.45 2 1 2.45 1 3V10C1 10.55 1.45 11 2 11H5V14.5L9.5 11H14C14.55 11 15 10.55 15 10V3C15 2.45 14.55 2 14 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                Chat With My AI Assistant
              </button>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
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
                Start A Conversation
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                { duration: 0.5, delay: 0.42, ease: "easeOut" } as Transition
              }
              className="flex items-center gap-3 flex-wrap"
            >
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200"
                style={{
                  color: "#22c55e",
                  background: "rgba(34,197,94,0.06)",
                  border: "1px solid rgba(34,197,94,0.20)",
                  fontFamily: "'DM Mono', monospace",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(34,197,94,0.11)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(34,197,94,0.06)";
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <div
                className="w-px h-3.5"
                style={{ background: theme.border.medium }}
              />
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200"
                style={{
                  color: c,
                  background: theme.accent.tint,
                  border: `1px solid ${theme.accent.border}`,
                  fontFamily: "'DM Mono', monospace",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    theme.accent.tintStrong;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    theme.accent.tint;
                }}
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="1"
                    y="3"
                    width="14"
                    height="10"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M1 5L8 9L15 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Email
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              { duration: 0.8, delay: 0.22, ease: "easeOut" } as Transition
            }
            className="hidden lg:flex flex-col gap-3"
          >
            <span
              className="text-[10px] font-semibold tracking-[0.2em] uppercase text-center"
              style={{
                color: theme.text.muted,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Project Discovery Assistant
            </span>
            <ProjectDiscoveryCard />
          </motion.div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${theme.bg.muted})`,
        }}
      />
    </section>
  );
}

function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.06 });

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <ServicesBg />
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
        <div ref={headerRef} className="flex flex-col gap-5 max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" } as Transition}
          >
            <SectionLabel label="What Can We Build" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={
              { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
            }
            className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-[1.06] tracking-tight"
            style={{
              color: theme.text.primary,
              fontFamily: "Syne, sans-serif",
            }}
          >
            Every Project Starts With A{" "}
            <span style={{ color: c }}>Different Problem.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={
              { duration: 0.6, delay: 0.2, ease: "easeOut" } as Transition
            }
            className="text-base lg:text-[17px] leading-relaxed"
            style={{ color: theme.text.secondary }}
          >
            Here are some of the areas I commonly help with. Whatever stage
            you're in, let's start with the problem and work toward the solution
            together.
          </motion.p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <CardBase
              key={service.index}
              delay={0.12 + i * 0.08}
              inView={gridInView}
            >
              <div className="relative z-10 flex flex-col h-full p-6 gap-4">
                <div className="flex items-start justify-between">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: theme.accent.tintStrong,
                      border: `1px solid ${theme.accent.border}`,
                      color: c,
                    }}
                  >
                    {service.icon}
                  </div>
                  <span
                    className="text-[30px] font-bold leading-none select-none"
                    style={{
                      color: `${c}10`,
                      fontFamily: "Syne, sans-serif",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {service.index}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3
                    className="text-[15px] font-bold leading-snug"
                    style={{
                      color: theme.text.primary,
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: theme.text.secondary, lineHeight: "1.75" }}
                  >
                    {service.body}
                  </p>
                </div>
              </div>
            </CardBase>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChatSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section id="chat" className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${theme.bg.base} 0%, ${theme.bg.subtle} 40%, ${theme.bg.subtle} 60%, ${theme.bg.muted} 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 50% 50%, ${c}06, transparent 70%)`,
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
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-start">
          <div ref={headerRef} className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 } as Transition}
            >
              <SectionLabel label="AI Project Discovery" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={
                { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
              }
              className="text-4xl sm:text-[44px] lg:text-[48px] font-bold leading-[1.06] tracking-tight"
              style={{
                color: theme.text.primary,
                fontFamily: "Syne, sans-serif",
              }}
            >
              Have An Idea But{" "}
              <span style={{ color: c }}>Not Sure Where To Start?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={
                { duration: 0.6, delay: 0.2, ease: "easeOut" } as Transition
              }
              className="text-base lg:text-[17px] leading-relaxed"
              style={{ color: theme.text.secondary }}
            >
              Many people know the problem they're trying to solve but aren't
              sure what the solution should look like. That's completely normal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={
                { duration: 0.55, delay: 0.28, ease: "easeOut" } as Transition
              }
              className="flex flex-col gap-2.5"
            >
              {[
                "You don't need technical knowledge.",
                "You don't need to know what technologies to use.",
                "You simply need an idea, a challenge, or a goal.",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: theme.accent.tintStrong,
                      border: `1px solid ${theme.accent.border}`,
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: c }}
                    />
                  </div>
                  <p
                    className="text-[13.5px]"
                    style={{ color: theme.text.secondary }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={
                { duration: 0.55, delay: 0.38, ease: "easeOut" } as Transition
              }
              className="p-4 rounded-xl"
              style={{
                background: theme.surface[1],
                border: `1px solid ${theme.border.soft}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
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
                  How It Works
                </span>
              </div>
              <p
                className="text-[12.5px] leading-relaxed"
                style={{ color: theme.text.secondary, fontStyle: "italic" }}
              >
                My AI assistant asks simple questions about your business,
                challenges, and goals. At the end, you'll receive a structured
                project summary sent directly to me — so we start with clarity.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={
              { duration: 0.7, delay: 0.22, ease: "easeOut" } as Transition
            }
          >
            <ProjectConsultant />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <AudienceBg />
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
        <div ref={headerRef} className="flex flex-col gap-5 max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" } as Transition}
          >
            <SectionLabel label="Who This Is For" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={
              { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
            }
            className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-[1.06] tracking-tight"
            style={{
              color: theme.text.primary,
              fontFamily: "Syne, sans-serif",
            }}
          >
            Built For People{" "}
            <span style={{ color: c }}>Solving Real Problems.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={
              { duration: 0.6, delay: 0.2, ease: "easeOut" } as Transition
            }
            className="text-base lg:text-[17px] leading-relaxed"
            style={{ color: theme.text.secondary }}
          >
            Whether you're a business owner, a founder, or a technical team —
            there's a path forward from wherever you are.
          </motion.p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audience.map((item, i) => (
            <CardBase
              key={item.title}
              delay={0.14 + i * 0.1}
              inView={gridInView}
            >
              <div className="relative z-10 flex flex-col h-full p-6 gap-4">
                <div className="flex items-start justify-between">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: theme.accent.tintStrong,
                      border: `1px solid ${theme.accent.border}`,
                      color: c,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      color: c,
                      background: theme.accent.tint,
                      border: `1px solid ${theme.accent.border}`,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3
                    className="text-[15px] font-bold leading-snug"
                    style={{
                      color: theme.text.primary,
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: theme.text.secondary, lineHeight: "1.75" }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </CardBase>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollaborationSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${theme.bg.muted} 0%, ${theme.bg.subtle} 25%, ${theme.bg.subtle} 75%, ${theme.bg.base} 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 45% at 50% 50%, ${c}05, transparent 72%)`,
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
        <div ref={headerRef} className="flex flex-col gap-5 max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" } as Transition}
          >
            <SectionLabel label="How We Can Work Together" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={
              { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
            }
            className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-[1.06] tracking-tight"
            style={{
              color: theme.text.primary,
              fontFamily: "Syne, sans-serif",
            }}
          >
            Choose The Right <span style={{ color: c }}>Engagement</span> For
            Your Stage.
          </motion.h2>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {collaborationTypes.map((item, i) => (
            <CardBase
              key={item.title}
              delay={0.14 + i * 0.1}
              inView={gridInView}
            >
              <div className="relative z-10 flex flex-col h-full p-6 gap-4">
                <div className="flex items-start justify-between">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: theme.accent.tintStrong,
                      border: `1px solid ${theme.accent.border}`,
                      color: c,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      color: c,
                      background: theme.accent.tint,
                      border: `1px solid ${theme.accent.border}`,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3
                    className="text-[15px] font-bold leading-snug"
                    style={{
                      color: theme.text.primary,
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: theme.text.secondary, lineHeight: "1.75" }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </CardBase>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.08 });

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${theme.bg.base} 0%, ${theme.bg.subtle} 40%, ${theme.bg.subtle} 60%, ${theme.bg.muted} 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 75% 45% at 50% 50%, ${c}05, transparent 70%)`,
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
        <div ref={headerRef} className="flex flex-col gap-5 max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" } as Transition}
          >
            <SectionLabel label="What Happens Next" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={
              { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
            }
            className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-[1.06] tracking-tight"
            style={{
              color: theme.text.primary,
              fontFamily: "Syne, sans-serif",
            }}
          >
            A Simple Process From{" "}
            <span style={{ color: c }}>Idea To Execution.</span>
          </motion.h2>
        </div>

        <div
          ref={stepsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {steps.map((step, i) => (
            <CardBase
              key={step.num}
              delay={0.12 + i * 0.1}
              inView={stepsInView}
            >
              <div className="relative z-10 flex flex-col h-full p-5 gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                    style={{
                      background: theme.accent.tintStrong,
                      border: `1px solid ${theme.accent.border}`,
                      color: c,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {step.num}
                  </div>
                  <motion.div
                    className="h-px flex-1"
                    style={{ background: `${c}15` }}
                    initial={{ scaleX: 0 }}
                    animate={stepsInView ? { scaleX: 1 } : {}}
                    transition={
                      {
                        duration: 0.6,
                        delay: 0.3 + i * 0.1,
                        ease: "easeOut",
                      } as Transition
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3
                    className="text-[13px] font-bold leading-snug"
                    style={{
                      color: theme.text.primary,
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: theme.text.secondary, lineHeight: "1.7" }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            </CardBase>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ background: theme.bg.base }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 65% at 50% 50%, ${c}10, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 30% at 20% 20%, ${theme.accent.glowSubtle}, transparent 55%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 30% at 80% 80%, ${theme.accent.glowSubtle}, transparent 55%)`,
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
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 } as Transition}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <SectionLabel label="Got Something In Mind?" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={
            { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
          }
          className="text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.08] tracking-tight mb-5"
          style={{ color: theme.text.primary, fontFamily: "Syne, sans-serif" }}
        >
          Some of the best products start with a{" "}
          <span style={{ color: c }}>simple conversation.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={
            { duration: 0.6, delay: 0.2, ease: "easeOut" } as Transition
          }
          className="text-base lg:text-[17px] leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: theme.text.secondary }}
        >
          Whether you're exploring an idea, solving a business problem,
          improving an existing system, or building something entirely new — I'd
          love to hear about it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={
            { duration: 0.55, delay: 0.3, ease: "easeOut" } as Transition
          }
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <button
            onClick={() =>
              document
                .getElementById("chat")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: c,
              color: theme.accent.primaryForeground,
              boxShadow: `0 0 32px ${c}40`,
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                theme.accent.primaryHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = c;
            }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M14 2H2C1.45 2 1 2.45 1 3V10C1 10.55 1.45 11 2 11H5V14.5L9.5 11H14C14.55 11 15 10.55 15 10V3C15 2.45 14.55 2 14 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            Chat With My AI Assistant
          </button>

          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              color: theme.text.primary,
              border: `1px solid ${theme.border.default}`,
              background: theme.surface[1],
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
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
            Start A Conversation
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={
            { duration: 0.5, delay: 0.38, ease: "easeOut" } as Transition
          }
          className="flex items-center justify-center gap-4"
        >
          <div
            className="h-px w-16"
            style={{
              background: `linear-gradient(to right, transparent, ${theme.border.medium})`,
            }}
          />
          <span
            className="text-[11px]"
            style={{
              color: theme.text.muted,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            or reach out directly
          </span>
          <div
            className="h-px w-16"
            style={{
              background: `linear-gradient(to left, transparent, ${theme.border.medium})`,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={
            { duration: 0.5, delay: 0.48, ease: "easeOut" } as Transition
          }
          className="flex flex-wrap items-center justify-center gap-3 mt-5"
        >
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200"
            style={{
              color: "#22c55e",
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.20)",
              fontFamily: "'DM Mono', monospace",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(34,197,94,0.11)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(34,197,94,0.06)";
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp · Instant Connect
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200"
            style={{
              color: c,
              background: theme.accent.tint,
              border: `1px solid ${theme.accent.border}`,
              fontFamily: "'DM Mono', monospace",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                theme.accent.tintStrong;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                theme.accent.tint;
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect
                x="1"
                y="3"
                width="14"
                height="10"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M1 5L8 9L15 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Send An Email
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function WorkWithMe() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <ChatSection />
      <AudienceSection />
      <CollaborationSection />
      <ProcessSection />
      <FinalCTASection />
    </main>
  );
}
