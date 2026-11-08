"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // 1. Bersihkan data login dari browser
    localStorage.removeItem("user_name");
    
    // 2. Redirect kembali ke halaman login
    router.push("/auth/login");
  };

  return (
    <aside
      className={`w-64 bg-[#6342E8] min-h-screen flex flex-col justify-between py-8 px-4 text-white shrink-0 ${jakarta.className}`}
    >
      {/* Sisi Atas: Logo & Menu Navigasi */}
      <div>
        {/* Logo Sketchoo */}
        <div className="flex flex-col items-center justify-center mb-10 px-2">
          <div className="relative w-36 h-auto">
            <Image
              src="/logo.png"
              alt="Logo SKETCHOO"
              width={160}
              height={90}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav className="space-y-3">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3.5 px-5 py-3 rounded-full font-bold text-sm transition-all ${
              pathname === "/admin/dashboard"
                ? "bg-white text-[#6342E8] shadow-md"
                : "text-indigo-100 hover:text-white hover:bg-white/10"
            }`}
          >
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            Dashboard
          </Link>

          <Link
            href="/admin/siswa"
            className={`flex items-center gap-3.5 px-5 py-3 rounded-full font-bold text-sm transition-all ${
              pathname.startsWith("/admin/siswa")
                ? "bg-white text-[#6342E8] shadow-md"
                : "text-indigo-100 hover:text-white hover:bg-white/10"
            }`}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Kelola Siswa
          </Link>

          <Link
            href="/admin/pengaturan"
            className={`flex items-center gap-3.5 px-5 py-3 rounded-full font-bold text-sm transition-all ${
              pathname.startsWith("/admin/pengaturan")
                ? "bg-white text-[#6342E8] shadow-md"
                : "text-indigo-100 hover:text-white hover:bg-white/10"
            }`}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Pengaturan
          </Link>
        </nav>
      </div>

      {/* Sisi Bawah: Tombol Logout */}
      <div className="pt-4 border-t border-white/15">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-5 py-3 rounded-full text-indigo-100 hover:text-white hover:bg-rose-500/80 font-bold text-sm transition-all duration-200 group"
        >
          <svg
            className="w-5 h-5 shrink-0 text-indigo-200 group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Keluar
        </button>
      </div>
    </aside>
  );
}