import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-100 bg-gradient-to-r from-[#6B46FF]/20 via-white to-white text-slate-700 py-8 sm:py-10 px-4 sm:px-8 md:px-16 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Baris Atas: Logo & Link Menu */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo Footer */}
          <div className="flex items-center gap-2">
            <div className="relative w-28 sm:w-32 md:w-36 h-auto">
              <Image
                src="/logo.png"
                alt="Logo SKETCHOO"
                width={160}
                height={60}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Navigasi Footer */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6 md:gap-8 text-xs md:text-sm font-semibold text-slate-600">
            <Link href="#beranda" className="hover:text-indigo-600 transition-colors">
              Beranda
            </Link>
            <Link href="#fitur" className="hover:text-indigo-600 transition-colors">
              Fitur
            </Link>
            <Link href="#cara-main" className="hover:text-indigo-600 transition-colors">
              Cara Main
            </Link>
            <Link
              href="#tentang"
              className="hover:text-indigo-600 transition-colors"
            >
              Tentang Kami
            </Link>
            <Link
              href="/auth/login"
              className="hover:text-indigo-600 transition-colors text-[#5B3DF5] font-bold"
            >
              Portal Admin
            </Link>
          </div>
        </div>

        {/* Garis Pemisah Tipis */}
        <div className="w-full h-px bg-slate-200/70" />

        {/* Baris Bawah: Kontak & Support */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors">
            <svg
              className="w-4 h-4 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="font-medium">Let&apos;s chat with us</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors">
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">info@sketchoo.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
