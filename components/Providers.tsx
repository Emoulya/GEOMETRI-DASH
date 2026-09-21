"use client";

/**
 * Providers — Wrapper untuk semua Context Provider
 * Dipasang di root layout agar tersedia di seluruh aplikasi.
 */

import type { ReactNode } from "react";
import { SettingsProvider } from "@/lib/stores/settings";
import { ProgressProvider } from "@/lib/stores/progress";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <ProgressProvider>
        {children}
      </ProgressProvider>
    </SettingsProvider>
  );
}
