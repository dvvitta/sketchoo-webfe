export default function HowToPlay() {
  const steps = [
    {
      number: 1,
      title: "Unduh Aplikasi",
      desc: "Install Sketchoo dari Google Play, gratis dan langsung bisa dipakai.",
      icon: (
        <svg className="w-6 h-6 text-[#5B3DF5]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" />
        </svg>
      ),
    },
    {
      number: 2,
      title: "Login atau Daftar",
      desc: "Install Sketchoo dari Google Play, gratis dan langsung bisa dipakai.",
      icon: (
        <svg className="w-6 h-6 text-[#5B3DF5]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
    },
    {
      number: 3,
      title: "Main Permainannya",
      desc: "Install Sketchoo dari Google Play, gratis dan langsung bisa dipakai.",
      icon: (
        <svg className="w-6 h-6 text-[#5B3DF5]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" />
        </svg>
      ),
    },
  ];

  return (
    <div id="cara-main" className="relative w-full">
      {/* Wave Lengkungan Atas */}
      <div className="w-full overflow-hidden leading-none -mb-[1px]">
        <svg
          className="relative block w-full h-[60px] md:h-[100px]"
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
      <section className="bg-[#F6F4FD] pt-6 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Judul Section */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] text-center mb-16">
            Cara Mainnya gampang banget!
          </h2>

          {/* 3 Kotak Card Langkah */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative bg-white rounded-3xl p-6 pt-9 pb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center transition-all hover:-translate-y-1"
              >
                {/* Badge Angka Bulat di Atas Card */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#5B3DF5] text-white font-bold text-sm flex items-center justify-center shadow-md">
                  {step.number}
                </div>

                {/* Kotak Lavender Lembut untuk Icon */}
                <div className="w-full h-32 rounded-2xl bg-[#F1EDFD] flex items-center justify-center mb-6">
                  {step.icon}
                </div>

                {/* Judul Langkah */}
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  {step.title}
                </h3>

                {/* Deskripsi */}
                <p className="text-xs leading-relaxed text-slate-500 max-w-[220px]">
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
          className="relative block w-full h-[60px] md:h-[100px]"
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