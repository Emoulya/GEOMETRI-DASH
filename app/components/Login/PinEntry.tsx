"use client";

import React, { useState, useEffect, useRef } from "react";
import { Student } from "./StudentSelection";
import { animateEntry } from "../../animations/loadingAnimations";

interface PinEntryProps {
  student: Student;
  onBack: () => void;
  onLoginSuccess: () => void;
}

export default function PinEntry({ student, onBack, onLoginSuccess }: PinEntryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState("");
  const PIN_LENGTH = 4;

  useEffect(() => {
    return animateEntry(containerRef.current);
  }, []);

  const handleKeyPress = (num: number) => {
    if (pin.length < PIN_LENGTH) {
      const newPin = pin + num;
      setPin(newPin);
      
      // Auto login if reached max length (mocking success)
      if (newPin.length === PIN_LENGTH) {
        setTimeout(() => {
          onLoginSuccess();
        }, 500); // give a little delay to show the last dot
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center w-full max-w-sm p-8 mx-auto space-y-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20">
      <div className="flex items-center self-start mb-2 space-x-3 cursor-pointer group" onClick={onBack}>
        <div className="transition-colors text-white/60 group-hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${student.avatarColor}`}>
            {student.name.charAt(0)}
          </div>
          <span className="text-sm text-white/90">{student.name}</span>
        </div>
      </div>

      <h2 className="text-xl font-bold tracking-wide text-white drop-shadow-md">
        MASUKKAN PIN
      </h2>

      {/* Pin Dots */}
      <div className="flex py-4 space-x-4">
        {Array.from({ length: PIN_LENGTH }).map((_, idx) => (
          <div
            key={idx}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              idx < pin.length ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Numpad */}
      <div className="grid w-full grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleKeyPress(num)}
            className="flex items-center justify-center text-2xl font-semibold text-white transition-colors rounded-full h-14 bg-white/5 hover:bg-white/20 active:bg-white/30"
          >
            {num}
          </button>
        ))}
        <div className="h-14"></div> {/* empty space for 0 */}
        <button
          onClick={() => handleKeyPress(0)}
          className="flex items-center justify-center text-2xl font-semibold text-white transition-colors rounded-full h-14 bg-white/5 hover:bg-white/20 active:bg-white/30"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center justify-center text-xl transition-colors rounded-full text-white/80 hover:text-white h-14 bg-white/5 hover:bg-white/20 active:bg-white/30"
        >
          Del
        </button>
      </div>
    </div>
  );
}
