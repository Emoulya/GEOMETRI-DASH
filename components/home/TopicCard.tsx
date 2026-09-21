/**
 * TopicCard — Kartu topik untuk dashboard beranda
 *
 * Ikon besar + label + progress indicator.
 * Target sentuh ≥ 64px (A11Y-24 rekomendasi).
 */

import Link from "next/link";
import type { ReactNode } from "react";
import type { MasteryStatus } from "@/lib/geometry/types";

interface TopicCardProps {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconBgColor: string;
  status?: MasteryStatus;
}

const statusBadge: Record<MasteryStatus, { label: string; className: string }> = {
  belum: { label: "", className: "" },
  sedang: {
    label: "Sedang belajar",
    className: "bg-status-retry-light text-status-retry",
  },
  dikuasai: {
    label: "Dikuasai",
    className: "bg-status-success-light text-status-success",
  },
};

export default function TopicCard({
  href,
  title,
  description,
  icon,
  iconBgColor,
  status = "belum",
}: TopicCardProps) {
  const badge = statusBadge[status];

  return (
    <Link
      href={href}
      className={[
        "group relative flex flex-col items-center gap-4 p-6",
        "bg-white border border-ui-border rounded-2xl",
        "shadow-sm hover:shadow-md",
        "hover:border-ui-accent/40 hover:-translate-y-1",
        "active:translate-y-0 active:shadow-sm",
        "transition-all duration-200",
        "focus-visible:outline-3 focus-visible:outline-ui-accent focus-visible:outline-offset-2",
        "min-h-40",
      ].join(" ")}
    >
      {/* Status badge */}
      {status !== "belum" && badge.label && (
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full ${badge.className}`}
        >
          {badge.label}
        </span>
      )}

      {/* Icon container */}
      <div
        className="flex items-center justify-center w-16 h-16 rounded-2xl transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: iconBgColor + "15" }}
      >
        <div style={{ color: iconBgColor }}>{icon}</div>
      </div>

      {/* Text */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-text-primary mb-1">{title}</h2>
        <p className="text-sm text-text-secondary leading-snug">{description}</p>
      </div>
    </Link>
  );
}
