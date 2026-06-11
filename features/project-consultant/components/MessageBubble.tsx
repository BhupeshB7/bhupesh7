"use client";

import { motion } from "framer-motion";
import theme from "@/config/theme.config";
import { Message } from "@/lib/types";

const c = theme.accent.primary;

interface Props {
  message: Message;
  index: number;
}

export default function MessageBubble({ message, index }: Props) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index < 3 ? index * 0.08 : 0 }}
      className={`flex gap-2 ${isUser ? "justify-end" : ""}`}
    >
      {!isUser && (
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{
            background: theme.accent.tintStrong,
            border: `1px solid ${theme.accent.border}`,
          }}
        >
          <span
            style={{
              color: c,
              fontSize: "8px",
              fontFamily: "'DM Mono', monospace",
              fontWeight: 700,
            }}
          >
            AI
          </span>
        </div>
      )}

      <div
        className="rounded-xl px-3.5 py-2.5 max-w-[85%]"
        style={
          isUser
            ? {
                background: theme.accent.tintStrong,
                border: `1px solid ${theme.accent.border}`,
                borderTopRightRadius: "4px",
              }
            : {
                background: theme.surface[2],
                border: `1px solid ${theme.border.subtle}`,
                borderTopLeftRadius: "4px",
              }
        }
      >
        <p
          className="text-[12px] leading-relaxed whitespace-pre-wrap"
          style={{ color: isUser ? c : theme.text.secondary }}
        >
          {message.content}
        </p>
      </div>
    </motion.div>
  );
}
