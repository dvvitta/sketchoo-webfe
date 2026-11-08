"use client";

import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SessionItem } from "@/services/siswa.service";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

interface RecentActivitiesProps {
  sessions?: SessionItem[];
  isLoading?: boolean;
}

function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return "Baru saja";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;

    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "Baru saja";
  }
}

export default function RecentActivities({
  sessions = [],
  isLoading = false,
}: RecentActivitiesProps) {
  return (
    <div
      className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm ${jakarta.className}`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-amber-500 text-base">☆</span>
          <h3 className="font-extrabold text-base text-slate-800">
            Aktivitas Sesi Terkini
          </h3>
        </div>
        <Link
          href="/admin/siswa"
          className="text-xs font-bold text-[#6342E8] hover:underline flex items-center gap-1"
        >
          Lihat Kelas &rarr;
        </Link>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          // Skeleton loading
          [...Array(3)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="w-32 h-3.5 bg-slate-200 rounded" />
                <div className="w-44 h-3 bg-slate-200 rounded" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100" />
            </div>
          ))
        ) : sessions.length === 0 ? (
          <div className="py-6 text-center text-slate-400">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2 text-sm">
              ℹ
            </div>
            <p className="text-xs font-semibold text-slate-600">
              Belum ada sesi pembelajaran aktif
            </p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-[200px] mx-auto">
              Sesi akan tercatat otomatis saat perangkat kelas atau Smartboard digunakan.
            </p>
          </div>
        ) : (
          sessions.slice(0, 5).map((session) => {
            const isActive = session.status === "active";
            const isCompleted = session.status === "completed";

            const title =
              session.device_label || "Sesi Pembelajaran Kelas";
            const actionText = isActive
              ? "Sesi sedang berlangsung di kelas"
              : isCompleted
              ? "Sesi pembelajaran telah selesai"
              : "Sesi pembelajaran dibatalkan";

            const avatarBg = isActive
              ? "bg-emerald-100 text-emerald-800"
              : isCompleted
              ? "bg-[#F3EFFE] text-[#6342E8]"
              : "bg-slate-100 text-slate-600";

            return (
              <div
                key={session.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${avatarBg} flex items-center justify-center font-bold text-xs shrink-0`}
                  >
                    {isActive ? "●" : "✓"}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                      {title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {actionText}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {formatRelativeTime(session.started_at)}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {isActive ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                  ) : (
                    <svg
                      className="w-4 h-4 text-[#6342E8]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
