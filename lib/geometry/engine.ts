/**
 * Geometry Engine — Sumber Kebenaran Tunggal (TC-03 / TC-04)
 *
 * ShapeDefinition → semua properti turunan (sisi, sudut, keliling, luas).
 * Jawaban soal, label, dan visualisasi semuanya dihitung dari sini.
 * Tidak ada data manual — mencegah gambar ≠ jawaban (MATH-10).
 */

import type {
  ShapeDefinition,
  ShapeType,
  PersegiDef,
  PersegiPanjangDef,
  SegitigaDef,
  LingkaranDef,
  DerivedProperties,
  ShapeCharacteristic,
  Point,
  DiscreteSize,
  SIZE_SCALE,
} from "./types";

/* ================================================================== */
/*  Factory                                                            */
/* ================================================================== */

let idCounter = 0;

export function createShape<T extends ShapeType>(
  type: T,
  params: Extract<ShapeDefinition, { type: T }>["params"],
  options?: Partial<Pick<ShapeDefinition, "id" | "rotation" | "fillColor" | "strokeColor">>,
): Extract<ShapeDefinition, { type: T }> {
  return {
    id: options?.id ?? `${type}-${++idCounter}`,
    type,
    params,
    rotation: options?.rotation ?? 0,
    fillColor: options?.fillColor ?? "#3B82F6",
    strokeColor: options?.strokeColor ?? "#1E3A5F",
  } as Extract<ShapeDefinition, { type: T }>;
}

/* ================================================================== */
/*  Vertices — posisi titik sudut relatif terhadap pusat (0,0)         */
/*  Koordinat SVG: y positif ke bawah                                  */
/* ================================================================== */

export function getVertices(shape: ShapeDefinition): Point[] {
  switch (shape.type) {
    case "persegi":
      return getPersegiVertices(shape);
    case "persegi-panjang":
      return getPersegiPanjangVertices(shape);
    case "segitiga":
      return getSegitigaVertices(shape);
    case "lingkaran":
      return [];
  }
}

function getPersegiVertices(shape: PersegiDef): Point[] {
  const half = shape.params.s / 2;
  return [
    { x: -half, y: -half },
    { x: half, y: -half },
    { x: half, y: half },
    { x: -half, y: half },
  ];
}

function getPersegiPanjangVertices(shape: PersegiPanjangDef): Point[] {
  const halfP = shape.params.p / 2;
  const halfL = shape.params.l / 2;
  return [
    { x: -halfP, y: -halfL },
    { x: halfP, y: -halfL },
    { x: halfP, y: halfL },
    { x: -halfP, y: halfL },
  ];
}

function getSegitigaVertices(shape: SegitigaDef): Point[] {
  const { subType, a, b } = shape.params;

  switch (subType) {
    case "sama-sisi": {
      const h = (a * Math.sqrt(3)) / 2;
      const cy = h / 2; // Visual center: bounding box centered agar titik sudut atas tidak terpotong
      return [
        { x: -a / 2, y: cy },
        { x: a / 2, y: cy },
        { x: 0, y: cy - h },
      ];
    }
    case "sama-kaki": {
      const h = Math.sqrt(b * b - (a / 2) * (a / 2));
      const cy = h / 2;
      return [
        { x: -a / 2, y: cy },
        { x: a / 2, y: cy },
        { x: 0, y: cy - h },
      ];
    }
    case "siku-siku": {
      // a = alas (horizontal), b = tinggi (vertical)
      // Sudut siku-siku di titik kiri bawah, bounding box centered
      const cx = a / 2;
      const cy = b / 2;
      return [
        { x: -cx, y: cy },           // sudut siku-siku
        { x: a - cx, y: cy },        // kanan bawah
        { x: -cx, y: cy - b },       // kiri atas
      ];
    }
  }
}

/* ================================================================== */
/*  SVG Path                                                           */
/* ================================================================== */

export function getSVGPath(shape: ShapeDefinition): string {
  if (shape.type === "lingkaran") {
    return ""; // lingkaran menggunakan elemen <circle>, bukan path
  }

  const verts = getVertices(shape);
  if (verts.length === 0) return "";

  const parts = verts.map((v, i) =>
    i === 0 ? `M ${v.x} ${v.y}` : `L ${v.x} ${v.y}`,
  );
  parts.push("Z");
  return parts.join(" ");
}

/* ================================================================== */
/*  Derived Properties (MATH-10)                                       */
/* ================================================================== */

export function deriveProperties(shape: ShapeDefinition): DerivedProperties {
  switch (shape.type) {
    case "persegi":
      return derivePersegiProps(shape);
    case "persegi-panjang":
      return derivePersegiPanjangProps(shape);
    case "segitiga":
      return deriveSegitigaProps(shape);
    case "lingkaran":
      return deriveLingkaranProps(shape);
  }
}

function derivePersegiProps(shape: PersegiDef): DerivedProperties {
  const { s } = shape.params;
  const vertices = getVertices(shape);
  return {
    sideCount: 4,
    angleCount: 4,
    vertexCount: 4,
    hasRightAngle: true,
    rightAngleIndices: [0, 1, 2, 3],
    allSidesEqual: true,
    oppositeSidesEqual: true,
    sideLengths: [s, s, s, s],
    angles: [90, 90, 90, 90],
    perimeter: 4 * s,
    area: s * s,
    vertices,
  };
}

function derivePersegiPanjangProps(shape: PersegiPanjangDef): DerivedProperties {
  const { p, l } = shape.params;
  const vertices = getVertices(shape);
  return {
    sideCount: 4,
    angleCount: 4,
    vertexCount: 4,
    hasRightAngle: true,
    rightAngleIndices: [0, 1, 2, 3],
    allSidesEqual: false,
    oppositeSidesEqual: true,
    sideLengths: [p, l, p, l],
    angles: [90, 90, 90, 90],
    perimeter: 2 * (p + l),
    area: p * l,
    vertices,
  };
}

function deriveSegitigaProps(shape: SegitigaDef): DerivedProperties {
  const { subType, a, b, c } = shape.params;
  const vertices = getVertices(shape);
  const sideLengths = [a, b, c];
  const perimeter = a + b + c;

  // Hitung sudut menggunakan hukum kosinus
  const angles = computeTriangleAngles(a, b, c);
  const hasRightAngle = subType === "siku-siku";
  const rightAngleIndices = hasRightAngle ? [0] : []; // sudut siku-siku di indeks 0
  const allSidesEqual = subType === "sama-sisi";

  // Luas menggunakan rumus Heron
  const s = perimeter / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  return {
    sideCount: 3,
    angleCount: 3,
    vertexCount: 3,
    hasRightAngle,
    rightAngleIndices,
    allSidesEqual,
    oppositeSidesEqual: false,
    sideLengths,
    angles,
    perimeter,
    area: Math.round(area * 100) / 100,
    vertices,
  };
}

function deriveLingkaranProps(shape: LingkaranDef): DerivedProperties {
  const { r } = shape.params;
  return {
    sideCount: 0,   // OQ-06: pendekatan konservatif, lingkaran tidak punya sisi
    angleCount: 0,
    vertexCount: 0,
    hasRightAngle: false,
    rightAngleIndices: [],
    allSidesEqual: false,
    oppositeSidesEqual: false,
    sideLengths: [],
    angles: [],
    perimeter: 2 * Math.PI * r,   // dihitung tapi tidak ditampilkan di MVP
    area: Math.PI * r * r,         // dihitung tapi tidak ditampilkan di MVP
    vertices: [],
  };
}

function computeTriangleAngles(a: number, b: number, c: number): number[] {
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  // Sudut berhadapan dengan sisi a (di titik sudut indeks 2)
  const angleA = toDeg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
  // Sudut berhadapan dengan sisi b (di titik sudut indeks 0)
  const angleB = toDeg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
  // Sudut berhadapan dengan sisi c (di titik sudut indeks 1)
  const angleC = 180 - angleA - angleB;

  return [
    Math.round(angleB * 100) / 100,
    Math.round(angleC * 100) / 100,
    Math.round(angleA * 100) / 100,
  ];
}

/* ================================================================== */
/*  Characteristics (FR-07)                                            */
/* ================================================================== */

export function getCharacteristics(shape: ShapeDefinition): ShapeCharacteristic[] {
  const props = deriveProperties(shape);
  const chars: ShapeCharacteristic[] = [];

  if (shape.type !== "lingkaran") {
    chars.push({
      key: "sideCount",
      label: "Jumlah Sisi",
      value: props.sideCount,
      iconName: "minus",
      visualMarker: "tick",
    });

    chars.push({
      key: "angleCount",
      label: "Jumlah Sudut",
      value: props.angleCount,
      iconName: "corner-down-right",
      visualMarker: "arc",
    });
  }

  if (props.hasRightAngle) {
    chars.push({
      key: "rightAngle",
      label: "Sudut Siku-siku",
      value: `${props.rightAngleIndices.length} sudut`,
      iconName: "square",
      visualMarker: "right-angle-box",
    });
  }

  if (props.allSidesEqual && shape.type !== "lingkaran") {
    chars.push({
      key: "equalSides",
      label: "Sisi Sama Panjang",
      value: `${props.sideCount} sisi`,
      iconName: "equal",
      visualMarker: "tick",
    });
  }

  if (props.oppositeSidesEqual && !props.allSidesEqual) {
    chars.push({
      key: "oppositeSides",
      label: "Sisi Berhadapan Sama",
      value: "2 pasang",
      iconName: "move-horizontal",
      visualMarker: "tick",
    });
  }

  if (shape.type === "lingkaran") {
    chars.push({
      key: "radius",
      label: "Jari-jari",
      value: `${(shape as LingkaranDef).params.r} cm`,
      iconName: "move-right",
      visualMarker: "none",
    });

    chars.push({
      key: "diameter",
      label: "Diameter",
      value: `${(shape as LingkaranDef).params.r * 2} cm`,
      iconName: "move-horizontal",
      visualMarker: "none",
    });
  }

  return chars;
}

/* ================================================================== */
/*  Display Helpers                                                    */
/* ================================================================== */

const SHAPE_NAMES: Record<ShapeType, string> = {
  persegi: "Persegi",
  "persegi-panjang": "Persegi Panjang",
  segitiga: "Segitiga",
  lingkaran: "Lingkaran",
};

export function getShapeName(type: ShapeType): string {
  return SHAPE_NAMES[type];
}

export function getShapeSlug(type: ShapeType): string {
  return type;
}

/** Menerapkan ukuran diskrit ke parameter bangun */
export function applyDiscreteSize(
  shape: ShapeDefinition,
  size: DiscreteSize,
): ShapeDefinition {
  const factor = { kecil: 0.6, sedang: 1.0, besar: 1.5 }[size];

  switch (shape.type) {
    case "persegi": {
      const baseS = shape.params.s;
      return { ...shape, params: { s: Math.round(baseS * factor) || 1 } };
    }
    case "persegi-panjang": {
      const { p, l } = shape.params;
      return {
        ...shape,
        params: {
          p: Math.round(p * factor) || 2,
          l: Math.round(l * factor) || 1,
        },
      };
    }
    case "segitiga": {
      const { subType, a, b, c } = shape.params;
      return {
        ...shape,
        params: {
          subType,
          a: Math.round(a * factor) || 1,
          b: Math.round(b * factor) || 1,
          c: Math.round(c * factor) || 1,
        },
      };
    }
    case "lingkaran": {
      const baseR = shape.params.r;
      return { ...shape, params: { r: Math.round(baseR * factor) || 1 } };
    }
  }
}
