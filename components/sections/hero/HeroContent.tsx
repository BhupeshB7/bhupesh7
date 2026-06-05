"use client";

import {
  fadeIn,
  fadeUp,
  listItem,
  staggerContainer,
} from "@/components/animations/variants";
import { COLORS, HERO_STATS, ROLES, SOCIALS, TECH_TAGS } from "@/lib/constants";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MoveRight,
  Rss,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// ─── Typed role animation ─────────────────────────────────────────────────────
function TypedRole() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];

    if (!deleting && charIdx < role.length) {
      const t = setTimeout(() => {
        setText(role.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 70);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === role.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => {
        setText(role.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, 35);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx((r) => (r + 1) % ROLES.length);
    }
  }, [charIdx, deleting, roleIdx]);

  return (
    <span
      className="font-mono"
      style={{
        fontSize: "clamp(12px,1.7vw,15px)",
        letterSpacing: ".03em",
        color: "rgba(255,255,255,.45)",
      }}
      aria-label={`Currently: ${ROLES[roleIdx]}`}
      aria-live="polite"
    >
      <span style={{ color: "var(--accent-light)" }}>{text}</span>
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "2px",
          height: "1em",
          background: "var(--accent-light)",
          verticalAlign: "text-bottom",
          marginLeft: "2px",
          animation: "cursor-blink 1s step-end infinite",
        }}
      />
    </span>
  );
}

// ─── Single stat card ─────────────────────────────────────────────────────────
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <motion.div variants={listItem} className="flex flex-col gap-[3px]">
      <span className="stat-value">{value}</span>
      <span>{label}</span>
    </motion.div>
  );
}

// ─── Social link ──────────────────────────────────────────────────────────────
function SocialLink({ label, url }: { label: string; url: string }) {
  const iconByLabel: Record<string, React.ReactNode> = {
    GitHub: <Github size={13} strokeWidth={1.8} />,
    LinkedIn: <Linkedin size={13} strokeWidth={1.8} />,
    Twitter: <Twitter size={13} strokeWidth={1.8} />,
    Email: <Mail size={13} strokeWidth={1.8} />,
    Blog: <Rss size={13} strokeWidth={1.8} />,
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="social-link"
      aria-label={label}
    >
      <span className="social-icon" aria-hidden="true">
        {iconByLabel[label] ?? <MoveRight size={13} strokeWidth={1.8} />}
      </span>
      <span>{label}</span>
    </a>
  );
}

// ─── HeroContent ─────────────────────────────────────────────────────────────
export default function HeroContent() {
  return (
    <motion.div
      className="hero-content"
      style={{
        position: "relative",
        zIndex: 3,
        flex: "0 0 52%",
        maxWidth: "660px",
        order: 1,
      }}
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.1)}
    >
      {/* Status badge */}
      <motion.div
        variants={fadeUp}
        className="inline-flex items-center gap-[10px] border border-[rgba(99,102,241,.22)] rounded-[4px] px-[14px] py-[6px] mb-[30px]"
        style={{
          background: "rgba(99,102,241,.05)",
          backdropFilter: "blur(10px)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--accent)",
            flexShrink: 0,
            animation: "pulse-glow 2s ease infinite",
          }}
        />
        <span
          className="font-mono text-[10px] tracking-[.12em] uppercase"
          style={{ color: "var(--accent-light)" }}
        >
          Open to Opportunities
        </span>
        <span
          className="font-mono text-[10px]"
          style={{ color: "rgba(255,255,255,.22)" }}
        >
          ·
        </span>
        <span
          className="font-mono text-[10px] tracking-[.06em]"
          style={{ color: "rgba(255,255,255,.35)" }}
        >
          <span className="inline-flex items-center gap-[6px]">
            <MapPin size={12} strokeWidth={1.7} />
            India
          </span>
        </span>
      </motion.div>

      {/* Role line */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-[14px] mb-[24px]"
      >
        <div
          className="h-px shrink-0"
          style={{
            width: "clamp(28px,4vw,46px)",
            background: `linear-gradient(to right, ${COLORS.accent}, transparent)`,
          }}
        />
        <TypedRole />
      </motion.div>

      {/* Bio */}
      <motion.p
        variants={fadeUp}
        className="font-mono mb-[28px]"
        style={{
          fontSize: "clamp(11px,1.3vw,13px)",
          lineHeight: 1.95,
          color: "rgba(255,255,255,.4)",
          maxWidth: "490px",
          letterSpacing: ".015em",
        }}
      >
        I architect scalable systems, obsess over DX, and ship software that{" "}
        <em
          className="font-serif not-italic"
          style={{ color: "rgba(255,255,255,.65)", fontStyle: "italic" }}
        >
          actually matters.
        </em>{" "}
        Building in public under{" "}
        <span style={{ color: "var(--accent-light)" }}>@bhupeshb7</span>.
      </motion.p>

      {/* Tech tags */}
      <motion.div
        variants={fadeUp}
        className="flex gap-[7px] flex-wrap mb-[32px]"
      >
        {TECH_TAGS.map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
          </span>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        variants={fadeUp}
        className="hero-ctas flex gap-[12px] flex-wrap mb-[48px]"
      >
        <Link href="/contact" className="btn-primary">
          Work With Me
          <ArrowUpRight size={13} strokeWidth={1.8} />
        </Link>
        <Link href="/projects" className="btn-ghost">
          View Projects
          <MoveRight size={13} strokeWidth={1.8} />
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={staggerContainer(0.08)}
        className="flex gap-[clamp(14px,2.5vw,26px)] flex-wrap mb-[48px] items-start"
      >
        {HERO_STATS.map((s, i) => (
          <div key={i} className="flex items-center">
            {i > 0 && <div className="stat-divider" aria-hidden="true" />}
            <StatItem value={s.value} label={s.label} />
          </div>
        ))}
      </motion.div>
      {/* Socials */}
      <motion.div
        variants={fadeIn}
        className="flex gap-[16px] flex-wrap pt-[20px]"
        style={{ borderTop: "1px solid rgba(255,255,255,.055)" }}
        role="list"
        aria-label="Social links"
      >
        {SOCIALS.map((s) => (
          <div key={s.label} role="listitem">
            <SocialLink label={s.label} url={s.url} />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
