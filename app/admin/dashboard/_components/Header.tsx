"use client";

import { useEffect, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

interface HeaderProps {
  userName?: string;
  onMenuClick?: () => void;
}

export default function Header({ userName, onMenuClick }: HeaderProps) {
  const [headerData, setHeaderData] = useState<{
    date: string;
    name: string;
  }>({
    date: "",
    name: userName || "Bu Depita",
  });

  useEffect(() => {
    queueMicrotask(() => {
      const today = new Date();
      const formattedDate = new Intl.DateTimeFormat("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
        .format(today)
        .replace(/\./g, "");

      let resolvedName = userName || "Bu Depita";
      if (!userName && typeof window !== "undefined") {
        const stored = localStorage.getItem("user_name");
        if (stored) resolvedName = stored;
      }

      setHeaderData({
        date: formattedDate,
        name: resolvedName,
      });
    });
  }, [userName]);

  return (
    <header
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 ${jakarta.className}`}
    >
      <div className="flex items-center gap-3">
        {/* Tombol Hamburger di Layar Mobile (< lg) */}
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#6342E8] hover:bg-slate-50 shadow-sm cursor-pointer shrink-0"
            aria-label="Buka navigasi sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111827] tracking-tight">
            Halo, {headerData.name}!
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
            Semangat mengajar dan menemani anak-anak belajar hari ini!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
        <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm">
          <svg
            className="w-4 h-4 text-slate-500 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{headerData.date || "Memuat..."}</span>
        </div>

        <button
          type="button"
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition cursor-pointer"
          aria-label="Notifikasi"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>

        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EFEFFD] border-2 border-white text-[#6342E8] font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
          {headerData.name.charAt(0)}
        </div>
      </div>
    </header>
  );
}
