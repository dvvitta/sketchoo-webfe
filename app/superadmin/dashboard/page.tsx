"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  superadminService,
  SuperadminDashboardData,
  SchoolItem,
  AdminMembershipItem,
} from "@/services/superadmin.service";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function SuperadminDashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Super Admin");
  const [dashboardData, setDashboardData] =
    useState<SuperadminDashboardData | null>(null);
  const [schools, setSchools] = useState<SchoolItem[]>([]);
  const [admins, setAdmins] = useState<AdminMembershipItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const [dashRes, schoolRes, adminRes] = await Promise.allSettled([
        superadminService.getDashboard(),
        superadminService.getSchools({ limit: 10 }),
        superadminService.getAdmins({ limit: 10 }),
      ]);

      if (dashRes.status === "fulfilled") {
        setDashboardData(dashRes.value);
      }
      if (schoolRes.status === "fulfilled") {
        setSchools(schoolRes.value.items);
      }
      if (adminRes.status === "fulfilled") {
        setAdmins(adminRes.value.items);
      }

      if (
        dashRes.status === "rejected" &&
        schoolRes.status === "rejected" &&
        adminRes.status === "rejected"
      ) {
        const err = dashRes.reason as Error;
        const msg = err?.message || "";
        if (msg.includes("token") || msg.includes("UNAUTHENTICATED")) {
          router.replace("/auth/login");
          return;
        }
        setErrorMessage(msg || "Gagal memuat data superadmin.");
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
    const role =
      typeof window !== "undefined" ? localStorage.getItem("user_role") : null;
    const storedName =
      typeof window !== "undefined" ? localStorage.getItem("user_name") : null;

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    if (role && role !== "superadmin") {
      // Jika bukan superadmin, arahkan ke dashboard admin guru
      router.replace("/admin/dashboard");
      return;
    }

    queueMicrotask(() => {
      if (storedName) {
        setUserName(storedName);
      }
      fetchData();
    });
  }, [router, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_role");
    router.replace("/auth/login");
  };

  return (
    <div
      className={`min-h-screen bg-[#F8F9FD] text-slate-800 flex flex-col ${jakarta.className}`}
    >
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#6342E8] text-white flex items-center justify-center font-black text-lg shadow-md shadow-[#6342E8]/20">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                SKETCHOO
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-extrabold uppercase tracking-wider">
                Super Admin
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Panel Pengelola Sekolah & Layanan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-slate-800">{userName}</span>
            <span className="text-[10px] text-purple-600 font-semibold">
              Super Administrator
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition flex items-center gap-1.5 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
        {/* Banner Sambutan */}
        <div className="rounded-3xl bg-gradient-to-r from-[#6342E8] via-[#7B59FA] to-[#9273FB] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-[#6342E8]/15">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sistem Aktif & Terpantau
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang di Super Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 mt-2 font-medium">
              Kelola entitas sekolah, perizinan admin, dan pantau aktivitas sesi
              belajar anak secara menyeluruh di platform SKETCHOO.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              type="button"
              onClick={fetchData}
              className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition"
            >
              Muat Ulang
            </button>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Card 1: Total Sekolah Aktif */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-indigo-50 text-[#6342E8] flex items-center justify-center shrink-0">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.333A12.018 12.018 0 0012 9c-2.49 0-4.81.76-6.75 2.06V21h13.5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sekolah Aktif
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                {isLoading ? "..." : dashboardData?.active_schools ?? 0}
              </h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                Terverifikasi dalam sistem
              </p>
            </div>
          </div>

          {/* Card 2: Total Admin Sekolah */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Admin Sekolah
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                {isLoading
                  ? "..."
                  : dashboardData?.active_school_memberships ?? 0}
              </h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                Pengajar & staf aktif
              </p>
            </div>
          </div>

          {/* Card 3: Sesi Belajar Berjalan */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sesi Berjalan
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                {isLoading ? "..." : dashboardData?.active_sessions ?? 0}
              </h3>
              <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
                Aktivitas interaktif live
              </p>
            </div>
          </div>
        </div>

        {/* Tabel Daftar Sekolah */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Daftar Sekolah Terdaftar
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Sekolah mitra yang menggunakan ekosistem pembelajaran Sketchoo
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Nama Sekolah</th>
                  <th className="py-3 px-4">Slug Identitas</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Tanggal Registrasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400">
                      Memuat daftar sekolah...
                    </td>
                  </tr>
                ) : schools.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400">
                      Belum ada data sekolah yang terdaftar.
                    </td>
                  </tr>
                ) : (
                  schools.map((school) => (
                    <tr key={school.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-4 px-4 font-bold text-slate-800">
                        {school.name}
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-500">
                        {school.slug}
                      </td>
                      <td className="py-4 px-4">
                        {school.is_active ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Nonaktif
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-slate-400">
                        {school.created_at
                          ? new Date(school.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel Daftar Administrator Sekolah */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Daftar Administrator Sekolah
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Akun guru dan staf administrator yang ditugaskan di sekolah
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">User ID</th>
                  <th className="py-3 px-4">Sekolah</th>
                  <th className="py-3 px-4">Role Akses</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Terdaftar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      Memuat daftar administrator...
                    </td>
                  </tr>
                ) : admins.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      Belum ada data administrator sekolah.
                    </td>
                  </tr>
                ) : (
                  admins.map((admin) => {
                    const schoolName =
                      schools.find((s) => s.id === admin.school_id)?.name ||
                      `Sekolah #${admin.school_id.slice(0, 6)}`;
                    return (
                      <tr
                        key={admin.id}
                        className="hover:bg-slate-50/70 transition"
                      >
                        <td className="py-4 px-4 font-mono font-bold text-slate-700">
                          {admin.user_id.slice(0, 8)}...
                        </td>
                        <td className="py-4 px-4 font-bold text-slate-800">
                          {schoolName}
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#6342E8] font-bold text-[10px] uppercase">
                            {admin.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {admin.is_active ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Aktif
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                              Nonaktif
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-slate-400">
                          {admin.created_at
                            ? new Date(admin.created_at).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "-"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
