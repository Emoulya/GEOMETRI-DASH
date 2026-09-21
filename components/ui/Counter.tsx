"use client";

/**
 * Counter Component (PRD 13.6)
 *
 * Angka besar, berubah dengan animasi naik singkat.
 * Digunakan untuk penghitung sisi/sudut, skor, dan lain-lain.
 */

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  label?: string;
  suffix?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const sizeStyles: Record<string, { number: string; label: string }> = {
  sm: { number: "text-2xl", label: "text-xs" },
  md: { number: "text-4xl", label: "text-sm" },
  lg: { number: "text-6xl", label: "text-base" },
};

export default function Counter({
  value,
  label,
  suffix,
  size = "md",
  color,
}: CounterProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [bumping, setBumping] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (value !== prevValue.current) {
      setBumping(true);
      setDisplayValue(value);
      prevValue.current = value;

      const timer = setTimeout(() => setBumping(false), 200);
      return () => clearTimeout(timer);
    }
  }, [value]);

  const styles = sizeStyles[size];

  return (
    <div className="flex flex-col items-center gap-1">
      {label && (
        <span className={`${styles.label} font-medium text-text-secondary`}>
          {label}
        </span>
      )}
      <span
        className={[
          styles.number,
          "font-bold tabular-nums transition-transform",
          bumping ? "count-bump" : "",
        ].join(" ")}
        style={color ? { color } : undefined}
        aria-live="polite"
        aria-atomic="true"
      >
        {displayValue}
        {suffix && (
          <span className="text-[0.5em] font-medium text-text-muted ml-1">
            {suffix}
          </span>
        )}
      </span>
    </div>
  );
}
