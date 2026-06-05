"use client";

import { fadeUp, listItem, staggerContainer, VIEWPORT } from "@/components/animations/variants";
import { COLLAB_TYPES, CONTACT_INFO } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

function CollabCard({ item }: { item: (typeof COLLAB_TYPES)[number] }) {
  const [hov, setHov] = useState(false);

  const href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(item.title)}`;

  return (
    <motion.article
      variants={listItem}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "clamp(20px,2.6vw,28px)",
        borderRadius: "14px",
        background: hov ? "rgba(255,255,255,.024)" : "rgba(255,255,255,.014)",
        border: `1px solid ${hov ? `${item.color}28` : "rgba(99,102,241,.1)"}`,
        position: "relative",
        overflow: "hidden",
        transition: "background .22s, border-color .22s",
        gap: "14px",
      }}
    >
      {/* Top accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, ${item.color}${hov ? "70" : "28"}, transparent)`,
          transition: "background .25s",
        }}
      />

      {/* Color dot + title */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          aria-hidden="true"
          style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: item.color, flexShrink: 0,
            boxShadow: hov ? `0 0 10px ${item.color}` : "none",
            transition: "box-shadow .25s",
          }}
        />
        <h3
          className="font-mono"
          style={{
            fontSize: "12px", fontWeight: 700, letterSpacing: ".04em",
            color: hov ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.72)",
            transition: "color .2s",
          }}
        >
          {item.title}
        </h3>
      </div>

      {/* Tagline */}
      <p className="font-mono" style={{ fontSize: "10px", letterSpacing: ".04em", color: item.color, opacity: 0.8 }}>
        {item.tagline}
      </p>

      {/* Short desc */}
      <p className="font-mono" style={{ fontSize: "11px", lineHeight: 1.8, color: "rgba(255,255,255,.35)", letterSpacing: ".01em", flex: 1 }}>
        {item.desc}
      </p>

      {/* 4 bullets — clean, minimal */}
      <ul style={{ display: "flex", flexDirection: "column", gap: "5px", listStyle: "none", padding: 0 }}>
        {item.details.map((d) => (
          <li key={d} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div aria-hidden="true" style={{ width: "3px", height: "3px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
            <span className="font-mono" style={{ fontSize: "10px", letterSpacing: ".02em", color: "rgba(255,255,255,.38)" }}>{d}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={href}
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,.05)",
          textDecoration: "none", marginTop: "auto",
        }}
        aria-label={item.cta}
      >
        <span
          className="font-mono"
          style={{ fontSize: "10px", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700, color: hov ? item.color : "rgba(255,255,255,.28)", transition: "color .2s" }}
        >
          {item.cta}
        </span>
        <ArrowUpRight size={10} strokeWidth={1.8} style={{ color: hov ? item.color : "rgba(255,255,255,.2)", transition: "color .2s, transform .2s", transform: hov ? "translate(2px,-2px)" : "none" }} />
      </a>
    </motion.article>
  );
}

export default function CollaborationTypes() {
  return (
    <div>
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT} style={{ marginBottom: "clamp(22px,2.8vw,30px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <div style={{ height: "1px", width: "32px", flexShrink: 0, background: "linear-gradient(to right, var(--accent), transparent)" }} />
          <span className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-light)" }}>
            What I do
          </span>
        </div>
        <h2 className="font-display" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", letterSpacing: "-.01em", lineHeight: 1, marginBottom: "8px" }}>
          HOW I CAN HELP
        </h2>
        <p className="font-mono" style={{ fontSize: "clamp(10px,1.2vw,12px)", color: "rgba(255,255,255,.25)" }}>
          Pick what fits. All start with a quick message.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "clamp(10px,1.6vw,16px)" }}
      >
        {COLLAB_TYPES.map((item) => (
          <CollabCard key={item.title} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
