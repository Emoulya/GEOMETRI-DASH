import { BookOpen } from "lucide-react";
import { TERMS } from "@/lib/content/terms";

/**
 * Kamus Visual Istilah (FR-15)
 * Istilah matematika dengan gambar/animasi pendek dan contoh.
 */
export default function KamusPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 mb-3">
          <BookOpen size={28} />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Kamus Istilah</h1>
        <p className="text-text-secondary mt-1">Arti istilah matematika</p>
      </div>

      <div className="space-y-3">
        {TERMS.map((term) => (
          <div
            key={term.id}
            className="p-4 bg-white border border-ui-border rounded-xl"
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-bg-tertiary text-text-secondary shrink-0">
                <span className="text-lg font-bold">{term.label[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-text-primary text-lg">{term.label}</h2>
                <p className="text-text-secondary mt-0.5">{term.description}</p>
                {term.example && (
                  <p className="text-sm text-text-muted mt-1.5 italic">
                    Contoh: {term.example}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
