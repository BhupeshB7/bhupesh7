"use client";

import { motion } from "framer-motion";
import { CONTACT_INFO } from "@/lib/constants";
import { fadeUp, staggerContainer, listItem, VIEWPORT } from "@/components/animations/variants";

export default function ContactHero() {
  return (
    <motion.div
      variants={staggerContainer(0.09)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}
    >
      {/* Eyebrow */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-center gap-[10px] mb-[24px]"
      >
        <div
          className="h-px w-8 shrink-0"
          style={{ background: "linear-gradient(to right, transparent, var(--accent))" }}
        />
        <span
          className="font-mono text-[9px] tracking-[.14em] uppercase"
          style={{ color: "var(--accent-light)" }}
        >
          Contact
        </span>
        <div
          className="h-px w-8 shrink-0"
          style={{ background: "linear-gradient(to left, transparent, var(--accent))" }}
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={fadeUp}
        className="font-display mb-[20px]"
        style={{
          fontSize: "clamp(2.4rem, 6vw, 4.4rem)",
          letterSpacing: "-.02em",
          lineHeight: 1,
          color: "rgba(255,255,255,.95)",
        }}
      >
        LET'S BUILD
        <br />
        <span style={{ color: "var(--accent-light)" }}>SOMETHING</span>{" "}
        GREAT
      </motion.h1>

      {/* Sub */}
      <motion.p
        variants={fadeUp}
        className="font-mono mb-[40px]"
        style={{
          fontSize: "clamp(11px, 1.3vw, 13px)",
          lineHeight: 1.9,
          color: "rgba(255,255,255,.38)",
          letterSpacing: ".02em",
          maxWidth: "520px",
          margin: "0 auto 40px",
        }}
      >
        Whether it's a product idea, a technical problem, or just a conversation
        about architecture — I read every message and reply to every serious inquiry.
      </motion.p>

      {/* Availability + response strip */}
      <motion.div
        variants={fadeUp}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "clamp(16px, 3vw, 32px)",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "14px 28px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(99,102,241,0.14)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Availability */}
        <div className="flex items-center gap-[8px]">
          <span
            aria-hidden="true"
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: CONTACT_INFO.availability ? "#34d399" : "#f87171",
              boxShadow: CONTACT_INFO.availability
                ? "0 0 0 0 rgba(52,211,153,0.4)"
                : "0 0 0 0 rgba(248,113,113,0.4)",
              animation: "pulse-glow 2s ease infinite",
              flexShrink: 0,
            }}
          />
          <span
            className="font-mono text-[10px] tracking-[.08em]"
            style={{ color: CONTACT_INFO.availability ? "#34d399" : "#f87171" }}
            aria-label={
              CONTACT_INFO.availability
                ? "Currently available for work"
                : "Not currently available"
            }
          >
            {CONTACT_INFO.availability ? "Available for work" : "Not available"}
          </span>
        </div>

        <div aria-hidden="true" style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.08)" }} />

        {/* Response time */}
        <div className="flex items-center gap-[7px]">
          <span aria-hidden="true" style={{ fontSize: "11px", color: "rgba(255,255,255,.3)" }}>⚡</span>
          <span
            className="font-mono text-[10px] tracking-[.06em]"
            style={{ color: "rgba(255,255,255,.4)" }}
          >
            Replies in {CONTACT_INFO.responseTime}
          </span>
        </div>

        <div aria-hidden="true" style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.08)" }} />

        {/* Timezone */}
        <div className="flex items-center gap-[7px]">
          <span aria-hidden="true" style={{ fontSize: "11px", color: "rgba(255,255,255,.3)" }}>🌏</span>
          <span
            className="font-mono text-[10px] tracking-[.06em]"
            style={{ color: "rgba(255,255,255,.4)" }}
          >
            {CONTACT_INFO.timezone}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
