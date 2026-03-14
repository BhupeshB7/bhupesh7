"use client";

import { slideRight, staggerContainer } from "@/components/animations/variants";
import { ACTIVITY_FEED } from "@/lib/constants";
import { motion } from "framer-motion";
import {
  CircleDot,
  GitCommitHorizontal,
  GitPullRequest,
  Sparkles,
} from "lucide-react";

const TYPE_COLOR: Record<string, string> = {
  commit: "var(--accent-light)",
  pr: "var(--cyan)",
  star: "#fbbf24",
  release: "#34d399",
};

export default function ActivityFeed() {
  return (
    <motion.ul
      variants={staggerContainer(0.07)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="flex flex-col gap-[3px]"
      aria-label="Recent git activity"
    >
      {ACTIVITY_FEED.map((item, i) => {
        const color = TYPE_COLOR[item.type] ?? "var(--accent-light)";
        const iconByType: Record<string, React.ReactNode> = {
          commit: <GitCommitHorizontal size={12} strokeWidth={1.8} />,
          pr: <GitPullRequest size={12} strokeWidth={1.8} />,
          release: <Sparkles size={12} strokeWidth={1.8} />,
        };
        return (
          <motion.li
            key={i}
            variants={slideRight}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 10px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(255,255,255,0.04)",
              listStyle: "none",
            }}
          >
            {/* Type icon */}
            <span
              aria-hidden="true"
              style={{
                width: "22px",
                height: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${color}14`,
                border: `1px solid ${color}28`,
                borderRadius: "4px",
                color,
                flexShrink: 0,
              }}
            >
              {iconByType[item.type] ?? (
                <CircleDot size={12} strokeWidth={1.8} />
              )}
            </span>

            {/* Message */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "10px",
                    color: "var(--accent-light)",
                    letterSpacing: ".03em",
                    flexShrink: 0,
                  }}
                >
                  {item.repo}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.3)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  — {item.msg}
                </span>
              </div>
            </div>

            {/* Time */}
            <time
              className="font-mono"
              style={{
                fontSize: "9px",
                color: "rgba(255,255,255,0.18)",
                flexShrink: 0,
                letterSpacing: ".05em",
              }}
            >
              {item.time}
            </time>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
