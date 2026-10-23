import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative w-full min-h-[580px] lg:min-h-[680px] flex items-center overflow-hidden bg-cover bg-center lg:bg-right"
      style={{ backgroundImage: "url('/Unknown.png')" }}
    >
      {/* Kontainer Konten Sisi Kiri */}
      <div className="w-full max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="max-w-xl space-y-6 text-left">
          {/* Judul Utama */}
          <h1 className="text-5xl md:text-6xl font-black text-[#5B3DF5] tracking-tight drop-shadow-sm">
            SKETCHOO!
          </h1>

          {/* Deskripsi */}
          <p className="text-lg md:text-xl text-slate-800 leading-relaxed max-w-md">
            Permainan bagi si kecil melatih nalar dan otak agar si kecil sehat bugar enak mamah
          </p>

          {/* Tombol CTA */}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <a
              href="#"
              className="bg-black hover:bg-neutral-900 text-white px-5 py-2.5 rounded-xl flex items-center gap-3 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 fill-current text-emerald-400" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.793 12 3.61 22.186A2.373 2.373 0 0 1 3 20.536V3.464c0-.663.224-1.266.609-1.65zM15.207 13.414l2.743 2.743-12.44 7.18 9.697-9.923zm0-2.828L5.51 3.663l12.44 7.18-2.743 2.743zm1.414 1.414l3.668 2.118a1.5 1.5 0 0 0 0-2.597l-3.668-2.121z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-gray-300 leading-none">GET IT ON</div>
                <div className="text-sm font-bold leading-tight">Google Play</div>
              </div>
            </a>

            <a
              href="#cara-main"
              className="text-[#5B3DF5] hover:text-[#4326d6] font-bold text-sm flex items-center gap-1.5 transition-colors"
            >
              Lihat Cara Main <span className="text-lg">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lengkungan Bawah Lembut Menuju Section Berikutnya */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}