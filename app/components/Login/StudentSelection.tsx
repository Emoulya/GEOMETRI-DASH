"use client";

import React, { useEffect, useRef } from "react";
import { animateEntry } from "../../animations/loadingAnimations";

export type Student = {
  id: string;
  name: string;
  avatarColor: string;
};

const MOCK_STUDENTS: Student[] = [
  { id: "1", name: "Budi Santoso", avatarColor: "bg-blue-500" },
  { id: "2", name: "Siti Aminah", avatarColor: "bg-pink-500" },
  { id: "3", name: "Agus Pratama", avatarColor: "bg-green-500" },
  { id: "4", name: "Rina Sari", avatarColor: "bg-purple-500" },
];

interface StudentSelectionProps {
  onSelectStudent: (student: Student) => void;
}

export default function StudentSelection({ onSelectStudent }: StudentSelectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return animateEntry(containerRef.current);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center w-full max-w-md p-8 mx-auto space-y-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20">
      <h2 className="text-2xl font-bold tracking-wide text-white drop-shadow-md">
        PILIH SISWA
      </h2>
      <div className="grid w-full grid-cols-2 gap-4">
        {MOCK_STUDENTS.map((student) => (
          <button
            key={student.id}
            onClick={() => onSelectStudent(student)}
            className="flex flex-col items-center justify-center p-4 transition-all duration-300 rounded-xl bg-white/5 hover:bg-white/20 hover:-translate-y-1 group"
          >
            <div className={`w-16 h-16 mb-3 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform ${student.avatarColor}`}>
              {student.name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-white/90">{student.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
