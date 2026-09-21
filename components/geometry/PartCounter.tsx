"use client";

/**
 * PartCounter — Penghitung Sisi & Sudut (FR-04)
 *
 * Tap-to-count dengan anti duplikasi.
 * Angka berjalan dengan animasi bump.
 * Ikon ✓ saat semua bagian terhitung.
 */

import { Check, RotateCcw } from "lucide-react";

interface PartCounterProps {
  /** Tipe yang sedang dihitung */
  type: "sisi" | "sudut" | "titik-sudut";
  /** Jumlah yang sudah dihitung */
  counted: number;
  /** Jumlah total bagian */
  total: number;
  /** Callback reset */
  onReset: () => void;
}

export default function PartCounter({
  type,
  counted,
  total,
  onReset,
}: PartCounterProps) {
  const isComplete = counted >= total && total > 0;
  let label = "Sisi";
  let iconColor = "var(--geo-side)";

  if (type === "sudut") {
    label = "Sudut";
    iconColor = "var(--geo-angle)";
  } else if (type === "titik-sudut") {
    label = "Titik Sudut";
    iconColor = "var(--geo-vertex)";
  }

  return (
    <div
      className={[
        "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300",
        isComplete
          ? "bg-status-success-light border-status-success/30"
          : "bg-white border-ui-border",
      ].join(" ")}
    >
      {/* Counter display */}
      <div className="flex items-center gap-2 flex-1">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg font-bold text-xl"
          style={{
            backgroundColor: isComplete
              ? "var(--status-success-light)"
              : `${iconColor}15`,
            color: isComplete ? "var(--status-success)" : iconColor,
          }}
        >
          {isComplete ? (
            <Check size={22} strokeWidth={3} />
          ) : (
            <span
              key={counted}
              className={counted > 0 ? "count-bump" : ""}
            >
              {counted}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-text-primary">
            {isComplete
              ? `Semua ${label} Terhitung!`
              : `${counted} dari ${total} ${label}`}
          </span>
          <span className="text-xs text-text-muted">
            {isComplete
              ? `${label}: ${total}`
              : `Sentuh setiap ${label.toLowerCase()} untuk menghitung`}
          </span>
        </div>
      </div>

      {/* Reset button */}
      {counted > 0 && (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-bg-tertiary text-text-muted hover:bg-ui-border hover:text-text-secondary transition-colors"
          aria-label={`Reset hitungan ${label.toLowerCase()}`}
        >
          <RotateCcw size={16} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
