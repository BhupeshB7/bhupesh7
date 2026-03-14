"use client";

import {
  fadeUp,
  listItem,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import { JOURNEY } from "@/lib/constants";
import { motion } from "framer-motion";

const TYPE_CONFIG = {
  work: { color: "var(--accent-light)", label: "Work", dot: "var(--accent)" },
  edu: { color: "var(--cyan)", label: "Education", dot: "var(--cyan)" },
} as const;

// ─── Single timeline entry ────────────────────────────────────────────────────
function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: (typeof JOURNEY)[number];
  index: number;
  isLast: boolean;
}) {
  const cfg = TYPE_CONFIG[item.type as keyof typeof TYPE_CONFIG];

  return (
    <motion.div
      variants={listItem}
      style={{ display: "flex", gap: "0", position: "relative" }}
    >
      {/* ── Connector column ── */}
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: "48px",
          marginRight: "24px",
        }}
      >
        {/* Dot */}
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: cfg.dot,
            border: "2px solid var(--bg)",
            boxShadow: `0 0 0 3px ${cfg.dot}28, 0 0 12px ${cfg.dot}40`,
            flexShrink: 0,
            zIndex: 1,
            marginTop: "4px",
          }}
        />
        {/* Line below dot */}
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: "1px",
              background:
                "linear-gradient(to bottom, rgba(99,102,241,0.25), rgba(99,102,241,0.04))",
              marginTop: "8px",
              marginBottom: "0",
              minHeight: "40px",
            }}
          />
        )}
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : "48px" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "8px",
          }}
        >
          <div>
            {/* Type badge */}
            <span
              className="font-mono text-[8px] tracking-[.12em] uppercase inline-block mb-[5px]"
              style={{
                color: cfg.color,
                background: `${cfg.dot}12`,
                border: `1px solid ${cfg.dot}22`,
                borderRadius: "3px",
                padding: "2px 7px",
              }}
            >
              {cfg.label}
            </span>

            {/* Title */}
            <h3
              className="font-mono"
              style={{
                fontSize: "clamp(13px, 1.4vw, 15px)",
                color: "rgba(255,255,255,.85)",
                fontWeight: 700,
                letterSpacing: ".02em",
                marginBottom: "3px",
              }}
            >
              {item.title}
            </h3>

            {/* Org */}
            <p
              className="font-mono text-[11px] tracking-[.03em]"
              style={{ color: "rgba(255,255,255,.35)" }}
            >
              {item.org}
            </p>
          </div>

          {/* Year */}
          <span
            className="font-display"
            style={{
              fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
              color: "rgba(99,102,241,0.18)",
              letterSpacing: "-.01em",
              lineHeight: 1,
              flexShrink: 0,
            }}
            aria-label={`Year: ${item.year}`}
          >
            {item.year}
          </span>
        </div>

        {/* Description */}
        <p
          className="font-mono mb-[14px]"
          style={{
            fontSize: "clamp(11px, 1.2vw, 12px)",
            lineHeight: 1.85,
            color: "rgba(255,255,255,.38)",
            letterSpacing: ".015em",
          }}
        >
          {item.desc}
        </p>

        {/* Tags */}
        <ul
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            listStyle: "none",
          }}
          aria-label="Technologies"
        >
          {item.tags.map((tag) => (
            <li key={tag}>
              <span
                className="font-mono text-[9px] tracking-[.08em] uppercase"
                style={{
                  color: `${cfg.color}88`,
                  border: `1px solid ${cfg.dot}18`,
                  borderRadius: "3px",
                  padding: "2px 7px",
                  background: `${cfg.dot}06`,
                }}
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Journey ──────────────────────────────────────────────────────────────────
export default function Journey() {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
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
          Timeline
        </span>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="font-display mb-[56px]"
        style={{
          fontSize: "clamp(1.8rem,4vw,2.8rem)",
          letterSpacing: "-.01em",
          lineHeight: 1,
        }}
      >
        JOURNEY &amp; BACKGROUND
      </motion.h2>

      {/* Legend */}
      <motion.div
        variants={fadeUp}
        className="flex gap-[20px] flex-wrap mb-[48px]"
      >
        {Object.entries(TYPE_CONFIG).map(([, cfg]) => (
          <div key={cfg.label} className="flex items-center gap-[7px]">
            <div
              aria-hidden="true"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: cfg.dot,
              }}
            />
            <span
              className="font-mono text-[9px] tracking-[.08em] uppercase"
              style={{ color: "rgba(255,255,255,.3)" }}
            >
              {cfg.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Timeline entries */}
      <div>
        {JOURNEY.map((item, i) => (
          <TimelineItem
            key={`${item.year}-${item.title}`}
            item={item}
            index={i}
            isLast={i === JOURNEY.length - 1}
          />
        ))}
      </div>
    </motion.div>
  );
}
