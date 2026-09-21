"use client";

/**
 * ShapeNavigator — Navigator 4 Bangun
 *
 * Ikon navigator yang selalu tampil di halaman detail.
 * Memungkinkan pindah antar bangun tanpa kembali ke katalog.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SHAPE_CATALOG } from "@/lib/content/shapes";

/** Render preview ikon bangun mini */
function ShapeMiniIcon({
  type,
  color,
  isActive,
}: {
  type: string;
  color: string;
  isActive: boolean;
}) {
  const size = 24;
  const half = size / 2;
  const stroke = isActive ? color : "#94A3B8";
  const fill = isActive ? color : "transparent";
  const fillOpacity = isActive ? 0.2 : 0;

  switch (type) {
    case "persegi":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <rect
            x={3}
            y={3}
            width={size - 6}
            height={size - 6}
            fill={fill}
            fillOpacity={fillOpacity}
            stroke={stroke}
            strokeWidth={2}
            rx={1}
          />
        </svg>
      );
    case "persegi-panjang":
      return (
        <svg width={size} height={size * 0.7} viewBox={`0 0 ${size} ${size * 0.7}`}>
          <rect
            x={2}
            y={2}
            width={size - 4}
            height={size * 0.7 - 4}
            fill={fill}
            fillOpacity={fillOpacity}
            stroke={stroke}
            strokeWidth={2}
            rx={1}
          />
        </svg>
      );
    case "segitiga":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <polygon
            points={`${half},3 ${size - 3},${size - 3} 3,${size - 3}`}
            fill={fill}
            fillOpacity={fillOpacity}
            stroke={stroke}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "lingkaran":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={half}
            cy={half}
            r={half - 3}
            fill={fill}
            fillOpacity={fillOpacity}
            stroke={stroke}
            strokeWidth={2}
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function ShapeNavigator() {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  return (
    <nav
      className="flex items-center justify-center gap-1.5"
      aria-label="Navigasi bangun"
    >
      {SHAPE_CATALOG.map((entry) => {
        const isActive = currentSlug === entry.slug;

        return (
          <Link
            key={entry.slug}
            href={`/bangun/${entry.slug}`}
            className={[
              "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
              "focus-visible:outline-3 focus-visible:outline-ui-accent",
              isActive
                ? "bg-white shadow-sm border border-ui-border"
                : "hover:bg-white/60",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            <ShapeMiniIcon
              type={entry.type}
              color={entry.iconColor}
              isActive={isActive}
            />
            <span
              className={[
                "text-[10px] font-medium leading-tight",
                isActive ? "text-text-primary" : "text-text-muted",
              ].join(" ")}
            >
              {entry.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
