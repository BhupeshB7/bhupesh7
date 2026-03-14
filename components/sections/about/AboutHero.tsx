"use client";

import {
  fadeUp,
  listItem,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import { ABOUT_BIO } from "@/lib/constants";
import { motion } from "framer-motion";

// ─── Download icon ────────────────────────────────────────────────────────────
function DownloadIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.5 1v8M3 6.5l3.5 3.5 3.5-3.5M1.5 11.5h10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Arrow icon ───────────────────────────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5V8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Photo frame with orbital ring ───────────────────────────────────────────
function PhotoFrame() {
  return (
    <div
      style={{
        position: "relative",
        width: "clamp(260px, 32vw, 380px)",
        aspectRatio: "1",
        flexShrink: 0,
      }}
    >
      {/* Outer orbital ring */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-24px",
          borderRadius: "50%",
          border: "1px solid rgba(99,102,241,0.18)",
          animation: "orbit-spin 18s linear infinite",
        }}
      >
        {/* Dot on ring */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-4px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 0 12px var(--accent)",
          }}
        />
      </div>

      {/* Inner ring */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-10px",
          borderRadius: "50%",
          border: "1px solid rgba(99,102,241,0.08)",
        }}
      />

      {/* Photo container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid rgba(99,102,241,0.3)",
          boxShadow:
            "0 0 0 1px rgba(129,140,248,0.1), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.08)",
        }}
      >
        {/* Gradient overlay at bottom */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "35%",
            background:
              "linear-gradient(to top, rgba(7,8,15,0.6), transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Photo — replace src with real image */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(0,229,255,0.08) 50%, rgba(7,8,15,0.9) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Bhupesh Kumar — profile photo placeholder"
        >
          {/* Uncomment once you have a real photo:
          <Image
            src={ABOUT_BIO.avatar}
            alt="Bhupesh Kumar"
            fill
            sizes="(max-width: 768px) 260px, 380px"
            className="object-cover"
            priority
          />
          */}
          {/* Placeholder monogram */}
          <span
            className="font-display"
            style={{
              fontSize: "clamp(4rem, 8vw, 6rem)",
              color: "rgba(129,140,248,0.4)",
              letterSpacing: "-.02em",
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            BK
          </span>
        </div>
      </div>

      {/* Floating stat chips */}
      <FloatChip
        label="5yr+ exp"
        color="var(--accent-light)"
        style={{ position: "absolute", bottom: "14%", left: "-28px" }}
      />
      <FloatChip
        label="310d streak"
        color="var(--cyan)"
        style={{ position: "absolute", top: "12%", right: "-32px" }}
      />
      <FloatChip
        label="1.1k+ ★"
        color="#fbbf24"
        style={{ position: "absolute", bottom: "32%", right: "-36px" }}
      />
    </div>
  );
}

function FloatChip({
  label,
  color,
  style,
}: {
  label: string;
  color: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 10px",
        borderRadius: "6px",
        background: "rgba(7,8,15,0.88)",
        border: `1px solid ${color}28`,
        backdropFilter: "blur(10px)",
        boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px ${color}10`,
        whiteSpace: "nowrap",
        zIndex: 2,
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      <span
        className="font-mono"
        style={{
          fontSize: "9px",
          letterSpacing: ".08em",
          color: "rgba(255,255,255,.65)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── AboutHero ────────────────────────────────────────────────────────────────
export default function AboutHero() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(3rem, 7vw, 8rem)",
        flexWrap: "wrap",
      }}
    >
      {/* ── LEFT: Text content ── */}
      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        style={{ flex: "1 1 360px", maxWidth: "560px" }}
      >
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-[10px] mb-[20px]"
        >
          <div
            className="h-px w-8 shrink-0"
            style={{
              background:
                "linear-gradient(to right, var(--accent), transparent)",
            }}
          />
          <span
            className="font-mono text-[9px] tracking-[.14em] uppercase"
            style={{ color: "var(--accent-light)" }}
          >
            About Me
          </span>
        </motion.div>

        {/* Name / headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display mb-[6px]"
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
            letterSpacing: "-.02em",
            lineHeight: 1,
            color: "rgba(255,255,255,.95)",
          }}
        >
          BHUPESH KUMAR
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="font-mono mb-[28px]"
          style={{
            fontSize: "clamp(12px, 1.4vw, 14px)",
            color: "var(--accent-light)",
            letterSpacing: ".03em",
          }}
        >
          {ABOUT_BIO.tagline}
        </motion.p>

        {/* Bio paragraphs */}
        <motion.div
          variants={staggerContainer(0.06)}
          style={{ marginBottom: "36px" }}
        >
          {ABOUT_BIO.bio.map((para, i) => (
            <motion.p
              key={i}
              variants={listItem}
              className="font-mono mb-[16px] last:mb-0"
              style={{
                fontSize: "clamp(11px, 1.25vw, 13px)",
                lineHeight: 1.9,
                color: "rgba(255,255,255,.42)",
                letterSpacing: ".015em",
              }}
            >
              {para}
            </motion.p>
          ))}
        </motion.div>

        {/* Location + availability badge */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-[12px] flex-wrap mb-[36px]"
        >
          <span
            className="font-mono text-[10px] tracking-[.06em] inline-flex items-center gap-[6px]"
            style={{ color: "rgba(255,255,255,.3)" }}
          >
            <span aria-hidden="true">📍</span>
            {ABOUT_BIO.location}
          </span>
          <span aria-hidden="true" style={{ color: "rgba(255,255,255,.12)" }}>
            ·
          </span>
          <span
            className="font-mono text-[10px] tracking-[.08em] uppercase inline-flex items-center gap-[6px]"
            style={{ color: "var(--accent-light)" }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
                animation: "pulse-glow 2s ease infinite",
              }}
            />
            Open to opportunities
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="about-hero-ctas flex gap-[10px] flex-nowrap items-center w-full"
        >
          <a
            href={ABOUT_BIO.resumeUrl}
            download
            className="btn-primary"
            aria-label="Download resume PDF"
          >
            Download Resume
            <DownloadIcon />
          </a>
          <a href="#contact" className="btn-ghost">
            Let's Talk
            <ArrowIcon />
          </a>
        </motion.div>
      </motion.div>

      {/* ── RIGHT: Photo ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="w-full flex justify-center lg:w-auto lg:flex-[0_0_auto]"
      >
        <PhotoFrame />
      </motion.div>
    </div>
  );
}
