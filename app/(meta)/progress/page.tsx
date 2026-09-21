"use client";

import { TrendingUp } from "lucide-react";
import { useProgress } from "@/lib/stores/progress";

/**
 * Progress Page (FR-19)
 * Peta topik dengan status per topik: Belum / Sedang / Dikuasai
 */
export default function ProgressPage() {
  const { progress } = useProgress();

  const topics = [
    { id: "kenali-bangun" as const, label: "Kenali Bangun", icon: "🔷" },
    { id: "bandingkan" as const, label: "Bandingkan", icon: "⚖️" },
    { id: "kelompokkan" as const, label: "Kelompokkan", icon: "📦" },
    { id: "keliling" as const, label: "Keliling", icon: "🔄" },
    { id: "luas" as const, label: "Luas", icon: "⬜" },
  ];

  const statusStyles = {
    belum: { label: "Belum Dicoba", bg: "bg-bg-tertiary", text: "text-text-muted", dot: "bg-ui-border-strong" },
    sedang: { label: "Sedang Belajar", bg: "bg-status-retry-light", text: "text-status-retry", dot: "bg-status-retry" },
    dikuasai: { label: "Dikuasai", bg: "bg-status-success-light", text: "text-status-success", dot: "bg-status-success" },
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 mb-3">
          <TrendingUp size={28} />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Kemajuan Belajar</h1>
        <p className="text-text-secondary mt-1">Lihat topik yang sudah kamu pelajari</p>
      </div>

      <div className="space-y-3">
        {topics.map((topic) => {
          const topicProgress = progress[topic.id];
          const style = statusStyles[topicProgress?.status ?? "belum"];

          return (
            <div
              key={topic.id}
              className="flex items-center gap-4 p-4 bg-white border border-ui-border rounded-xl"
            >
              <span className="text-2xl" role="img" aria-hidden="true">
                {topic.icon}
              </span>
              <div className="flex-1">
                <h2 className="font-semibold text-text-primary">{topic.label}</h2>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                {style.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
