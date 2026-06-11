"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import theme from "@/config/theme.config";
import { SITE } from "@/config/site.config";
import { CONTACT } from "@/config/contact.config";
import ContactForm from "./ContactForm";

const c = theme.accent.primary;

type ContactChannel = {
  label: string;
  title: string;
  value: string;
  href: string;
  body: string;
  external?: boolean;
};

const channels: ContactChannel[] = [
  {
    label: "Email",
    title: "Write directly",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    body: "Best for project context, hiring conversations, and detailed collaboration notes.",
  },
  {
    label: "Mobile",
    title: "Call Bhupesh",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\D/g, "")}`,
    body: "Use this when the matter is urgent or you prefer a quick voice conversation.",
  },
  {
    label: "WhatsApp",
    title: "Start a chat",
    value: "+91 85818 69783",
    href: `https://wa.me/${SITE.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
      "Hi Bhupesh, I want to discuss a project or meeting.",
    )}`,
    body: "Fastest way to check availability and share a short project message.",
    external: true,
  },
  {
    label: "Book meeting",
    title: "Schedule a call",
    value: "Calendly.com booking",
    href: CONTACT.bookingUrl,
    body: "Pick a slot for a focused discovery call. Add your goal in the booking note.",
    external: true,
  },
];

const highlights = ["Remote India", "Async friendly", "INR estimates"];

export default function ContactPage() {
  return (
    <main
      className="overflow-hidden"
      style={{ background: theme.bg.base, color: theme.text.primary }}
    >
      <section className="relative min-h-[92vh] overflow-hidden pt-32 pb-20 lg:pt-40">
        <ContactBackground />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p
              className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{
                color: theme.accent.text,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Contact Bhupesh Kumar
            </p>
            <h1
              className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[76px]"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Let&apos;s talk about the next build.
            </h1>
            <p
              className="mt-7 max-w-2xl text-lg leading-relaxed"
              style={{ color: theme.text.secondary }}
            >
              Reach out for SaaS MVPs, backend systems, APIs, AI workflows,
              internal tools, or product engineering help. Send a short message
              or book a call if you already want to discuss scope.
            </p>

            <div className="mt-8 flex max-w-2xl flex-wrap gap-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.08, duration: 0.45 }}
                  className="relative flex h-[62px] w-[178px] max-w-full items-center overflow-hidden rounded-xl px-5"
                  style={{
                    background: `linear-gradient(180deg, ${theme.surface[2]} 0%, ${theme.surface[1]} 48%, ${theme.bg.subtle} 100%)`,
                    border: `1px solid ${theme.border.soft}`,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 14px 34px rgba(0,0,0,0.22)",
                  }}
                >
                  <span
                    className="pointer-events-none absolute inset-x-4 top-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${c}95, transparent)`,
                    }}
                  />
                  <span
                    className="pointer-events-none absolute left-1/2 top-[-42px] h-24 w-24 -translate-x-1/2 rounded-full blur-2xl"
                    style={{ background: `${c}26` }}
                  />
                  <span
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, ${c}10 0%, transparent 42%, rgba(0,0,0,0.16) 100%)`,
                    }}
                  />
                  <span
                    className="relative z-10 text-[14px] font-semibold"
                    style={{ color: c, fontFamily: "'DM Mono', monospace" }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl p-5"
            style={{
              background: `${theme.surface[0]}dd`,
              border: `1px solid ${theme.border.soft}`,
              boxShadow: "0 28px 100px rgba(0,0,0,0.45)",
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${c}75, transparent)`,
              }}
            />
            <p
              className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: theme.text.muted, fontFamily: "'DM Mono', monospace" }}
            >
              Direct links
            </p>
            <div className="grid gap-3">
              {channels.map((channel, index) => (
                <ContactMethodCard key={channel.label} channel={channel} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="grid content-start gap-4"
          >
            <div className="rounded-2xl p-6" style={panelStyle}>
              <p
                className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: theme.accent.text, fontFamily: "'DM Mono', monospace" }}
              >
                Quick path
              </p>
              <h2 className="text-3xl font-bold leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                Message now, book when needed.
              </h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: theme.text.secondary }}>
                If you are still shaping the idea, send the form. If you already
                want a call, use the booking link and include one or two lines
                about what you want to discuss.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {channels.slice(0, 4).map((channel, index) => (
                <ContactMethodCard
                  key={`side-${channel.label}`}
                  channel={channel}
                  index={index}
                  compact
                />
              ))}
            </div>
          </motion.div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}

function ContactMethodCard({
  channel,
  index,
  compact = false,
}: {
  channel: ContactChannel;
  index: number;
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={channel.href}
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ y: -3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block rounded-xl p-4 transition-colors duration-200"
      style={{
        background: hovered ? theme.accent.tint : theme.surface[1],
        border: `1px solid ${hovered ? theme.accent.border : theme.border.soft}`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{
              color: hovered ? c : theme.text.muted,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {channel.label}
          </p>
          <h2
            className="mt-1 truncate text-lg font-bold"
            style={{
              color: hovered ? theme.text.primary : theme.text.primary,
              fontFamily: "Syne, sans-serif",
            }}
          >
            {channel.title}
          </h2>
          <p
            className="mt-1 truncate text-sm"
            style={{ color: hovered ? c : theme.text.secondary }}
          >
            {channel.value}
          </p>
        </div>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors duration-200"
          style={{
            background: hovered ? c : theme.surface[2],
            color: hovered ? theme.accent.primaryForeground : c,
            border: `1px solid ${hovered ? c : theme.border.subtle}`,
          }}
        >
          -&gt;
        </span>
      </div>
      {!compact ? (
        <p className="mt-3 text-sm leading-relaxed" style={{ color: theme.text.secondary }}>
          {channel.body}
        </p>
      ) : null}
    </motion.a>
  );
}

function ContactBackground() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 45% at 50% 0%, ${theme.accent.glow}, transparent 72%)`,
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="contact-line" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={c} stopOpacity="0.35" />
            <stop offset="1" stopColor={c} stopOpacity="0" />
          </linearGradient>
          <pattern
            id="contact-grid"
            width="42"
            height="42"
            patternUnits="userSpaceOnUse"
          >
            <path d="M42 0H0V42" stroke={`${c}08`} strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="1200" height="760" fill="url(#contact-grid)" />
        <path
          d="M-40 520C170 330 340 280 520 370C710 465 850 260 1240 205"
          stroke="url(#contact-line)"
          strokeWidth="1.2"
        />
        <path
          d="M-70 230C180 320 374 292 512 145C680 -34 895 65 1260 40"
          stroke={`${c}12`}
          strokeWidth="1"
        />
        <circle cx="850" cy="260" r="120" stroke={`${c}10`} />
        <circle cx="850" cy="260" r="210" stroke={`${c}08`} />
        <circle cx="520" cy="370" r="5" fill={c} />
        <circle cx="850" cy="260" r="6" fill={c} />
      </svg>
    </>
  );
}

const panelStyle = {
  background: `${theme.surface[1]}e6`,
  border: `1px solid ${theme.border.soft}`,
  boxShadow: "0 20px 70px rgba(0,0,0,0.28)",
};
