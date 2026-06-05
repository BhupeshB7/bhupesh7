"use client";

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import theme from "@/config/theme.config";
import ChatWindow from "./ChatWindow";
import { useConsultant } from "@/hooks/useConsultant";
const c = theme.accent.primary;

export default function ProjectConsultant() {
  const {
    session,
    isTyping,
    error,
    startConversation,
    sendMessage,
    generateBrief,
    submitLead,
    reset,
  } = useConsultant();

  if (!session) {
    return (
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: theme.surface[0],
          border: `1px solid ${theme.border.soft}`,
          minHeight: "420px",
        }}
      >
        <div className="flex-1 flex items-center justify-center">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: theme.text.muted }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity } as Transition}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: theme.surface[0],
        border: `1px solid ${theme.border.soft}`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${c}60, transparent)` }}
      />

      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: `1px solid ${theme.border.subtle}` }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{
            background: theme.accent.tintStrong,
            border: `1px solid ${theme.accent.border}`,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M14 2H2C1.45 2 1 2.45 1 3V10C1 10.55 1.45 11 2 11H5V14.5L9.5 11H14C14.55 11 15 10.55 15 10V3C15 2.45 14.55 2 14 2Z"
              stroke={c}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p
            className="text-[12px] font-bold"
            style={{ color: theme.text.primary, fontFamily: "Syne, sans-serif" }}
          >
            AI Project Discovery
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#22c55e" }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity } as Transition}
            />
            <span
              className="text-[9px]"
              style={{ color: theme.text.muted, fontFamily: "'DM Mono', monospace" }}
            >
              Online · Powered by Bhupesh's AI
            </span>
          </div>
        </div>
        {session.phase !== "landing" && session.phase !== "success" && (
          <button
            onClick={reset}
            className="text-[9px] font-semibold px-2 py-0.5 rounded-md transition-all duration-150"
            style={{
              color: theme.text.muted,
              background: theme.surface[2],
              border: `1px solid ${theme.border.subtle}`,
              fontFamily: "'DM Mono', monospace",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = theme.text.primary;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = theme.text.muted;
            }}
          >
            Reset
          </button>
        )}
      </div>

      <div className="p-4 overflow-y-auto" style={{ maxHeight: "600px" }}>
        <ChatWindow
          session={session}
          isTyping={isTyping}
          error={error}
          onStart={startConversation}
          onSend={sendMessage}
          onGenerateBrief={generateBrief}
          onSubmitLead={submitLead}
          onReset={reset}
        />
      </div>
    </div>
  );
}
