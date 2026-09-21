import Header from "@/components/ui/Header";

/**
 * Layout untuk route group (belajar):
 * /bangun, /bandingkan, /kelompokkan, /keliling, /luas
 */
export default function BelajarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
