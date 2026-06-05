"use client";

import { motion } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/components/animations/variants";

interface SectionHeaderProps {
  eyebrow: string;
  title:   string;
  sub?:    string;
}

export default function SectionHeader({ eyebrow, title, sub }: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className="mb-[clamp(36px,5vw,56px)]"
    >
      {/* Eyebrow */}
      <div className="flex items-center gap-[10px] mb-[14px]">
        <div
          className="h-px w-8 shrink-0"
          style={{ background: "linear-gradient(to right, var(--accent), transparent)" }}
        />
        <span
          className="font-mono text-[9px] tracking-[.14em] uppercase"
          style={{ color: "var(--accent-light)" }}
        >
          {eyebrow}
        </span>
      </div>

      {/* Title */}
      <h2
        className="font-display text-[clamp(1.8rem,4.5vw,3rem)] leading-none tracking-tight mb-[10px]"
        style={{ letterSpacing: "-.01em" }}
      >
        {title}
      </h2>

      {/* Sub */}
      {sub && (
        <p
          className="font-mono text-[clamp(10px,1.2vw,12px)] tracking-[.06em] uppercase"
          style={{ color: "rgba(255,255,255,.22)" }}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}
