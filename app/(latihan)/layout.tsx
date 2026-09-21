import Header from "@/components/ui/Header";

/**
 * Layout untuk route group (latihan):
 * /latihan, /permainan
 */
export default function LatihanLayout({
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
