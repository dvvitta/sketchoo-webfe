import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative w-full min-h-[580px] lg:min-h-[680px] flex items-center overflow-hidden bg-cover bg-center lg:bg-right pt-20"
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
          <p className="text-lg md:text-xl text-slate-800 font-semibold leading-relaxed max-w-md">
            Ruang bermain dan belajar interaktif untuk si kecil melatih logika,
            bebas berimajinasi, dan belajar tanpa rasa bosan.
          </p>

          {/* Tombol Aksi */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            {/* Badge Google Play */}
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105 active:scale-95"
            >
              <div className="bg-black text-white px-4 py-2 rounded-xl flex items-center gap-3 border border-neutral-700 shadow-md">
                <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 512 512">
                  <path
                    fill="#00F076"
                    d="M380.9 237.9L108.6 80.6c-21.7-12.5-44.6-2-44.6 23.1v404.6c0 25.1 22.9 35.6 44.6 23.1l272.3-157.3c21.8-12.6 21.8-33.6 0-46.2z"
                  />
                  <path
                    fill="#00D2FF"
                    d="M380.9 237.9L108.6 80.6c-21.7-12.5-44.6-2-44.6 23.1v152.3l209.6 121 107.3-62.1c21.8-12.6 21.8-33.6 0-46.2z"
                  />
                  <path
                    fill="#FF3333"
                    d="M64 103.7v304.6c0 25.1 22.9 35.6 44.6 23.1l272.3-157.3L273.6 256 64 103.7z"
                  />
                  <path
                    fill="#FFD400"
                    d="M380.9 274.1L273.6 212 64 333.3v75c0 25.1 22.9 35.6 44.6 23.1l272.3-157.3z"
                  />
                </svg>

                <div className="flex flex-col text-left leading-none justify-center">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-300 font-medium">
                    GET IT ON
                  </span>
                  <span className="text-[17px] font-bold text-white tracking-tight mt-0.5 font-sans">
                    Google Play
                  </span>
                </div>
              </div>
            </a>

            {/* Link Cara Main */}
            <Link
              href="#cara-main"
              className="text-[#6B46FF] hover:text-[#532fe0] font-extrabold text-base flex items-center gap-2 transition-transform hover:translate-x-1"
            >
              Lihat Cara Main &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
