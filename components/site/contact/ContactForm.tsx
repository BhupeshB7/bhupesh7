"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import theme from "@/config/theme.config";
import type { ContactInquiryData } from "@/lib/types";

const c = theme.accent.primary;

const initialForm: ContactInquiryData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

type ContactField = keyof ContactInquiryData;
type TouchedFields = Partial<Record<ContactField, boolean>>;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(form: ContactInquiryData) {
  return {
    fullName:
      form.fullName.trim().length < 2 ? "Please enter your name." : "",
    email: !isEmail(form.email) ? "Please enter a valid email." : "",
    phone:
      form.phone.trim().length < 8
        ? "Please add your mobile or WhatsApp number."
        : "",
    message:
      form.message.trim().length < 20
        ? "Please share a little more context."
        : "",
  };
}

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
    <label className="flex flex-col gap-2">
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: theme.text.muted, fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </span>
      {children}
      {error ? (
        <span className="text-[11px]" style={{ color: "#ef4444" }}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200";

export default function ContactForm() {
  const [form, setForm] = useState<ContactInquiryData>(initialForm);
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const errors = validate(form);
  const isValid = Object.values(errors).every((item) => !item);

  const setValue =
    (key: ContactField) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setStatus((prev) => (prev === "sent" ? "idle" : prev));
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const markTouched = (key: ContactField) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const fieldError = (key: keyof ReturnType<typeof validate>) =>
    submitted || touched[key] ? errors[key] : "";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      message: true,
    });

    if (!isValid || status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error ?? "Could not send message.");
      }
      setStatus("sent");
      setSubmitted(false);
      setTouched({});
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send message.");
    }
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl p-5 sm:p-6 lg:p-7"
      style={{
        background: `${theme.surface[0]}f2`,
        border: `1px solid ${theme.border.soft}`,
        boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${c}80, transparent)`,
        }}
      />

      <div className="relative z-10 grid gap-4">
        <div className="max-w-xl">
          <p
            className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: theme.accent.text, fontFamily: "'DM Mono', monospace" }}
          >
            Message Bhupesh
          </p>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
            Tell me what you need
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: theme.text.secondary }}>
            Send a short note with your idea, problem, or collaboration request.
            I will reply on email or WhatsApp.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" error={fieldError("fullName")}>
            <input
              value={form.fullName}
              onChange={setValue("fullName")}
              onBlur={() => markTouched("fullName")}
              className={inputClass}
              style={fieldStyle}
              placeholder="Your name"
              autoComplete="name"
            />
          </Field>
          <Field label="Email" error={fieldError("email")}>
            <input
              value={form.email}
              onChange={setValue("email")}
              onBlur={() => markTouched("email")}
              className={inputClass}
              style={fieldStyle}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </Field>
          <Field label="Mobile / WhatsApp" error={fieldError("phone")}>
            <input
              value={form.phone}
              onChange={setValue("phone")}
              onBlur={() => markTouched("phone")}
              className={inputClass}
              style={fieldStyle}
              placeholder="+91..."
              autoComplete="tel"
            />
          </Field>
          <Field label="Company">
            <input
              value={form.company}
              onChange={setValue("company")}
              className={inputClass}
              style={fieldStyle}
              placeholder="Optional"
              autoComplete="organization"
            />
          </Field>
        </div>

        <Field label="Message" error={fieldError("message")}>
          <textarea
            value={form.message}
            onChange={setValue("message")}
            onBlur={() => markTouched("message")}
            className={`${inputClass} min-h-[150px] resize-none`}
            style={fieldStyle}
            placeholder="Example: I need help building an MVP, fixing backend architecture, or adding AI automation to my product."
          />
        </Field>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex min-w-[132px] items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200"
            style={{
              background: status === "sending" ? theme.surface[2] : c,
              color:
                status === "sending"
                  ? theme.text.muted
                  : theme.accent.primaryForeground,
              cursor: status === "sending" ? "wait" : "pointer",
              boxShadow: status === "sending" ? "none" : `0 0 28px ${c}35`,
            }}
          >
            {status === "sending" ? (
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                aria-hidden="true"
              />
            ) : null}
            {status === "sending" ? "Sending" : "Send"}
          </button>

          {status === "sent" ? (
            <p className="text-sm" style={{ color: "#22c55e" }}>
              Message sent. I will review it and reply soon.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm" style={{ color: "#ef4444" }}>
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </motion.form>
  );
}

const fieldStyle = {
  background: theme.bg.base,
  border: `1px solid ${theme.border.default}`,
  color: theme.text.primary,
};
