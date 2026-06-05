"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TECH_STACK, LANGUAGES } from "@/lib/constants";

// ─── Single skill bar ─────────────────────────────────────────────────────────
function SkillBar({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setWidth(pct), delay);
    return () => clearTimeout(t);
  }, [inView, pct, delay]);

  return (
    <div ref={ref} className="mb-[16px]">
      <div className="flex justify-between mb-[6px]">
        <span className="font-mono text-[11px] tracking-[.04em]" style={{ color: "rgba(255,255,255,0.5)" }}>
          {label}
        </span>
        <span className="font-mono text-[10px] tracking-[.08em]" style={{ color }}>
          {width}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} proficiency`}
        style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}66, ${color})`,
            borderRadius: "2px",
            boxShadow: `0 0 10px ${color}44`,
            transition: "width 1.1s cubic-bezier(.16,1,.3,1)",
          }}
        />
      </div>
    </div>
  );
}

// ─── Language breakdown ───────────────────────────────────────────────────────
function LangBreakdown() {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true });
  const [prog, setProg] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1000, 1);
      setProg(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView]);

  return (
    <div ref={ref}>
      {/* Color bar */}
      <div
        aria-hidden="true"
        style={{ display: "flex", gap: "3px", height: "8px", borderRadius: "4px", overflow: "hidden", marginBottom: "18px" }}
      >
        {LANGUAGES.map((lang) => (
          <div
            key={lang.name}
            style={{
              width: `${lang.pct * prog}%`,
              background: lang.color,
              transition: "width 1s cubic-bezier(.16,1,.3,1)",
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none" }} aria-label="Language breakdown">
        {LANGUAGES.map((lang, i) => (
          <motion.li
            key={lang.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.4 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div aria-hidden="true" style={{ width: "7px", height: "7px", borderRadius: "50%", background: lang.color }} />
              <span className="font-mono text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{lang.name}</span>
            </div>
            <span className="font-mono text-[10px] tracking-[.06em]" style={{ color: lang.color }}>
              {Math.round(lang.pct * prog)}%
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// ─── TechStack ────────────────────────────────────────────────────────────────
export default function TechStack() {
  return (
    <div>
      {TECH_STACK.map((s, i) => (
        <SkillBar key={s.label} label={s.label} pct={s.pct} color={s.color} delay={i * 100} />
      ))}

      <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <span className="card-label">Language Split</span>
        <LangBreakdown />
      </div>
    </div>
  );
}
