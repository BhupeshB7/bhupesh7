"use client";

import {
  fadeIn,
  fadeUp,
  listItem,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import { ACTIVITY_STATS, BUILDING } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import ActivityFeed from "./ActivityFeed";
import ContribGrid from "./ContribGrid";
import TechStack from "./TechStack";

// ─── Animated count-up ────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - pct, 3)) * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

// ─── Mini stat with count-up ──────────────────────────────────────────────────
function MiniStat({
  value,
  suffix = "",
  label,
  color,
  delay,
}: {
  value: number;
  suffix?: string;
  label: string;
  color: string;
  delay: number;
}) {
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 1200, active);

  return (
    <motion.div
      variants={listItem}
      onViewportEnter={() => setActive(true)}
      viewport={VIEWPORT}
      style={{ display: "flex", flexDirection: "column", gap: "5px" }}
    >
      <span
        className="font-display"
        style={{
          fontSize: "clamp(1.6rem,2.8vw,2.3rem)",
          color,
          lineHeight: 1,
          letterSpacing: "-.01em",
        }}
      >
        {count.toLocaleString()}
        {suffix}
      </span>
      <span
        className="font-mono text-[9px] tracking-[.1em] uppercase"
        style={{ color: "rgba(255,255,255,.22)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ─── Building ticker ──────────────────────────────────────────────────────────
function BuildingTicker({ active }: { active: boolean }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % BUILDING.length);
        setFade(true);
      }, 280);
    }, 3000);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div
      aria-live="polite"
      aria-label="Currently building"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "9px 16px",
        background: "rgba(99,102,241,0.05)",
        border: "1px solid rgba(99,102,241,0.14)",
        borderRadius: "6px",
        maxWidth: "680px",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--cyan)",
          flexShrink: 0,
          animation: "pulse-glow 2s ease infinite",
        }}
      />
      <span
        className="font-mono text-[9px] tracking-[.1em] uppercase shrink-0"
        style={{ color: "rgba(255,255,255,.25)" }}
      >
        Building ·
      </span>
      <span
        className="font-mono text-[11px] overflow-hidden text-ellipsis whitespace-nowrap"
        style={{
          color: "var(--accent-light)",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.28s ease",
        }}
      >
        {BUILDING[idx]}
      </span>
    </div>
  );
}

// ─── ActivitySection ──────────────────────────────────────────────────────────
export default function ActivitySection() {
  const [contribActive, setContribActive] = useState(false);

  return (
    <section
      id="activity"
      aria-label="Developer activity and stats"
      style={{
        background: "var(--bg)",
        color: "#fff",
        padding: "clamp(72px,9vw,128px) clamp(1.5rem,5vw,4rem)",
        position: "relative",
        overflow: "hidden",
        zIndex: 2,
      }}
    >
      <div className="section-separator" aria-hidden="true" />

      {/* ── Section heading ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mb-[clamp(44px,6vw,72px)]"
      >
        <div className="flex items-center gap-[10px] mb-[16px]">
          <div
            className="h-px w-8"
            style={{
              background:
                "linear-gradient(to right, var(--accent), transparent)",
            }}
          />
          <span
            className="font-mono text-[9px] tracking-[.14em] uppercase"
            style={{ color: "var(--accent-light)" }}
          >
            Activity
          </span>
        </div>
        <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-none tracking-tight mb-[12px]">
          310 DAY STREAK
        </h2>
        <p
          className="font-mono text-[clamp(10px,1.2vw,12px)] tracking-[.06em] uppercase"
          style={{ color: "rgba(255,255,255,.25)" }}
        >
          Shipping daily. Consistency is the only unfair advantage.
        </p>
      </motion.div>

      {/* ── Building ticker ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mb-[56px]"
      >
        <BuildingTicker active={true} />
      </motion.div>

      {/* ── Stats row ── */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="flex gap-[clamp(18px,3.5vw,44px)] flex-wrap mb-[clamp(44px,6vw,72px)] pb-[clamp(36px,4.5vw,52px)] items-start"
        style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}
      >
        {ACTIVITY_STATS.map((s, i) => (
          <div key={`${s.label}-${i}`} className="contents">
            {i > 0 && (
              <div
                aria-hidden="true"
                style={{
                  width: "1px",
                  background: "rgba(255,255,255,.06)",
                  alignSelf: "stretch",
                  flexShrink: 0,
                }}
              />
            )}
            <MiniStat
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              color={s.color}
              delay={i * 100}
            />
          </div>
        ))}
      </motion.div>

      {/* ── Contribution grid ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        onViewportEnter={() => setContribActive(true)}
        className="mb-[clamp(44px,6vw,72px)]"
      >
        <ContribGrid streak={310} active={contribActive} />
      </motion.div>

      {/* ── Cards row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "clamp(14px,2vw,20px)",
        }}
      >
        {/* Recent Activity */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="card"
        >
          <div className="flex justify-between items-center mb-[14px]">
            <span className="card-label" style={{ marginBottom: 0 }}>
              Recent Activity
            </span>
            <a
              href="https://github.com/bhupeshb7"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[9px] tracking-[.06em] no-underline"
              style={{ color: "var(--accent-light)", opacity: 0.65 }}
              aria-label="View GitHub profile"
            >
              <span className="inline-flex items-center gap-[4px]">
                github <ArrowUpRight size={10} strokeWidth={1.8} />
              </span>
            </a>
          </div>
          <ActivityFeed />
        </motion.div>

        {/* Tech stack */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.12 }}
          className="card"
        >
          <span className="card-label">Tech Stack</span>
          <TechStack />
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
