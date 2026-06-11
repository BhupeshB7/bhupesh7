"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import theme from "@/config/theme.config";
import type { LeadData } from "@/lib/types";

const c = theme.accent.primary;

const BUDGET_OPTIONS = [
  "Under ₹50,000",
  "₹50,000 - ₹1,50,000",
  "₹1,50,000 - ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
];

const TIMELINE_OPTIONS = [
  "ASAP",
  "2 - 4 weeks",
  "1 - 3 months",
  "3+ months",
  "Not sure yet",
];

const CONTACT_OPTIONS: LeadData["preferredContact"][] = [
  "Email",
  "WhatsApp",
  "Call",
  "Google Meet",
];

const initialForm: LeadData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  budgetRange: "",
  timeline: "",
  preferredContact: "Email",
  notes: "",
};

interface Props {
  onSubmit: (data: LeadData) => void;
  isLoading: boolean;
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

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
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
      {error ? (
        <span className="text-[10px]" style={{ color: "#ef4444" }}>
          {error}
        </span>
      ) : null}
    </div>
  );
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function LeadCaptureForm({ onSubmit, isLoading }: Props) {
  const [form, setForm] = useState<LeadData>(initialForm);

  const setInput =
    (key: keyof LeadData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const errors = {
    fullName: form.fullName.trim().length < 2 ? "Name required." : "",
    email: !isEmail(form.email) ? "Valid email required." : "",
    phone: form.phone.trim().length < 8 ? "Phone or WhatsApp required." : "",
    budgetRange: !form.budgetRange ? "Choose INR budget." : "",
    timeline: !form.timeline ? "Choose timeline." : "",
  };

  const isValid = Object.values(errors).every((item) => !item);

  const handleSubmit = () => {
    if (!isValid || isLoading) return;
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
        <p className="text-[12px] leading-relaxed" style={{ color: theme.text.secondary }}>
          Your project brief is ready. Share your contact details and Bhupesh
          will receive the full conversation, brief, budget, and timeline.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Field label="Full Name *" error={errors.fullName}>
          <input value={form.fullName} onChange={setInput("fullName")} placeholder="Your name" style={inputStyle} />
        </Field>

        <Field label="Email Address *" error={errors.email}>
          <input type="email" value={form.email} onChange={setInput("email")} placeholder="you@example.com" style={inputStyle} />
        </Field>

        <Field label="Phone / WhatsApp *" error={errors.phone}>
          <input type="tel" value={form.phone} onChange={setInput("phone")} placeholder="+91..." style={inputStyle} />
        </Field>

        <Field label="Company">
          <input value={form.company} onChange={setInput("company")} placeholder="Optional" style={inputStyle} />
        </Field>

        <ChoiceGroup
          label="Budget Range *"
          error={errors.budgetRange}
          value={form.budgetRange}
          options={BUDGET_OPTIONS}
          onPick={(value) => setForm((prev) => ({ ...prev, budgetRange: value }))}
        />

        <ChoiceGroup
          label="Expected Timeline *"
          error={errors.timeline}
          value={form.timeline}
          options={TIMELINE_OPTIONS}
          onPick={(value) => setForm((prev) => ({ ...prev, timeline: value }))}
        />

        <ChoiceGroup
          label="Preferred Contact *"
          value={form.preferredContact}
          options={CONTACT_OPTIONS}
          onPick={(value) =>
            setForm((prev) => ({
              ...prev,
              preferredContact: value as LeadData["preferredContact"],
            }))
          }
        />

        <Field label="Extra Notes">
          <textarea
            value={form.notes}
            onChange={setInput("notes")}
            placeholder="Anything else Bhupesh should know?"
            className="min-h-[70px] resize-none"
            style={inputStyle}
          />
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

function ChoiceGroup({
  label,
  error,
  value,
  options,
  onPick,
}: {
  label: string;
  error?: string;
  value: string;
  options: readonly string[];
  onPick: (value: string) => void;
}) {
  return (
    <Field label={label} error={error}>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onPick(option)}
            className="text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-all duration-150"
            style={{
              fontFamily: "'DM Mono', monospace",
              background: value === option ? `${c}20` : theme.surface[2],
              border: `1px solid ${value === option ? c : theme.border.subtle}`,
              color: value === option ? c : theme.text.muted,
              cursor: "pointer",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </Field>
  );
}
