"use client";

/**
 * SizeColorExplorer — Eksplorasi Ukuran & Warna (FR-05)
 *
 * Slider diskrit (kecil/sedang/besar) + 5-6 warna isi.
 * Pesan: "Namanya tetap: [Nama Bangun]" saat diubah.
 * Skala uniform untuk persegi & lingkaran (MATH-01).
 */

import { Check, Palette, Maximize2 } from "lucide-react";
import type { DiscreteSize } from "@/lib/geometry/types";
import { FILL_COLORS } from "@/lib/geometry/types";

interface SizeColorExplorerProps {
  shapeName: string;
  currentSize: DiscreteSize;
  currentColor: string;
  onSizeChange: (size: DiscreteSize) => void;
  onColorChange: (color: string) => void;
}

const SIZE_OPTIONS: { value: DiscreteSize; label: string }[] = [
  { value: "kecil", label: "Kecil" },
  { value: "sedang", label: "Sedang" },
  { value: "besar", label: "Besar" },
];

export default function SizeColorExplorer({
  shapeName,
  currentSize,
  currentColor,
  onSizeChange,
  onColorChange,
}: SizeColorExplorerProps) {
  return (
    <div className="space-y-4">
      {/* Size slider */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-sm font-medium text-text-secondary">
          <Maximize2 size={14} strokeWidth={2.5} />
          <span>Ukuran</span>
        </div>
        <div className="flex items-center gap-2 p-1 bg-bg-tertiary rounded-xl">
          {SIZE_OPTIONS.map(({ value, label }) => {
            const isActive = currentSize === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onSizeChange(value)}
                className={[
                  "flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                  "focus-visible:outline-3 focus-visible:outline-ui-accent",
                  isActive
                    ? "bg-white text-text-primary shadow-sm"
                    : "text-text-muted hover:text-text-secondary",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color picker */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-sm font-medium text-text-secondary">
          <Palette size={14} strokeWidth={2.5} />
          <span>Warna</span>
        </div>
        <div className="flex items-center gap-2.5">
          {FILL_COLORS.map((color) => {
            const isSelected = currentColor === color;
            return (
              <button
                key={color}
                type="button"
                onClick={() => onColorChange(color)}
                className={[
                  "w-9 h-9 rounded-full transition-all duration-200",
                  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ui-accent",
                  isSelected
                    ? "ring-2 ring-offset-2 ring-current scale-110"
                    : "hover:scale-110",
                ].join(" ")}
                style={{
                  backgroundColor: color,
                  color: isSelected ? color : undefined,
                }}
                aria-label={`Warna ${color}`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <Check
                    size={16}
                    strokeWidth={3}
                    className="mx-auto text-white"
                    style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reinforcement message */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-ui-accent-light rounded-lg">
        <span className="text-xs text-ui-accent font-medium">
          ✨ Namanya tetap: <strong>{shapeName}</strong>
        </span>
      </div>
    </div>
  );
}
