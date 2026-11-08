"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../dashboard/_components/Sidebar";
import Header from "../dashboard/_components/Header";
import ClassCodeCard from "./_components/ClassCodeCard";
import ClassSummary from "./_components/ClassSummary";
import StudentTable from "./_components/StudentTable";

export default function KelolaSiswaPage() {
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) {
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      {/* Sidebar Navigasi Admin */}
      <Sidebar />

      {/* Konten Halaman Kelola Siswa */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <Header />

        {/* Baris Atas: Kode Kelas & Ringkasan Kelas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ClassCodeCard />
          <ClassSummary />
        </div>

        {/* Baris Bawah: Daftar & Tabel Siswa */}
        <StudentTable />
      </main>
    </div>
  );
}
