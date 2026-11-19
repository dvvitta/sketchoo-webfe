"use client";

import { useEffect, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { QRCodeSVG } from "qrcode.react";
import { siswaService, ClassroomItem } from "@/services/siswa.service";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function ClassCodeCard() {
  const [classroom, setClassroom] = useState<ClassroomItem | null>(null);
  const [code, setCode] = useState("SKC-8K2P");
  const [copied, setCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(async () => {
      try {
        const res = await siswaService.getClassrooms();
        const activeClassroom = res.items.find((c) => c.is_active) ?? res.items[0] ?? null;
        setClassroom(activeClassroom);
        if (activeClassroom) {
          try {
            const codeRes = await siswaService.getClassroomCode(activeClassroom.id);
            if (codeRes?.code) {
              setCode(codeRes.code);
              return;
            }
          } catch {
            // fallback nama + id
          }
          const derived = `SKC-${activeClassroom.name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 3).toUpperCase()}${activeClassroom.id.slice(0, 3).toUpperCase()}`;
          setCode(derived);
        }
      } catch (err) {
        console.error("Gagal memuat data kelas:", err);
      }
    });
  }, []);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateCode = async () => {
    if (!classroom) return;
    setIsUpdating(true);
    setErrorMessage(null);
    try {
      const res = await siswaService.regenerateClassroomCode(classroom.id);
      if (res?.code) {
        setCode(res.code);
      }
    } catch (err: unknown) {
      console.error("Gagal memperbarui kode kelas:", err);
      const msg = err instanceof Error ? err.message : "Gagal memperbarui kode kelas.";
      setErrorMessage(msg);
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
        <button
          type="button"
          onClick={() => setShowQrModal(true)}
          className="w-28 h-28 bg-white border border-slate-200 rounded-2xl p-2.5 flex flex-col items-center justify-between shrink-0 shadow-sm hover:border-[#6342E8] hover:shadow-md transition cursor-pointer group"
          title="Klik untuk memperbesar QR Code"
        >
          <div className="w-full flex-1 bg-white rounded-lg flex items-center justify-center p-1 overflow-hidden">
            <QRCodeSVG
              value={code}
              size={60}
              level="M"
              bgColor="#FFFFFF"
              fgColor="#1E1B4B"
            />
          </div>
          <span className="text-[10px] font-bold text-[#6342E8] group-hover:underline flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            Lihat QR Code
          </span>
        </button>
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

      {errorMessage && (
        <p className="text-[11px] font-semibold text-rose-500 mt-2 text-center">
          {errorMessage}
        </p>
      )}

      {/* Modal Tampilan Penuh QR Code untuk Smartboard & Siswa */}
      {showQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-[#EFEFFD] rounded-2xl flex items-center justify-center text-[#5B3DF5] mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h4 className="font-extrabold text-lg text-slate-800">
              QR Code Ruang Kelas
            </h4>
            <p className="text-xs font-semibold text-[#5B3DF5] mt-0.5 mb-4">
              {classroom?.name ?? "Kelas Belajar"} • {code}
            </p>

            <div className="p-4 bg-white border-2 border-slate-100 rounded-3xl shadow-inner mb-4 flex items-center justify-center">
              <QRCodeSVG
                value={code}
                size={220}
                level="H"
                bgColor="#FFFFFF"
                fgColor="#1E1B4B"
              />
            </div>

            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Arahkan kamera tablet atau ponsel siswa ke QR Code ini atau masukkan kode{" "}
              <strong className="text-slate-800 font-bold">{code}</strong>.
            </p>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-3 rounded-xl bg-[#5B3DF5] text-white font-bold text-sm hover:bg-[#4E31E2] transition cursor-pointer shadow-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
