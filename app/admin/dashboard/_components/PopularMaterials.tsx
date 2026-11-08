import { Plus_Jakarta_Sans } from "next/font/google";
import { SessionItem } from "@/services/siswa.service";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

interface PopularMaterialsProps {
  recentSessions?: SessionItem[];
}

export default function PopularMaterials({ recentSessions = [] }: PopularMaterialsProps) {
  const activeSessionsCount = recentSessions.filter((s) => s.status === "active").length;

  const materials = [
    {
      title: "Sketch Challenge",
      desc: "Latihan motorik halus & sketsa",
      status: activeSessionsCount > 0 ? "Tersedia di Smartboard" : "Siap Digunakan",
      bg: "bg-[#F3EFFE]",
      icon: (
        <svg
          className="w-10 h-10 text-[#6342E8]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m0-16a4 4 0 00-4 4v12a4 4 0 004-4m0-12a4 4 0 014 4v12a4 4 0 01-4-4M8 8a4 4 0 00-4 4 4 4 0 004 4m8-8a4 4 0 014 4 4 4 0 01-4 4"
          />
        </svg>
      ),
    },
    {
      title: "Jelajah Cilik",
      desc: "Eksplorasi huruf & bentuk",
      status: "Siap Digunakan",
      bg: "bg-[#F3EFFE]/60",
      icon: (
        <div className="text-2xl font-black tracking-tight">
          <span className="text-[#F43F5E]">A</span>
          <span className="text-[#3B82F6]">B</span>
          <span className="text-[#FBBF24]">C</span>
        </div>
      ),
    },
    {
      title: "Sketch-to-Story",
      desc: "Kreasi gambar jadi cerita AI",
      status: "Siap Digunakan",
      bg: "bg-[#EBF7F2]",
      icon: (
        <div className="text-2xl font-black tracking-tight">
          <span className="text-[#3B82F6]">1</span>
          <span className="text-[#F43F5E]">2</span>
          <span className="text-[#10B981]">3</span>
        </div>
      ),
    },
  ];

  return (
    <div className={`mt-8 ${jakarta.className}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#6342E8]">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
          </svg>
        </span>
        <h3 className="font-extrabold text-base text-slate-800">
          Modul Pembelajaran
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {materials.map((item, idx) => (
          <div
            key={idx}
            className={`${item.bg} rounded-3xl p-5 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 shadow-sm border border-black/[0.02]`}
          >
            <div className="h-12 flex items-center justify-center mb-2">
              {item.icon}
            </div>
            <h4 className="font-extrabold text-sm text-slate-800">
              {item.title}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {item.desc}
            </p>
            <span className="inline-block mt-2 text-[10px] font-bold text-[#6342E8] bg-white/80 px-2.5 py-0.5 rounded-full shadow-2xs">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
