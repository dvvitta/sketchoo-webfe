"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { StudentItem, siswaService } from "@/services/siswa.service";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

interface ClassRankingProps {
  students?: StudentItem[];
  isLoading?: boolean;
}

interface RankedStudent {
  id: string;
  name: string;
  points: number;
  completedActivities: number;
}

export default function ClassRanking({
  students = [],
  isLoading = false,
}: ClassRankingProps) {
  const [rankedList, setRankedList] = useState<RankedStudent[]>([]);
  const [isFetchingPoints, setIsFetchingPoints] = useState(false);

  useEffect(() => {
    let isMounted = true;

    queueMicrotask(async () => {
      if (!students || students.length === 0) {
        if (isMounted) setRankedList([]);
        return;
      }

      if (isMounted) setIsFetchingPoints(true);
      const topStudents = students.slice(0, 5);

      try {
        const results = await Promise.allSettled(
          topStudents.map((s) => siswaService.getStudentProgress(s.id))
        );

        if (!isMounted) return;

        const list: RankedStudent[] = topStudents.map((s, index) => {
          const res = results[index];
          if (res.status === "fulfilled") {
            return {
              id: s.id,
              name: s.name,
              points: res.value.total_points ?? 0,
              completedActivities: res.value.completed_activities ?? 0,
            };
          }
          return {
            id: s.id,
            name: s.name,
            points: 0,
            completedActivities: 0,
          };
        });

        // Urutkan berdasarkan poin tertinggi
        list.sort((a, b) => b.points - a.points);
        setRankedList(list);
      } catch (err) {
        if (isMounted) {
          console.error("Gagal memuat poin peringkat siswa:", err);
        }
      } finally {
        if (isMounted) {
          setIsFetchingPoints(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [students]);

  const loading = isLoading || isFetchingPoints;
  const maxPoints = Math.max(...rankedList.map((item) => item.points), 100);

  return (
    <div
      className={`bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-sm mt-6 ${jakarta.className}`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-amber-500 text-base">🏆</span>
          <h3 className="font-extrabold text-base text-slate-800">
            Peringkat Keaktifan Siswa
          </h3>
        </div>
        <Link
          href="/admin/siswa"
          className="text-xs font-bold text-[#6342E8] hover:underline flex items-center gap-1"
        >
          Lihat Detail &rarr;
        </Link>
      </div>

      <div className="space-y-4">
        {loading && rankedList.length === 0 ? (
          // Skeleton loading
          [...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <span className="w-6 h-6 rounded-full bg-slate-200 shrink-0" />
              <div className="w-24 h-4 bg-slate-200 rounded shrink-0" />
              <div className="flex-1 h-3 bg-slate-100 rounded-full" />
              <div className="w-10 h-4 bg-slate-200 rounded" />
            </div>
          ))
        ) : rankedList.length === 0 ? (
          <div className="py-6 text-center text-slate-400">
            <p className="text-xs font-semibold text-slate-600">
              Belum ada data siswa terdaftar
            </p>
            <Link
              href="/admin/siswa"
              className="inline-block mt-2 text-xs font-bold text-[#6342E8] hover:underline"
            >
              + Kelola Siswa di Sini
            </Link>
          </div>
        ) : (
          rankedList.map((item, index) => {
            const rank = index + 1;
            const rankBg =
              rank === 1
                ? "bg-amber-500 text-white"
                : rank === 2
                ? "bg-slate-400 text-white"
                : rank === 3
                ? "bg-amber-700/80 text-white"
                : "bg-slate-100 text-slate-600";

            const widthPercent = Math.max(
              15,
              Math.min(100, Math.round((item.points / maxPoints) * 100))
            );

            return (
              <div key={item.id} className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full ${rankBg} font-extrabold text-xs flex items-center justify-center shrink-0`}
                >
                  {rank}
                </span>

                <span className="text-xs sm:text-sm font-bold text-slate-800 w-24 sm:w-28 truncate shrink-0">
                  {item.name}
                </span>

                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6342E8] rounded-full transition-all duration-500"
                    style={{ width: `${widthPercent}%` }}
                  />
                </div>

                <div className="flex items-center gap-1.5 w-16 justify-end shrink-0">
                  <span className="text-xs font-extrabold text-slate-800">
                    {item.points} pts
                  </span>
                  {rank === 1 && <span className="text-xs">👑</span>}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
