"use client";

import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import StudentSelection from "./components/Login/StudentSelection";
import PinEntry from "./components/Login/PinEntry";
import Dashboard from "@/components/home/Dashboard";
import type { Student } from "./components/Login/StudentSelection";

type AppState = "LOADING" | "SELECT_STUDENT" | "ENTER_PIN" | "HOME";

const STUDENT_STORAGE_KEY = "geovisual_student";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("LOADING");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Cek login state dari localStorage saat mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STUDENT_STORAGE_KEY);
      if (saved) {
        const student = JSON.parse(saved) as Student;
        setSelectedStudent(student);
        setAppState("HOME");
      }
    } catch {
      // localStorage tidak tersedia → lanjut flow normal
    }
  }, []);

  const handleLoadingComplete = () => {
    try {
      const saved = localStorage.getItem(STUDENT_STORAGE_KEY);
      if (saved) {
        const student = JSON.parse(saved) as Student;
        setSelectedStudent(student);
        setAppState("HOME");
        return;
      }
    } catch {
      // abaikan
    }
    setAppState("SELECT_STUDENT");
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setAppState("ENTER_PIN");
  };

  const handleLoginSuccess = (student?: Student) => {
    const activeStudent = student || selectedStudent;
    if (activeStudent) {
      setSelectedStudent(activeStudent);
      try {
        localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(activeStudent));
      } catch {
        // abaikan
      }
    }
    setAppState("HOME");
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(STUDENT_STORAGE_KEY);
    } catch {
      // abaikan
    }
    setSelectedStudent(null);
    setAppState("SELECT_STUDENT");
  };

  // ======================================================================
  // State: HOME — Tampilkan Dashboard dengan tema baru PRD
  // ======================================================================
  if (appState === "HOME") {
    return (
      <Dashboard
        studentName={selectedStudent?.name}
        student={selectedStudent}
        onLogout={handleLogout}
      />
    );
  }

  // ======================================================================
  // State: LOADING / SELECT_STUDENT / ENTER_PIN — Login flow
  // ======================================================================
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-linear-to-b from-[#0B0F19] via-[#1A2645] to-[#121A2F]">

      {/* Background Stars */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-1 h-1 bg-white rounded-full top-[10%] left-[20%] opacity-70 animate-pulse"></div>
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-[25%] left-[80%] opacity-50 animate-pulse delay-75"></div>
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full top-[40%] left-[10%] opacity-90 animate-pulse delay-150"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-[15%] left-[60%] opacity-40 animate-pulse delay-300"></div>
        <div className="absolute w-2 h-2 bg-blue-200 rounded-full top-[50%] left-[85%] opacity-60 animate-pulse delay-500 blur-[1px]"></div>
      </div>

      {/* Decorative Bottom landscape */}
      <div className="absolute bottom-0 w-full h-[35vh] z-10 opacity-80 pointer-events-none">
        <div className="absolute bottom-0 w-full h-[60%] bg-[#0B132B] rounded-t-[100%] scale-x-150 translate-y-[20%] blur-[2px]"></div>
        <div className="absolute bottom-0 w-full h-[40%] bg-[#060C1F] rounded-t-[100%] scale-x-110 translate-y-[10%]"></div>
      </div>

      {/* Planet */}
      <div
        className={`absolute z-20 flex items-center justify-center transition-all duration-1500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${appState === "LOADING"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 mt-[-5vh]"
            : "top-[10%] left-1/2 -translate-x-1/2 scale-[0.6] md:top-1/2 md:left-[75%] md:-translate-x-1/2 md:-translate-y-1/2 md:scale-100"
          }
        `}
      >
        <div className="relative flex items-center justify-center w-70 h-70 rounded-full bg-linear-to-br from-[#E2E8F0] via-[#94A3B8] to-[#475569] shadow-[0_0_80px_rgba(148,163,184,0.3),inset_-20px_-20px_40px_rgba(15,23,42,0.5)] overflow-hidden">
          <div className="absolute top-[15%] left-[20%] w-16 h-20 rounded-full bg-[#64748B]/30 blur-[2px] shadow-[inset_2px_4px_8px_rgba(15,23,42,0.3)]"></div>
          <div className="absolute top-[40%] right-[15%] w-24 h-28 rounded-full bg-[#64748B]/20 blur-[3px] shadow-[inset_3px_5px_10px_rgba(15,23,42,0.2)]"></div>
          <div className="absolute bottom-[20%] left-[30%] w-12 h-10 rounded-full bg-[#64748B]/40 blur-[1px] shadow-[inset_1px_2px_5px_rgba(15,23,42,0.4)]"></div>
          <div className="absolute inset-0 bg-blue-300/10 rounded-full mix-blend-overlay"></div>
        </div>
      </div>

      {/* Login Forms */}
      {appState !== "LOADING" && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-6xl px-4 flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/2 h-full flex items-center justify-center mt-[20vh] md:mt-0 pointer-events-auto">
              <div className="w-full">
                {appState === "SELECT_STUDENT" && (
                  <StudentSelection onSelectStudent={handleStudentSelect} />
                )}
                {appState === "ENTER_PIN" && selectedStudent && (
                  <PinEntry
                    student={selectedStudent}
                    onBack={() => setAppState("SELECT_STUDENT")}
                    onLoginSuccess={handleLoginSuccess}
                  />
                )}
              </div>
            </div>
            <div className="hidden md:block md:w-1/2"></div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {appState === "LOADING" && (
        <LoadingScreen onFinish={handleLoadingComplete} />
      )}
    </div>
  );
}
