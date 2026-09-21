"use client";

/**
 * Dashboard — Halaman utama setelah login
 *
 * Grid topik besar berisi ikon + label (UXR-NAV-04).
 * Tanpa teks pengantar yang panjang.
 */

import {
  Shapes,
  GitCompareArrows,
  LayoutGrid,
  Route,
  Grid3X3,
  Gamepad2,
  PenTool,
  TrendingUp,
  LogOut,
} from "lucide-react";
import TopicCard from "./TopicCard";
import Header from "@/components/ui/Header";
import { useProgress } from "@/lib/stores/progress";
import { type Student, getAvatarBgStyle, getAvatarColorClass } from "@/app/components/Login/StudentSelection";

interface DashboardProps {
  studentName?: string;
  student?: Student | null;
  onLogout?: () => void;
}

export default function Dashboard({ studentName, student, onLogout }: DashboardProps) {
  const { getTopicStatus } = useProgress();

  const topics = [
    {
      href: "/bangun",
      title: "Kenali Bangun",
      description: "Lihat dan pelajari 4 bangun datar",
      icon: <Shapes size={32} strokeWidth={2} />,
      iconBgColor: "#3B82F6",
      topicId: "kenali-bangun" as const,
    },
    {
      href: "/bandingkan",
      title: "Bandingkan",
      description: "Temukan persamaan dan perbedaan",
      icon: <GitCompareArrows size={32} strokeWidth={2} />,
      iconBgColor: "#8B5CF6",
      topicId: "bandingkan" as const,
    },
    {
      href: "/kelompokkan",
      title: "Kelompokkan",
      description: "Sortir bangun ke kelompoknya",
      icon: <LayoutGrid size={32} strokeWidth={2} />,
      iconBgColor: "#EC4899",
      topicId: "kelompokkan" as const,
    },
    {
      href: "/keliling",
      title: "Keliling",
      description: "Jelajahi tepi bangun datar",
      icon: <Route size={32} strokeWidth={2} />,
      iconBgColor: "#0D9488",
      topicId: "keliling" as const,
    },
    {
      href: "/luas",
      title: "Luas",
      description: "Hitung petak penutup bangun",
      icon: <Grid3X3 size={32} strokeWidth={2} />,
      iconBgColor: "#E85D75",
      topicId: "luas" as const,
    },
    {
      href: "/permainan",
      title: "Permainan",
      description: "Belajar sambil bermain",
      icon: <Gamepad2 size={32} strokeWidth={2} />,
      iconBgColor: "#F59E0B",
      topicId: "permainan" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-1">
              {student && (
                <div
                  style={getAvatarBgStyle(student.avatarColor)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-base font-bold shadow-sm ${getAvatarColorClass(student.avatarColor)}`}
                >
                  {student.name.charAt(0)}
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                {studentName ? `Halo, ${studentName}!` : "Halo!"}
              </h1>
            </div>
            <p className="text-text-secondary">Pilih topik untuk mulai belajar</p>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2 text-sm font-medium text-text-secondary hover:text-text-primary bg-white border border-ui-border rounded-xl hover:bg-bg-tertiary transition-colors shadow-xs cursor-pointer self-center sm:self-auto"
              title="Keluar dan ganti akun siswa"
            >
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          )}
        </div>

        {/* Topic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {topics.map((topic) => (
            <TopicCard
              key={topic.href}
              href={topic.href}
              title={topic.title}
              description={topic.description}
              icon={topic.icon}
              iconBgColor={topic.iconBgColor}
              status={getTopicStatus(topic.topicId)}
            />
          ))}
        </div>

        {/* Secondary links */}
        <div className="flex flex-wrap justify-center gap-3">
          <SecondaryLink href="/latihan" icon={<PenTool size={18} />} label="Latihan" />
          <SecondaryLink href="/progress" icon={<TrendingUp size={18} />} label="Kemajuan" />
        </div>
      </main>
    </div>
  );
}

function SecondaryLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  // Using <a> with href for simplicity in this non-Link context
  return (
    <a
      href={href}
      className={[
        "inline-flex items-center gap-2 px-4 py-2.5",
        "text-sm font-medium text-text-secondary",
        "bg-white border border-ui-border rounded-xl",
        "hover:border-ui-accent/40 hover:text-ui-accent",
        "transition-colors duration-150",
      ].join(" ")}
    >
      {icon}
      {label}
    </a>
  );
}
