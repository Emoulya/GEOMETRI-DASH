import { ShapeType } from "@/lib/geometry/types";

export interface ComparisonPoint {
  characteristicKey: string; 
  label: string; 
  desc1: string; 
  desc2: string;
  iconName: string;
}

export interface ComparisonScenario {
  slug: string;
  title: string;
  description: string;
  shape1: ShapeType;
  shape2: ShapeType;
  similarities: ComparisonPoint[];
  differences: ComparisonPoint[];
}

export const COMPARISON_CATALOG: ComparisonScenario[] = [
  {
    slug: "persegi-vs-segitiga",
    title: "Persegi vs Segitiga",
    description: "Membandingkan persegi dengan segitiga sama sisi untuk melihat perbedaan jumlah sisi dan sudut.",
    shape1: "persegi",
    shape2: "segitiga",
    similarities: [
      {
        characteristicKey: "equalSides",
        label: "Sisi Sama Panjang",
        desc1: "Semua sisi sama panjang",
        desc2: "Semua sisi sama panjang",
        iconName: "equal",
      }
    ],
    differences: [
      {
        characteristicKey: "sideCount",
        label: "Jumlah Sisi",
        desc1: "Memiliki 4 sisi",
        desc2: "Memiliki 3 sisi",
        iconName: "minus",
      },
      {
        characteristicKey: "angleCount",
        label: "Jumlah Sudut",
        desc1: "Memiliki 4 sudut",
        desc2: "Memiliki 3 sudut",
        iconName: "corner-down-right",
      },
      {
        characteristicKey: "rightAngle",
        label: "Sudut Siku-siku",
        desc1: "Memiliki 4 sudut siku-siku",
        desc2: "Tidak ada sudut siku-siku",
        iconName: "square",
      }
    ]
  },
  {
    slug: "persegi-vs-persegi-panjang",
    title: "Persegi vs Persegi Panjang",
    description: "Keduanya memiliki 4 sisi dan sudut siku-siku, tapi apakah panjang sisinya sama?",
    shape1: "persegi",
    shape2: "persegi-panjang",
    similarities: [
      {
        characteristicKey: "sideCount",
        label: "Jumlah Sisi",
        desc1: "Memiliki 4 sisi",
        desc2: "Memiliki 4 sisi",
        iconName: "minus",
      },
      {
        characteristicKey: "angleCount",
        label: "Jumlah Sudut",
        desc1: "Memiliki 4 sudut",
        desc2: "Memiliki 4 sudut",
        iconName: "corner-down-right",
      },
      {
        characteristicKey: "rightAngle",
        label: "Sudut Siku-siku",
        desc1: "Memiliki 4 sudut siku-siku",
        desc2: "Memiliki 4 sudut siku-siku",
        iconName: "square",
      }
    ],
    differences: [
      {
        characteristicKey: "equalSides",
        label: "Sisi Sama Panjang",
        desc1: "Keempat sisinya sama panjang",
        desc2: "Hanya sisi berhadapan yang sama panjang",
        iconName: "equal",
      }
    ]
  },
  {
    slug: "persegi-vs-lingkaran",
    title: "Persegi vs Lingkaran",
    description: "Perbandingan antara bangun yang bersudut dengan bangun bulat yang sempurna.",
    shape1: "persegi",
    shape2: "lingkaran",
    similarities: [],
    differences: [
      {
        characteristicKey: "sideCount",
        label: "Jumlah Sisi",
        desc1: "Memiliki 4 sisi lurus",
        desc2: "Berupa 1 garis lengkung (tidak punya sisi)",
        iconName: "minus",
      },
      {
        characteristicKey: "angleCount",
        label: "Jumlah Sudut",
        desc1: "Memiliki 4 sudut",
        desc2: "Tidak memiliki sudut",
        iconName: "corner-down-right",
      }
    ]
  }
];
