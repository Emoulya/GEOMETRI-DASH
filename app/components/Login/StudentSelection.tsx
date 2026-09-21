"use client";

import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Users, AlertCircle } from "lucide-react";
import { animateEntry } from "../../animations/loadingAnimations";

export type Student = {
  id: string;
  name: string;
  avatarColor: string;
  pin: string;
};

const AVATAR_HEX_MAP: Record<string, string> = {
  "bg-blue-500": "#3b82f6",
  "bg-pink-500": "#ec4899",
  "bg-green-500": "#22c55e",
  "bg-purple-500": "#a855f7",
  "bg-amber-500": "#f59e0b",
  "bg-emerald-500": "#10b981",
  "bg-rose-500": "#f43f5e",
  "bg-indigo-500": "#6366f1",
};

/**
 * Memastikan class warna Tailwind dipindai compiler dan menyediakan fallback warna hex
 */
export function getAvatarColorClass(colorName?: string): string {
  switch (colorName) {
    case "bg-blue-500":
      return "bg-blue-500";
    case "bg-pink-500":
      return "bg-pink-500";
    case "bg-green-500":
      return "bg-green-500";
    case "bg-purple-500":
      return "bg-purple-500";
    case "bg-amber-500":
      return "bg-amber-500";
    case "bg-emerald-500":
      return "bg-emerald-500";
    case "bg-rose-500":
      return "bg-rose-500";
    case "bg-indigo-500":
      return "bg-indigo-500";
    default:
      return "bg-blue-500";
  }
}

export function getAvatarBgStyle(colorName?: string): React.CSSProperties {
  if (!colorName) return { backgroundColor: "#3b82f6" };
  if (colorName.startsWith("#") || colorName.startsWith("rgb")) {
    return { backgroundColor: colorName };
  }
  const hex = AVATAR_HEX_MAP[colorName];
  if (hex) return { backgroundColor: hex };
  return { backgroundColor: "#3b82f6" };
}

interface StudentSelectionProps {
  onSelectStudent: (student: Student) => void;
}

export default function StudentSelection({ onSelectStudent }: StudentSelectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudents() {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const colRef = collection(db, "students");
        const querySnapshot = await getDocs(colRef);
        const list: Student[] = [];

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            name: data.name || docSnap.id,
            avatarColor: data.avatarColor || "bg-blue-500",
            pin: data.pin || "1111",
          });
        });

        // Urutkan siswa berdasarkan nama
        list.sort((a, b) => a.name.localeCompare(b.name));
        setStudents(list);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Gagal memuat data siswa dari Firebase";
        console.error("Error fetching students from Firestore:", msg);
        setErrorMessage(msg);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudents();
  }, []);

  useEffect(() => {
    return animateEntry(containerRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center w-full max-w-md p-6 sm:p-8 mx-auto space-y-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20"
    >
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex items-center gap-2 text-white/90">
          <Users size={24} className="text-blue-400" />
          <h2 className="text-2xl font-bold tracking-wide text-white drop-shadow-md">
            PILIH SISWA
          </h2>
        </div>
        <p className="text-xs text-white/70">
          Pilih nama akunmu untuk masuk ke pembelajaran geometri
        </p>
      </div>

      {/* Error alert jika gagal fetch dari Firestore */}
      {errorMessage && (
        <div className="w-full p-2.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2">
          <AlertCircle size={15} className="shrink-0 mt-0.5 text-rose-400" />
          <div className="space-y-0.5">
            <p className="font-semibold text-rose-300">Gagal terhubung ke Firebase:</p>
            <p className="text-[11px] leading-relaxed text-rose-200/90">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Student Cards Grid */}
      {isLoading ? (
        <div className="grid w-full grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 animate-pulse h-28"
            >
              <div className="w-14 h-14 mb-3 rounded-full bg-white/10"></div>
              <div className="w-20 h-3 rounded bg-white/10"></div>
            </div>
          ))}
        </div>
      ) : students.length === 0 && !errorMessage ? (
        <p className="text-xs text-white/70 py-4 text-center">
          Belum ada data siswa di database.
        </p>
      ) : (
        <div className="grid w-full grid-cols-2 gap-4">
          {students.map((student) => (
            <button
              key={student.id}
              onClick={() => onSelectStudent(student)}
              className="flex flex-col items-center justify-center p-4 transition-all duration-200 rounded-xl bg-white/5 hover:bg-white/20 active:scale-95 hover:-translate-y-0.5 group focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              aria-label={`Pilih siswa ${student.name}`}
            >
              <div
                style={getAvatarBgStyle(student.avatarColor)}
                className={`w-14 h-14 sm:w-16 sm:h-16 mb-2.5 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform ${getAvatarColorClass(student.avatarColor)}`}
              >
                {student.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-white/95 group-hover:text-white text-center leading-tight">
                {student.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
