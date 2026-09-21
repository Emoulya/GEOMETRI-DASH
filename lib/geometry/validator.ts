/**
 * Geometry Validator — Penjaga MATH-01…12
 *
 * Setiap transformasi (skala, rotasi, perubahan parameter) melewati validator.
 * Pelanggaran ditolak diam-diam — siswa tidak melihat pesan error teknis.
 * Nilai dikembalikan ke terakhir yang valid.
 */

import type {
  ShapeDefinition,
  ShapeType,
  PersegiPanjangDef,
  SegitigaDef,
  ValidationResult,
} from "./types";

/* ================================================================== */
/*  MATH-01: Persegi & lingkaran hanya skala uniform (sx = sy)         */
/* ================================================================== */

export function validateUniformScale(
  type: ShapeType,
  scaleX: number,
  scaleY: number,
): ValidationResult {
  if (type === "persegi" || type === "lingkaran") {
    if (Math.abs(scaleX - scaleY) > 0.001) {
      return {
        valid: false,
        correctedValue: Math.min(scaleX, scaleY),
        rule: "MATH-01",
      };
    }
  }
  return { valid: true };
}

/* ================================================================== */
/*  MATH-02: Persegi panjang rasio sisi ≥ 1.25:1                       */
/* ================================================================== */

const MIN_RECT_RATIO = 1.25;

export function validateRectangleRatio(
  p: number,
  l: number,
): ValidationResult {
  const longer = Math.max(p, l);
  const shorter = Math.min(p, l);

  if (shorter <= 0 || longer <= 0) {
    return { valid: false, correctedValue: MIN_RECT_RATIO, rule: "MATH-02" };
  }

  const ratio = longer / shorter;

  if (ratio < MIN_RECT_RATIO) {
    // Koreksi: perbesar yang panjang agar rasio tercapai
    const correctedLonger = Math.ceil(shorter * MIN_RECT_RATIO);
    return {
      valid: false,
      correctedValue: correctedLonger,
      rule: "MATH-02",
    };
  }

  return { valid: true };
}

/* ================================================================== */
/*  MATH-03: Sudut siku-siku harus tepat 90°                          */
/* ================================================================== */

export function validateRightAngle(angleDegrees: number): ValidationResult {
  if (Math.abs(angleDegrees - 90) > 0.01) {
    return { valid: false, correctedValue: 90, rule: "MATH-03" };
  }
  return { valid: true };
}

/* ================================================================== */
/*  MATH-04: Segitiga yang diskalakan harus mempertahankan jenisnya    */
/* ================================================================== */

export function validateTriangleType(
  original: SegitigaDef,
  modified: SegitigaDef,
): ValidationResult {
  if (original.params.subType !== modified.params.subType) {
    return { valid: false, rule: "MATH-04" };
  }

  // Validasi tambahan per sub-jenis
  const { subType, a, b, c } = modified.params;

  switch (subType) {
    case "sama-sisi":
      if (a !== b || b !== c) {
        return { valid: false, correctedValue: a, rule: "MATH-04" };
      }
      break;
    case "sama-kaki":
      if (b !== c) {
        return { valid: false, correctedValue: b, rule: "MATH-04" };
      }
      break;
    case "siku-siku": {
      // Periksa apakah masih membentuk segitiga siku-siku (a² + b² ≈ c²)
      const hyp = Math.sqrt(a * a + b * b);
      if (Math.abs(hyp - c) > 0.01) {
        return {
          valid: false,
          correctedValue: Math.round(hyp * 100) / 100,
          rule: "MATH-04",
        };
      }
      break;
    }
  }

  return { valid: true };
}

/* ================================================================== */
/*  MATH-07: Grid luas hanya dimensi bilangan bulat                    */
/* ================================================================== */

export function validateIntegerDimensions(value: number): ValidationResult {
  if (!Number.isInteger(value) || value <= 0) {
    return {
      valid: false,
      correctedValue: Math.max(1, Math.round(value)),
      rule: "MATH-07",
    };
  }
  return { valid: true };
}

/* ================================================================== */
/*  MATH-08: Dilarang perspektif, bayangan 3D, gradien tebal           */
/*  (Ini divalidasi di level render/CSS, bukan di sini)                */
/* ================================================================== */

/* ================================================================== */
/*  MATH-12: Lingkaran bukan poligon — tidak punya titik sudut         */
/* ================================================================== */

export function validateCircleIsNotPolygon(type: ShapeType): boolean {
  return type !== "lingkaran";
}

/* ================================================================== */
/*  Composite Validator                                                */
/* ================================================================== */

export interface TransformParams {
  newScaleX?: number;
  newScaleY?: number;
  newP?: number;
  newL?: number;
  newRotation?: number;
}

/**
 * Validasi menyeluruh terhadap transformasi yang akan diterapkan.
 * Mengembalikan parameter yang sudah dikoreksi bila ada pelanggaran.
 */
export function validateTransform(
  shape: ShapeDefinition,
  transform: TransformParams,
): { valid: boolean; corrected: TransformParams; violations: string[] } {
  const violations: string[] = [];
  const corrected = { ...transform };

  // MATH-01: Skala uniform untuk persegi & lingkaran
  if (transform.newScaleX !== undefined && transform.newScaleY !== undefined) {
    const result = validateUniformScale(
      shape.type,
      transform.newScaleX,
      transform.newScaleY,
    );
    if (!result.valid) {
      violations.push(result.rule!);
      corrected.newScaleX = result.correctedValue;
      corrected.newScaleY = result.correctedValue;
    }
  }

  // MATH-02: Rasio persegi panjang
  if (shape.type === "persegi-panjang") {
    const p = transform.newP ?? (shape as PersegiPanjangDef).params.p;
    const l = transform.newL ?? (shape as PersegiPanjangDef).params.l;
    const result = validateRectangleRatio(p, l);
    if (!result.valid) {
      violations.push(result.rule!);
      corrected.newP = result.correctedValue;
    }
  }

  return {
    valid: violations.length === 0,
    corrected,
    violations,
  };
}

/**
 * Validasi apakah suatu bangun valid secara keseluruhan.
 * Dijalankan setelah setiap perubahan parameter.
 */
export function validateShape(shape: ShapeDefinition): {
  valid: boolean;
  violations: string[];
} {
  const violations: string[] = [];

  // Validasi umum: parameter positif
  switch (shape.type) {
    case "persegi":
      if (shape.params.s <= 0) violations.push("PARAM-POSITIVE");
      break;
    case "persegi-panjang": {
      if (shape.params.p <= 0 || shape.params.l <= 0)
        violations.push("PARAM-POSITIVE");
      const ratioResult = validateRectangleRatio(shape.params.p, shape.params.l);
      if (!ratioResult.valid) violations.push("MATH-02");
      break;
    }
    case "segitiga": {
      const { a, b, c } = shape.params;
      if (a <= 0 || b <= 0 || c <= 0) violations.push("PARAM-POSITIVE");
      // Triangle inequality
      if (a + b <= c || a + c <= b || b + c <= a) {
        violations.push("TRIANGLE-INEQUALITY");
      }
      break;
    }
    case "lingkaran":
      if (shape.params.r <= 0) violations.push("PARAM-POSITIVE");
      break;
  }

  return { valid: violations.length === 0, violations };
}
