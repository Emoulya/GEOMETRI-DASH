"use client";

/**
 * ShapeHighlighter — Tombol Mode Highlight (FR-03)
 *
 * Tombol mode: Sisi, Sudut, Titik Sudut.
 * Mode bersifat eksklusif — hanya satu aktif.
 * Warna semantik untuk setiap mode.
 */

import {
  Minus,
  CornerDownRight,
  Circle,
} from "lucide-react";
import type { HighlightMode } from "./ShapeCanvas";

interface ShapeHighlighterProps {
  activeMode: HighlightMode;
  onModeChange: (mode: HighlightMode) => void;
  isCircle?: boolean;
}

interface ModeOption {
  mode: HighlightMode;
  label: string;
  Icon: typeof Minus;
  colorClass: string;
  activeBg: string;
  activeText: string;
}

const MODE_OPTIONS: ModeOption[] = [
  {
    mode: "sisi",
    label: "Sisi",
    Icon: Minus,
    colorClass: "text-geo-side",
    activeBg: "bg-geo-side-light",
    activeText: "text-geo-side",
  },
  {
    mode: "sudut",
    label: "Sudut",
    Icon: CornerDownRight,
    colorClass: "text-geo-angle",
    activeBg: "bg-geo-angle-light",
    activeText: "text-geo-angle",
  },
  {
    mode: "titik-sudut",
    label: "Titik Sudut",
    Icon: Circle,
    colorClass: "text-geo-vertex",
    activeBg: "bg-geo-vertex-light",
    activeText: "text-geo-vertex",
  },
];

export default function ShapeHighlighter({
  activeMode,
  onModeChange,
  isCircle = false,
}: ShapeHighlighterProps) {
  // Lingkaran tidak punya sisi/sudut/titik sudut
  if (isCircle) {
    return (
      <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-bg-tertiary">
        <Circle size={16} className="text-text-muted" />
        <span className="text-sm text-text-secondary">
          Lingkaran tidak memiliki sisi atau sudut
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2" role="radiogroup" aria-label="Mode highlight">
      {MODE_OPTIONS.map(({ mode, label, Icon, colorClass, activeBg, activeText }) => {
        const isActive = activeMode === mode;

        return (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onModeChange(isActive ? "none" : mode)}
            className={[
              "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold",
              "transition-all duration-200 select-none",
              "focus-visible:outline-3 focus-visible:outline-ui-accent",
              isActive
                ? `${activeBg} ${activeText} shadow-sm`
                : "bg-white border border-ui-border text-text-secondary hover:bg-bg-tertiary hover:text-text-primary",
            ].join(" ")}
          >
            <Icon size={16} strokeWidth={2.5} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
