"use client";

import { motion } from "framer-motion";
import { WORK_PROCESS } from "@/lib/constants";
import { fadeUp, staggerContainer, listItem, VIEWPORT } from "@/components/animations/variants";

function ProcessStep({
  item,
  isLast,
}: {
  item: typeof WORK_PROCESS[number];
  isLast: boolean;
}) {
  return (
    <motion.div
      variants={listItem}
      style={{ flex: 1, minWidth: "200px", position: "relative" }}
    >
      {/* Connector line — hidden on last item */}
      {!isLast && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "19px",
            left: "calc(50% + 20px)",
            right: "-50%",
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(99,102,241,0.35), rgba(99,102,241,0.06))",
            display: "none", // shown via CSS on md+
          }}
          className="process-connector"
        />
      )}

      {/* Step content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Number + duration row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Number bubble */}
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: `${item.color}12`,
              border: `1.5px solid ${item.color}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: `0 0 0 4px ${item.color}06`,
            }}
          >
            <span
              className="font-display"
              style={{
                fontSize: "13px",
                color: item.color,
                letterSpacing: "-.01em",
                lineHeight: 1,
              }}
              aria-label={`Step ${item.step}`}
            >
              {item.step}
            </span>
          </div>

          {/* Duration chip */}
          <span
            className="font-mono text-[9px] tracking-[.08em] uppercase"
            style={{
              color: item.color,
              background: `${item.color}0e`,
              border: `1px solid ${item.color}1e`,
              borderRadius: "3px",
              padding: "2px 8px",
              whiteSpace: "nowrap",
            }}
          >
            {item.dur}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-mono font-bold"
          style={{
            fontSize: "clamp(12px,1.3vw,13px)",
            color: "rgba(255,255,255,.8)",
            letterSpacing: ".03em",
          }}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className="font-mono"
          style={{
            fontSize: "11px",
            lineHeight: 1.85,
            color: "rgba(255,255,255,.35)",
            letterSpacing: ".01em",
          }}
        >
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function WorkProcess() {
  return (
    <motion.div
      variants={staggerContainer(0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        padding: "clamp(32px,4vw,48px) clamp(24px,3.5vw,44px)",
        borderRadius: "18px",
        background: "rgba(255,255,255,0.014)",
        border: "1px solid rgba(99,102,241,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(55% 60% at 50% 110%, rgba(99,102,241,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <motion.div
        variants={fadeUp}
        style={{ marginBottom: "clamp(28px,3.5vw,40px)", position: "relative", zIndex: 1 }}
      >
        <div className="flex items-center gap-[10px] mb-[10px]">
          <div
            className="h-px w-8 shrink-0"
            style={{ background: "linear-gradient(to right, var(--accent), transparent)" }}
          />
          <span
            className="font-mono text-[9px] tracking-[.14em] uppercase"
            style={{ color: "var(--accent-light)" }}
          >
            Process
          </span>
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.4rem,3vw,2rem)",
            letterSpacing: "-.01em",
            lineHeight: 1,
          }}
        >
          HOW I WORK WITH YOU
        </h2>
      </motion.div>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          gap: "clamp(24px,4vw,48px)",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        {WORK_PROCESS.map((item, i) => (
          <ProcessStep
            key={item.step}
            item={item}
            isLast={i === WORK_PROCESS.length - 1}
          />
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        variants={fadeUp}
        className="font-mono text-[10px] tracking-[.04em] mt-[32px] pt-[20px]"
        style={{
          color: "rgba(255,255,255,.2)",
          borderTop: "1px solid rgba(255,255,255,.05)",
          position: "relative",
          zIndex: 1,
          letterSpacing: ".03em",
        }}
      >
        ✦ &nbsp; Fixed-price or time-and-materials — we agree before a single line of code is written.
        &nbsp; No hidden fees, no surprise invoices.
      </motion.p>
    </motion.div>
  );
}
