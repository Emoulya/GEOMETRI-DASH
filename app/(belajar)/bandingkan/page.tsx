import Link from "next/link";
import { GitCompareArrows, ArrowRight, Shapes } from "lucide-react";
import { COMPARISON_CATALOG } from "@/lib/content/comparisons";
import { SHAPE_CATALOG } from "@/lib/content/shapes";

export default function BandingkanPage() {
  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-8">
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-100 text-violet-600 mb-4 sm:hidden">
          <GitCompareArrows size={24} />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2 flex items-center gap-3 justify-center sm:justify-start">
          <GitCompareArrows size={24} className="hidden sm:block text-violet-500" />
          Bandingkan Bangun
        </h1>
        <p className="text-text-secondary max-w-2xl">
          Pilih salah satu contoh soal di bawah ini untuk melihat perbandingan secara langsung
          antara dua bangun datar, serta menemukan letak persamaan dan perbedaannya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMPARISON_CATALOG.map((scenario) => {
          const shape1 = SHAPE_CATALOG.find(s => s.type === scenario.shape1);
          const shape2 = SHAPE_CATALOG.find(s => s.type === scenario.shape2);
          
          return (
            <Link 
              key={scenario.slug}
              href={`/bandingkan/${scenario.slug}`}
              className="flex flex-col p-5 bg-white border border-ui-border rounded-2xl hover:border-ui-accent hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-ui-secondary flex items-center justify-center text-ui-accent">
                    <Shapes size={18} />
                  </div>
                  <h3 className="font-bold text-text-primary group-hover:text-ui-accent transition-colors">
                    {scenario.title}
                  </h3>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4 px-4 py-3 bg-bg-secondary rounded-xl text-sm font-semibold">
                <span style={{ color: shape1?.iconColor }}>{shape1?.name}</span>
                <span className="text-text-muted">vs</span>
                <span style={{ color: shape2?.iconColor }}>{shape2?.name}</span>
              </div>
              
              <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
                {scenario.description}
              </p>
              
              <div className="flex items-center text-sm font-semibold text-ui-accent mt-auto group-hover:translate-x-1 transition-transform">
                Lihat Perbandingan
                <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
