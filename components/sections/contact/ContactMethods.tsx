"use client";

import {
  fadeUp,
  listItem,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import { CONTACT_INFO } from "@/lib/constants";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, CalendarClock, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

const METHODS = [
  {
    id: "calendly",
    icon: CalendarClock,
    color: "var(--accent-light)",
    title: "Book a 30-min call",
    sub: "Calendly · Free",
    desc: "Jump on a quick discovery call. No agenda required — just come with your problem. I'm available Mon–Fri, IST timezone.",
    cta: "Open Calendly",
    href: CONTACT_INFO.calendlyUrl,
    external: true,
    badge: "Fastest",
  },
  {
    id: "email",
    icon: Mail,
    color: "#34d399",
    title: "Send a detailed brief",
    sub: "Email · < 24h reply",
    desc: "For project inquiries, proposals, or anything that needs more context than a call. Include your timeline, budget, and what you're building.",
    cta: "Send email",
    href: `mailto:${CONTACT_INFO.email}?subject=Project%20Inquiry`,
    external: false,
    badge: "Async",
  },
  {
    id: "twitter",
    icon: MessageCircle,
    color: "var(--cyan)",
    title: "Twitter / X DM",
    sub: "@bhupeshb7 · Open DMs",
    desc: "Quick question, feedback on a blog post, or just want to say hi? DMs are open. I check Twitter daily.",
    cta: "DM on Twitter",
    href: CONTACT_INFO.twitterUrl,
    external: true,
    badge: "Quick",
  },
] as const;

function MethodCard({ method }: { method: (typeof METHODS)[number] }) {
  const [hov, setHov] = useState(false);
  const Icon = method.icon as LucideIcon;

  return (
    <motion.div variants={listItem}>
      <a
        href={method.href}
        target={method.external ? "_blank" : undefined}
        rel={method.external ? "noreferrer" : undefined}
        aria-label={method.title}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "clamp(22px,2.8vw,32px)",
          borderRadius: "16px",
          background: hov
            ? "rgba(255,255,255,0.028)"
            : "rgba(255,255,255,0.016)",
          border: hov
            ? `1px solid color-mix(in srgb, ${method.color} 20%, transparent)`
            : "1px solid rgba(99,102,241,0.12)",
          textDecoration: "none",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          transition: "background .25s, border-color .25s",
        }}
      >
        {/* Top accent */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, color-mix(in srgb, ${method.color} ${hov ? "55%" : "30%"}, transparent), transparent)`,
            transition: "opacity .25s",
          }}
        />

        {/* Badge */}
        <span
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "8px",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: method.color,
            background: `color-mix(in srgb, ${method.color} 8%, transparent)`,
            border: `1px solid color-mix(in srgb, ${method.color} 14%, transparent)`,
            borderRadius: "3px",
            padding: "2px 7px",
          }}
          aria-label={`${method.badge} method`}
        >
          {method.badge}
        </span>

        {/* Icon */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            background: `color-mix(in srgb, ${method.color} 8%, transparent)`,
            border: `1px solid color-mix(in srgb, ${method.color} 14%, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <Icon size={18} color={method.color} strokeWidth={1.8} />
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <p
            className="font-mono font-bold mb-[3px]"
            style={{
              fontSize: "13px",
              color: hov ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.75)",
              letterSpacing: ".02em",
              transition: "color .2s",
            }}
          >
            {method.title}
          </p>
          <p
            className="font-mono text-[10px] tracking-[.05em] mb-[10px]"
            style={{ color: method.color }}
          >
            {method.sub}
          </p>
          <p
            className="font-mono"
            style={{
              fontSize: "11px",
              lineHeight: 1.85,
              color: "rgba(255,255,255,.35)",
              letterSpacing: ".01em",
            }}
          >
            {method.desc}
          </p>
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(255,255,255,.05)",
          }}
        >
          <span
            className="font-mono text-[10px] tracking-[.08em] uppercase font-bold"
            style={{
              color: hov ? method.color : "rgba(255,255,255,.3)",
              transition: "color .2s",
            }}
          >
            {method.cta}
          </span>
          <ArrowUpRight
            size={10}
            strokeWidth={1.8}
            aria-hidden="true"
            style={{
              color: hov ? method.color : "rgba(255,255,255,.2)",
              transition: "color .2s, transform .2s",
              transform: hov ? "translate(2px,-2px)" : "translate(0,0)",
            }}
          />
        </div>
      </a>
    </motion.div>
  );
}

export default function ContactMethods() {
  return (
    <div>
      {/* Sub-header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        style={{ marginBottom: "clamp(24px,3vw,32px)" }}
      >
        <div className="flex items-center gap-[10px] mb-[10px]">
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
            Reach me
          </span>
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.4rem,3vw,2rem)",
            letterSpacing: "-.01em",
            lineHeight: 1,
          }}
        >
          3 WAYS TO CONNECT
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "clamp(12px,1.8vw,18px)",
        }}
      >
        {METHODS.map((m) => (
          <MethodCard key={m.id} method={m} />
        ))}
      </motion.div>
    </div>
  );
}
