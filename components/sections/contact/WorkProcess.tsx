"use client";

import { fadeUp, listItem, staggerContainer, VIEWPORT } from "@/components/animations/variants";
import { WORK_PROCESS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function WorkProcess() {
  return (
    <motion.div
      variants={staggerContainer(0.07)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        padding: "clamp(28px,3.5vw,44px)",
        borderRadius: "16px",
        background: "rgba(255,255,255,.014)",
        border: "1px solid rgba(99,102,241,.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(50% 55% at 50% 110%, rgba(99,102,241,.05) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <motion.div variants={fadeUp} style={{ marginBottom: "clamp(24px,3vw,36px)", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <div style={{ height: "1px", width: "32px", flexShrink: 0, background: "linear-gradient(to right, var(--accent), transparent)" }} />
          <span className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-light)" }}>
            Process
          </span>
        </div>
        <h2 className="font-display" style={{ fontSize: "clamp(1.3rem,2.8vw,1.8rem)", letterSpacing: "-.01em", lineHeight: 1 }}>
          HOW IT WORKS
        </h2>
      </motion.div>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          gap: "clamp(20px,3.5vw,44px)",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        {WORK_PROCESS.map((item, i) => (
          <motion.div
            key={item.step}
            variants={listItem}
            style={{ flex: "1 1 160px", minWidth: "160px", display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {/* Number + duration */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  background: `${item.color}10`, border: `1.5px solid ${item.color}28`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >
                <span className="font-display" style={{ fontSize: "12px", color: item.color, lineHeight: 1 }}>{item.step}</span>
              </div>
              <span
                className="font-mono"
                style={{
                  fontSize: "9px", letterSpacing: ".08em", textTransform: "uppercase",
                  color: item.color, background: `${item.color}0d`,
                  border: `1px solid ${item.color}1a`, borderRadius: "3px", padding: "2px 7px",
                }}
              >
                {item.dur}
              </span>
            </div>

            <p className="font-mono" style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,.75)", letterSpacing: ".03em" }}>
              {item.title}
            </p>

            <p className="font-mono" style={{ fontSize: "11px", lineHeight: 1.8, color: "rgba(255,255,255,.35)", letterSpacing: ".01em" }}>
              {item.desc}
            </p>

            {/* Connector dot between steps */}
            {i < WORK_PROCESS.length - 1 && (
              <div aria-hidden="true" style={{ display: "none" }} className="step-connector" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
