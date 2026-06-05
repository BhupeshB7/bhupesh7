"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import theme from "@/config/theme.config";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ProgressTracker from "./ProgressTracker";
import ProjectBrief from "./ProjectBrief";
import LeadCaptureForm from "./LeadCaptureForm";
import SuccessScreen from "./SuccessScreen";
import { ConsultantSession } from "@/lib/types";

const c = theme.accent.primary;
const MAX_MESSAGES = 100;

interface Props {
  session: ConsultantSession;
  isTyping: boolean;
  error: string | null;
  onStart: (msg: string) => void;
  onSend: (msg: string) => void;
  onGenerateBrief: () => void;
  onSubmitLead: (data: any) => void;
  onReset: () => void;
}

function LandingState({ onStart }: { onStart: (msg: string) => void }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) onStart(value.trim());
  };

  return (
    <div className="flex flex-col items-center gap-5 py-8 px-2 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{
          background: theme.accent.tintStrong,
          border: `1px solid ${theme.accent.border}`,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M18 3H2C1.45 3 1 3.45 1 4V13C1 13.55 1.45 14 2 14H6V18L11.5 14H18C18.55 14 19 13.55 19 13V4C19 3.45 18.55 3 18 3Z"
            stroke={c}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="flex flex-col gap-1.5"
      >
        <p
          className="text-[15px] font-bold"
          style={{ color: theme.text.primary, fontFamily: "Syne, sans-serif" }}
        >
          AI Project Consultant
        </p>
        <p
          className="text-[12px] leading-relaxed max-w-[280px]"
          style={{ color: theme.text.secondary }}
        >
          Describe your idea and I'll help you plan features, architecture, and
          development roadmap.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.16 }}
        className="w-full flex flex-col gap-2"
      >
        <div
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
          style={{
            background: theme.bg.base,
            border: `1px solid ${theme.border.default}`,
          }}
        >
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="E.g. I want to build a gym management app..."
            className="flex-1 text-[12px] bg-transparent border-none outline-none"
            style={{
              color: theme.text.secondary,
              fontFamily: "'DM Mono', monospace",
            }}
            autoFocus
          />
          <button
            onClick={handleSend}
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
            style={{
              background: value.trim() ? c : theme.surface[2],
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6H10M7 3L10 6L7 9"
                stroke={
                  value.trim()
                    ? theme.accent.primaryForeground
                    : theme.text.muted
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <p
          className="text-[10px] text-center"
          style={{
            color: theme.text.muted,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          No technical knowledge needed — just explain what you want to build
        </p>
      </motion.div>
    </div>
  );
}

export default function ChatWindow({
  session,
  isTyping,
  error,
  onStart,
  onSend,
  onGenerateBrief,
  onSubmitLead,
  onReset,
}: Props) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const atLimit = session.messageCount >= MAX_MESSAGES;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session.messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping || atLimit) return;
    onSend(input.trim());
    setInput("");
  };

  if (session.phase === "landing") {
    return <LandingState onStart={onStart} />;
  }

  if (session.phase === "success") {
    return <SuccessScreen onReset={onReset} />;
  }

  return (
    <div className="flex flex-col gap-3">
      {session.phase === "discovery" || session.phase === "brief-ready" ? (
        <>
          <div
            className="flex flex-col gap-3 overflow-y-auto pr-1"
            style={{ maxHeight: "340px", minHeight: "200px" }}
          >
            {session.messages.map((msg, i) => (
              <MessageBubble key={msg.id} message={msg} index={i} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <ProgressTracker progress={session.progress} />

          {error && (
            <p
              className="text-[11px] text-center"
              style={{ color: "#ef4444", fontFamily: "'DM Mono', monospace" }}
            >
              {error}
            </p>
          )}

          {session.phase === "brief-ready" && !isTyping && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onGenerateBrief}
              className="w-full py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200"
              style={{
                background: c,
                color: theme.accent.primaryForeground,
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                boxShadow: `0 0 20px ${c}30`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  theme.accent.primaryHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = c;
              }}
            >
              Generate Project Brief →
            </motion.button>
          )}

          {session.phase === "discovery" && (
            <div
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
              style={{
                background: theme.bg.base,
                border: `1px solid ${atLimit ? theme.border.subtle : theme.border.default}`,
              }}
            >
              {atLimit ? (
                <p
                  className="flex-1 text-[11px]"
                  style={{
                    color: theme.text.muted,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  You've reached the free consultation limit. Contact Bhupesh
                  directly for further discussion.
                </p>
              ) : (
                <>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your response..."
                    disabled={isTyping}
                    className="flex-1 text-[12px] bg-transparent border-none outline-none"
                    style={{
                      color: theme.text.secondary,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      background:
                        input.trim() && !isTyping ? c : theme.surface[2],
                      border: "none",
                      cursor:
                        input.trim() && !isTyping ? "pointer" : "not-allowed",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6H10M7 3L10 6L7 9"
                        stroke={
                          input.trim() && !isTyping
                            ? theme.accent.primaryForeground
                            : theme.text.muted
                        }
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          )}
        </>
      ) : null}

      {session.phase === "lead-capture" && session.projectBrief && (
        <>
          <ProjectBrief brief={session.projectBrief} onProceed={() => {}} />
          <LeadCaptureForm onSubmit={onSubmitLead} isLoading={isTyping} />
          {error && (
            <p
              className="text-[11px] text-center"
              style={{ color: "#ef4444", fontFamily: "'DM Mono', monospace" }}
            >
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
}
