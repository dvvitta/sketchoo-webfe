"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import { DashboardData, StudentItem } from "@/services/siswa.service";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

interface ProgressChartProps {
  dashboard?: DashboardData | null;
  students?: StudentItem[];
  isLoading?: boolean;
}

export default function ProgressChart({
  dashboard,
  students = [],
  isLoading = false,
}: ProgressChartProps) {
  const activeStudents =
    dashboard?.active_students ??
    students.filter((s) => s.is_active).length ??
    0;

  const totalStudents = students.length || activeStudents;
  const progressPercent =
    totalStudents > 0
      ? Math.min(100, Math.round((activeStudents / totalStudents) * 100))
      : 100;

  return (
    <div
      className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm ${jakarta.className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[#6342E8]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 19h4v-7H4v7zm6 0h4v-12h-4v12zm6 0h4v-4h-4v4z" />
            </svg>
          </span>
          <h3 className="font-extrabold text-base text-slate-800">
            Aktivitas Mingguan Kelas
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
          <span>{isLoading ? "Memuat..." : `${activeStudents} Siswa Aktif`}</span>
        </div>
      </div>

      <div className="relative w-full h-56 pt-2">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] font-semibold text-slate-400">
          <div className="border-b border-slate-100 pb-1">100%</div>
          <div className="border-b border-slate-100 pb-1">75%</div>
          <div className="border-b border-slate-100 pb-1">50%</div>
          <div className="border-b border-slate-100 pb-1">25%</div>
          <div>0%</div>
        </div>

        <div className="absolute top-[48px] right-2 bg-[#6342E8] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm z-10">
          {isLoading ? "..." : `${progressPercent}%`}
        </div>

        <svg
          viewBox="0 0 600 200"
          className="w-full h-full pl-8 pr-4 overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6342E8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#6342E8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path
            d="M 20 120 Q 90 60 160 85 T 300 50 T 440 60 L 440 200 L 20 200 Z"
            fill="url(#purpleGradient)"
          />

          <path
            d="M 20 120 Q 90 60 160 85 T 300 50 T 440 60"
            fill="none"
            stroke="#6342E8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          <circle cx="20" cy="120" r="4.5" fill="#6342E8" />
          <circle cx="100" cy="90" r="4.5" fill="#6342E8" />
          <circle cx="190" cy="100" r="4.5" fill="#6342E8" />
          <circle cx="275" cy="65" r="4.5" fill="#6342E8" />
          <circle cx="365" cy="80" r="4.5" fill="#6342E8" />
          <circle cx="560" cy="72" r="4.5" fill="#6342E8" />
        </svg>

        <div className="flex justify-between pl-9 pr-3 pt-3 text-xs font-semibold text-slate-500">
          <span>Sen</span>
          <span>Sel</span>
          <span>Rab</span>
          <span>Kam</span>
          <span>Jum</span>
          <span>Sab</span>
          <span>Min</span>
        </div>
      </div>
    </div>
  );
}
