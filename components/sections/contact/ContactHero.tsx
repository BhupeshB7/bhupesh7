"use client";

import {
  fadeUp,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import { CONTACT_INFO } from "@/lib/constants";
import { motion } from "framer-motion";
import { Phone, Zap } from "lucide-react";

export default function ContactHero() {
  return (
    <motion.div
      variants={staggerContainer(0.09)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}
    >
      {/* Eyebrow */}
      <motion.div
        variants={fadeUp}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            height: "1px",
            width: "32px",
            background: "linear-gradient(to right, transparent, var(--accent))",
          }}
        />
        <span
          className="font-mono"
          style={{
            fontSize: "9px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent-light)",
          }}
        >
          Contact
        </span>
        <div
          style={{
            height: "1px",
            width: "32px",
            background: "linear-gradient(to left, transparent, var(--accent))",
          }}
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={fadeUp}
        className="font-display"
        style={{
          fontSize: "clamp(2.4rem,6vw,4rem)",
          letterSpacing: "-.02em",
          lineHeight: 1,
          marginBottom: "18px",
          color: "rgba(255,255,255,.95)",
        }}
      >
        LET'S WORK
        <br />
        <span style={{ color: "var(--accent-light)" }}>TOGETHER</span>
      </motion.h1>

      {/* One-liner */}
      <motion.p
        variants={fadeUp}
        className="font-mono"
        style={{
          fontSize: "clamp(11px,1.3vw,13px)",
          lineHeight: 1.85,
          color: "rgba(255,255,255,.38)",
          letterSpacing: ".02em",
          maxWidth: "420px",
          margin: "0 auto 36px",
        }}
      >
        Got a project? Let's talk. I reply within{" "}
        <span style={{ color: "var(--accent-light)" }}>
          {CONTACT_INFO.responseTime}
        </span>
        .
      </motion.p>

      {/* Status strip */}
      <motion.div
        variants={fadeUp}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "clamp(14px,2.5vw,28px)",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "12px 24px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(99,102,241,0.14)",
        }}
      >
        {/* Availability */}
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span
            aria-hidden="true"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: CONTACT_INFO.availability ? "#34d399" : "#f87171",
              animation: "pulse-glow 2s ease infinite",
              flexShrink: 0,
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: ".07em",
              color: CONTACT_INFO.availability ? "#34d399" : "#f87171",
            }}
          >
            {CONTACT_INFO.availability ? "Open to work" : "Not available"}
          </span>
        </div>

        <div
          aria-hidden="true"
          style={{
            width: "1px",
            height: "16px",
            background: "rgba(255,255,255,.08)",
          }}
        />

        {/* Response */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Zap
            size={11}
            strokeWidth={1.8}
            style={{ color: "rgba(255,255,255,.3)" }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: ".05em",
              color: "rgba(255,255,255,.4)",
            }}
          >
            Replies in {CONTACT_INFO.responseTime}
          </span>
        </div>

        <div
          aria-hidden="true"
          style={{
            width: "1px",
            height: "16px",
            background: "rgba(255,255,255,.08)",
          }}
        />

        {/* Phone */}
        <a
          href={`tel:${CONTACT_INFO.mobile}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none",
          }}
        >
          <Phone
            size={11}
            strokeWidth={1.8}
            style={{ color: "rgba(255,255,255,.3)" }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: ".05em",
              color: "rgba(255,255,255,.45)",
            }}
          >
            {CONTACT_INFO.mobile}
          </span>
        </a>
      </motion.div>
    </motion.div>
  );
}
