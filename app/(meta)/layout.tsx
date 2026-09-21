import Header from "@/components/ui/Header";

/**
 * Layout untuk route group (meta):
 * /progress, /kamus, /pengaturan
 */
export default function MetaLayout({
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
