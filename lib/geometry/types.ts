/**
 * Geometry Engine — Type Definitions
 *
 * Sumber kebenaran tunggal untuk seluruh bangun datar.
 * Semua properti (sisi, sudut, keliling, luas) diturunkan dari definisi ini (MATH-10).
 */

/* ------------------------------------------------------------------ */
/*  Enums & Literal Types                                              */
/* ------------------------------------------------------------------ */

/** 4 bangun yang dicakup MVP (C-05) */
export type ShapeType = "persegi" | "persegi-panjang" | "segitiga" | "lingkaran";

/** Sub-jenis segitiga MVP — MATH-05: hanya lancip & siku-siku */
export type TriangleSubType = "sama-sisi" | "sama-kaki" | "siku-siku";

/** Kebijakan skala (MATH-01, MATH-02) */
export type ScalePolicy = "uniform" | "biaxial";

/** Ukuran diskrit untuk slider FR-05 */
export type DiscreteSize = "kecil" | "sedang" | "besar";

/** Status penguasaan per topik */
export type MasteryStatus = "belum" | "sedang" | "dikuasai";

/** Topik pembelajaran */
export type TopicId =
  | "kenali-bangun"
  | "bandingkan"
  | "kelompokkan"
  | "keliling"
  | "luas"
  | "latihan"
  | "permainan";

/** Tahap pembelajaran (UXR-NAV-02) */
export type LearningStage = "lihat" | "coba" | "latihan" | "hasil";

/** Tipe soal (Bab 16.1) */
export type QuestionType = "Q-MC" | "Q-MATCH" | "Q-CLASS" | "Q-SELECT" | "Q-NUM";

/** Tingkat kesulitan */
export type DifficultyLevel = "L1" | "L2" | "L3" | "L4";

/* ------------------------------------------------------------------ */
/*  Primitives                                                         */
/* ------------------------------------------------------------------ */

/** Koordinat 2D */
export interface Point {
  x: number;
  y: number;
}

/* ------------------------------------------------------------------ */
/*  Shape Definitions (Discriminated Union)                            */
/* ------------------------------------------------------------------ */

interface ShapeBase {
  id: string;
  rotation: number;
  fillColor: string;
  strokeColor: string;
}

export interface PersegiDef extends ShapeBase {
  type: "persegi";
  params: { s: number };
}

export interface PersegiPanjangDef extends ShapeBase {
  type: "persegi-panjang";
  params: { p: number; l: number };
}

export interface SegitigaDef extends ShapeBase {
  type: "segitiga";
  params: {
    subType: TriangleSubType;
    a: number; // sisi pertama
    b: number; // sisi kedua
    c: number; // sisi ketiga
  };
}

export interface LingkaranDef extends ShapeBase {
  type: "lingkaran";
  params: { r: number };
}

export type ShapeDefinition =
  | PersegiDef
  | PersegiPanjangDef
  | SegitigaDef
  | LingkaranDef;

/* ------------------------------------------------------------------ */
/*  Derived Properties — dihitung, bukan hardcoded (MATH-10)           */
/* ------------------------------------------------------------------ */

export interface DerivedProperties {
  sideCount: number;
  angleCount: number;
  vertexCount: number;
  hasRightAngle: boolean;
  rightAngleIndices: number[];
  allSidesEqual: boolean;
  oppositeSidesEqual: boolean;
  sideLengths: number[];
  angles: number[];
  perimeter: number;
  area: number;
  vertices: Point[];
}

/* ------------------------------------------------------------------ */
/*  Characteristic Card (FR-07)                                        */
/* ------------------------------------------------------------------ */

export interface ShapeCharacteristic {
  key: string;
  label: string;
  value: string | number;
  iconName: string;
  visualMarker: "tick" | "arc" | "right-angle-box" | "dot" | "none";
}

/* ------------------------------------------------------------------ */
/*  Validation (MATH-01…12)                                            */
/* ------------------------------------------------------------------ */

export interface ValidationResult {
  valid: boolean;
  correctedValue?: number;
  rule?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/** Warna isi yang aman kontras untuk eksplorasi (FR-05) */
export const FILL_COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#F97316",
] as const;

/** Mapping ukuran diskrit → faktor skala */
export const SIZE_SCALE: Record<DiscreteSize, number> = {
  kecil: 0.6,
  sedang: 1.0,
  besar: 1.5,
};
