"use client";

import { fadeUp, VIEWPORT } from "@/components/animations/variants";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

export default function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to real email service (Resend, ConvertKit, etc.)
    setSubmitted(true);
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        padding: "clamp(32px,4vw,48px) clamp(24px,3.5vw,44px)",
        borderRadius: "18px",
        background: "rgba(99,102,241,0.04)",
        border: "1px solid rgba(99,102,241,0.14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "clamp(24px,4vw,48px)",
        flexWrap: "wrap",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 80% at 0% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Left: copy ── */}
      <div style={{ flex: "1 1 280px", position: "relative", zIndex: 1 }}>
        <div className="flex items-center gap-[8px] mb-[10px]">
          <span
            aria-hidden="true"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--accent-light)",
              animation: "pulse-glow 2s ease infinite",
              flexShrink: 0,
            }}
          />
          <span
            className="font-mono text-[9px] tracking-[.14em] uppercase"
            style={{ color: "var(--accent-light)" }}
          >
            Newsletter
          </span>
        </div>

        <h3
          className="font-display mb-[8px]"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
            letterSpacing: "-.01em",
            lineHeight: 1.15,
            color: "rgba(255,255,255,.85)",
          }}
        >
          GET NOTIFIED WHEN I PUBLISH
        </h3>
        <p
          className="font-mono"
          style={{
            fontSize: "11px",
            lineHeight: 1.8,
            color: "rgba(255,255,255,.3)",
            letterSpacing: ".01em",
            maxWidth: "340px",
          }}
        >
          New posts on architecture, TypeScript, and shipping fast. No spam —
          usually one post per month.
        </p>
      </div>

      {/* ── Right: form ── */}
      <div style={{ flex: "1 1 280px", position: "relative", zIndex: 1 }}>
        {submitted ? (
          <div
            className="flex items-center gap-[10px]"
            role="status"
            aria-live="polite"
          >
            <span
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(52,211,153,0.12)",
                border: "1px solid rgba(52,211,153,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <Check size={12} color="#34d399" strokeWidth={2} />
            </span>
            <span
              className="font-mono text-[11px] tracking-[.03em]"
              style={{ color: "#34d399" }}
            >
              You're in. First post coming your way.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
            aria-label="Newsletter signup"
          >
            <div
              style={{
                flex: 1,
                minWidth: "200px",
                position: "relative",
                borderRadius: "8px",
                border: `1px solid ${focused ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`,
                background: "rgba(255,255,255,0.03)",
                transition: "border-color .2s",
                overflow: "hidden",
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="your@email.com"
                aria-label="Email address"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: "rgba(255,255,255,.7)",
                  letterSpacing: ".02em",
                }}
              />
            </div>

            <button
              type="submit"
              className="font-mono text-[10px] tracking-[.1em] uppercase"
              style={{
                padding: "11px 20px",
                borderRadius: "8px",
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-light))",
                border: "none",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                boxShadow: "0 4px 16px rgba(99,102,241,0.28)",
                transition: "transform .2s, box-shadow .2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Subscribe
            </button>
          </form>
        )}

        <p
          className="font-mono text-[9px] tracking-[.04em] mt-[10px]"
          style={{ color: "rgba(255,255,255,.15)" }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </motion.div>
  );
}
