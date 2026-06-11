"use client";

import { motion } from "framer-motion";
import theme from "@/config/theme.config";
import ArchitectureDiagram from "./ArchitectureDiagram";

const STAGGER = 0.12;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function Hero() {
  return (
    <section
      style={{ background: theme.bg.base }}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% -5%, ${theme.accent.glow}, transparent 70%)`,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 40% at 80% 60%, ${theme.accent.glowSubtle}, transparent)`,
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.accent.border}, transparent)`,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-center">
          <div className="flex flex-col gap-6">
            <motion.div {...fadeUp(0)}>
              <span
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  color: theme.accent.text,
                  border: `1px solid ${theme.accent.border}`,
                  background: theme.accent.tint,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: theme.accent.primary }}
                />
                Available for new projects
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: STAGGER, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] tracking-tight"
              style={{
                color: theme.text.primary,
                fontFamily: "Syne, sans-serif",
              }}
            >
              Building Digital Products That People{" "}
              <span
                className="relative inline-block whitespace-nowrap"
                style={{ color: theme.accent.primary }}
              >
                Love To Use
                <svg
                  viewBox="0 0 220 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-0"
                  style={{ bottom: "-11px", height: "20px", width: "55%" }}
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="curveGrad1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        stopColor={theme.accent.primary}
                        stopOpacity="0"
                      />
                      <stop
                        offset="30%"
                        stopColor={theme.accent.primary}
                        stopOpacity="0.5"
                      />
                      <stop
                        offset="100%"
                        stopColor={theme.accent.primary}
                        stopOpacity="1"
                      />
                    </linearGradient>
                    <linearGradient
                      id="curveGrad2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        stopColor={theme.accent.primary}
                        stopOpacity="0"
                      />
                      <stop
                        offset="30%"
                        stopColor={theme.accent.primary}
                        stopOpacity="0.2"
                      />
                      <stop
                        offset="100%"
                        stopColor={theme.accent.primary}
                        stopOpacity="0.42"
                      />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0 7 C20 3, 50 12, 80 6 C110 0, 148 10, 178 5 C196 2, 210 8, 220 7"
                    stroke="url(#curveGrad1)"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 1.0,
                      delay: STAGGER * 3 + 0.3,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.path
                    d="M0 13 C20 9, 50 18, 80 12 C110 6, 148 16, 178 11 C196 8, 210 14, 220 13"
                    stroke="url(#curveGrad2)"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 1.0,
                      delay: STAGGER * 3 + 0.48,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </span>{" "}
              And Businesses Trust To Scale.
            </motion.h1>

            <motion.p
              {...fadeUp(STAGGER * 2)}
              className="text-base lg:text-[17px] max-w-[540px] leading-relaxed"
              style={{ color: theme.text.secondary }}
            >
              I&apos;m Bhupesh Kumar, a Software Engineer focused on Full Stack
              Development, Backend Architecture, AI Integrations, and Product
              Engineering. I help startups and businesses transform ideas into
              production-ready software.
            </motion.p>

            <motion.div
              {...fadeUp(STAGGER * 3)}
              className="flex flex-wrap gap-3 pt-1"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: theme.accent.primary,
                  color: theme.accent.primaryForeground,
                  boxShadow: `0 0 24px ${theme.accent.glowStrong}, ${theme.shadow.md}`,
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
                View My Work
              </a>

              <a
                href="/work-with-me"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  color: theme.text.primary,
                  border: `1px solid ${theme.border.default}`,
                  background: theme.surface[1],
                  boxShadow: theme.shadow.card,
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
              {...fadeUp(STAGGER * 4)}
              className="flex flex-wrap items-center gap-2 pt-2"
            >
              {[
                "Full Stack",
                "Backend Architecture",
                "AI Integration",
                "System Design",
              ].map((tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-md"
                    style={{
                      color: theme.text.tertiary,
                      background: theme.surface[1],
                      border: `1px solid ${theme.border.soft}`,
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: STAGGER * 5,
                ease: "easeOut",
              }}
              className="flex flex-col items-center gap-3 mt-4 lg:hidden"
            >
              <span
                className="text-[10px] font-medium tracking-widest uppercase"
                style={{ color: theme.text.muted }}
              >
                System Architecture
              </span>
              <div className="w-full">
                <ArchitectureDiagram />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: STAGGER * 4, ease: "easeOut" }}
            className="hidden lg:flex flex-col items-center gap-3"
          >
            <span
              className="text-[10px] font-medium tracking-widest uppercase"
              style={{ color: theme.text.muted }}
            >
              System Architecture
            </span>
            <div className="w-full">
              <ArchitectureDiagram />
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${theme.bg.base})`,
        }}
      />
    </section>
  );
}
