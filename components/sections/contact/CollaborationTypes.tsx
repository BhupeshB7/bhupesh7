"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COLLAB_TYPES, CONTACT_INFO } from "@/lib/constants";
import { fadeUp, staggerContainer, listItem, VIEWPORT } from "@/components/animations/variants";

function CollabCard({ item }: { item: typeof COLLAB_TYPES[number] }) {
  const [hov, setHov] = useState(false);

  const href = "calendly" in item && item.calendly
    ? CONTACT_INFO.calendlyUrl
    : `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(item.title)}`;

  return (
    <motion.article
      variants={listItem}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "clamp(22px,2.8vw,32px)",
        borderRadius: "16px",
        background: hov ? "rgba(255,255,255,0.024)" : "rgba(255,255,255,0.014)",
        border: `1px solid ${hov ? `${item.color}30` : "rgba(99,102,241,0.1)"}`,
        position: "relative",
        overflow: "hidden",
        transition: "background .25s, border-color .25s",
        gap: "16px",
      }}
    >
      {/* Top accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: hov
            ? `linear-gradient(90deg, ${item.color}80, ${item.color}22, transparent)`
            : `linear-gradient(90deg, ${item.color}30, transparent)`,
          transition: "background .3s",
        }}
      />

      {/* Watermark icon */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-12px",
          right: "12px",
          fontFamily: "'Anton','Impact',sans-serif",
          fontSize: "clamp(4rem,7vw,6rem)",
          color: `${item.color}06`,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          transition: "color .25s",
        }}
      >
        {item.icon}
      </span>

      {/* Icon + title */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        <div
          aria-hidden="true"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            background: `${item.color}10`,
            border: `1px solid ${item.color}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: item.color,
            flexShrink: 0,
          }}
        >
          {item.icon}
        </div>
        <div>
          <h3
            className="font-mono font-bold mb-[3px]"
            style={{
              fontSize: "13px",
              color: hov ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.75)",
              letterSpacing: ".02em",
              transition: "color .2s",
            }}
          >
            {item.title}
          </h3>
          <p className="font-mono text-[10px] tracking-[.04em]" style={{ color: item.color }}>
            {item.tagline}
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        className="font-mono"
        style={{
          fontSize: "11px",
          lineHeight: 1.85,
          color: "rgba(255,255,255,.35)",
          letterSpacing: ".01em",
          flex: 1,
        }}
      >
        {item.desc}
      </p>

      {/* Detail list */}
      <ul style={{ display: "flex", flexDirection: "column", gap: "6px", listStyle: "none" }} aria-label="What's included">
        {item.details.map((d) => (
          <li
            key={d}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span aria-hidden="true" style={{ color: item.color, fontSize: "9px", flexShrink: 0 }}>▸</span>
            <span
              className="font-mono text-[10px] tracking-[.03em]"
              style={{ color: "rgba(255,255,255,.4)" }}
            >
              {d}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={href}
        target={"calendly" in item && item.calendly ? "_blank" : undefined}
        rel={"calendly" in item && item.calendly ? "noreferrer" : undefined}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          paddingTop: "14px",
          borderTop: "1px solid rgba(255,255,255,.05)",
          textDecoration: "none",
          marginTop: "auto",
        }}
        aria-label={item.cta}
      >
        <span
          className="font-mono text-[10px] tracking-[.08em] uppercase font-bold"
          style={{ color: hov ? item.color : "rgba(255,255,255,.28)", transition: "color .2s" }}
        >
          {item.cta}
        </span>
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
          style={{
            color: hov ? item.color : "rgba(255,255,255,.2)",
            transition: "color .2s, transform .2s",
            transform: hov ? "translate(2px,-2px)" : "translate(0,0)",
          }}
        >
          <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </a>
    </motion.article>
  );
}

export default function CollaborationTypes() {
  return (
    <div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        style={{ marginBottom: "clamp(24px,3vw,32px)" }}
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
            How we can work together
          </span>
        </div>
        <h2
          className="font-display mb-[10px]"
          style={{ fontSize: "clamp(1.4rem,3vw,2rem)", letterSpacing: "-.01em", lineHeight: 1 }}
        >
          COLLABORATION TYPES
        </h2>
        <p
          className="font-mono text-[clamp(10px,1.2vw,12px)] tracking-[.05em]"
          style={{ color: "rgba(255,255,255,.25)", maxWidth: "480px" }}
        >
          Pick the model that fits your need. All engagements start with a conversation.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(12px,1.8vw,18px)",
        }}
      >
        {COLLAB_TYPES.map((item) => (
          <CollabCard key={item.title} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
