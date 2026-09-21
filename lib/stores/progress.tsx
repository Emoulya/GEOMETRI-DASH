"use client";

/**
 * Progress Store (TC-06 / TC-07)
 *
 * Status penguasaan per topik + riwayat sesi.
 * Disimpan di localStorage — aplikasi tetap berjalan bila storage tidak tersedia (EC-06).
 * Model data siap untuk migrasi ke server di Post-MVP (FR-24).
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MasteryStatus, TopicId } from "@/lib/geometry/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TopicProgress {
  topicId: TopicId;
  status: MasteryStatus;
  bestScore: number;
  lastLevel: string;
  attempts: number;
  updatedAt: string;
}

export interface SessionResult {
  id: string;
  topicId: TopicId;
  score: number;
  total: number;
  level: string;
  completedAt: string;
}

interface ProgressContextValue {
  progress: Record<TopicId, TopicProgress>;
  sessions: SessionResult[];
  getTopicStatus: (topicId: TopicId) => MasteryStatus;
  updateTopicProgress: (topicId: TopicId, update: Partial<TopicProgress>) => void;
  addSessionResult: (session: SessionResult) => void;
  resetAllProgress: () => void;
}

/* ------------------------------------------------------------------ */
/*  Defaults                                                           */
/* ------------------------------------------------------------------ */

const PROGRESS_KEY = "geovisual_progress";
const SESSIONS_KEY = "geovisual_sessions";

const TOPIC_IDS: TopicId[] = [
  "kenali-bangun",
  "bandingkan",
  "kelompokkan",
  "keliling",
  "luas",
  "latihan",
  "permainan",
];

function createDefaultProgress(): Record<TopicId, TopicProgress> {
  const result = {} as Record<TopicId, TopicProgress>;
  for (const id of TOPIC_IDS) {
    result[id] = {
      topicId: id,
      status: "belum",
      bestScore: 0,
      lastLevel: "L1",
      attempts: 0,
      updatedAt: new Date().toISOString(),
    };
  }
  return result;
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const ProgressContext = createContext<ProgressContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Record<TopicId, TopicProgress>>(
    createDefaultProgress,
  );
  const [sessions, setSessions] = useState<SessionResult[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrasi dari localStorage
  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(PROGRESS_KEY);
      if (storedProgress) {
        setProgress((prev) => ({ ...prev, ...JSON.parse(storedProgress) }));
      }
      const storedSessions = localStorage.getItem(SESSIONS_KEY);
      if (storedSessions) {
        setSessions(JSON.parse(storedSessions));
      }
    } catch {
      // abaikan (EC-06)
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // abaikan
    }
  }, [progress, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch {
      // abaikan
    }
  }, [sessions, hydrated]);

  const getTopicStatus = useCallback(
    (topicId: TopicId): MasteryStatus => {
      return progress[topicId]?.status ?? "belum";
    },
    [progress],
  );

  const updateTopicProgress = useCallback(
    (topicId: TopicId, update: Partial<TopicProgress>) => {
      setProgress((prev) => ({
        ...prev,
        [topicId]: {
          ...prev[topicId],
          ...update,
          updatedAt: new Date().toISOString(),
        },
      }));
    },
    [],
  );

  const addSessionResult = useCallback((session: SessionResult) => {
    setSessions((prev) => [...prev, session]);
  }, []);

  const resetAllProgress = useCallback(() => {
    setProgress(createDefaultProgress());
    setSessions([]);
    try {
      localStorage.removeItem(PROGRESS_KEY);
      localStorage.removeItem(SESSIONS_KEY);
    } catch {
      // abaikan
    }
  }, []);

  const value = useMemo(
    () => ({
      progress,
      sessions,
      getTopicStatus,
      updateTopicProgress,
      addSessionResult,
      resetAllProgress,
    }),
    [progress, sessions, getTopicStatus, updateTopicProgress, addSessionResult, resetAllProgress],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress harus digunakan di dalam ProgressProvider");
  }
  return ctx;
}
