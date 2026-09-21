"use client";

/**
 * CharacteristicCards — Kartu Karakteristik Bangun (FR-07)
 *
 * Deret kartu, satu ciri per kartu.
 * Ikon + angka/simbol + frasa ≤ 4 kata.
 * Menyorot kartu akan menyalakan bagian terkait pada kanvas.
 */

import {
  Minus,
  CornerDownRight,
  Square,
  Equal,
  MoveHorizontal,
  MoveRight,
} from "lucide-react";
import type { ShapeCharacteristic } from "@/lib/geometry/types";

interface CharacteristicCardsProps {
  characteristics: ShapeCharacteristic[];
  activeKey: string | null;
  onCardSelect: (key: string | null) => void;
}

const ICON_MAP: Record<string, typeof Minus> = {
  minus: Minus,
  "corner-down-right": CornerDownRight,
  square: Square,
  equal: Equal,
  "move-horizontal": MoveHorizontal,
  "move-right": MoveRight,
};

const MARKER_COLOR_MAP: Record<string, string> = {
  tick: "var(--geo-side)",
  arc: "var(--geo-angle)",
  "right-angle-box": "var(--geo-angle)",
  dot: "var(--geo-vertex)",
  none: "var(--ui-accent)",
};

export default function CharacteristicCards({
  characteristics,
  activeKey,
  onCardSelect,
}: CharacteristicCardsProps) {
  if (characteristics.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-text-secondary px-1">
        Ciri-ciri Bangun
      </h3>
      <div className="flex flex-col gap-2">
        {characteristics.map((char) => {
          const Icon = ICON_MAP[char.iconName] ?? Minus;
          const isActive = activeKey === char.key;
          const accentColor = MARKER_COLOR_MAP[char.visualMarker] ?? "var(--ui-accent)";

          return (
            <button
              key={char.key}
              type="button"
              onClick={() => onCardSelect(isActive ? null : char.key)}
              className={[
                "flex items-center gap-3 px-4 py-3 rounded-xl text-left",
                "transition-all duration-200",
                "focus-visible:outline-3 focus-visible:outline-ui-accent",
                isActive
                  ? "bg-white shadow-md border-2 -translate-y-0.5"
                  : "bg-white border border-ui-border hover:shadow-sm hover:border-ui-border-strong",
              ].join(" ")}
              style={{
                borderColor: isActive ? accentColor : undefined,
              }}
              aria-pressed={isActive}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                }}
              >
                <Icon size={20} strokeWidth={2.5} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-lg font-bold"
                    style={{ color: isActive ? accentColor : "var(--text-primary)" }}
                  >
                    {char.value}
                  </span>
                </div>
                <span className="text-sm text-text-secondary">
                  {char.label}
                </span>
              </div>

              {/* Active indicator */}
              {isActive && (
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: accentColor }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
