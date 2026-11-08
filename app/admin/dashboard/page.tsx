"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import StatCards from "./_components/StatCards";
import ProgressChart from "./_components/ProgressChart";
import PopularMaterials from "./_components/PopularMaterials";
import RecentActivities from "./_components/RecentActivities";
import ClassRanking from "./_components/ClassRangking";
import { DashboardData, StudentItem, siswaService } from "@/services/siswa.service";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const [dashRes, studentRes] = await Promise.allSettled([
        siswaService.getDashboard(),
        siswaService.getStudents({ limit: 10 }),
      ]);

      if (dashRes.status === "fulfilled") {
        setDashboard(dashRes.value);
      }
      if (studentRes.status === "fulfilled") {
        setStudents(studentRes.value.items);
      }

      if (dashRes.status === "rejected" && studentRes.status === "rejected") {
        const error = dashRes.reason as Error;
        const msg = error?.message || "";
        if (msg.includes("token") || msg.includes("UNAUTHENTICATED")) {
          router.replace("/auth/login");
          return;
        }
        setErrorMessage(msg || "Gagal menghubungkan data dashboard ke server.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Terjadi kesalahan saat memuat dashboard.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) {
      router.replace("/auth/login");
      return;
    }

    queueMicrotask(() => {
      fetchDashboardData();
    });
  }, [router, fetchDashboardData]);

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      {/* Sidebar Navigasi */}
      <Sidebar />

      {/* Konten Dashboard */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <Header />

        {/* Notifikasi Error jika gagal terhubung */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={fetchDashboardData}
              className="underline hover:text-rose-900 transition ml-4 cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Kartu Statistik */}
        <StatCards
          dashboard={dashboard}
          students={students}
          isLoading={isLoading}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Kolom Kiri: Chart dan Materi */}
          <div className="xl:col-span-2">
            <ProgressChart
              dashboard={dashboard}
              students={students}
              isLoading={isLoading}
            />
            <PopularMaterials recentSessions={dashboard?.recent_sessions} />
          </div>

          {/* Kolom Kanan: Aktivitas Terbaru dan Ranking */}
          <div className="xl:col-span-1">
            <RecentActivities
              sessions={dashboard?.recent_sessions ?? []}
              isLoading={isLoading}
            />
            <ClassRanking students={students} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}
