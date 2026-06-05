"use client";

import { useEffect, useRef, useState } from "react";

const COLORS_SCALE = [
  "rgba(99,102,241,0.07)",
  "rgba(99,102,241,0.25)",
  "rgba(99,102,241,0.50)",
  "rgba(99,102,241,0.75)",
  "#6366f1",
] as const;

const MONTHS  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] as const;
const DAY_LABELS = ["","Mon","","Wed","","Fri",""] as const;

function buildData(streak = 310): { level: number; date: string }[] {
  const cells = 52 * 7;
  const today = new Date();
  return Array.from({ length: cells }, (_, i) => {
    const daysAgo = cells - 1 - i;
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    let level = 0;
    if (daysAgo < streak) {
      const r = Math.random();
      if (r > 0.18) level = r > 0.82 ? 4 : r > 0.6 ? 3 : r > 0.38 ? 2 : 1;
    }
    return {
      level,
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
  });
}

interface ContribGridProps {
  streak?: number;
  active:  boolean;
}

export default function ContribGrid({ streak = 310, active }: ContribGridProps) {
  const data     = useRef(buildData(streak));
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const total = data.current.length;
    const step  = () => {
      setRevealed((r) => {
        const next = Math.min(r + 20, total);
        if (next < total) raf = requestAnimationFrame(step);
        return next;
      });
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const today = new Date();
  const monthLabels: { label: string; col: number }[] = [];
  for (let col = 0; col < 52; col++) {
    const d = new Date(today);
    d.setDate(d.getDate() - (51 - col) * 7);
    if (d.getDate() <= 7) monthLabels.push({ label: MONTHS[d.getMonth()], col });
  }

  return (
    <div
      role="img"
      aria-label={`GitHub contribution grid showing ${streak}-day streak`}
      style={{ overflowX: "auto", paddingBottom: "8px" }}
    >
      <div style={{ display: "inline-flex", flexDirection: "column", gap: 0, minWidth: "640px" }}>
        {/* Month labels */}
        <div style={{ display: "flex", marginLeft: "30px", marginBottom: "5px", position: "relative", height: "16px" }}>
          {monthLabels.map(({ label, col }) => (
            <span
              key={col}
              style={{
                position: "absolute",
                left: `${col * 13}px`,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: ".08em",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "4px", alignItems: "flex-start" }}>
          {/* Day labels */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginRight: "2px", paddingTop: "2px" }}>
            {DAY_LABELS.map((d, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "8px",
                  color: "rgba(255,255,255,0.18)",
                  height: "10px",
                  lineHeight: "10px",
                  display: "block",
                  width: "22px",
                  textAlign: "right",
                }}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "flex", gap: "2px" }}>
            {Array.from({ length: 52 }, (_, col) => (
              <div key={col} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {Array.from({ length: 7 }, (_, row) => {
                  const idx  = col * 7 + row;
                  const cell = data.current[idx];
                  const show = idx < revealed;
                  return (
                    <div
                      key={row}
                      title={cell ? `${cell.date} · level ${cell.level}` : ""}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "2px",
                        background: show ? COLORS_SCALE[cell.level] : "rgba(99,102,241,0.04)",
                        border: "1px solid rgba(255,255,255,0.03)",
                        transition: show ? "background 0.25s ease" : "none",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px", marginLeft: "30px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "rgba(255,255,255,0.18)" }}>Less</span>
          {COLORS_SCALE.map((c, i) => (
            <div key={i} style={{ width: "10px", height: "10px", borderRadius: "2px", background: c, border: "1px solid rgba(255,255,255,0.05)" }} />
          ))}
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "rgba(255,255,255,0.18)" }}>More</span>
        </div>
      </div>
    </div>
  );
}
