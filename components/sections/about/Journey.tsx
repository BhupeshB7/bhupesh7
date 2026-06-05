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
  project: { color: "var(--green)", label: "Project", dot: "var(--green)" },
} as const;

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
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: cfg.dot,
            border: "2px solid var(--bg)",
            boxShadow: `0 0 0 4px ${cfg.dot}28, 0 0 18px ${cfg.dot}40`,
            flexShrink: 0,
            zIndex: 1,
            marginTop: "4px",
          }}
        />
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

      <div style={{ flex: 1, paddingBottom: isLast ? 0 : "56px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "14px",
          }}
        >
          <div>
            <span
              className="font-mono text-[11px] tracking-[.14em] uppercase inline-block mb-[7px]"
              style={{
                color: cfg.color,
                background: `${cfg.dot}18`,
                border: `1px solid ${cfg.dot}28`,
                borderRadius: "4px",
                padding: "4px 12px",
              }}
            >
              {cfg.label}
            </span>

            <h3
              className="font-mono"
              style={{
                fontSize: "clamp(18px, 2vw, 22px)",
                color: "rgba(255,255,255,.90)",
                fontWeight: 700,
                letterSpacing: ".02em",
                marginBottom: "6px",
              }}
            >
              {item.title}
            </h3>

            <p
              className="font-mono text-[13px] tracking-[.04em]"
              style={{ color: "rgba(255,255,255,.45)" }}
            >
              {item.org}
            </p>
          </div>

          <span
            className="font-display"
            style={{
              fontSize: "clamp(2.2rem, 3vw, 2.8rem)",
              color: "rgba(99,102,241,0.22)",
              letterSpacing: "-.01em",
              lineHeight: 1,
              flexShrink: 0,
            }}
            aria-label={`Year: ${item.year}`}
          >
            {item.year}
          </span>
        </div>

        <p
          className="font-mono mb-[18px]"
          style={{
            fontSize: "clamp(15px, 1.5vw, 18px)",
            lineHeight: 2.1,
            color: "rgba(255,255,255,.50)",
            letterSpacing: ".018em",
          }}
        >
          {item.desc}
        </p>

        <ul
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            listStyle: "none",
          }}
          aria-label="Technologies"
        >
          {item.tags.map((tag) => (
            <li key={tag}>
              <span
                className="font-mono text-[13px] tracking-[.10em] uppercase"
                style={{
                  color: `${cfg.color}b0`,
                  border: `1.5px solid ${cfg.dot}28`,
                  borderRadius: "4px",
                  padding: "4px 12px",
                  background: `${cfg.dot}10`,
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

export default function Journey() {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-[16px] mb-[24px]"
      >
        <div
          className="h-px w-12 shrink-0"
          style={{
            background: "linear-gradient(to right, var(--accent), transparent)",
          }}
        />
        <span
          className="font-mono text-[15px] tracking-[.18em] uppercase"
          style={{ color: "var(--accent-light)" }}
        >
          Timeline
        </span>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="font-display mb-[70px]"
        style={{
          fontSize: "clamp(1.8rem,4vw,2.8rem)",
          letterSpacing: "-.01em",
          lineHeight: 1.1,
        }}
      >
        JOURNEY &amp; BACKGROUND
      </motion.h2>

      <motion.div
        variants={fadeUp}
        className="flex gap-[32px] flex-wrap mb-[60px]"
      >
        {Object.entries(TYPE_CONFIG).map(([, cfg]) => (
          <div key={cfg.label} className="flex items-center gap-[12px]">
            <div
              aria-hidden="true"
              style={{
                width: "13px",
                height: "13px",
                borderRadius: "50%",
                background: cfg.dot,
              }}
            />
            <span
              className="font-mono text-[14px] tracking-[.12em] uppercase"
              style={{ color: "rgba(255,255,255,.4)" }}
            >
              {cfg.label}
            </span>
          </div>
        ))}
      </motion.div>

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
