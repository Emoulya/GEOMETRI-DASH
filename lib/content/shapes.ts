/**
 * Shape Content Data (TC-05)
 *
 * Definisi default untuk setiap bangun datar, termasuk variasi orientasi (MATH-11).
 * Konten terpisah dari komponen agar dapat ditambah tanpa menyentuh UI.
 */

import type { ShapeDefinition, ShapeType } from "@/lib/geometry/types";
import { createShape } from "@/lib/geometry/engine";

/* ================================================================== */
/*  Default Shapes                                                     */
/* ================================================================== */

export const DEFAULT_SHAPES: Record<ShapeType, ShapeDefinition> = {
  persegi: createShape("persegi", { s: 5 }, {
    id: "persegi-default",
    fillColor: "#3B82F6",
    strokeColor: "#1E40AF",
  }),
  "persegi-panjang": createShape("persegi-panjang", { p: 8, l: 5 }, {
    id: "persegi-panjang-default",
    fillColor: "#8B5CF6",
    strokeColor: "#5B21B6",
  }),
  segitiga: createShape("segitiga", { subType: "sama-sisi", a: 6, b: 6, c: 6 }, {
    id: "segitiga-default",
    fillColor: "#10B981",
    strokeColor: "#047857",
  }),
  lingkaran: createShape("lingkaran", { r: 4 }, {
    id: "lingkaran-default",
    fillColor: "#F59E0B",
    strokeColor: "#B45309",
  }),
};

/* ================================================================== */
/*  Shape Catalog Entries (FR-01)                                      */
/* ================================================================== */

export interface ShapeCatalogEntry {
  type: ShapeType;
  name: string;
  slug: string;
  description: string;
  iconColor: string;
  defaultShape: ShapeDefinition;
}

export const SHAPE_CATALOG: ShapeCatalogEntry[] = [
  {
    type: "persegi",
    name: "Persegi",
    slug: "persegi",
    description: "4 sisi sama panjang",
    iconColor: "#3B82F6",
    defaultShape: DEFAULT_SHAPES.persegi,
  },
  {
    type: "persegi-panjang",
    name: "Persegi Panjang",
    slug: "persegi-panjang",
    description: "4 sisi, berhadapan sama",
    iconColor: "#8B5CF6",
    defaultShape: DEFAULT_SHAPES["persegi-panjang"],
  },
  {
    type: "segitiga",
    name: "Segitiga",
    slug: "segitiga",
    description: "3 sisi dan 3 sudut",
    iconColor: "#10B981",
    defaultShape: DEFAULT_SHAPES.segitiga,
  },
  {
    type: "lingkaran",
    name: "Lingkaran",
    slug: "lingkaran",
    description: "Bulat tanpa sudut",
    iconColor: "#F59E0B",
    defaultShape: DEFAULT_SHAPES.lingkaran,
  },
];

/* ================================================================== */
/*  Orientation Variants (MATH-11)                                     */
/*  Setiap bangun wajib ditampilkan dalam beberapa orientasi.          */
/* ================================================================== */

export const ORIENTATION_VARIANTS: Record<ShapeType, number[]> = {
  persegi: [0, 15, 30, 45],
  "persegi-panjang": [0, 30, 45, 90],
  segitiga: [0, 60, 120, 180],
  lingkaran: [0], // rotasi tidak mengubah lingkaran
};

/* ================================================================== */
/*  Triangle Variants (MATH-05: hanya lancip & siku-siku)              */
/* ================================================================== */

export const TRIANGLE_VARIANTS: ShapeDefinition[] = [
  createShape("segitiga", { subType: "sama-sisi", a: 6, b: 6, c: 6 }, {
    id: "segitiga-sama-sisi",
    fillColor: "#10B981",
    strokeColor: "#047857",
  }),
  createShape("segitiga", { subType: "sama-kaki", a: 6, b: 8, c: 8 }, {
    id: "segitiga-sama-kaki",
    fillColor: "#10B981",
    strokeColor: "#047857",
  }),
  createShape("segitiga", { subType: "siku-siku", a: 6, b: 8, c: 10 }, {
    id: "segitiga-siku-siku",
    fillColor: "#10B981",
    strokeColor: "#047857",
  }),
];

/* ================================================================== */
/*  Size Presets — bilangan bulat, sisi ≤ 20, luas ≤ 100 (EC-12)       */
/* ================================================================== */

export interface SizePreset {
  label: string;
  shapes: Record<ShapeType, ShapeDefinition["params"]>;
}

export const SIZE_PRESETS: Record<"kecil" | "sedang" | "besar", SizePreset> = {
  kecil: {
    label: "Kecil",
    shapes: {
      persegi: { s: 3 },
      "persegi-panjang": { p: 5, l: 3 },
      segitiga: { subType: "sama-sisi" as const, a: 4, b: 4, c: 4 },
      lingkaran: { r: 2 },
    },
  },
  sedang: {
    label: "Sedang",
    shapes: {
      persegi: { s: 5 },
      "persegi-panjang": { p: 8, l: 5 },
      segitiga: { subType: "sama-sisi" as const, a: 6, b: 6, c: 6 },
      lingkaran: { r: 4 },
    },
  },
  besar: {
    label: "Besar",
    shapes: {
      persegi: { s: 8 },
      "persegi-panjang": { p: 12, l: 8 },
      segitiga: { subType: "sama-sisi" as const, a: 10, b: 10, c: 10 },
      lingkaran: { r: 6 },
    },
  },
};
