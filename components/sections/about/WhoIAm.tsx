"use client";

import {
  fadeUp,
  listItem,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import { motion } from "framer-motion";

const TRAITS = [
  {
    icon: "⚡",
    label: "Fast learner",
    desc: "Picked up Rust in 3 months to build a CLI tool. Now I can't stop.",
  },
  {
    icon: "🔍",
    label: "Detail-obsessed",
    desc: "I notice when a button's hover delay is 20ms too slow. Yes, that matters.",
  },
  {
    icon: "📖",
    label: "Writer",
    desc: "Technical writing is how I verify I actually understand something.",
  },
  {
    icon: "🌐",
    label: "Open source",
    desc: "Everything I build privately eventually ends up public. Knowledge compounds.",
  },
] as const;

const PULL_QUOTE =
  "The best engineers I've met all share one trait — they make complex things feel obvious.";

export default function WhoIAm() {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {/* Section label */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-[10px] mb-[16px]"
      >
        <div
          className="h-px w-8 shrink-0"
          style={{
            background: "linear-gradient(to right, var(--accent), transparent)",
          }}
        />
        <span
          className="font-mono text-[9px] tracking-[.14em] uppercase"
          style={{ color: "var(--accent-light)" }}
        >
          Who I Am
        </span>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="font-display mb-[48px]"
        style={{
          fontSize: "clamp(1.8rem,4vw,2.8rem)",
          letterSpacing: "-.01em",
          lineHeight: 1,
        }}
      >
        BACKGROUND &amp; PHILOSOPHY
      </motion.h2>

      {/* Two-column layout on desktop */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(3rem, 6vw, 7rem)",
          alignItems: "start",
        }}
      >
        {/* Left: prose */}
        <motion.div variants={staggerContainer(0.07)}>
          {[
            "I grew up fascinated by how software could change entire industries overnight. That fascination turned into a career — 5+ years building products people actually use, at companies from 3-person startups to mid-sized product teams.",
            "My engineering philosophy is simple: understand the problem deeply before touching the keyboard. The best code I've ever written was preceded by an hour of thinking and a whiteboard covered in diagrams.",
            "I gravitate toward the hard problems — performance bottlenecks, real-time systems, DX improvements that make entire teams faster. If something takes 30 seconds when it should take 3, I can't leave it alone.",
          ].map((para, i) => (
            <motion.p
              key={i}
              variants={listItem}
              className="font-mono mb-[20px] last:mb-0"
              style={{
                fontSize: "clamp(11px, 1.25vw, 13px)",
                lineHeight: 2,
                color: "rgba(255,255,255,.42)",
                letterSpacing: ".015em",
              }}
            >
              {para}
            </motion.p>
          ))}

          {/* Pull quote */}
          <motion.blockquote
            variants={fadeUp}
            style={{
              marginTop: "36px",
              paddingLeft: "20px",
              borderLeft: "2px solid var(--accent)",
              position: "relative",
            }}
          >
            <span
              aria-hidden="true"
              className="font-serif"
              style={{
                position: "absolute",
                top: "-14px",
                left: "14px",
                fontSize: "3rem",
                color: "rgba(99,102,241,0.25)",
                lineHeight: 1,
                fontStyle: "italic",
              }}
            >
              "
            </span>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(13px,1.4vw,15px)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,.65)",
                fontStyle: "italic",
                letterSpacing: ".01em",
              }}
            >
              {PULL_QUOTE}
            </p>
          </motion.blockquote>
        </motion.div>

        {/* Right: trait cards */}
        <motion.div
          variants={staggerContainer(0.08)}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {TRAITS.map((t) => (
            <motion.div
              key={t.label}
              variants={listItem}
              style={{
                display: "flex",
                gap: "16px",
                padding: "18px 20px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.016)",
                border: "1px solid rgba(99,102,241,0.1)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontSize: "18px",
                  lineHeight: 1,
                  flexShrink: 0,
                  marginTop: "2px",
                  filter: "saturate(0.9)",
                }}
              >
                {t.icon}
              </span>
              <div>
                <p
                  className="font-mono text-[11px] tracking-[.06em] uppercase mb-[5px]"
                  style={{ color: "rgba(255,255,255,.7)", fontWeight: 700 }}
                >
                  {t.label}
                </p>
                <p
                  className="font-mono text-[11px] leading-[1.75]"
                  style={{
                    color: "rgba(255,255,255,.35)",
                    letterSpacing: ".01em",
                  }}
                >
                  {t.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
