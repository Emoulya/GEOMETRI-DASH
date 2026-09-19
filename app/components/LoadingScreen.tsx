"use client";

import React, { useEffect, useRef, useState } from "react";
import { initLoadingAnimation } from "../animations/loadingAnimations";

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cleanup = initLoadingAnimation(
      containerRef.current,
      shapesRef.current,
      setProgress,
      () => {
        setIsVisible(false);
        onFinish();
      }
    );
    return cleanup;
  }, [onFinish]);

  const addShapeRef = (el: HTMLDivElement | null) => {
    if (el && !shapesRef.current.includes(el)) {
      shapesRef.current.push(el);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Floating Shapes */}
      {/* Square 1 */}
      <div
        ref={addShapeRef}
        className="absolute z-10 w-16 h-16 border-[3px] border-cyan-400/30 rounded-lg top-[20%] left-[15%] backdrop-blur-sm"
      />
      {/* Triangle 1 */}
      <div
        ref={addShapeRef}
        className="absolute z-10 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-indigo-400/30 top-[30%] right-[20%] backdrop-blur-sm drop-shadow-lg"
      />
      {/* Square 2 */}
      <div
        ref={addShapeRef}
        className="absolute z-10 w-10 h-10 border-[3px] border-blue-400/40 rounded-md bottom-[30%] right-[25%] backdrop-blur-sm"
      />
      {/* Triangle 2 */}
      <div
        ref={addShapeRef}
        className="absolute z-10 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-cyan-300/40 bottom-[25%] left-[25%] backdrop-blur-sm"
      />

      <div className="relative z-20 flex flex-col items-center mt-[-5vh]">
        {/* Loading Text */}
        <h1 className="mb-12 text-2xl font-bold tracking-[0.3em] text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          LOADING..
        </h1>

        {/* This div preserves the space for the moon in page.tsx so the text/percentage stay aligned */}
        <div className="w-[280px] h-[280px]"></div>

        {/* Percentage */}
        <div className="mt-12 text-4xl font-medium text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          {progress}%
        </div>
      </div>
    </div>
  );
}
