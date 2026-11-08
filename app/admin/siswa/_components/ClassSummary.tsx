"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { siswaService } from "@/services/siswa.service";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

interface SummaryData {
  totalSiswa: number;
  totalKelas: number;
  recentSessions: number;
}

export default function ClassSummary() {
  const [data, setData] = useState<SummaryData>({
    totalSiswa: 0,
    totalKelas: 0,
    recentSessions: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    queueMicrotask(async () => {
      try {
        const dashboard = await siswaService.getDashboard();
        setData({
          totalSiswa: dashboard.active_students,
          totalKelas: dashboard.active_classrooms,
          recentSessions: dashboard.recent_sessions.length,
        });
      } catch (err) {
        console.error("Gagal memuat ringkasan kelas:", err);
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div
      className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between ${jakarta.className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[#6342E8]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 19h4v-7H4v7zm6 0h4v-12h-4v12zm6 0h4v-4h-4v4z" />
            </svg>
          </span>
          <h3 className="font-extrabold text-base text-slate-800">
            Ringkasan Kelas
          </h3>
        </div>

        <Link
          href="#"
          className="text-xs font-bold text-[#6342E8] hover:underline flex items-center gap-1"
        >
          Lihat Detail &rarr;
        </Link>
      </div>

      {/* Grid 3 Kartu Mini */}
      <div className="grid grid-cols-2 gap-3.5 my-auto py-1">
        {/* Total Siswa Aktif */}
        <div className="bg-[#EFEFFD] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D9D7FC] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-[#6342E8]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block leading-tight">
              Siswa Aktif
            </span>
            <span className="text-xl font-extrabold text-slate-900 leading-none">
              {isLoading ? (
                <span className="inline-block w-8 h-5 bg-slate-200 rounded animate-pulse" />
              ) : (
                data.totalSiswa
              )}
            </span>
          </div>
        </div>

        {/* Total Kelas Aktif */}
        <div className="bg-[#E8F8F0] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C5EED9] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block leading-tight">
              Kelas Aktif
            </span>
            <span className="text-xl font-extrabold text-slate-900 leading-none">
              {isLoading ? (
                <span className="inline-block w-8 h-5 bg-slate-200 rounded animate-pulse" />
              ) : (
                data.totalKelas
              )}
            </span>
          </div>
        </div>

        {/* Sesi Terkini */}
        <div className="bg-[#FFF4E4] rounded-2xl p-4 flex items-center gap-3 col-span-2">
          <div className="w-10 h-10 rounded-xl bg-[#FFE5BF] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.5 15H11v-6h1.5v6zm0-8H11V7h1.5v2z" />
            </svg>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block leading-tight">
              Sesi Pembelajaran Terbaru
            </span>
            <span className="text-xl font-extrabold text-slate-900 leading-none">
              {isLoading ? (
                <span className="inline-block w-8 h-5 bg-slate-200 rounded animate-pulse" />
              ) : (
                data.recentSessions
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
