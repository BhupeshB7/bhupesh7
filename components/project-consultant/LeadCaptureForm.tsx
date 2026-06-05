"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import theme from "@/config/theme.config";
import { LeadData } from "@/lib/types";

const c = theme.accent.primary;

const BUDGET_OPTIONS = [
  "Under $1K",
  "$1K – $5K",
  "$5K – $15K",
  "$15K – $50K",
  "$50K+",
];

const TIMELINE_OPTIONS = [
  "ASAP",
  "1 – 3 months",
  "3 – 6 months",
  "6+ months",
  "Not sure yet",
];

interface Props {
  onSubmit: (data: LeadData) => void;
  isLoading: boolean;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[10px] font-semibold tracking-[0.15em] uppercase"
        style={{ color: theme.text.muted, fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  background: theme.bg.base,
  border: `1px solid ${theme.border.default}`,
  color: theme.text.primary,
  fontFamily: "'DM Mono', monospace",
  fontSize: "12px",
  outline: "none",
  borderRadius: "10px",
  padding: "8px 12px",
  width: "100%",
};

export default function LeadCaptureForm({ onSubmit, isLoading }: Props) {
  const [form, setForm] = useState<LeadData>({
    fullName: "",
    email: "",
    company: "",
    budgetRange: "",
    timeline: "",
  });

  const set = (key: keyof LeadData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const isValid =
    form.fullName.trim() &&
    form.email.trim() &&
    form.budgetRange &&
    form.timeline;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4"
    >
      <div
        className="rounded-xl p-4 flex flex-col gap-3"
        style={{
          background: theme.surface[1],
          border: `1px solid ${theme.border.soft}`,
        }}
      >
        <p
          className="text-[11px] font-bold tracking-[0.15em] uppercase"
          style={{ color: c, fontFamily: "'DM Mono', monospace" }}
        >
          Your Details
        </p>
        <p
          className="text-[12px] leading-relaxed"
          style={{ color: theme.text.secondary }}
        >
          Your project brief is ready. Share your details and I'll review everything personally.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Field label="Full Name *">
          <input
            type="text"
            value={form.fullName}
            onChange={set("fullName")}
            placeholder="Your name"
            style={inputStyle}
          />
        </Field>

        <Field label="Email Address *">
          <input
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@example.com"
            style={inputStyle}
          />
        </Field>

        <Field label="Company (Optional)">
          <input
            type="text"
            value={form.company}
            onChange={set("company")}
            placeholder="Company name"
            style={inputStyle}
          />
        </Field>

        <Field label="Budget Range *">
          <div className="flex flex-wrap gap-1.5">
            {BUDGET_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setForm((p) => ({ ...p, budgetRange: opt }))}
                className="text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-all duration-150"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  background: form.budgetRange === opt ? `${c}20` : theme.surface[2],
                  border: `1px solid ${form.budgetRange === opt ? c : theme.border.subtle}`,
                  color: form.budgetRange === opt ? c : theme.text.muted,
                  cursor: "pointer",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Expected Timeline *">
          <div className="flex flex-wrap gap-1.5">
            {TIMELINE_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setForm((p) => ({ ...p, timeline: opt }))}
                className="text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-all duration-150"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  background: form.timeline === opt ? `${c}20` : theme.surface[2],
                  border: `1px solid ${form.timeline === opt ? c : theme.border.subtle}`,
                  color: form.timeline === opt ? c : theme.text.muted,
                  cursor: "pointer",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isValid || isLoading}
        className="w-full py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200"
        style={{
          background: isValid && !isLoading ? c : theme.surface[2],
          color: isValid && !isLoading ? theme.accent.primaryForeground : theme.text.muted,
          border: "none",
          cursor: isValid && !isLoading ? "pointer" : "not-allowed",
          fontFamily: "'DM Mono', monospace",
          boxShadow: isValid && !isLoading ? `0 0 20px ${c}30` : "none",
        }}
      >
        {isLoading ? "Sending..." : "Send My Project Brief →"}
      </button>
    </motion.div>
  );
}
