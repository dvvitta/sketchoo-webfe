import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="w-full max-w-6xl mx-auto px-6 pt-12 pb-28 md:pb-36"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Placeholder Gambar / Video Tim - Dibuat Lebih Ramping (Aspect 16:9 / Video Ratio) */}
        <div className="lg:col-span-6 w-full">
          <div className="w-full aspect-[16/10] sm:aspect-[16/9] max-h-[320px] rounded-[28px] bg-[#6B7280] shadow-md flex items-center justify-center text-white/50 text-xs md:text-sm font-medium">
            <span>[Foto Tim / Video Preview]</span>
          </div>
        </div>

        {/* Kolom Teks Kanan */}
        <div className="lg:col-span-6 space-y-3 lg:pl-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E1B4B] tracking-tight">
            Tentang Kami
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed font-normal">
            Sketchoo hadir sebagai ruang bermain digital yang menyenangkan untuk
            mengasah imajinasi dan nalar si kecil. Lewat sentuhan interaktif dan
            teknologi cerdas, setiap goresan gambar anak disulap menjadi kisah
            petualangan seru yang melatih kreativitas sekaligus menemani masa
            tumbuh kembangnya.
          </p>
        </div>
      </div>
    </section>
  );
}
