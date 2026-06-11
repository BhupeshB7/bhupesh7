"use client";

import { motion } from "framer-motion";
import theme from "@/config/theme.config";

const c = theme.accent.primary;

interface Props {
  onReset: () => void;
}

export default function SuccessScreen({ onReset }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-5 py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: `${c}18`,
          border: `1px solid ${c}40`,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12L10 17L19 7"
            stroke={c}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <div className="flex flex-col gap-2">
        <p
          className="text-[18px] font-bold"
          style={{ color: theme.text.primary, fontFamily: "Syne, sans-serif" }}
        >
          Brief Sent Successfully
        </p>
        <p
          className="text-[12px] leading-relaxed max-w-[280px]"
          style={{ color: theme.text.secondary }}
        >
          Bhupesh will review your project brief personally and reach out within 24 hours.
        </p>
      </div>

      <div
        className="w-full rounded-xl p-3"
        style={{
          background: theme.surface[1],
          border: `1px solid ${theme.border.subtle}`,
        }}
      >
        <p
          className="text-[11px]"
          style={{ color: theme.text.muted, fontFamily: "'DM Mono', monospace" }}
        >
          While you wait, feel free to explore the portfolio or reach out directly via email or WhatsApp.
        </p>
      </div>

      <button
        onClick={onReset}
        className="text-[11px] font-semibold transition-all duration-150"
        style={{
          color: theme.text.muted,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "'DM Mono', monospace",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = c;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = theme.text.muted;
        }}
      >
        Start a new consultation →
      </button>
    </motion.div>
  );
}
