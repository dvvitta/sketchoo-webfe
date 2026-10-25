import Link from "next/link";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function Navbar() {
  return (
    <header
      className={`absolute top-0 left-0 w-full z-30 ${poppins.className}`}
    >
      <nav className="w-full px-6 py-6 flex items-center justify-between">
        {/* Logo Image */}
        <Link href="#beranda" className="flex items-center">
          <div className="relative w-28 sm:w-32 md:w-36 h-auto">
            <Image
              src="/logo.png" // sesuaikan nama file logo di folder public/
              alt="Logo SKETCHOO"
              width={160}
              height={90}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </Link>

        {/* Menu Navigasi dengan Font Poppins */}
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
        </div>

        {/* Tombol CTA */}
        <button className="bg-[#6B46FF] hover:bg-[#5835ea] text-white font-bold text-xs md:text-sm px-6 py-2.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95">
          Mainkan Secara Online
        </button>
      </nav>
    </header>
  );
}
