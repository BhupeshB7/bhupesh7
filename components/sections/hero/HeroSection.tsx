"use client";

import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { CircuitBackground, FloatingGlyphs } from "./HeroBackground";
import HeroCode from "./HeroCode";
import HeroContent from "./HeroContent";

// Particle canvas is client-only; avoid SSR mismatch
const ParticleCanvas = dynamic(
  () => import("./HeroBackground").then((m) => ({ default: m.ParticleCanvas })),
  { ssr: false },
);

const CursorTrail = dynamic(() => import("@/components/ui/CursorTrail"), {
  ssr: false,
});

export default function HeroSection() {
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, -36]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <>
      {/* Custom cursor — pointer devices only */}
      <CursorTrail />

      {/* ── Hero section ── */}
      <section
        id="about"
        aria-label="About Bhupesh Kumar"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          padding: "80px clamp(1.5rem,5vw,4rem)",
          gap: "clamp(1rem,3vw,2rem)",
          zIndex: 2,
        }}
      >
        {/* Hero-only canvas background */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
            pointerEvents: "none",
            background: "var(--bg)",
          }}
        >
          <CircuitBackground />
          <FloatingGlyphs />
        </div>

        {/* Interactive particles (inside section, not fixed) */}
        <ParticleCanvas />

        {/* Content transforms with scroll */}
        <motion.div style={{ display: "contents", y: contentY }}>
          <HeroContent />
          <HeroCode />
        </motion.div>

        {/* Scroll indicator */}
        <ScrollIndicator opacity={opacity} />

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "180px",
            background: "linear-gradient(to bottom, transparent, var(--bg))",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      </section>
    </>
  );
}

// ─── Scroll down indicator ────────────────────────────────────────────────────
function ScrollIndicator({ opacity }: { opacity: MotionValue<number> }) {
  const handleScroll = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Scroll down to next section"
      onClick={handleScroll}
      onKeyDown={(e) => e.key === "Enter" && handleScroll()}
      style={{
        position: "absolute",
        bottom: "38px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        zIndex: 6,
        opacity,
        pointerEvents: "auto",
      }}
    >
      <span
        className="font-mono"
        style={{
          fontSize: "8px",
          letterSpacing: ".2em",
          color: "rgba(255,255,255,.2)",
          textTransform: "uppercase",
        }}
      >
        scroll
      </span>
      <div
        style={{
          position: "relative",
          width: "22px",
          height: "36px",
          borderRadius: "11px",
          border: "1.5px solid rgba(99,102,241,.3)",
          boxShadow: "0 0 10px rgba(99,102,241,.08)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "50%",
            width: "3px",
            height: "7px",
            borderRadius: "2px",
            background: "var(--accent)",
            animation: "scroll-wheel 1.8s cubic-bezier(.45,0,.55,1) infinite",
          }}
        />
      </div>
    </motion.div>
  );
}
