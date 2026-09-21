import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GeoVisual — Belajar Geometri Bangun Datar",
  description:
    "Media belajar geometri bangun datar interaktif untuk siswa tunarungu. Belajar persegi, persegi panjang, segitiga, dan lingkaran melalui pengalaman visual.",
  keywords: [
    "geometri",
    "bangun datar",
    "tunarungu",
    "belajar matematika",
    "interaktif",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
