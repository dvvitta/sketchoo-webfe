"use client";

import { useEffect, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { siswaService, ClassroomItem } from "@/services/siswa.service";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function ClassCodeCard() {
  const [classroom, setClassroom] = useState<ClassroomItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    queueMicrotask(async () => {
      try {
        const res = await siswaService.getClassrooms();
        // Ambil kelas pertama yang aktif
        const activeClassroom = res.items.find((c) => c.is_active) ?? res.items[0] ?? null;
        setClassroom(activeClassroom);
      } catch (err) {
        console.error("Gagal memuat data kelas:", err);
      }
    });
  }, []);

  const code = classroom
    ? `SKC-${classroom.name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 3).toUpperCase()}${classroom.id.slice(0, 3).toUpperCase()}`
    : "SKC-8K2P";

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Regenerate kode: update nama kelas dengan nama yang sama untuk trigger backend regenerasi join_code
  // (endpoint PATCH /admin/classrooms/:id)
  const handleRegenerateCode = async () => {
    if (!classroom) return;
    setIsUpdating(true);
    try {
      const updated = await siswaService.updateClassroom(classroom.id, {
        name: classroom.name,
      });
      setClassroom(updated);
    } catch (err) {
      console.error("Gagal memperbarui kode kelas:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between ${jakarta.className}`}
    >
      {/* Header Kartu */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-slate-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </span>
        <h3 className="font-extrabold text-base text-slate-800">
          Kode Bergabung Kelas
        </h3>
      </div>

      {/* Box Kode & QR Box */}
      <div className="flex flex-col sm:flex-row items-center gap-4 my-auto py-2">
        {/* Banner Kode Ungu */}
        <div className="flex-1 w-full bg-[#EFEFFD] rounded-2xl p-5 text-center relative overflow-hidden flex flex-col justify-center items-center">
          <span className="absolute top-2 left-3 text-amber-400 text-sm font-bold">✦</span>
          <span className="absolute top-2 right-3 text-amber-400 text-sm font-bold">✦</span>

          {classroom?.name && (
            <p className="text-[11px] font-semibold text-[#5B3DF5]/60 mb-1">
              {classroom.name}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl font-black text-[#5B3DF5] tracking-wider">
            {code}
          </h2>
          <p className="text-[11px] font-semibold text-[#5B3DF5]/80 mt-1 max-w-[200px] leading-relaxed">
            Bagikan kode ini kepada siswa untuk bergabung di kelas Anda.
          </p>
        </div>

        {/* Kotak QR Code */}
        <div className="w-28 h-28 bg-white border border-slate-200 rounded-2xl p-2.5 flex flex-col items-center justify-between shrink-0 shadow-sm">
          <div className="w-full h-16 bg-slate-900 rounded-lg flex items-center justify-center p-1">
            <div className="w-full h-full border border-white flex flex-wrap gap-1 p-0.5 justify-center items-center">
              <span className="w-2.5 h-2.5 bg-white rounded-xs" />
              <span className="w-2.5 h-2.5 bg-white rounded-xs" />
              <span className="w-2.5 h-2.5 bg-white rounded-xs" />
              <span className="w-2.5 h-2.5 bg-white rounded-xs" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#6342E8] flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            Lihat QR Code
          </span>
        </div>
      </div>

      {/* Tombol Salin dan Ganti Kode */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mt-4 pt-2">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!code}
          className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copied ? "Tersalin!" : "Salin Kode"}
        </button>

        <button
          type="button"
          onClick={handleRegenerateCode}
          disabled={isUpdating || !classroom}
          className="flex-1 py-2.5 px-4 rounded-xl bg-[#5B3DF5] text-white text-xs font-bold hover:bg-[#4E31E2] disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <svg
            className={`w-4 h-4 ${isUpdating ? "animate-spin" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isUpdating ? "Memproses..." : "Ganti Kode"}
        </button>
      </div>
    </div>
  );
}
