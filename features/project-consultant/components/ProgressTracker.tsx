"use client";

import theme from "@/config/theme.config";
import { ProgressState } from "@/lib/types";

const c = theme.accent.primary;

const STEPS: { key: keyof ProgressState; label: string }[] = [
  { key: "projectIdea", label: "Project Idea" },
  { key: "targetUsers", label: "Target Users" },
  { key: "coreFeatures", label: "Core Features" },
  { key: "platformRequirements", label: "Platform" },
  { key: "budget", label: "Budget" },
  { key: "timeline", label: "Timeline" },
];

interface Props {
  progress: ProgressState;
}

export default function ProgressTracker({ progress }: Props) {
  const completed = STEPS.filter((s) => progress[s.key]).length;
  const percentage = Math.round((completed / STEPS.length) * 100);

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{
        background: theme.surface[1],
        border: `1px solid ${theme.border.subtle}`,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-semibold tracking-[0.18em] uppercase"
          style={{ color: theme.text.muted, fontFamily: "'DM Mono', monospace" }}
        >
          Discovery Progress
        </span>
        <span
          className="text-[10px] font-bold"
          style={{ color: c, fontFamily: "'DM Mono', monospace" }}
        >
          {percentage}%
        </span>
      </div>

      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: theme.border.subtle }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, background: c }}
        />
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {STEPS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: progress[key] ? `${c}20` : theme.bg.base,
                border: `1px solid ${progress[key] ? c : theme.border.medium}`,
              }}
            >
              {progress[key] && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M1.5 4L3 5.5L6.5 2"
                    stroke={c}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              className="text-[10px]"
              style={{
                color: progress[key] ? theme.text.primary : theme.text.muted,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
