"use client";

import { motion } from "framer-motion";
import theme from "@/config/theme.config";

const c = theme.accent.primary;

export default function TypingIndicator() {
  return (
    <div className="flex gap-2">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: theme.accent.tintStrong,
          border: `1px solid ${theme.accent.border}`,
        }}
      >
        <span
          style={{
            color: c,
            fontSize: "8px",
            fontFamily: "'DM Mono', monospace",
            fontWeight: 700,
          }}
        >
          AI
        </span>
      </div>
      <div
        className="rounded-xl px-3.5 py-2.5"
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
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
