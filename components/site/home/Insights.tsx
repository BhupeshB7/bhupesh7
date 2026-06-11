"use client";

import { useRef } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import theme from "@/config/theme.config";

const c = theme.accent.primary;

const insights = [
  {
    index: "01",
    tag: "Systems",
    title: "Distributed Systems Don't Have to Be Complicated",
    body: "Scalability gets associated with complexity. More services, more infrastructure, more moving parts. But most systems fail not because they're too simple — they fail because they're unnecessarily complicated. Understanding your actual bottlenecks and failure modes matters far more than adding architecture for its own sake. The best systems are the easiest to reason about under pressure.",
  },
  {
    index: "02",
    tag: "Product",
    title: "Technology Is the Enabler. Users Are the Point.",
    body: "Engineers spend real time choosing frameworks, databases, and patterns. Users never notice. They care whether the product solves their problem. A technically perfect system that solves the wrong problem is still a failure. Most of the leverage in building software comes from understanding users — not from picking the right stack.",
  },
  {
    index: "03",
    tag: "AI",
    title: "AI Features That Actually Get Used",
    body: "Adding AI to a product is easy. Creating AI-powered experiences that genuinely improve workflows is much harder. The best AI features don't try to replace people — they remove repetitive work, sharpen decisions, and help users move faster. The challenge isn't integration. The challenge is integrating it where it creates real, durable value.",
  },
  {
    index: "04",
    tag: "Architecture",
    title: "Building For the Team That Inherits Your Code",
    body: "Many systems are designed to launch. Very few are designed to evolve. Maintainability compounds over time — clean boundaries and thoughtful abstractions aren't about perfection, they're about making future changes cheaper. Every shortcut taken today is a tax paid later. Good engineering makes future development sustainable, not just possible.",
  },
  {
    index: "05",
    tag: "Lessons",
    title: "Storage Is Simple Until It Isn't",
    body: "A file storage platform looks obvious on the surface: upload, organise, share. The reality involves access control, hierarchical permissions, background processing, storage optimisation, and edge cases that appear only at scale. Every feature introduces trade-offs between security, performance, and simplicity. Those trade-offs are where most of the real learning happens.",
  },
  {
    index: "06",
    tag: "Process",
    title: "From Idea to Production Is Never a Straight Line",
    body: "Requirements change. Assumptions fail. New constraints appear. The process of turning an idea into something reliable requires continuous iteration and adaptation. The most rewarding part of building software isn't writing code — it's watching something uncertain become something people genuinely depend on.",
  },
];

function InsightsBg() {
  const dim = "rgba(255,255,255,0.025)";

  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${theme.bg.muted} 0%, ${theme.bg.subtle} 30%, ${theme.bg.base} 70%, ${theme.bg.base} 100%)`,
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ins-line-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="25%" stopColor="white" stopOpacity="1" />
            <stop offset="75%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="ins-line-mask">
            <rect width="1200" height="1000" fill="url(#ins-line-fade)" />
          </mask>
          <linearGradient id="ins-dot-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="20%" stopColor="white" stopOpacity="0.7" />
            <stop offset="80%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="ins-dot-mask">
            <rect width="1200" height="1000" fill="url(#ins-dot-fade)" />
          </mask>
          <pattern
            id="ins-dots"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.9" fill="rgba(255,255,255,0.028)" />
          </pattern>
        </defs>

        <g mask="url(#ins-line-mask)">
          <line
            x1="0"
            y1="200"
            x2="1200"
            y2="200"
            stroke={dim}
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="500"
            x2="1200"
            y2="500"
            stroke={dim}
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="780"
            x2="1200"
            y2="780"
            stroke={dim}
            strokeWidth="1"
          />
          <line
            x1="100"
            y1="0"
            x2="100"
            y2="1000"
            stroke={dim}
            strokeWidth="1"
          />
          <line
            x1="360"
            y1="0"
            x2="360"
            y2="1000"
            stroke={dim}
            strokeWidth="1"
          />
          <line
            x1="840"
            y1="0"
            x2="840"
            y2="1000"
            stroke={dim}
            strokeWidth="1"
          />
          <line
            x1="1100"
            y1="0"
            x2="1100"
            y2="1000"
            stroke={dim}
            strokeWidth="1"
          />

          <path
            d="M100 200 L100 340 L220 340 L220 500"
            stroke={`${c}14`}
            strokeWidth="1.5"
          />
          <path
            d="M360 200 L360 300 L480 300 L480 500"
            stroke={`${c}12`}
            strokeWidth="1.5"
          />
          <path
            d="M840 500 L840 380 L960 380 L960 200 L1100 200"
            stroke={`${c}14`}
            strokeWidth="1.5"
          />
          <path
            d="M360 500 L360 640 L220 640 L220 780"
            stroke={`${c}10`}
            strokeWidth="1.5"
          />
          <path
            d="M840 780 L840 640 L960 640 L960 500"
            stroke={`${c}12`}
            strokeWidth="1.5"
          />

          <circle
            cx="100"
            cy="200"
            r="3.5"
            fill="none"
            stroke={`${c}28`}
            strokeWidth="1.5"
          />
          <circle cx="100" cy="200" r="1.4" fill={`${c}50`} />
          <circle
            cx="360"
            cy="200"
            r="3.5"
            fill="none"
            stroke={`${c}28`}
            strokeWidth="1.5"
          />
          <circle cx="360" cy="200" r="1.4" fill={`${c}50`} />
          <circle
            cx="1100"
            cy="200"
            r="3"
            fill="none"
            stroke={`${c}22`}
            strokeWidth="1.5"
          />

          <circle
            cx="220"
            cy="340"
            r="3"
            fill="none"
            stroke={`${c}22`}
            strokeWidth="1.5"
          />
          <circle cx="220" cy="340" r="1.2" fill={`${c}40`} />
          <circle
            cx="480"
            cy="300"
            r="3"
            fill="none"
            stroke={`${c}20`}
            strokeWidth="1.5"
          />
          <circle cx="480" cy="300" r="1.2" fill={`${c}38`} />
          <circle
            cx="960"
            cy="380"
            r="3"
            fill="none"
            stroke={`${c}20`}
            strokeWidth="1.5"
          />
          <circle cx="960" cy="380" r="1.2" fill={`${c}38`} />

          <circle
            cx="360"
            cy="500"
            r="5"
            fill="none"
            stroke={`${c}32`}
            strokeWidth="1.5"
          />
          <circle cx="360" cy="500" r="2" fill={`${c}55`} />
          <circle
            cx="840"
            cy="500"
            r="5"
            fill="none"
            stroke={`${c}32`}
            strokeWidth="1.5"
          />
          <circle cx="840" cy="500" r="2" fill={`${c}55`} />

          <circle
            cx="220"
            cy="640"
            r="3"
            fill="none"
            stroke={`${c}18`}
            strokeWidth="1.5"
          />
          <circle
            cx="960"
            cy="640"
            r="3"
            fill="none"
            stroke={`${c}18`}
            strokeWidth="1.5"
          />
          <circle
            cx="220"
            cy="780"
            r="3"
            fill="none"
            stroke={`${c}18`}
            strokeWidth="1.5"
          />
          <circle
            cx="840"
            cy="780"
            r="3"
            fill="none"
            stroke={`${c}18`}
            strokeWidth="1.5"
          />

          <rect
            x="92"
            y="192"
            width="16"
            height="16"
            rx="2"
            fill="none"
            stroke={`${c}18`}
            strokeWidth="1"
          />
          <rect
            x="352"
            y="492"
            width="16"
            height="16"
            rx="2"
            fill="none"
            stroke={`${c}18`}
            strokeWidth="1"
          />
          <rect
            x="832"
            y="492"
            width="16"
            height="16"
            rx="2"
            fill="none"
            stroke={`${c}15`}
            strokeWidth="1"
          />
          <rect
            x="1092"
            y="192"
            width="16"
            height="16"
            rx="2"
            fill="none"
            stroke={`${c}12`}
            strokeWidth="1"
          />
        </g>

        <rect
          width="1200"
          height="1000"
          fill="url(#ins-dots)"
          mask="url(#ins-dot-mask)"
        />

        <circle
          cx="180"
          cy="160"
          r="90"
          fill="none"
          stroke={`${c}06`}
          strokeWidth="1"
        />
        <circle
          cx="180"
          cy="160"
          r="150"
          fill="none"
          stroke={`${c}04`}
          strokeWidth="1"
        />
        <circle
          cx="1020"
          cy="820"
          r="80"
          fill="none"
          stroke={`${c}05`}
          strokeWidth="1"
        />
        <circle
          cx="1020"
          cy="820"
          r="140"
          fill="none"
          stroke={`${c}03`}
          strokeWidth="1"
        />
      </svg>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 35% at 10% 20%, ${theme.accent.glowSubtle}, transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 90% 75%, ${theme.accent.glowSubtle}, transparent 60%)`,
        }}
      />
    </>
  );
}

function InsightCard({
  insight,
  index: cardIndex,
  inView,
}: {
  insight: (typeof insights)[0];
  index: number;
  inView: boolean;
}) {
  const isLarge = cardIndex === 0 || cardIndex === 5;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={
        {
          duration: 0.55,
          delay: 0.2 + cardIndex * 0.1,
          ease: "easeOut",
        } as Transition
      }
      className={`group relative flex flex-col rounded-2xl overflow-hidden ${isLarge ? "md:col-span-2" : ""}`}
      style={{
        background: theme.surface[0],
        border: `1px solid ${theme.border.soft}`,
        boxShadow: `0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.025)`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${c}40 40%, ${c}70 52%, ${c}40 65%, transparent 100%)`,
          opacity: 0.6,
        }}
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${c}05, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full p-6 gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-md"
              style={{
                color: theme.accent.text,
                background: theme.accent.tint,
                border: `1px solid ${theme.accent.border}`,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {insight.tag}
            </span>
          </div>
          <span
            className="text-[28px] font-bold leading-none select-none"
            style={{
              color: `${c}10`,
              fontFamily: "Syne, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            {insight.index}
          </span>
        </div>

        <div className="flex flex-col gap-2.5 flex-1">
          <h3
            className="text-[16px] font-bold leading-snug"
            style={{
              color: theme.text.primary,
              fontFamily: "Syne, sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            {insight.title}
          </h3>

          <p
            className="text-[13.5px] leading-[1.8]"
            style={{ color: theme.text.secondary }}
          >
            {insight.body}
          </p>
        </div>

        <div
          className="flex items-center gap-2 pt-3"
          style={{ borderTop: `1px solid ${theme.border.subtle}` }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: `${c}50` }}
          />
          <span
            className="text-[10px] font-medium"
            style={{
              color: theme.text.muted,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.06em",
            }}
          >
            bhupesh.dev
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Insights() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.05 });
  const closingInView = useInView(closingRef, { once: true, amount: 0.4 });

  return (
    <section
      id="insights"
      ref={sectionRef}
      className="relative overflow-hidden py-12 lg:py-18"
    >
      <InsightsBg />

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
          className="flex flex-col gap-5 max-w-2xl mb-16 lg:mb-20"
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
              Insights
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
            Thoughts From{" "}
            <span className="relative inline-block" style={{ color: c }}>
              Building
              <svg
                viewBox="0 0 140 10"
                fill="none"
                className="absolute left-0 w-full"
                style={{ bottom: "-5px", height: "9px" }}
                aria-hidden="true"
              >
                <motion.path
                  d="M2 6 C28 2, 56 8, 84 5 C112 2, 128 7, 138 6"
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
            </span>{" "}
            Real Products.
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
            Good software is rarely about technology alone. Most challenges come
            from understanding users, making the right trade-offs, and designing
            systems that stay useful as they grow.
          </motion.p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {insights.map((insight, i) => (
            <InsightCard
              key={insight.index}
              insight={insight}
              index={i}
              inView={gridInView}
            />
          ))}
        </div>

        <motion.div
          ref={closingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={closingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={
            { duration: 0.6, delay: 0.1, ease: "easeOut" } as Transition
          }
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10"
          style={{ borderTop: `1px solid ${theme.border.soft}` }}
        >
          <div className="flex flex-col gap-1.5 max-w-md">
            <p
              className="text-sm font-semibold"
              style={{
                color: theme.text.primary,
                fontFamily: "Syne, sans-serif",
              }}
            >
              Constantly exploring what makes software genuinely valuable.
            </p>
            <p
              className="text-[11px] leading-relaxed"
              style={{
                color: theme.text.muted,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Architecture · AI integrations · Backend engineering · Product
              thinking
            </p>
          </div>

          <div className="flex items-center gap-3">
            {["Systems", "AI", "Product", "Architecture"].map((tag) => (
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
        </motion.div>
      </div>
    </section>
  );
}
