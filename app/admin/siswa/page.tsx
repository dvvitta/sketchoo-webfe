"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../dashboard/_components/Sidebar";
import Header from "../dashboard/_components/Header";
import ClassCodeCard from "./_components/ClassCodeCard";
import ClassSummary from "./_components/ClassSummary";
import StudentTable from "./_components/StudentTable";

export default function KelolaSiswaPage() {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) {
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] relative">
      {/* Sidebar Navigasi Admin Responsif */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Konten Halaman Kelola Siswa */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full min-w-0">
        <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* Baris Atas: Kode Kelas & Ringkasan Kelas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <ClassCodeCard />
          <ClassSummary />
        </div>

        {/* Baris Bawah: Daftar & Tabel Siswa */}
        <StudentTable />
      </main>
    </div>
  );
}
