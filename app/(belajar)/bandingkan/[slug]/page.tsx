"use client";

import { useState, useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Equal, Minus, CornerDownRight, Square, Activity } from "lucide-react";

import ShapeCanvas from "@/components/geometry/ShapeCanvas";
import { COMPARISON_CATALOG } from "@/lib/content/comparisons";
import { SHAPE_CATALOG } from "@/lib/content/shapes";
import { createShape } from "@/lib/geometry/engine";

type TabMode = "persamaan" | "perbedaan";

export default function CompareDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const scenario = useMemo(() => COMPARISON_CATALOG.find((c) => c.slug === slug), [slug]);

  if (!scenario) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState<TabMode>("perbedaan");
  const [activeChar, setActiveChar] = useState<string | null>(null);

  const shape1Entry = useMemo(() => SHAPE_CATALOG.find(s => s.type === scenario.shape1), [scenario.shape1]);
  const shape2Entry = useMemo(() => SHAPE_CATALOG.find(s => s.type === scenario.shape2), [scenario.shape2]);

  // Create actual shape definitions for rendering
  const shape1Def = useMemo(() => {
    return shape1Entry ? createShape(shape1Entry.type, shape1Entry.defaultShape.params, {
      id: "compare-shape1",
      fillColor: shape1Entry.defaultShape.fillColor,
      strokeColor: shape1Entry.defaultShape.strokeColor
    }) : null;
  }, [shape1Entry]);

  const shape2Def = useMemo(() => {
    return shape2Entry ? createShape(shape2Entry.type, shape2Entry.defaultShape.params, {
      id: "compare-shape2",
      fillColor: shape2Entry.defaultShape.fillColor,
      strokeColor: shape2Entry.defaultShape.strokeColor
    }) : null;
  }, [shape2Entry]);

  if (!shape1Def || !shape2Def || !shape1Entry || !shape2Entry) return null;

  const activePoints = activeTab === "persamaan" ? scenario.similarities : scenario.differences;

  const renderIcon = (name: string) => {
    switch(name) {
      case "equal": return <Equal size={18} />;
      case "minus": return <Minus size={18} />;
      case "corner-down-right": return <CornerDownRight size={18} />;
      case "square": return <Square size={18} />;
      default: return <Activity size={18} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between gap-2 border-b border-ui-border">
        <Link
          href="/bandingkan"
          className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-2 py-1.5 -ml-2 rounded-lg hover:bg-bg-tertiary"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Kembali</span>
        </Link>
        <h2 className="text-lg font-bold text-text-primary text-center truncate px-2">{scenario.title}</h2>
        <div className="w-[72px]" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4">
        
        {/* Canvas Area */}
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-4 bg-bg-secondary rounded-2xl p-6 border border-ui-border min-h-[350px]">
          {/* Shape 1 */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <h3 className="font-bold text-lg" style={{ color: shape1Entry.iconColor }}>{shape1Entry.name}</h3>
            <div className="w-full max-w-[240px] aspect-square bg-white rounded-xl shadow-sm flex items-center justify-center p-2 relative">
              <ShapeCanvas 
                shape={shape1Def}
                activeCharacteristic={activeChar ?? undefined}
              />
            </div>
          </div>
          
          <div className="hidden sm:flex text-2xl font-bold text-text-muted px-2">VS</div>
          
          {/* Shape 2 */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <h3 className="font-bold text-lg" style={{ color: shape2Entry.iconColor }}>{shape2Entry.name}</h3>
            <div className="w-full max-w-[240px] aspect-square bg-white rounded-xl shadow-sm flex items-center justify-center p-2 relative">
              <ShapeCanvas 
                shape={shape2Def}
                activeCharacteristic={activeChar ?? undefined}
              />
            </div>
          </div>
        </div>

        {/* Controls / Info Area */}
        <div className="lg:w-[400px] shrink-0 flex flex-col">
          {/* Tabs */}
          <div className="flex p-1 bg-bg-tertiary rounded-xl mb-6">
            <button
              onClick={() => { setActiveTab("perbedaan"); setActiveChar(null); }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors ${
                activeTab === "perbedaan" ? "bg-white text-rose-500 shadow-sm" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              Perbedaan
            </button>
            <button
              onClick={() => { setActiveTab("persamaan"); setActiveChar(null); }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors ${
                activeTab === "persamaan" ? "bg-white text-emerald-500 shadow-sm" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              Persamaan
            </button>
          </div>

          {/* List of points */}
          <div className="space-y-3">
            {activePoints.length === 0 ? (
              <div className="text-center p-6 text-text-muted border-2 border-dashed border-ui-border rounded-xl">
                Tidak ada {activeTab} yang dicatat untuk perbandingan ini.
              </div>
            ) : (
              activePoints.map((pt, idx) => {
                const isActive = activeChar === pt.characteristicKey;
                const activeColor = activeTab === "perbedaan" ? "border-rose-500 bg-rose-50" : "border-emerald-500 bg-emerald-50";
                
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveChar(isActive ? null : pt.characteristicKey)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isActive ? activeColor : "border-ui-border bg-white hover:border-ui-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? (activeTab === "perbedaan" ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600") : "bg-bg-tertiary text-text-secondary"}`}>
                        {renderIcon(pt.iconName)}
                      </div>
                      <h4 className="font-bold text-text-primary">{pt.label}</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/60 p-2 rounded-lg border border-ui-border/50">
                        <div className="text-xs font-semibold mb-1" style={{ color: shape1Entry.iconColor }}>{shape1Entry.name}</div>
                        <div className="text-text-secondary leading-snug">{pt.desc1}</div>
                      </div>
                      <div className="bg-white/60 p-2 rounded-lg border border-ui-border/50">
                        <div className="text-xs font-semibold mb-1" style={{ color: shape2Entry.iconColor }}>{shape2Entry.name}</div>
                        <div className="text-text-secondary leading-snug">{pt.desc2}</div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
