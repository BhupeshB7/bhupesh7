"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CODE_LINES } from "@/lib/constants";

export default function HeroCode() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 90]);

  return (
    <motion.aside
      aria-hidden="true"
      className="hero-code-panel"
      style={{
        flex: "0 0 48%",
        order: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        position: "relative",
        y,
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          inset: "-40px",
          borderRadius: "30px",
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Code card */}
      <div
        style={{
          width: "clamp(360px,42vw,560px)",
          borderRadius: "18px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(99,102,241,.24)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 24px 70px rgba(0,0,0,.42), 0 0 0 1px rgba(129,140,248,.08)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(90deg, rgba(99,102,241,.8), rgba(129,140,248,.2), transparent)",
          }}
        />

        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderBottom: "1px solid rgba(255,255,255,.06)",
            background: "rgba(7,8,15,.58)",
          }}
        >
          <div style={{ display: "flex", gap: "6px" }}>
            {(["#ff5f57", "#febc2e", "#28c840"] as const).map((c) => (
              <span key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, display: "block" }} />
            ))}
          </div>
          <span
            className="font-mono"
            style={{ fontSize: "10px", color: "rgba(255,255,255,.28)", letterSpacing: ".08em" }}
          >
            developer.ts
          </span>
          <span
            className="font-mono"
            style={{ fontSize: "9px", color: "var(--accent-light)", background: "rgba(99,102,241,.14)", padding: "2px 7px", borderRadius: "4px", letterSpacing: ".06em" }}
          >
            TS
          </span>
        </div>

        {/* Code body */}
        <div style={{ padding: "12px 14px 10px" }}>
          <pre
            className="font-mono"
            role="presentation"
            style={{ fontSize: "clamp(10px,1vw,12px)", lineHeight: 1.85 }}
          >
            {CODE_LINES.map((line, li) => (
              <div key={li} style={{ paddingLeft: `${line.indent * 14}px` }}>
                {line.tokens.map((token, ti) => (
                  <span key={ti} style={{ color: token.c }}>{token.t}</span>
                ))}
              </div>
            ))}
          </pre>
        </div>

        {/* Status bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 14px",
            borderTop: "1px solid rgba(255,255,255,.05)",
            background: "rgba(99,102,241,.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)" }} />
            <span
              className="font-mono"
              style={{ fontSize: "9px", color: "rgba(255,255,255,.28)", letterSpacing: ".08em", textTransform: "uppercase" }}
            >
              TypeScript
            </span>
          </div>
          <span className="font-mono" style={{ fontSize: "9px", color: "rgba(255,255,255,.18)", letterSpacing: ".06em" }}>
            Ln 10, Col 2
          </span>
        </div>
      </div>
    </motion.aside>
  );
}
