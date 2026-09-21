"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { type Student, getAvatarBgStyle, getAvatarColorClass } from "./StudentSelection";
import { animateEntry } from "../../animations/loadingAnimations";
import { ArrowLeft, CheckCircle2, AlertCircle, Delete, KeyRound } from "lucide-react";

interface PinEntryProps {
  student: Student;
  onBack: () => void;
  onLoginSuccess: (student: Student) => void;
}

export default function PinEntry({ student, onBack, onLoginSuccess }: PinEntryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const PIN_LENGTH = 4;

  useEffect(() => {
    return animateEntry(containerRef.current);
  }, []);

  const triggerShake = () => {
    if (dotsContainerRef.current) {
      dotsContainerRef.current.classList.add("animate-shake");
      setTimeout(() => {
        dotsContainerRef.current?.classList.remove("animate-shake");
      }, 500);
    }
  };

  const handleVerify = useCallback(
    (fullPin: string) => {
      setStatus("verifying");
      setErrorMessage("");

      // Verifikasi terhadap PIN yang berasal dari Firebase Firestore
      const isCorrect = student.pin === fullPin;

      if (isCorrect) {
        setStatus("success");
        setTimeout(() => {
          onLoginSuccess(student);
        }, 450);
      } else {
        setStatus("error");
        setErrorMessage("PIN salah! Coba lagi");
        triggerShake();

        setTimeout(() => {
          setPin("");
          setStatus("idle");
        }, 900);
      }
    },
    [student, onLoginSuccess]
  );

  const handleKeyPress = useCallback(
    (num: number) => {
      if (status === "verifying" || status === "success") return;

      if (pin.length < PIN_LENGTH) {
        const newPin = pin + num;
        setPin(newPin);

        if (newPin.length === PIN_LENGTH) {
          handleVerify(newPin);
        }
      }
    },
    [pin, status, handleVerify]
  );

  const handleDelete = useCallback(() => {
    if (status === "verifying" || status === "success") return;
    setPin((prev) => prev.slice(0, -1));
    setStatus("idle");
    setErrorMessage("");
  }, [status]);

  // Dukungan input keyboard fisik
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleKeyPress(parseInt(e.key, 10));
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (e.key === "Escape") {
        onBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress, handleDelete, onBack]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center w-full max-w-sm p-6 sm:p-8 mx-auto space-y-5 rounded-2xl bg-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20"
    >
      {/* Tombol Kembali & Info Siswa */}
      <div className="flex items-center justify-between w-full pb-2 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Kembali ke pemilihan siswa"
        >
          <ArrowLeft size={16} />
          <span>Ganti Siswa</span>
        </button>

        <div className="flex items-center gap-2">
          <div
            style={getAvatarBgStyle(student.avatarColor)}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${getAvatarColorClass(student.avatarColor)}`}
          >
            {student.name.charAt(0)}
          </div>
          <span className="text-xs font-semibold text-white/90 truncate max-w-[130px]">
            {student.name}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-1 text-center">
        <div className="flex items-center gap-2 text-white">
          <KeyRound size={20} className="text-amber-400" />
          <h2 className="text-xl font-bold tracking-wide drop-shadow-md">
            MASUKKAN PIN
          </h2>
        </div>
        <p className="text-xs text-white/70">
          Ketik 4 digit PIN akunmu
        </p>
      </div>

      {/* Pin Dots */}
      <div
        ref={dotsContainerRef}
        className="flex items-center justify-center py-2 space-x-4 transition-transform"
      >
        {Array.from({ length: PIN_LENGTH }).map((_, idx) => {
          const isFilled = idx < pin.length;
          let dotColorClass = "bg-white/20";

          if (status === "success") {
            dotColorClass = "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] scale-110";
          } else if (status === "error") {
            dotColorClass = "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.9)]";
          } else if (isFilled) {
            dotColorClass = "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]";
          }

          return (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${dotColorClass}`}
            />
          );
        })}
      </div>

      {/* Status Feedback (Visual untuk Tunarungu) */}
      <div className="h-6 flex items-center justify-center text-center">
        {status === "verifying" && (
          <span className="text-xs text-blue-300 font-medium animate-pulse">
            Memverifikasi PIN...
          </span>
        )}
        {status === "success" && (
          <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
            <CheckCircle2 size={15} />
            PIN Benar! Membuka materi...
          </span>
        )}
        {status === "error" && (
          <span className="flex items-center gap-1 text-xs text-rose-400 font-semibold">
            <AlertCircle size={15} />
            {errorMessage || "PIN salah! Silakan coba lagi."}
          </span>
        )}
      </div>

      {/* Numpad */}
      <div className="grid w-full grid-cols-3 gap-3 pt-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleKeyPress(num)}
            disabled={status === "verifying" || status === "success"}
            className="flex items-center justify-center text-xl font-semibold text-white transition-all rounded-xl h-13 bg-white/5 hover:bg-white/20 active:scale-95 active:bg-white/30 border border-white/10 disabled:opacity-50 cursor-pointer"
            aria-label={`Angka ${num}`}
          >
            {num}
          </button>
        ))}

        <div className="h-13"></div>

        <button
          type="button"
          onClick={() => handleKeyPress(0)}
          disabled={status === "verifying" || status === "success"}
          className="flex items-center justify-center text-xl font-semibold text-white transition-all rounded-xl h-13 bg-white/5 hover:bg-white/20 active:scale-95 active:bg-white/30 border border-white/10 disabled:opacity-50 cursor-pointer"
          aria-label="Angka 0"
        >
          0
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={status === "verifying" || status === "success" || pin.length === 0}
          className="flex items-center justify-center text-sm font-medium transition-all rounded-xl text-white/80 hover:text-white h-13 bg-white/5 hover:bg-white/20 active:scale-95 active:bg-white/30 border border-white/10 disabled:opacity-30 cursor-pointer"
          aria-label="Hapus digit"
        >
          <Delete size={20} />
        </button>
      </div>
    </div>
  );
}
