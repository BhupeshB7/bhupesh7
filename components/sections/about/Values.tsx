"use client";

import {
  fadeUp,
  listItem,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import { VALUES } from "@/lib/constants";
import { motion } from "framer-motion";
import { useState } from "react";

function ValueCard({ item }: { item: (typeof VALUES)[number] }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.article
      variants={listItem}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "clamp(24px,3vw,36px)",
        borderRadius: "14px",
        background: hov ? "rgba(255,255,255,0.024)" : "rgba(255,255,255,0.014)",
        border: hov
          ? `1px solid color-mix(in srgb, ${item.color} 18%, transparent)`
          : "1px solid rgba(99,102,241,0.1)",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.25s, border-color 0.25s",
        cursor: "default",
      }}
    >
      {/* Background number watermark */}
      <span
        aria-hidden="true"
        className="font-display"
        style={{
          position: "absolute",
          bottom: "-10px",
          right: "16px",
          fontSize: "clamp(5rem, 8vw, 7rem)",
          color: `color-mix(in srgb, ${item.color} 8%, transparent)`,
          lineHeight: 1,
          letterSpacing: "-.02em",
          pointerEvents: "none",
          userSelect: "none",
          transition: "color 0.25s",
        }}
      >
        {item.number}
      </span>

      {/* Top accent line */}
      <div
        aria-hidden="true"
        style={{
          height: "2px",
          width: hov ? "60px" : "28px",
          background: item.color,
          borderRadius: "1px",
          marginBottom: "20px",
          transition: "width 0.35s ease",
        }}
      />

      {/* Number badge */}
      <span
        className="font-mono text-[10px] tracking-[.12em] uppercase block mb-[14px]"
        style={{ color: item.color }}
        aria-label={`Principle ${item.number}`}
      >
        {item.number}
      </span>

      {/* Title */}
      <h3
        className="font-display mb-[14px]"
        style={{
          fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
          color: hov ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.75)",
          letterSpacing: ".01em",
          lineHeight: 1.2,
          transition: "color 0.2s",
        }}
      >
        {item.title}
      </h3>

      {/* Body */}
      <p
        className="font-mono"
        style={{
          fontSize: "clamp(11px, 1.2vw, 12px)",
          lineHeight: 1.9,
          color: "rgba(255,255,255,.35)",
          letterSpacing: ".015em",
          position: "relative",
          zIndex: 1,
        }}
      >
        {item.body}
      </p>
    </motion.article>
  );
}

export default function Values() {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-[10px] mb-[16px]"
      >
        <div
          className="h-px w-8 shrink-0"
          style={{
            background: "linear-gradient(to right, var(--accent), transparent)",
          }}
        />
        <span
          className="font-mono text-[9px] tracking-[.14em] uppercase"
          style={{ color: "var(--accent-light)" }}
        >
          How I work
        </span>
      </motion.div>

      <motion.div variants={fadeUp} style={{ marginBottom: "48px" }}>
        <h2
          className="font-display mb-[10px]"
          style={{
            fontSize: "clamp(1.8rem,4vw,2.8rem)",
            letterSpacing: "-.01em",
            lineHeight: 1,
          }}
        >
          ENGINEERING VALUES
        </h2>
        <p
          className="font-mono text-[clamp(10px,1.2vw,12px)] tracking-[.06em] uppercase"
          style={{ color: "rgba(255,255,255,.22)" }}
        >
          The principles that guide every line I write
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(14px, 2vw, 20px)",
        }}
      >
        {VALUES.map((item) => (
          <ValueCard key={item.number} item={item} />
        ))}
      </motion.div>
    </motion.div>
  );
}
