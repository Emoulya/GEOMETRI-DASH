/**
 * Kamus Istilah Baku (A11Y-06, Bab 17.2)
 *
 * Satu konsep = satu istilah, konsisten di seluruh produk.
 * Slot `signVideoRef` disiapkan untuk Post-MVP (FR-23 / TC-05).
 */

export interface Term {
  id: string;
  label: string;
  iconName: string;
  description: string;
  example: string;
  nonExample?: string;
  signVideoRef?: string;
  animationRef?: string;
}

export const TERMS: Term[] = [
  {
    id: "sisi",
    label: "Sisi",
    iconName: "minus",
    description: "Garis tepi bangun datar",
    example: "Persegi punya 4 sisi",
    nonExample: "Garis di dalam bangun bukan sisi",
  },
  {
    id: "sudut",
    label: "Sudut",
    iconName: "corner-down-right",
    description: "Bukaan antara dua sisi",
    example: "Persegi punya 4 sudut",
    nonExample: "Titik di tengah bukan sudut",
  },
  {
    id: "titik-sudut",
    label: "Titik Sudut",
    iconName: "circle-dot",
    description: "Titik pertemuan dua sisi",
    example: "Segitiga punya 3 titik sudut",
  },
  {
    id: "siku-siku",
    label: "Siku-siku",
    iconName: "square",
    description: "Sudut yang besarnya 90°",
    example: "Pojok persegi adalah sudut siku-siku",
    nonExample: "Sudut lancip bukan siku-siku",
  },
  {
    id: "keliling",
    label: "Keliling",
    iconName: "route",
    description: "Panjang seluruh tepi bangun",
    example: "Keliling persegi = 4 × sisi",
  },
  {
    id: "luas",
    label: "Luas",
    iconName: "grid-3x3",
    description: "Banyak satuan persegi penutup",
    example: "Luas = baris × kolom",
  },
  {
    id: "satuan-persegi",
    label: "Satuan Persegi",
    iconName: "square",
    description: "Kotak kecil pengukur luas",
    example: "Luas = 12 satuan persegi",
  },
  {
    id: "jari-jari",
    label: "Jari-jari",
    iconName: "move-right",
    description: "Garis dari pusat ke tepi lingkaran",
    example: "Jari-jari = setengah diameter",
  },
  {
    id: "diameter",
    label: "Diameter",
    iconName: "move-horizontal",
    description: "Garis melalui pusat lingkaran",
    example: "Diameter = 2 × jari-jari",
  },
];

/** Lookup istilah berdasarkan ID */
export function getTermById(id: string): Term | undefined {
  return TERMS.find((t) => t.id === id);
}
