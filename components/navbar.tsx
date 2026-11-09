"use client";

import { useState } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={`absolute top-0 left-0 w-full z-40 ${poppins.className}`}
    >
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
        {/* Logo Image */}
        <Link href="#beranda" className="flex items-center">
          <div className="relative w-28 sm:w-32 md:w-36 h-auto">
            <Image
              src="/logo.png"
              alt="Logo SKETCHOO"
              width={160}
              height={90}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </Link>

        {/* Menu Navigasi Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-800">
          <Link
            href="#beranda"
            className="text-slate-950 border-b-2 border-[#5B3DF5] pb-0.5"
          >
            Beranda
          </Link>
          <Link
            href="#fitur"
            className="hover:text-[#5B3DF5] transition-colors"
          >
            Fitur Unggulan
          </Link>
          <Link
            href="#tentang"
            className="hover:text-[#5B3DF5] transition-colors"
          >
            Tentang Kami
          </Link>
          <Link
            href="/auth/login"
            className="hover:text-[#5B3DF5] transition-colors text-slate-500"
          >
            Portal
          </Link>
        </div>

        {/* Tombol CTA & Hamburger */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex bg-[#6B46FF] hover:bg-[#5835ea] text-white font-bold text-xs md:text-sm px-5 md:px-6 py-2.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer">
            Mainkan Secara Online
          </button>

          {/* Hamburger Button untuk Mobile */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:text-[#5B3DF5] focus:outline-none shadow-sm cursor-pointer"
            aria-label="Toggle menu navigasi"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Dropdown Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden mx-4 my-2 p-5 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-100 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3 font-semibold text-sm text-slate-700">
            <Link
              href="#beranda"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-slate-50 text-[#5B3DF5] font-bold"
            >
              Beranda
            </Link>
            <Link
              href="#fitur"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-slate-50 hover:text-[#5B3DF5]"
            >
              Fitur Unggulan
            </Link>
            <Link
              href="#cara-main"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-slate-50 hover:text-[#5B3DF5]"
            >
              Cara Main
            </Link>
            <Link
              href="#tentang"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-slate-50 hover:text-[#5B3DF5]"
            >
              Tentang Kami
            </Link>
            <Link
              href="/auth/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-slate-50 text-[#5B3DF5]"
            >
              Portal Login Guru / Admin
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full bg-[#6B46FF] hover:bg-[#5835ea] text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all active:scale-95"
          >
            Mainkan Secara Online
          </button>
        </div>
      )}
    </header>
  );
}
