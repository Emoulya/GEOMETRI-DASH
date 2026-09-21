"use client";

import { Settings } from "lucide-react";
import { useSettings, type TextSize, type MotionPreference, type Difficulty } from "@/lib/stores/settings";
import { useProgress } from "@/lib/stores/progress";

/**
 * Pengaturan Page (FR-21)
 * Ukuran teks, animasi, tingkat kesulitan, reset progress.
 */
export default function PengaturanPage() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { resetAllProgress } = useProgress();

  const textSizeOptions: { value: TextSize; label: string }[] = [
    { value: "normal", label: "Normal" },
    { value: "besar", label: "Besar" },
    { value: "sangat-besar", label: "Sangat Besar" },
  ];

  const motionOptions: { value: MotionPreference; label: string }[] = [
    { value: "penuh", label: "Penuh" },
    { value: "dikurangi", label: "Dikurangi" },
  ];

  const difficultyOptions: { value: Difficulty; label: string }[] = [
    { value: "mudah", label: "Mudah" },
    { value: "sedang", label: "Sedang" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 mb-3">
          <Settings size={28} />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Pengaturan</h1>
      </div>

      <div className="space-y-6">
        {/* Ukuran Teks */}
        <SettingSection title="Ukuran Teks" description="Ubah ukuran huruf">
          <SegmentedControl
            options={textSizeOptions}
            value={settings.textSize}
            onChange={(v) => updateSettings({ textSize: v })}
          />
        </SettingSection>

        {/* Animasi */}
        <SettingSection title="Animasi" description="Atur gerakan animasi">
          <SegmentedControl
            options={motionOptions}
            value={settings.motion}
            onChange={(v) => updateSettings({ motion: v })}
          />
        </SettingSection>

        {/* Kesulitan */}
        <SettingSection title="Tingkat Kesulitan" description="Atur level soal">
          <SegmentedControl
            options={difficultyOptions}
            value={settings.difficulty}
            onChange={(v) => updateSettings({ difficulty: v })}
          />
        </SettingSection>

        {/* Reset */}
        <div className="pt-4 border-t border-ui-border">
          <h3 className="font-semibold text-text-primary mb-2">Atur Ulang</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={resetSettings}
              className="px-4 py-2.5 text-sm font-medium text-text-secondary bg-bg-tertiary border border-ui-border rounded-xl hover:bg-ui-border transition-colors"
            >
              Reset Pengaturan
            </button>
            <button
              onClick={() => {
                if (window.confirm("Hapus semua kemajuan belajar?")) {
                  resetAllProgress();
                }
              }}
              className="px-4 py-2.5 text-sm font-medium text-status-retry bg-status-retry-light border border-status-retry/20 rounded-xl hover:bg-status-retry/10 transition-colors"
            >
              Reset Kemajuan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 bg-white border border-ui-border rounded-xl">
      <h3 className="font-semibold text-text-primary mb-0.5">{title}</h3>
      <p className="text-sm text-text-secondary mb-3">{description}</p>
      {children}
    </div>
  );
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex rounded-xl bg-bg-tertiary p-1 gap-1" role="radiogroup">
      {options.map((opt) => (
        <button
          key={opt.value}
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={[
            "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150",
            value === opt.value
              ? "bg-white text-text-primary shadow-sm"
              : "text-text-secondary hover:text-text-primary",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
