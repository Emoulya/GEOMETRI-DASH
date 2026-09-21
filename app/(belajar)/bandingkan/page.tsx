import { GitCompareArrows, Construction } from "lucide-react";
import Link from "next/link";

/** Placeholder — pemilih pasangan bangun (FR-08, Fase 3) */
export default function BandingkanPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-50 text-violet-500 mb-4">
        <GitCompareArrows size={32} />
      </div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Bandingkan Bangun</h1>
      <p className="text-text-secondary mb-6 max-w-md">
        Halaman ini sedang dalam pengembangan.
        <br />
        Akan menampilkan Compare View untuk membandingkan dua bangun datar.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-3 bg-ui-accent text-white font-semibold rounded-xl hover:bg-ui-accent-hover transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
