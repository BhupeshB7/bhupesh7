import type { ConsultantSession, ProgressState, ProjectBriefData, ConsultantPhase, Message } from "./types";

const STORAGE_KEY = "project_consultant_session";
const TTL_MS = 72 * 60 * 60 * 1000;

export function saveSession(session: ConsultantSession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch { }
}

export function loadSession(): ConsultantSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session: ConsultantSession = JSON.parse(raw);
    if (Date.now() - session.timestamp > TTL_MS) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch { }
}

export function createNewSession(): ConsultantSession {
  return {
    chatId: crypto.randomUUID(),
    messages: [],
    phase: "landing",
    progress: {
      projectIdea: false,
      targetUsers: false,
      coreFeatures: false,
      platformRequirements: false,
      budget: false,
      timeline: false,
    },
    projectBrief: null,
    messageCount: 0,
    timestamp: Date.now(),
  };
}
