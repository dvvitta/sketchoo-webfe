"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import { DashboardData, StudentItem } from "@/services/siswa.service";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

interface StatCardsProps {
  dashboard?: DashboardData | null;
  students?: StudentItem[];
  isLoading?: boolean;
}

interface CardProps {
  bgColor: string;
  badgeBg: string;
  badgeText: string;
  badgeValue: string;
  iconBg: string;
  value: string | number;
  label: string;
  icon: React.ReactNode;
  isLoading?: boolean;
}

function StatCard({
  bgColor,
  badgeBg,
  badgeText,
  badgeValue,
  iconBg,
  value,
  label,
  icon,
  isLoading,
}: CardProps) {
  return (
    <div
      className={`${bgColor} rounded-3xl p-5 flex items-center justify-between border border-black/[0.03] shadow-sm`}
    >
      <div
        className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}
      >
        {icon}
      </div>

      <div className="flex flex-col items-end">
        {isLoading ? (
          <span className="w-12 h-8 bg-slate-200/70 rounded-lg animate-pulse my-0.5" />
        ) : (
          <span className="text-3xl font-extrabold text-slate-800 leading-none">
            {value}
          </span>
        )}
        <span className="text-xs font-semibold text-slate-500 mt-1 mb-2">
          {label}
        </span>
        <span
          className={`${badgeBg} ${badgeText} text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-2xs`}
        >
          {badgeValue}
        </span>
      </div>
    </div>
  );
}

export default function StatCards({
  dashboard,
  students = [],
  isLoading = false,
}: StatCardsProps) {
  const activeStudents =
    dashboard?.active_students ??
    students.filter((s) => s.is_active).length ??
    0;

  const totalClassrooms = dashboard?.active_classrooms ?? 0;

  const recentSessions = dashboard?.recent_sessions ?? [];
  const activeSessions = recentSessions.filter(
    (s) => s.status === "active"
  ).length;

  const totalStudents = students.length || activeStudents;
  const activePercentage =
    totalStudents > 0
      ? Math.min(100, Math.round((activeStudents / totalStudents) * 100))
      : 100;

  return (
    <section
      className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8 ${jakarta.className}`}
    >
      {/* 1. Total Siswa Aktif */}
      <StatCard
        bgColor="bg-[#EFEFFD]"
        badgeBg="bg-white"
        badgeText="text-[#6342E8]"
        badgeValue="Aktif"
        iconBg="bg-[#D9D7FC]"
        value={activeStudents}
        label="Total Siswa Aktif"
        isLoading={isLoading}
        icon={
          <svg
            className="w-6 h-6 text-[#6342E8]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        }
      />

      {/* 2. Total Kelas */}
      <StatCard
        bgColor="bg-[#E8F8F0]"
        badgeBg="bg-white"
        badgeText="text-emerald-600"
        badgeValue="Kelas"
        iconBg="bg-[#C5EED9]"
        value={totalClassrooms}
        label="Kelas Terdaftar"
        isLoading={isLoading}
        icon={
          <svg
            className="w-6 h-6 text-emerald-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        }
      />

      {/* 3. Sesi Pembelajaran */}
      <StatCard
        bgColor="bg-[#FFF4E4]"
        badgeBg="bg-white"
        badgeText="text-amber-600"
        badgeValue={activeSessions > 0 ? `${activeSessions} Berjalan` : "Tercatat"}
        iconBg="bg-[#FFE5BF]"
        value={recentSessions.length}
        label="Sesi Pembelajaran"
        isLoading={isLoading}
        icon={
          <svg
            className="w-6 h-6 text-amber-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.5 15H11v-6h1.5v6zm0-8H11V7h1.5v2z" />
          </svg>
        }
      />

      {/* 4. Keaktifan Belajar */}
      <StatCard
        bgColor="bg-[#FEECEB]"
        badgeBg="bg-white"
        badgeText="text-rose-500"
        badgeValue={`${activePercentage}%`}
        iconBg="bg-[#FCD2D0]"
        value={`${activePercentage}%`}
        label="Tingkat Keaktifan"
        isLoading={isLoading}
        icon={
          <svg
            className="w-6 h-6 text-rose-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1c1.78-.39 3.23-1.66 3.61-3.06C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
          </svg>
        }
      />
    </section>
  );
}
