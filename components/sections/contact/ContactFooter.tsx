"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT_SOCIALS, CONTACT_INFO } from "@/lib/constants";
import { fadeUp, staggerContainer, listItem, VIEWPORT } from "@/components/animations/variants";

function SocialCard({ s }: { s: typeof CONTACT_SOCIALS[number] }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.a
      variants={listItem}
      href={s.url}
      target={s.url.startsWith("http") ? "_blank" : undefined}
      rel={s.url.startsWith("http") ? "noreferrer" : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 16px",
        borderRadius: "10px",
        background: hov ? "rgba(255,255,255,0.024)" : "rgba(255,255,255,0.012)",
        border: `1px solid ${hov ? `${s.color}28` : "rgba(99,102,241,0.1)"}`,
        textDecoration: "none",
        transition: "background .2s, border-color .2s",
        flex: "1 1 160px",
      }}
      aria-label={`${s.label}: ${s.handle}`}
    >
      {/* Dot */}
      <div
        aria-hidden="true"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: hov ? s.color : "rgba(255,255,255,.2)",
          boxShadow: hov ? `0 0 8px ${s.color}` : "none",
          flexShrink: 0,
          transition: "background .2s, box-shadow .2s",
        }}
      />
      <div style={{ minWidth: 0 }}>
        <p
          className="font-mono text-[10px] tracking-[.08em] uppercase"
          style={{ color: hov ? s.color : "rgba(255,255,255,.5)", transition: "color .2s" }}
        >
          {s.label}
        </p>
        <p
          className="font-mono text-[10px] tracking-[.04em] overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ color: "rgba(255,255,255,.25)" }}
        >
          {s.handle}
        </p>
      </div>
    </motion.a>
  );
}

export default function ContactFooter() {
  const year = new Date().getFullYear();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(32px,4vw,48px)" }}>

      {/* ── Socials grid ── */}
      <div>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="font-mono text-[9px] tracking-[.12em] uppercase mb-[14px]"
          style={{ color: "rgba(255,255,255,.2)" }}
        >
          Find me on
        </motion.p>
        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          {CONTACT_SOCIALS.map((s) => (
            <SocialCard key={s.label} s={s} />
          ))}
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.18), transparent)",
        }}
      />

      {/* ── Closing row ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* Left: logo + closing line */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              aria-hidden="true"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 8px var(--green)",
                display: "block",
                animation: "pulse-dot 2.4s ease-in-out infinite",
              }}
            />
            <span
              className="font-mono text-[12px] tracking-[.06em]"
              style={{ color: "rgba(255,255,255,.7)" }}
            >
              <span style={{ color: "var(--green)" }}>@</span>bhupeshb7
            </span>
          </div>
          <p
            className="font-mono text-[10px] tracking-[.04em]"
            style={{ color: "rgba(255,255,255,.2)", letterSpacing: ".03em" }}
          >
            Designed & built by Bhupesh Kumar · {CONTACT_INFO.location} · {CONTACT_INFO.timezone}
          </p>
        </div>

        {/* Right: copyright + built-with */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
          <p
            className="font-mono text-[10px] tracking-[.04em]"
            style={{ color: "rgba(255,255,255,.18)" }}
          >
            © {year} Bhupesh Kumar. All rights reserved.
          </p>
          <p
            className="font-mono text-[9px] tracking-[.04em]"
            style={{ color: "rgba(255,255,255,.12)" }}
          >
            Built with Next.js · TypeScript · Framer Motion
          </p>
        </div>
      </motion.div>
    </div>
  );
}
