"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT_INFO } from "@/lib/constants";
import { fadeUp, scaleIn, VIEWPORT } from "@/components/animations/variants";

type FormData = {
  name:        string;
  email:       string;
  projectType: string;
  budget:      string;
  timeline:    string;
  message:     string;
};

const PROJECT_TYPES = [
  "Freelance project",
  "Technical consulting",
  "Open source collaboration",
  "Content & writing",
  "Just saying hi",
] as const;

const BUDGETS = [
  "< $500",
  "$500 – $2k",
  "$2k – $5k",
  "$5k – $15k",
  "$15k+",
  "Let's discuss",
] as const;

const TIMELINES = [
  "ASAP",
  "Within 1 month",
  "1–3 months",
  "3+ months",
  "Flexible",
] as const;

// ─── Reusable input wrapper ───────────────────────────────────────────────────
function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label
        className="font-mono text-[10px] tracking-[.1em] uppercase"
        style={{ color: "rgba(255,255,255,.4)" }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--accent-light)", marginLeft: "4px" }} aria-label="required">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(99,102,241,0.18)",
  borderRadius: "8px",
  outline: "none",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "12px",
  color: "rgba(255,255,255,.75)",
  letterSpacing: ".02em",
  transition: "border-color .2s, background .2s",
};

// ─── Success screen ───────────────────────────────────────────────────────────
function SuccessScreen() {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "clamp(48px,6vw,72px) 24px",
        textAlign: "center",
      }}
      role="status"
      aria-live="polite"
    >
      {/* Check circle */}
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "rgba(52,211,153,0.1)",
          border: "1.5px solid rgba(52,211,153,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 8px rgba(52,211,153,0.05)",
        }}
        aria-hidden="true"
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M5 13l5.5 5.5 11-11"
            stroke="#34d399"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div>
        <h3
          className="font-display mb-[10px]"
          style={{ fontSize: "clamp(1.3rem,2.5vw,1.8rem)", letterSpacing: "-.01em", color: "rgba(255,255,255,.9)" }}
        >
          MESSAGE SENT
        </h3>
        <p
          className="font-mono"
          style={{ fontSize: "12px", lineHeight: 1.85, color: "rgba(255,255,255,.35)", letterSpacing: ".02em", maxWidth: "340px" }}
        >
          Thanks for reaching out. I'll review your brief and get back to you within{" "}
          <span style={{ color: "var(--accent-light)" }}>{CONTACT_INFO.responseTime}</span>.
        </p>
      </div>

      <p
        className="font-mono text-[10px] tracking-[.05em]"
        style={{ color: "rgba(255,255,255,.2)" }}
      >
        While you wait — check out{" "}
        <a href="#projects" style={{ color: "var(--accent-light)", textDecoration: "none" }}>
          my projects
        </a>{" "}
        or{" "}
        <a href="#blog" style={{ color: "var(--accent-light)", textDecoration: "none" }}>
          latest posts
        </a>
        .
      </p>
    </motion.div>
  );
}

// ─── ContactForm ──────────────────────────────────────────────────────────────
export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", projectType: "", budget: "", timeline: "", message: "",
  });
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focused,    setFocused]    = useState<string | null>(null);

  const set = (k: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: wire to Resend / Formspree / server action
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const focusStyle = (name: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === name ? "rgba(99,102,241,0.55)" : "rgba(99,102,241,0.18)",
    background: focused === name ? "rgba(99,102,241,0.04)" : "rgba(255,255,255,0.03)",
  });

  const selectStyle = (name: string): React.CSSProperties => ({
    ...focusStyle(name),
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(129,140,248,0.5)' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: "36px",
  });

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        borderRadius: "18px",
        background: "rgba(255,255,255,0.016)",
        border: "1px solid rgba(99,102,241,0.14)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, var(--accent), var(--accent-light), transparent)",
        }}
      />

      {/* Inner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(50% 40% at 80% 0%, rgba(99,102,241,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <AnimatePresence mode="wait">
        {submitted ? (
          <SuccessScreen key="success" />
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              padding: "clamp(28px,3.5vw,44px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(18px,2.5vw,24px)",
              position: "relative",
              zIndex: 1,
            }}
            aria-label="Contact form"
          >
            {/* Form header */}
            <div style={{ marginBottom: "4px" }}>
              <div className="flex items-center gap-[10px] mb-[8px]">
                <div
                  className="h-px w-8 shrink-0"
                  style={{ background: "linear-gradient(to right, var(--accent), transparent)" }}
                />
                <span
                  className="font-mono text-[9px] tracking-[.14em] uppercase"
                  style={{ color: "var(--accent-light)" }}
                >
                  Project brief
                </span>
              </div>
              <h2
                className="font-display"
                style={{ fontSize: "clamp(1.4rem,3vw,2rem)", letterSpacing: "-.01em", lineHeight: 1 }}
              >
                TELL ME ABOUT YOUR PROJECT
              </h2>
            </div>

            {/* Name + Email row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "clamp(14px,2vw,20px)",
              }}
            >
              <Field label="Your name" required>
                <input
                  type="text"
                  required
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={set("name")}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  style={focusStyle("name")}
                  aria-label="Your name"
                />
              </Field>

              <Field label="Email address" required>
                <input
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={set("email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={focusStyle("email")}
                  aria-label="Email address"
                />
              </Field>
            </div>

            {/* Project type + budget row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "clamp(14px,2vw,20px)",
              }}
            >
              <Field label="Project type" required>
                <select
                  required
                  value={form.projectType}
                  onChange={set("projectType")}
                  onFocus={() => setFocused("projectType")}
                  onBlur={() => setFocused(null)}
                  style={selectStyle("projectType")}
                  aria-label="Project type"
                >
                  <option value="" disabled>Select type…</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} style={{ background: "#07080f" }}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field label="Budget range">
                <select
                  value={form.budget}
                  onChange={set("budget")}
                  onFocus={() => setFocused("budget")}
                  onBlur={() => setFocused(null)}
                  style={selectStyle("budget")}
                  aria-label="Budget range"
                >
                  <option value="" disabled>Select budget…</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b} style={{ background: "#07080f" }}>{b}</option>
                  ))}
                </select>
              </Field>

              <Field label="Timeline">
                <select
                  value={form.timeline}
                  onChange={set("timeline")}
                  onFocus={() => setFocused("timeline")}
                  onBlur={() => setFocused(null)}
                  style={selectStyle("timeline")}
                  aria-label="Project timeline"
                >
                  <option value="" disabled>Select timeline…</option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t} style={{ background: "#07080f" }}>{t}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Message */}
            <Field label="Project details" required>
              <textarea
                required
                rows={5}
                placeholder="Describe your project — what are you building, what problem does it solve, where are you stuck, what does success look like?"
                value={form.message}
                onChange={set("message")}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                style={{
                  ...focusStyle("message"),
                  resize: "vertical",
                  minHeight: "120px",
                  lineHeight: 1.8,
                }}
                aria-label="Project details"
              />
            </Field>

            {/* Submit row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <p
                className="font-mono text-[9px] tracking-[.05em]"
                style={{ color: "rgba(255,255,255,.18)" }}
              >
                * required fields · your data is never sold or shared
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ minWidth: "160px", opacity: submitting ? 0.7 : 1 }}
                aria-label={submitting ? "Sending message…" : "Send message"}
              >
                {submitting ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        border: "1.5px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        animation: "spin 0.7s linear infinite",
                        display: "inline-block",
                      }}
                    />
                    Sending…
                  </span>
                ) : (
                  <>
                    Send Message
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
