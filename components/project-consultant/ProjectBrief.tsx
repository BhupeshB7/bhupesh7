"use client";

import { motion } from "framer-motion";
import theme from "@/config/theme.config";
import { ProjectBriefData } from "@/lib/types";

const c = theme.accent.primary;

const COMPLEXITY_COLOR: Record<string, string> = {
  Low: "#22c55e",
  Medium: "#f59e0b",
  High: "#ef4444",
};

interface Props {
  brief: ProjectBriefData;
  onProceed: () => void;
}

export default function ProjectBrief({ brief, onProceed }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4"
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: theme.surface[1],
          border: `1px solid ${theme.border.soft}`,
        }}
      >
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${theme.border.subtle}` }}
        >
          <span
            className="text-[10px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: theme.text.muted, fontFamily: "'DM Mono', monospace" }}
          >
            Project Brief
          </span>
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{
              color: COMPLEXITY_COLOR[brief.complexity],
              background: `${COMPLEXITY_COLOR[brief.complexity]}15`,
              border: `1px solid ${COMPLEXITY_COLOR[brief.complexity]}40`,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {brief.complexity} Complexity
          </span>
        </div>

        <div className="p-4 flex flex-col gap-4">
          <div>
            <p className="text-[11px] font-bold mb-1" style={{ color: c, fontFamily: "'DM Mono', monospace" }}>
              PROJECT
            </p>
            <p className="text-[14px] font-bold" style={{ color: theme.text.primary, fontFamily: "Syne, sans-serif" }}>
              {brief.projectName}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold mb-1" style={{ color: c, fontFamily: "'DM Mono', monospace" }}>
              OVERVIEW
            </p>
            <p className="text-[12px] leading-relaxed" style={{ color: theme.text.secondary }}>
              {brief.overview}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold mb-1" style={{ color: c, fontFamily: "'DM Mono', monospace" }}>
              TARGET USERS
            </p>
            <p className="text-[12px] leading-relaxed" style={{ color: theme.text.secondary }}>
              {brief.targetUsers}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold mb-2" style={{ color: c, fontFamily: "'DM Mono', monospace" }}>
              CORE FEATURES
            </p>
            <div className="flex flex-col gap-1.5">
              {brief.coreFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div
                    className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: c }}
                  />
                  <p className="text-[12px]" style={{ color: theme.text.secondary }}>
                    {f}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold mb-2" style={{ color: c, fontFamily: "'DM Mono', monospace" }}>
              TECH STACK
            </p>
            <div className="flex flex-wrap gap-1.5">
              {brief.techStack.map((t, i) => (
                <span
                  key={i}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                  style={{
                    color: theme.text.secondary,
                    background: theme.surface[2],
                    border: `1px solid ${theme.border.subtle}`,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {brief.futureEnhancements.length > 0 && (
            <div>
              <p className="text-[11px] font-bold mb-2" style={{ color: c, fontFamily: "'DM Mono', monospace" }}>
                FUTURE ENHANCEMENTS
              </p>
              <div className="flex flex-col gap-1">
                {brief.futureEnhancements.map((e, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div
                      className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: theme.text.muted }}
                    />
                    <p className="text-[11px]" style={{ color: theme.text.muted }}>
                      {e}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onProceed}
        className="w-full py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200"
        style={{
          background: c,
          color: theme.accent.primaryForeground,
          border: "none",
          cursor: "pointer",
          fontFamily: "'DM Mono', monospace",
          boxShadow: `0 0 20px ${c}30`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = theme.accent.primaryHover;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = c;
        }}
      >
        Submit Your Details →
      </button>
    </motion.div>
  );
}
