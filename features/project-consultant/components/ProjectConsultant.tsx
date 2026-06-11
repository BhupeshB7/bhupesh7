"use client";

import { motion, type Transition } from "framer-motion";
import theme from "@/config/theme.config";
import ChatWindow from "./ChatWindow";
import { useConsultant } from "@/hooks/useConsultant";

const c = theme.accent.primary;

interface Props {
  onClose: () => void;
}

export default function ProjectConsultant({ onClose }: Props) {
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
        className="flex-1 flex items-center justify-center"
        style={{ minHeight: "200px" }}
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: theme.text.muted }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={
                { duration: 1, delay: i * 0.2, repeat: Infinity } as Transition
              }
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div
        className="flex-shrink-0 relative"
        style={{ borderBottom: `1px solid ${theme.border.subtle}` }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${c}60, transparent)`,
          }}
        />
        <div className="flex items-center gap-3 px-5 py-4">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
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

          <div className="flex-1 min-w-0">
            <p
              className="text-[12px] font-bold truncate"
              style={{
                color: theme.text.primary,
                fontFamily: "Syne, sans-serif",
              }}
            >
              AI Project Discovery
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#22c55e" }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity } as Transition}
              />
              <span
                className="text-[9px] truncate"
                style={{
                  color: theme.text.muted,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                Online · Powered by Bhupesh's AI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {session.phase !== "landing" && session.phase !== "success" && (
              <button
                onClick={reset}
                className="text-[9px] font-semibold px-2 py-1 rounded-md transition-all duration-150"
                style={{
                  color: theme.text.muted,
                  background: theme.surface[2],
                  border: `1px solid ${theme.border.subtle}`,
                  fontFamily: "'DM Mono', monospace",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    theme.text.primary;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    theme.text.muted;
                }}
              >
                Reset
              </button>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150"
              style={{
                color: theme.text.muted,
                background: "transparent",
                border: `1px solid ${theme.border.subtle}`,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  theme.text.primary;
                (e.currentTarget as HTMLButtonElement).style.background =
                  theme.surface[2];
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  theme.text.muted;
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
              }}
              aria-label="Close chat"
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 2L10 10M10 2L2 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: 0 }}>
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
