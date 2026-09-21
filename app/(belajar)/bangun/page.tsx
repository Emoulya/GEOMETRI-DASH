import { Shapes } from "lucide-react";
import Link from "next/link";
import { SHAPE_CATALOG } from "@/lib/content/shapes";

/**
 * Katalog Bangun Datar (FR-01)
 * Grid 4 kartu besar berisi bangun datar akurat + nama.
 */
export default function BangunPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 mb-3">
          <Shapes size={28} strokeWidth={2} />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Kenali Bangun Datar</h1>
        <p className="text-text-secondary mt-1">Sentuh bangun untuk mempelajarinya</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {SHAPE_CATALOG.map((entry) => (
          <Link
            key={entry.slug}
            href={`/bangun/${entry.slug}`}
            className="group flex flex-col items-center gap-3 p-6 bg-white border border-ui-border rounded-2xl shadow-sm hover:shadow-md hover:border-ui-accent/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 focus-visible:outline-3 focus-visible:outline-ui-accent"
          >
            {/* Shape Preview SVG */}
            <div
              className="w-20 h-20 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: entry.iconColor + "15" }}
            >
              <ShapePreview type={entry.type} color={entry.iconColor} />
            </div>
            <div className="text-center">
              <h2 className="font-semibold text-text-primary">{entry.name}</h2>
              <p className="text-xs text-text-secondary mt-0.5">{entry.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Render preview SVG sederhana untuk setiap tipe bangun */
function ShapePreview({ type, color }: { type: string; color: string }) {
  const size = 40;
  const half = size / 2;

  switch (type) {
    case "persegi":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <rect x={4} y={4} width={size - 8} height={size - 8} fill={color} opacity={0.2} stroke={color} strokeWidth={2.5} rx={1} />
        </svg>
      );
    case "persegi-panjang":
      return (
        <svg width={size} height={size * 0.7} viewBox={`0 0 ${size} ${size * 0.7}`}>
          <rect x={3} y={3} width={size - 6} height={size * 0.7 - 6} fill={color} opacity={0.2} stroke={color} strokeWidth={2.5} rx={1} />
        </svg>
      );
    case "segitiga":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <polygon points={`${half},4 ${size - 4},${size - 4} 4,${size - 4}`} fill={color} opacity={0.2} stroke={color} strokeWidth={2.5} strokeLinejoin="round" />
        </svg>
      );
    case "lingkaran":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={half} cy={half} r={half - 4} fill={color} opacity={0.2} stroke={color} strokeWidth={2.5} />
        </svg>
      );
    default:
      return null;
  }
}
