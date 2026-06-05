"use client";

import {
  fadeUp,
  listItem,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import { ABOUT_BIO } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, MapPin, Star } from "lucide-react";
import Link from "next/link";

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
        label="2yr+ exp"
        color="var(--accent-light)"
        style={{ position: "absolute", bottom: "14%", left: "-28px" }}
      />
      <FloatChip
        label="310d streak"
        color="var(--cyan)"
        style={{ position: "absolute", top: "12%", right: "-32px" }}
      />
      <FloatChip
        label="1.1k+"
        color="#fbbf24"
        style={{ position: "absolute", bottom: "32%", right: "-36px" }}
        icon={<Star size={10} strokeWidth={1.9} />}
      />
    </div>
  );
}

function FloatChip({
  label,
  color,
  style,
  icon,
}: {
  label: string;
  color: string;
  style: React.CSSProperties;
  icon?: React.ReactNode;
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
        border: `1px solid color-mix(in srgb, ${color} 18%, transparent)`,
        backdropFilter: "blur(10px)",
        boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px color-mix(in srgb, ${color} 10%, transparent)`,
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
      {icon && <span style={{ color, display: "inline-flex" }}>{icon}</span>}
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
        gap: "clamp(4rem, 7vw, 8rem)",
        flexWrap: "wrap",
      }}
    >
      {/* ── LEFT: Text content ── */}
      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        style={{ flex: "1 1 360px", maxWidth: "4560px" }}
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
            <MapPin size={12} strokeWidth={1.8} />
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
          <button
            type="button"
            className="btn-primary"
            aria-label="Download resume PDF"
            style={{ cursor: "not-allowed", opacity: 0.7 }}
            onClick={() =>
              alert(
                "Resume is not currently available. Please check back soon.",
              )
            }
          >
            Download Resume
            <Download size={13} strokeWidth={1.8} />
          </button>
          <span
            style={{
              color: "#f87171",
              fontSize: "13px",
              marginLeft: "8px",
              fontWeight: 500,
              letterSpacing: ".01em",
              display: "inline-block",
            }}
            role="alert"
          >
            (Resume is not currently available)
          </span>
          <Link href="/contact" className="btn-ghost">
            Let's Talk
            <ArrowUpRight size={13} strokeWidth={1.8} />
          </Link>
        </motion.div>
      </motion.div>

      {/* ── RIGHT: Photo ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        style={{
          flex: "0 0 55%",
          maxWidth: "55%",
          minWidth: 0,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <PhotoFrame />
      </motion.div>
    </div>
  );
}
