"use client";

import { motion } from "framer-motion";
import { listItem } from "@/components/animations/variants";
import type { HIGHLIGHTS } from "@/lib/constants";

type Highlight = typeof HIGHLIGHTS[number];

export default function HighlightCard({ item }: { item: Highlight }) {
  return (
    <motion.div
      variants={listItem}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "clamp(16px,2vw,22px)",
        background: "rgba(255,255,255,0.016)",
        border: "1px solid rgba(99,102,241,.1)",
        borderRadius: "12px",
      }}
    >
      {/* Icon + label */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          aria-hidden="true"
          style={{
            width: "28px", height: "28px",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: `${item.color}12`, border: `1px solid ${item.color}24`,
            borderRadius: "6px", fontSize: "11px", color: item.color, flexShrink: 0,
          }}
        >
          {item.icon}
        </span>
        <span className="font-mono text-[9px] tracking-[.1em] uppercase" style={{ color: "rgba(255,255,255,.22)" }}>
          {item.label}
        </span>
      </div>

      {/* Value */}
      <span
        className="font-display"
        style={{ fontSize: "clamp(1.3rem,2.2vw,1.7rem)", color: item.color, lineHeight: 1, letterSpacing: "-.01em" }}
        aria-label={`${item.label}: ${item.value}`}
      >
        {item.value}
      </span>

      {/* Sub */}
      <span className="font-mono text-[10px] tracking-[.02em]" style={{ color: "rgba(255,255,255,.25)" }}>
        {item.sub}
      </span>
    </motion.div>
  );
}
