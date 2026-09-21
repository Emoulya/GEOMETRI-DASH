"use client";

/**
 * Header Component (PRD 13.2, UXR-NAV-03/04)
 *
 * Header tipis: rumah, judul topik, kamus, pengaturan.
 * Selalu di posisi yang sama, tidak pernah tersembunyi.
 * Ikon + label (UXR-NAV-04: tidak pernah ikon saja).
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Settings, ArrowLeft } from "lucide-react";

const ROUTE_TITLES: Record<string, string> = {
  "/": "Beranda",
  "/bangun": "Kenali Bangun",
  "/bandingkan": "Bandingkan",
  "/kelompokkan": "Kelompokkan",
  "/keliling": "Keliling",
  "/luas": "Luas",
  "/permainan": "Permainan",
  "/latihan": "Latihan",
  "/progress": "Kemajuan",
  "/kamus": "Kamus",
  "/pengaturan": "Pengaturan",
};

function getTitle(pathname: string): string {
  // Exact match
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];

  // Parent match (e.g., /bangun/persegi → "Kenali Bangun")
  const parent = "/" + pathname.split("/").filter(Boolean)[0];
  return ROUTE_TITLES[parent] ?? "GeoVisual";
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const title = getTitle(pathname);

  return (
    <header className="sticky top-0 z-40 h-14 bg-white/95 backdrop-blur-sm border-b border-ui-border">
      <div className="max-w-4xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Left: Brand / Title / Navigation */}
        <div className="flex items-center gap-2">
          {!isHome && (
            <Link
              href="/"
              className="flex items-center gap-1.5 px-2.5 py-1.5 -ml-1 rounded-lg text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors text-sm font-medium"
              aria-label="Kembali ke beranda"
            >
              <Home size={18} strokeWidth={2.5} />
              <span className="hidden sm:inline">Beranda</span>
            </Link>
          )}
          <h1 className="text-base font-bold text-text-primary tracking-tight">
            {title}
          </h1>
        </div>

        {/* Right: Kamus & Pengaturan */}
        <nav className="flex items-center gap-1" aria-label="Menu utama">
          <Link
            href="/kamus"
            className={[
              "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/kamus"
                ? "bg-ui-accent-light text-ui-accent"
                : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary",
            ].join(" ")}
            aria-label="Kamus istilah"
          >
            <BookOpen size={18} strokeWidth={2.5} />
            <span className="hidden sm:inline">Kamus</span>
          </Link>
          <Link
            href="/pengaturan"
            className={[
              "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/pengaturan"
                ? "bg-ui-accent-light text-ui-accent"
                : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary",
            ].join(" ")}
            aria-label="Pengaturan"
          >
            <Settings size={18} strokeWidth={2.5} />
            <span className="hidden sm:inline">Pengaturan</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
