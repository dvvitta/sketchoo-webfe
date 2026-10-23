import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-100 bg-gradient-to-r from-[#6B46FF]/35 via-white to-white text-slate-700 py-10 px-8 md:px-16 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Baris Atas: Logo & Link Menu */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-wider text-[#5B3DF5]">
              SKETCHOO!
            </span>
          </div>

          {/* Navigasi Footer */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 text-xs md:text-sm font-semibold text-slate-600">
            <Link href="#" className="hover:text-indigo-600 transition-colors">Courses</Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">Experts</Link>
            <Link href="#tentang" className="hover:text-indigo-600 transition-colors">About us</Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">Certificates</Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">Contacts</Link>
          </div>
        </div>

        {/* Garis Pemisah Tipis */}
        <div className="w-full h-px bg-slate-200/70" />

        {/* Baris Bawah: Kontak & Support */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="font-medium">Let&apos;s chat</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">info@sketchoo.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}