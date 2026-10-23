import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export default function CtaBanner() {
  return (
    // max-w dikecilkan ke 5xl & padding bawah diberi ruang ke footer
    <section className="w-full max-w-5xl mx-auto px-6 pb-28 md:pb-36">
      <div className="w-full rounded-[30px] bg-gradient-to-r from-[#5034EB] via-[#6345F5] to-[#927CFF] px-6 py-9 md:py-11 text-center text-white shadow-lg shadow-indigo-500/15 flex flex-col items-center space-y-3">
        
        {/* Headline Lebih Ramping & Manis */}
        <h2
          className={`${nunito.className} text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight drop-shadow-sm`}
        >
          Yuk, mulai main bareng si kecil!
        </h2>

        {/* Subtitle */}
        <p className={`${nunito.className} text-xs md:text-sm font-semibold text-white/90`}>
          Gratis diunduh di Google Play.
        </p>

        {/* Badge Google Play */}
        <div className="pt-1.5">
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform hover:scale-105 active:scale-95 shadow-md rounded-xl"
          >
            <div className="bg-black text-white px-3.5 py-1.5 rounded-xl flex items-center gap-2.5 border border-neutral-700">
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 512 512">
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
                <span className="text-[8px] uppercase tracking-wider text-neutral-300 font-medium">
                  GET IT ON
                </span>
                <span className="text-[15px] font-bold text-white tracking-tight mt-0.5 font-sans">
                  Google Play
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}