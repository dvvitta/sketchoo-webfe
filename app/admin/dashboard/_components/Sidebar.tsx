"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_role");
    onClose?.();
    router.push("/auth/login");
  };

  const handleNavClick = () => {
    onClose?.();
  };

  return (
    <>
      {/* Backdrop Gelap untuk Mobile / Layar Kecil */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Kontainer Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#6342E8] flex flex-col justify-between py-6 sm:py-8 px-4 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:min-h-screen shrink-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        } ${jakarta.className}`}
      >
        {/* Sisi Atas: Logo, Close Button (Mobile), & Menu Navigasi */}
        <div>
          <div className="flex items-center justify-between mb-8 px-2">
            {/* Logo Sketchoo */}
            <div className="relative w-32 sm:w-36 h-auto mx-auto lg:mx-auto">
              <Image
                src="/logo.png"
                alt="Logo SKETCHOO"
                width={160}
                height={90}
                priority
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Tombol Tutup Sidebar di Mobile */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Tutup menu sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Navigasi */}
          <nav className="space-y-2 sm:space-y-3">
            <Link
              href="/admin/dashboard"
              onClick={handleNavClick}
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
              onClick={handleNavClick}
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
              onClick={handleNavClick}
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
            className="w-full flex items-center gap-3.5 px-5 py-3 rounded-full text-indigo-100 hover:text-white hover:bg-rose-500/80 font-bold text-sm transition-all duration-200 group cursor-pointer"
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
    </>
  );
}
