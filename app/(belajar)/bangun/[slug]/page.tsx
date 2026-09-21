"use client";

/**
 * Detail Bangun — 5 Mode Interaktif (FR-02 — FR-07)
 *
 * Mode: LIHAT → SISI → SUDUT → UBAH → CIRI
 * Menggunakan geometry engine sebagai sumber kebenaran tunggal.
 * Semua transformasi tervalidasi MATH-01…12.
 */

import { useParams, notFound } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Minus, CornerDownRight, Circle, Palette, Star } from "lucide-react";

import ShapeCanvas from "@/components/geometry/ShapeCanvas";
import type {
  HighlightMode,
  SideHighlight,
  AngleHighlight,
  VertexHighlight,
} from "@/components/geometry/ShapeCanvas";
import PartCounter from "@/components/geometry/PartCounter";
import SizeColorExplorer from "@/components/geometry/SizeColorExplorer";
import OrientationExplorer from "@/components/geometry/OrientationExplorer";
import CharacteristicCards from "@/components/geometry/CharacteristicCards";
import ShapeNavigator from "@/components/geometry/ShapeNavigator";

import { SHAPE_CATALOG, SIZE_PRESETS } from "@/lib/content/shapes";
import {
  createShape,
  getShapeName,
  deriveProperties,
  getCharacteristics,
} from "@/lib/geometry/engine";
import type {
  ShapeDefinition,
  ShapeType,
  DiscreteSize,
} from "@/lib/geometry/types";

/* ------------------------------------------------------------------ */
/*  Mode Tabs                                                          */
/* ------------------------------------------------------------------ */

type ViewMode = "lihat" | "sisi" | "sudut" | "titik-sudut" | "ubah" | "ciri";

interface ModeTab {
  mode: ViewMode;
  label: string;
  Icon: typeof Eye;
}

const MODE_TABS: ModeTab[] = [
  { mode: "lihat", label: "Lihat", Icon: Eye },
  { mode: "sisi", label: "Sisi", Icon: Minus },
  { mode: "sudut", label: "Sudut", Icon: CornerDownRight },
  { mode: "titik-sudut", label: "Titik Sudut", Icon: Circle },
  { mode: "ubah", label: "Ubah", Icon: Palette },
  { mode: "ciri", label: "Ciri", Icon: Star },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function BangunDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  // Cari entry katalog
  const catalogEntry = useMemo(
    () => SHAPE_CATALOG.find((s) => s.slug === slug),
    [slug],
  );

  if (!catalogEntry) {
    notFound();
  }

  const shapeType = catalogEntry.type;
  const shapeName = catalogEntry.name;
  const isCircle = shapeType === "lingkaran";

  /* ---------------------------------------------------------------- */
  /*  State                                                            */
  /* ---------------------------------------------------------------- */

  const [activeMode, setActiveMode] = useState<ViewMode>("lihat");
  const [currentSize, setCurrentSize] = useState<DiscreteSize>("sedang");
  const [currentColor, setCurrentColor] = useState(catalogEntry.defaultShape.fillColor);
  const [rotation, setRotation] = useState(0);
  const [highlightedSides, setHighlightedSides] = useState<SideHighlight[]>([]);
  const [highlightedAngles, setHighlightedAngles] = useState<AngleHighlight[]>([]);
  const [highlightedVertices, setHighlightedVertices] = useState<VertexHighlight[]>([]);
  const [activeCharacteristic, setActiveCharacteristic] = useState<string | null>(null);

  /* ---------------------------------------------------------------- */
  /*  Derived Shape                                                    */
  /* ---------------------------------------------------------------- */

  const currentShape: ShapeDefinition = useMemo(() => {
    const sizePreset = SIZE_PRESETS[currentSize];
    const shapeParams = sizePreset.shapes[shapeType];

    return createShape(shapeType, shapeParams, {
      id: `${shapeType}-viewer`,
      fillColor: currentColor,
      strokeColor: catalogEntry.defaultShape.strokeColor,
      rotation,
    });
  }, [shapeType, currentSize, currentColor, rotation, catalogEntry]);

  const derivedProps = useMemo(
    () => deriveProperties(currentShape),
    [currentShape],
  );

  const characteristics = useMemo(
    () => getCharacteristics(currentShape),
    [currentShape],
  );

  /* ---------------------------------------------------------------- */
  /*  Handlers                                                         */
  /* ---------------------------------------------------------------- */

  const handleModeChange = useCallback((mode: ViewMode) => {
    setActiveMode(mode);
    // Reset highlights saat ganti mode
    setHighlightedSides([]);
    setHighlightedAngles([]);
    setHighlightedVertices([]);
    setActiveCharacteristic(null);
  }, []);

  const handleSideClick = useCallback(
    (index: number) => {
      setHighlightedSides((prev) => {
        const exists = prev.find((s) => s.index === index);
        if (exists) {
          // Sudah dihitung — berkedip tapi tidak tambah
          return prev;
        }
        return [
          ...prev,
          { index, color: "var(--geo-side)", counted: true },
        ];
      });
    },
    [],
  );

  const handleAngleClick = useCallback(
    (index: number) => {
      setHighlightedAngles((prev) => {
        const exists = prev.find((a) => a.index === index);
        if (exists) return prev;
        return [
          ...prev,
          { index, color: "var(--geo-angle)", counted: true },
        ];
      });
    },
    [],
  );

  const handleVertexClick = useCallback(
    (index: number) => {
      setHighlightedVertices((prev) => {
        const exists = prev.find((v) => v.index === index);
        if (exists) return prev;
        return [
          ...prev,
          { index, color: "var(--geo-vertex)", counted: true },
        ];
      });
    },
    [],
  );

  const handleResetCount = useCallback(() => {
    setHighlightedSides([]);
    setHighlightedAngles([]);
    setHighlightedVertices([]);
  }, []);

  const handleSizeChange = useCallback((size: DiscreteSize) => {
    setCurrentSize(size);
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setCurrentColor(color);
  }, []);

  const handleRotate = useCallback((degrees: number) => {
    setRotation((prev) => prev + degrees);
  }, []);

  const handleResetRotation = useCallback(() => {
    setRotation(0);
  }, []);

  const handleCharacteristicSelect = useCallback((key: string | null) => {
    setActiveCharacteristic(key);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Canvas highlight mode mapping                                    */
  /* ---------------------------------------------------------------- */

  const canvasHighlightMode: HighlightMode = useMemo(() => {
    switch (activeMode) {
      case "sisi":
        return "sisi";
      case "sudut":
        return "sudut";
      case "titik-sudut":
        return "titik-sudut";
      default:
        return "none";
    }
  }, [activeMode]);

  /* ---------------------------------------------------------------- */
  /*  Available mode tabs (filter for circle)                          */
  /* ---------------------------------------------------------------- */

  const availableTabs = useMemo(() => {
    if (isCircle) {
      // Lingkaran tidak punya sisi/sudut/titik sudut
      return MODE_TABS.filter(
        (t) => t.mode !== "sisi" && t.mode !== "sudut" && t.mode !== "titik-sudut",
      );
    }
    return MODE_TABS;
  }, [isCircle]);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
      {/* Top bar: back + shape name + navigator */}
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <Link
          href="/bangun"
          className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-2 py-1.5 -ml-2 rounded-lg hover:bg-bg-tertiary"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Katalog</span>
        </Link>

        <h2 className="text-lg font-bold text-text-primary">{shapeName}</h2>

        <div className="w-[72px]" /> {/* Spacer */}
      </div>

      {/* Shape navigator */}
      <div className="px-4 pb-3">
        <ShapeNavigator />
      </div>

      {/* Mode tabs */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-1 p-1 bg-bg-tertiary rounded-xl overflow-x-auto">
          {availableTabs.map(({ mode, label, Icon }) => {
            const isActive = activeMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => handleModeChange(mode)}
                className={[
                  "flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap",
                  "transition-all duration-200",
                  "focus-visible:outline-3 focus-visible:outline-ui-accent",
                  isActive
                    ? "bg-white text-ui-accent shadow-sm"
                    : "text-text-muted hover:text-text-secondary",
                ].join(" ")}
                aria-selected={isActive}
                role="tab"
              >
                <Icon size={16} strokeWidth={2.5} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 px-4 pb-6">
        {/* Canvas area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="shape-canvas w-full max-w-md">
            <ShapeCanvas
              shape={currentShape}
              highlightMode={canvasHighlightMode}
              highlightedSides={highlightedSides}
              highlightedAngles={highlightedAngles}
              highlightedVertices={highlightedVertices}
              activeCharacteristic={activeCharacteristic ?? undefined}
              onSideClick={activeMode === "sisi" ? handleSideClick : undefined}
              onAngleClick={activeMode === "sudut" ? handleAngleClick : undefined}
              onVertexClick={activeMode === "titik-sudut" ? handleVertexClick : undefined}
            />
          </div>
        </div>

        {/* Control panel */}
        <div className="lg:w-80 shrink-0 space-y-4">
          {/* LIHAT mode — shape info */}
          {activeMode === "lihat" && (
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-xl border border-ui-border">
                <h3 className="text-base font-bold text-text-primary mb-1">{shapeName}</h3>
                <p className="text-sm text-text-secondary">{catalogEntry.description}</p>
              </div>
              <OrientationExplorer
                currentRotation={rotation}
                onRotate={handleRotate}
                onReset={handleResetRotation}
                isCircle={isCircle}
              />
            </div>
          )}

          {/* SISI mode */}
          {activeMode === "sisi" && !isCircle && (
            <div className="space-y-3">
              <PartCounter
                type="sisi"
                counted={highlightedSides.length}
                total={derivedProps.sideCount}
                onReset={handleResetCount}
              />
              <div className="px-3 py-2.5 bg-geo-side-light rounded-lg">
                <span className="text-xs text-geo-side font-medium">
                  Sentuh setiap sisi pada bangun untuk menghitung
                </span>
              </div>
            </div>
          )}

          {/* SUDUT mode */}
          {activeMode === "sudut" && !isCircle && (
            <div className="space-y-3">
              <PartCounter
                type="sudut"
                counted={highlightedAngles.length}
                total={derivedProps.angleCount}
                onReset={handleResetCount}
              />
              <div className="px-3 py-2.5 bg-geo-angle-light rounded-lg">
                <span className="text-xs text-geo-angle font-medium">
                  Sentuh setiap sudut pada bangun untuk menghitung
                </span>
              </div>
            </div>
          )}

          {/* TITIK SUDUT mode */}
          {activeMode === "titik-sudut" && !isCircle && (
            <div className="space-y-3">
              <PartCounter
                type="titik-sudut"
                counted={highlightedVertices.length}
                total={derivedProps.vertexCount}
                onReset={handleResetCount}
              />
              <div className="px-3 py-2.5 bg-geo-vertex-light rounded-lg">
                <span className="text-xs text-geo-vertex font-medium">
                  Sentuh setiap titik sudut pada bangun untuk menghitung
                </span>
              </div>
            </div>
          )}

          {/* UBAH mode */}
          {activeMode === "ubah" && (
            <div className="space-y-4">
              <SizeColorExplorer
                shapeName={shapeName}
                currentSize={currentSize}
                currentColor={currentColor}
                onSizeChange={handleSizeChange}
                onColorChange={handleColorChange}
              />
              <OrientationExplorer
                currentRotation={rotation}
                onRotate={handleRotate}
                onReset={handleResetRotation}
                isCircle={isCircle}
              />
            </div>
          )}

          {/* CIRI mode */}
          {activeMode === "ciri" && (
            <CharacteristicCards
              characteristics={characteristics}
              activeKey={activeCharacteristic}
              onCardSelect={handleCharacteristicSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
}
