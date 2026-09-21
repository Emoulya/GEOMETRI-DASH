"use client";

/**
 * Settings Store (TC-06)
 *
 * Pengaturan tampilan & kesulitan. Disimpan di localStorage (TC-07).
 * Menghormati prefers-reduced-motion sebagai nilai awal (FR-21).
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

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type TextSize = "normal" | "besar" | "sangat-besar";
export type MotionPreference = "penuh" | "dikurangi";
export type Difficulty = "mudah" | "sedang";

export interface AppSettings {
  textSize: TextSize;
  motion: MotionPreference;
  difficulty: Difficulty;
  soundEnabled: boolean;
}

interface SettingsContextValue {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

/* ------------------------------------------------------------------ */
/*  Defaults                                                           */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "geovisual_settings";

function getDefaultSettings(): AppSettings {
  return {
    textSize: "normal",
    motion: typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "dikurangi"
      : "penuh",
    difficulty: "mudah",
    soundEnabled: false,
  };
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const SettingsContext = createContext<SettingsContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(getDefaultSettings);
  const [hydrated, setHydrated] = useState(false);

  // Hydrasi dari localStorage setelah mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<AppSettings>;
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // localStorage tidak tersedia → gunakan default (EC-06)
    }
    setHydrated(true);
  }, []);

  // Persist ke localStorage saat berubah
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Gagal simpan → abaikan (EC-06)
    }
  }, [settings, hydrated]);

  // Apply text size ke document
  useEffect(() => {
    if (!hydrated) return;
    const scale: Record<TextSize, string> = {
      normal: "18px",
      besar: "22px",
      "sangat-besar": "26px",
    };
    document.documentElement.style.fontSize = scale[settings.textSize];
  }, [settings.textSize, hydrated]);

  const updateSettings = useCallback((partial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(getDefaultSettings());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // abaikan
    }
  }, []);

  const value = useMemo(
    () => ({ settings, updateSettings, resetSettings }),
    [settings, updateSettings, resetSettings],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings harus digunakan di dalam SettingsProvider");
  }
  return ctx;
}
