"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { loadSession, saveSession, createNewSession, clearSession } from "../lib/storage";
import type {
  ConsultantSession,
  Message,
  LeadData,
} from "../lib/types";

const MAX_MESSAGES = 100;

export function useConsultant() {
  const [session, setSession] = useState<ConsultantSession | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const existing = loadSession();
    setSession(existing ?? createNewSession());
  }, []);

  const updateSession = useCallback((updater: (s: ConsultantSession) => ConsultantSession) => {
    setSession((prev) => {
      if (!prev) return prev;
      const next = updater({ ...prev, timestamp: Date.now() });
      saveSession(next);
      return next;
    });
  }, []);

  const startConversation = useCallback(async (initialMessage: string) => {
    if (!session) return;

    setError(null);

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: initialMessage,
      timestamp: Date.now(),
    };

    updateSession((s) => ({
      ...s,
      phase: "discovery",
      messages: [...s.messages, userMsg],
      messageCount: s.messageCount + 1,
    }));

    await sendToAI([...session.messages, userMsg]);
  }, [session, updateSession]);

  const sendMessage = useCallback(async (content: string) => {
    if (!session || session.messageCount >= MAX_MESSAGES) return;

    setError(null);

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    const updatedMessages = [...session.messages, userMsg];

    updateSession((s) => ({
      ...s,
      messages: updatedMessages,
      messageCount: s.messageCount + 1,
    }));

    await sendToAI(updatedMessages);
  }, [session, updateSession]);

  const sendToAI = useCallback(async (messages: Message[]) => {
    setIsTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "API error");
      }

      const data = await res.json();
      const { reply, progress, readyForBrief } = data;

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: reply,
        timestamp: Date.now(),
      };

      updateSession((s) => ({
        ...s,
        messages: [...s.messages, assistantMsg],
        messageCount: s.messageCount + 1,
        progress: progress ?? s.progress,
        phase: readyForBrief ? "brief-ready" : s.phase,
      }));
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsTyping(false);
    }
  }, [updateSession]);

  const generateBrief = useCallback(async () => {
    if (!session) return;
    setIsTyping(true);
    setError(null);
    try {
      const res = await fetch("/api/project-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: session.messages }),
      });

      if (!res.ok) throw new Error("Failed to generate brief");

      const { brief } = await res.json();

      updateSession((s) => ({
        ...s,
        projectBrief: brief,
        phase: "lead-capture",
      }));
    } catch {
      setError("Failed to generate project brief. Please try again.");
    } finally {
      setIsTyping(false);
    }
  }, [session, updateSession]);

  const submitLead = useCallback(async (leadData: LeadData) => {
    if (!session?.projectBrief) return;
    setError(null);
    try {
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: leadData,
          brief: session.projectBrief,
          meta: {
            chatId: session.chatId,
            messageCount: session.messageCount,
            date: new Date().toISOString(),
            messages: session.messages,
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to send lead");

      updateSession((s) => ({ ...s, phase: "success" }));
    } catch {
      setError("Failed to submit. Please try again.");
    }
  }, [session, updateSession]);

  const reset = useCallback(() => {
    clearSession();
    setSession(createNewSession());
    setError(null);
  }, []);

  return {
    session,
    isTyping,
    error,
    startConversation,
    sendMessage,
    generateBrief,
    submitLead,
    reset,
  };
}
 
