"use client";

/**
 * OrientationExplorer — Putar Bangun (FR-06)
 *
 * Tombol putar (15°/45°) dan tombol reset.
 * Label teks tetap tegak.
 * Penanda siku-siku ikut berputar mengikuti sisi.
 * Animasi rotasi 200-300 ms.
 */

import { RotateCw, RotateCcw, RotateCcw as ResetIcon } from "lucide-react";

interface OrientationExplorerProps {
  currentRotation: number;
  onRotate: (degrees: number) => void;
  onReset: () => void;
  isCircle?: boolean;
}

export default function OrientationExplorer({
  currentRotation,
  onRotate,
  onReset,
  isCircle = false,
}: OrientationExplorerProps) {
  if (isCircle) {
    return (
      <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-bg-tertiary">
        <RotateCw size={16} className="text-text-muted" />
        <span className="text-sm text-text-secondary">
          Rotasi tidak mengubah lingkaran
        </span>
      </div>
    );
  }

  const normalizedRotation = ((currentRotation % 360) + 360) % 360;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {/* Counter-clockwise 45° */}
        <button
          type="button"
          onClick={() => onRotate(-45)}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-ui-border text-text-secondary text-sm font-medium hover:bg-bg-tertiary hover:text-text-primary transition-colors focus-visible:outline-3 focus-visible:outline-ui-accent"
          aria-label="Putar 45° berlawanan arah jarum jam"
        >
          <RotateCcw size={16} strokeWidth={2.5} />
          <span>−45°</span>
        </button>

        {/* Counter-clockwise 15° */}
        <button
          type="button"
          onClick={() => onRotate(-15)}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-ui-border text-text-secondary text-sm font-medium hover:bg-bg-tertiary hover:text-text-primary transition-colors focus-visible:outline-3 focus-visible:outline-ui-accent"
          aria-label="Putar 15° berlawanan arah jarum jam"
        >
          <RotateCcw size={14} strokeWidth={2.5} />
          <span>−15°</span>
        </button>

        {/* Current rotation indicator */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm font-semibold text-text-primary tabular-nums">
            {normalizedRotation}°
          </span>
        </div>

        {/* Clockwise 15° */}
        <button
          type="button"
          onClick={() => onRotate(15)}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-ui-border text-text-secondary text-sm font-medium hover:bg-bg-tertiary hover:text-text-primary transition-colors focus-visible:outline-3 focus-visible:outline-ui-accent"
          aria-label="Putar 15° searah jarum jam"
        >
          <span>+15°</span>
          <RotateCw size={14} strokeWidth={2.5} />
        </button>

        {/* Clockwise 45° */}
        <button
          type="button"
          onClick={() => onRotate(45)}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-ui-border text-text-secondary text-sm font-medium hover:bg-bg-tertiary hover:text-text-primary transition-colors focus-visible:outline-3 focus-visible:outline-ui-accent"
          aria-label="Putar 45° searah jarum jam"
        >
          <span>+45°</span>
          <RotateCw size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Reset */}
      {normalizedRotation !== 0 && (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 w-full justify-center px-4 py-2.5 rounded-xl bg-bg-tertiary text-text-secondary text-sm font-medium hover:bg-ui-border hover:text-text-primary transition-colors focus-visible:outline-3 focus-visible:outline-ui-accent"
        >
          <ResetIcon size={14} strokeWidth={2.5} />
          <span>Posisi Semula</span>
        </button>
      )}

      {/* Reinforcement */}
      {normalizedRotation !== 0 && (
        <div className="flex items-center gap-2 px-3 py-2.5 bg-ui-accent-light rounded-lg">
          <span className="text-xs text-ui-accent font-medium">
            ✨ Diputar {normalizedRotation}° — bentuk dan ciri tetap sama!
          </span>
        </div>
      )}
    </div>
  );
}
