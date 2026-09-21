/**
 * Step Indicator (PRD 13.6, UXR-NAV-02)
 *
 * 4 langkah tetap: LIHAT → COBA → LATIHAN → HASIL
 * Posisi & bentuk sama di seluruh topik.
 * Ikon + teks (A11Y: warna bukan satu-satunya pembeda).
 */

import { Eye, Hand, PenTool, CheckCircle2 } from "lucide-react";
import type { LearningStage } from "@/lib/geometry/types";

interface StepIndicatorProps {
  currentStage: LearningStage;
  completedStages?: LearningStage[];
}

const STEPS: { stage: LearningStage; label: string; icon: typeof Eye }[] = [
  { stage: "lihat", label: "Lihat", icon: Eye },
  { stage: "coba", label: "Coba", icon: Hand },
  { stage: "latihan", label: "Latihan", icon: PenTool },
  { stage: "hasil", label: "Hasil", icon: CheckCircle2 },
];

export default function StepIndicator({
  currentStage,
  completedStages = [],
}: StepIndicatorProps) {
  const currentIndex = STEPS.findIndex((s) => s.stage === currentStage);

  return (
    <nav
      className="flex items-center justify-center gap-2 py-3 px-4"
      aria-label="Langkah pembelajaran"
    >
      {STEPS.map((step, index) => {
        const isActive = step.stage === currentStage;
        const isCompleted = completedStages.includes(step.stage);
        const isPast = index < currentIndex;
        const Icon = step.icon;

        return (
          <div key={step.stage} className="flex items-center gap-2">
            {/* Step */}
            <div
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                isActive
                  ? "bg-ui-accent text-white"
                  : isCompleted || isPast
                    ? "bg-status-success-light text-status-success"
                    : "bg-bg-tertiary text-text-muted",
              ].join(" ")}
              aria-current={isActive ? "step" : undefined}
            >
              <Icon size={16} strokeWidth={2.5} />
              <span className="hidden sm:inline">{step.label}</span>
            </div>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <div
                className={[
                  "w-6 h-0.5 rounded-full",
                  isPast || isCompleted ? "bg-status-success" : "bg-ui-border",
                ].join(" ")}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
