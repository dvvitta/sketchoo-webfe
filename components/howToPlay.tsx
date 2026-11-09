import Image from "next/image";

export default function HowToPlay() {
  const steps = [
    {
      number: 1,
      title: "Unduh Aplikasi",
      desc: "Cari dan install Sketchoo dari Google Play Store secara gratis untuk memulai petualangan.",
      imagePath: "/unduh.jpeg",
    },
    {
      number: 2,
      title: "Login atau Daftar",
      desc: "Masuk dengan akun yang sudah ada atau daftar baru dengan mudah menggunakan kode dari gurumu.",
      imagePath: "/login.jpeg",
    },
    {
      number: 3,
      title: "Main Permainannya",
      desc: "Ekspresikan kreativitasmu! Mulai menggambar, mewarnai, dan ikuti petualangan seru di dalam game.",
      imagePath: "/mewarnai.jpeg",
    },
  ];

  return (
    <div id="cara-main" className="relative w-full">
      {/* Wave Lengkungan Atas */}
      <div className="w-full overflow-hidden leading-none -mb-[1px]">
        <svg
          className="relative block w-full h-[40px] sm:h-[60px] md:h-[100px]"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C320,110 720,0 1100,50 C1250,70 1370,55 1440,40 L1440,120 L0,120 Z"
            fill="#F6F4FD"
          />
        </svg>
      </div>

      {/* Konten Utama Section Berlatar Lembut (#F6F4FD) */}
      <section className="bg-[#F6F4FD] pt-4 sm:pt-6 pb-6 sm:pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Judul Section */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] text-center mb-10 sm:mb-16">
            Cara Mainnya gampang banget!
          </h2>

          {/* 3 Kotak Card Langkah */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative bg-white rounded-[2rem] p-5 sm:p-6 pt-9 pb-7 sm:pb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center transition-all hover:-translate-y-1"
              >
                {/* Badge Angka Bulat di Atas Card */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#5B3DF5] text-white font-bold text-sm flex items-center justify-center shadow-md z-10">
                  {step.number}
                </div>

                {/* Container Gambar yang Menarik */}
                <div className="w-full h-40 sm:h-44 rounded-2xl bg-[#F1EDFD] flex items-center justify-center mb-5 sm:mb-6 overflow-hidden relative border border-slate-50">
                  <Image
                    src={step.imagePath}
                    alt={step.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Judul Langkah */}
                <h3 className="text-base font-extrabold text-slate-800 mb-2">
                  {step.title}
                </h3>

                {/* Deskripsi */}
                <p className="text-xs leading-relaxed text-slate-500 max-w-[240px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave Lengkungan Bawah */}
      <div className="w-full overflow-hidden leading-none -mt-[1px]">
        <svg
          className="relative block w-full h-[40px] sm:h-[60px] md:h-[100px]"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L1440,0 L1440,40 C1180,100 800,10 450,60 C250,90 100,50 0,30 Z"
            fill="#F6F4FD"
          />
        </svg>
      </div>
    </div>
  );
}
