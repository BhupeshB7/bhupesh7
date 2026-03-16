"use client";

import {
  fadeUp,
  listItem,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import { CONTACT_INFO } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarClock, Mail, Phone } from "lucide-react";
import { useState } from "react";

const METHODS = [
  {
    id: "phone",
    icon: Phone,
    color: "#34d399",
    title: "Call me",
    sub: `${CONTACT_INFO.mobile} · India`,
    desc: "Fastest way to connect. Call or WhatsApp — available Mon–Sat, 10am–8pm IST.",
    cta: "Call now",
    href: `tel:${CONTACT_INFO.mobile}`,
    external: false,
  },
  {
    id: "email",
    icon: Mail,
    color: "#aa7fff",
    title: "Email me",
    sub: `${CONTACT_INFO.email} · < 2hr reply`,
    desc: "Describe your project briefly. I read every email and reply fast.",
    cta: "Send email",
    href: `mailto:${CONTACT_INFO.email}?subject=Project%20Inquiry`,
    external: false,
  },
  {
    id: "calendly",
    icon: CalendarClock,
    color: "#fbbf24",
    title: "Book a call",
    sub: "Calendly · 30 min · Free",
    desc: "Pick a slot that works for you. No agenda needed — just come with your problem.",
    cta: "Book slot",
    href: CONTACT_INFO.calendlyUrl,
    external: true,
  },
] as const;

function MethodCard({ m }: { m: (typeof METHODS)[number] }) {
  const [hov, setHov] = useState(false);
  const Icon = m.icon;

  return (
    <motion.a
      variants={listItem}
      href={m.href}
      target={m.external ? "_blank" : undefined}
      rel={m.external ? "noreferrer" : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "clamp(20px,2.6vw,28px)",
        borderRadius: "14px",
        background: hov ? "rgba(255,255,255,.024)" : "rgba(255,255,255,.014)",
        border: `1px solid ${hov ? `${m.color}28` : "rgba(99,102,241,.1)"}`,
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        transition: "background .22s, border-color .22s",
      }}
      aria-label={m.title}
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
          background: `linear-gradient(90deg, ${m.color}${hov ? "70" : "28"}, transparent)`,
          transition: "background .25s",
        }}
      />

      {/* Icon */}
      <div
        aria-hidden="true"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: `${m.color}10`,
          border: `1px solid ${m.color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={17} color={m.color} strokeWidth={1.8} />
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <p
          className="font-mono"
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: hov ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.75)",
            letterSpacing: ".02em",
            marginBottom: "3px",
            transition: "color .2s",
          }}
        >
          {m.title}
        </p>
        <p
          className="font-mono"
          style={{
            fontSize: "10px",
            letterSpacing: ".04em",
            color: m.color,
            marginBottom: "10px",
          }}
        >
          {m.sub}
        </p>
        <p
          className="font-mono"
          style={{
            fontSize: "11px",
            lineHeight: 1.8,
            color: "rgba(255,255,255,.35)",
            letterSpacing: ".01em",
          }}
        >
          {m.desc}
        </p>
      </div>

      {/* CTA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          paddingTop: "12px",
          borderTop: "1px solid rgba(255,255,255,.05)",
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "10px",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: hov ? m.color : "rgba(255,255,255,.28)",
            transition: "color .2s",
          }}
        >
          {m.cta}
        </span>
        <ArrowUpRight
          size={10}
          strokeWidth={1.8}
          style={{
            color: hov ? m.color : "rgba(255,255,255,.2)",
            transition: "color .2s, transform .2s",
            transform: hov ? "translate(2px,-2px)" : "none",
          }}
        />
      </div>
    </motion.a>
  );
}

export default function ContactMethods() {
  return (
    <div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        style={{ marginBottom: "clamp(22px,2.8vw,30px)" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              height: "1px",
              width: "32px",
              flexShrink: 0,
              background:
                "linear-gradient(to right, var(--accent), transparent)",
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent-light)",
            }}
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
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "clamp(10px,1.6vw,16px)",
        }}
      >
        {METHODS.map((m) => (
          <MethodCard key={m.id} m={m} />
        ))}
      </motion.div>
    </div>
  );
}
