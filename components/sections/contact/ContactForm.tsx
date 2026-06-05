"use client";

import { fadeUp, scaleIn, VIEWPORT } from "@/components/animations/variants";
import { CONTACT_INFO } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

// ─── 4 fields only ────────────────────────────────────────────────────────────
type FormData = {
  name: string;
  email: string;
  need: string;
  message: string;
};

const NEEDS = [
  "Backend development",
  "Gen AI integration",
  "Frontend / Full-stack",
  "Bug fix / Deployment",
  "Something else",
] as const;

// ─── Success ──────────────────────────────────────────────────────────────────
function SuccessScreen() {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      role="status"
      aria-live="polite"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "18px",
        padding: "clamp(48px,6vw,72px) 24px",
        textAlign: "center",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "rgba(52,211,153,.1)",
          border: "1.5px solid rgba(52,211,153,.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 8px rgba(52,211,153,.05)",
        }}
      >
        <Check size={24} color="#34d399" strokeWidth={2.2} />
      </div>
      <div>
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(1.3rem,2.5vw,1.7rem)",
            letterSpacing: "-.01em",
            color: "rgba(255,255,255,.9)",
            marginBottom: "10px",
          }}
        >
          MESSAGE SENT
        </h3>
        <p
          className="font-mono"
          style={{
            fontSize: "12px",
            lineHeight: 1.85,
            color: "rgba(255,255,255,.35)",
            letterSpacing: ".02em",
          }}
        >
          I'll get back to you within{" "}
          <span style={{ color: "var(--accent-light)" }}>
            {CONTACT_INFO.responseTime}
          </span>
          .
        </p>
      </div>
    </motion.div>
  );
}

// ─── ContactForm ──────────────────────────────────────────────────────────────
export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    need: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const set =
    (k: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: wire to Resend / Formspree / server action
    await new Promise((r) => setTimeout(r, 1100));
    setSubmitting(false);
    setSubmitted(true);
  };

  const base: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(99,102,241,.18)",
    borderRadius: "8px",
    outline: "none",
    fontFamily: "var(--font-brand-mono),'JetBrains Mono',monospace",
    fontSize: "12px",
    color: "rgba(255,255,255,.75)",
    letterSpacing: ".02em",
    transition: "border-color .2s, background .2s",
    boxSizing: "border-box",
  };

  const focus = (name: string): React.CSSProperties => ({
    ...base,
    borderColor:
      focused === name ? "rgba(99,102,241,.55)" : "rgba(99,102,241,.18)",
    background:
      focused === name ? "rgba(99,102,241,.04)" : "rgba(255,255,255,.03)",
  });

  const selectStyle = (name: string): React.CSSProperties => ({
    ...focus(name),
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(129,140,248,0.5)' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: "36px",
  });

  const label = (text: string, required?: boolean) => (
    <label
      className="font-mono"
      style={{
        fontSize: "10px",
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,.4)",
      }}
    >
      {text}
      {required && (
        <span
          style={{ color: "var(--accent-light)", marginLeft: "3px" }}
          aria-label="required"
        >
          *
        </span>
      )}
    </label>
  );

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        borderRadius: "18px",
        background: "rgba(255,255,255,.016)",
        border: "1px solid rgba(99,102,241,.14)",
        overflow: "hidden",
        position: "relative",
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
          background:
            "linear-gradient(90deg, var(--accent), var(--accent-light), transparent)",
        }}
      />
      {/* Inner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(50% 40% at 80% 0%, rgba(99,102,241,.05) 0%, transparent 65%)",
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
            aria-label="Contact form"
            style={{
              padding: "clamp(28px,3.5vw,44px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px,2.2vw,22px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: "4px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    height: "1px",
                    width: "32px",
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
                  Quick message
                </span>
              </div>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(1.3rem,2.8vw,1.9rem)",
                  letterSpacing: "-.01em",
                  lineHeight: 1,
                }}
              >
                GET IN TOUCH
              </h2>
            </div>

            {/* Row 1: Name + Email */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
                gap: "clamp(12px,1.8vw,18px)",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "7px" }}
              >
                {label("Name", true)}
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={set("name")}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  style={focus("name")}
                  aria-label="Your name"
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "7px" }}
              >
                {label("Email", true)}
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={focus("email")}
                  aria-label="Email address"
                />
              </div>
            </div>

            {/* Row 2: What do you need */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "7px" }}
            >
              {label("What do you need?", true)}
              <select
                required
                value={form.need}
                onChange={set("need")}
                onFocus={() => setFocused("need")}
                onBlur={() => setFocused(null)}
                style={selectStyle("need")}
                aria-label="What do you need"
              >
                <option value="" disabled>
                  Select…
                </option>
                {NEEDS.map((n) => (
                  <option key={n} value={n} style={{ background: "#07080f" }}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 3: Message */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "7px" }}
            >
              {label("Brief description", true)}
              <textarea
                required
                rows={4}
                placeholder="What are you building? What's the problem? Keep it short — we'll talk details on a call."
                value={form.message}
                onChange={set("message")}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                style={{
                  ...focus("message"),
                  resize: "vertical",
                  minHeight: "110px",
                  lineHeight: 1.8,
                }}
                aria-label="Brief description"
              />
            </div>

            {/* Submit */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <p
                className="font-mono"
                style={{
                  fontSize: "9px",
                  letterSpacing: ".04em",
                  color: "rgba(255,255,255,.18)",
                }}
              >
                * required · I reply within {CONTACT_INFO.responseTime}
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ minWidth: "148px", opacity: submitting ? 0.72 : 1 }}
                aria-label={submitting ? "Sending…" : "Send message"}
              >
                {submitting ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        border: "1.5px solid rgba(255,255,255,.3)",
                        borderTopColor: "#fff",
                        animation: "spin .7s linear infinite",
                        display: "inline-block",
                      }}
                    />
                    Sending…
                  </span>
                ) : (
                  <>
                    Send Message <ArrowRight size={12} strokeWidth={1.8} />
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
