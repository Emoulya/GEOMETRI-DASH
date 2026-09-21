import { Route } from "lucide-react";
import Link from "next/link";

/** Placeholder — alur keliling (FR-11, FR-12, Fase 4) */
export default function KelilingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 mb-4">
        <Route size={32} />
      </div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Keliling</h1>
      <p className="text-text-secondary mb-6 max-w-md">
        Halaman ini sedang dalam pengembangan.
        <br />
        Akan menampilkan Perimeter Trace dan latihan menghitung keliling.
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
