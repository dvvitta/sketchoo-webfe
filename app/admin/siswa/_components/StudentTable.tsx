"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  siswaService,
  StudentItem,
  ClassroomItem,
  StudentHistoryItem,
} from "@/services/siswa.service";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function StudentTable() {
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [classrooms, setClassrooms] = useState<ClassroomItem[]>([]);

  // State Modal Tambah Siswa
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [selectedClassroomId, setSelectedClassroomId] = useState("");
  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);
  const [addModalError, setAddModalError] = useState("");

  // State Modal Edit Siswa (PATCH /admin/students/:id)
  const [editingStudent, setEditingStudent] = useState<StudentItem | null>(null);
  const [editName, setEditName] = useState("");
  const [editClassroomId, setEditClassroomId] = useState("");
  const [editIsActive, setEditIsActive] = useState(true);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [editModalError, setEditModalError] = useState("");

  // State Modal Riwayat Aktivitas Siswa (GET /admin/students/:id/history)
  const [historyStudent, setHistoryStudent] = useState<StudentItem | null>(null);
  const [historyList, setHistoryList] = useState<StudentHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState("");

  const fetchStudents = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await siswaService.getStudents();
      setStudents(data.items);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Gagal mengambil data siswa.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadClassrooms = async () => {
    try {
      const res = await siswaService.getClassrooms();
      setClassrooms(res.items);
      if (res.items.length > 0) {
        setSelectedClassroomId(res.items[0].id);
      }
    } catch (err) {
      console.error("Gagal memuat data kelas:", err);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      setIsMounted(true);
      fetchStudents();
      loadClassrooms();
    });
  }, []);

  // --- Handlers Modal Tambah Siswa ---
  const handleOpenAddModal = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsAddModalOpen(true);
    setAddModalError("");
    setNewStudentName("");

    try {
      let currentClasses = classrooms;
      if (currentClasses.length === 0) {
        const res = await siswaService.getClassrooms();
        currentClasses = res.items;
        setClassrooms(currentClasses);
      }

      if (currentClasses.length > 0) {
        setSelectedClassroomId(currentClasses[0].id);
      } else {
        const newClass = await siswaService.createClassroom("Kelas Utama");
        setClassrooms([newClass]);
        setSelectedClassroomId(newClass.id);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAddModalError(err.message);
      } else {
        setAddModalError("Gagal memuat daftar kelas.");
      }
    }
  };

  const handleCloseAddModal = () => {
    if (isSubmittingAdd) return;
    setIsAddModalOpen(false);
    setNewStudentName("");
    setAddModalError("");
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !selectedClassroomId) {
      setAddModalError("Nama siswa dan kelas wajib diisi.");
      return;
    }

    setIsSubmittingAdd(true);
    setAddModalError("");

    try {
      await siswaService.createStudent({
        name: newStudentName.trim(),
        classroom_id: selectedClassroomId,
      });

      handleCloseAddModal();
      await fetchStudents();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAddModalError(err.message);
      } else {
        setAddModalError("Gagal menambahkan siswa.");
      }
    } finally {
      setIsSubmittingAdd(false);
    }
  };

  // --- Handlers Modal Edit Siswa (PATCH /admin/students/:id) ---
  const handleOpenEditModal = (student: StudentItem) => {
    setEditingStudent(student);
    setEditName(student.name);
    setEditClassroomId(student.classroom_id || (classrooms[0]?.id ?? ""));
    setEditIsActive(student.is_active);
    setEditModalError("");
  };

  const handleCloseEditModal = () => {
    if (isSubmittingEdit) return;
    setEditingStudent(null);
    setEditName("");
    setEditClassroomId("");
    setEditModalError("");
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    if (!editName.trim()) {
      setEditModalError("Nama siswa tidak boleh kosong.");
      return;
    }

    setIsSubmittingEdit(true);
    setEditModalError("");

    try {
      await siswaService.updateStudent(editingStudent.id, {
        name: editName.trim(),
        classroom_id: editClassroomId || undefined,
        is_active: editIsActive,
      });

      handleCloseEditModal();
      await fetchStudents();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setEditModalError(err.message);
      } else {
        setEditModalError("Gagal memperbarui data siswa.");
      }
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Quick toggle status siswa (PATCH is_active)
  const handleQuickToggleStatus = async (student: StudentItem) => {
    try {
      const updated = await siswaService.updateStudent(student.id, {
        is_active: !student.is_active,
      });

      setStudents((prev) =>
        prev.map((s) => (s.id === student.id ? updated : s))
      );
    } catch (err: unknown) {
      console.error("Gagal mengubah status siswa:", err);
      await fetchStudents();
    }
  };

  // --- Handlers Modal Riwayat Aktivitas Siswa (GET /admin/students/:id/history) ---
  const handleOpenHistoryModal = async (student: StudentItem) => {
    setHistoryStudent(student);
    setIsLoadingHistory(true);
    setHistoryError("");
    setHistoryList([]);

    try {
      const res = await siswaService.getStudentHistory(student.id);
      setHistoryList(res.items);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setHistoryError(err.message);
      } else {
        setHistoryError("Gagal memuat riwayat aktivitas siswa.");
      }
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleCloseHistoryModal = () => {
    setHistoryStudent(null);
    setHistoryList([]);
    setHistoryError("");
  };

  // Filter berdasarkan nama
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvatarColor = (index: number) => {
    const colors = [
      { bg: "bg-amber-100", text: "text-amber-800" },
      { bg: "bg-rose-100", text: "text-rose-800" },
      { bg: "bg-sky-100", text: "text-sky-800" },
      { bg: "bg-purple-100", text: "text-purple-800" },
      { bg: "bg-emerald-100", text: "text-emerald-800" },
    ];
    return colors[index % colors.length];
  };

  return (
    <div
      className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mt-6 ${jakarta.className}`}
    >
      {/* Header Tabel, Search, dan Tombol Tambah */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="w-8 h-8 rounded-full bg-[#EFEFFD] flex items-center justify-center text-[#6342E8]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h3 className="font-extrabold text-base text-slate-800">
            Daftar Siswa
          </h3>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Kolom Pencarian */}
          <div className="relative flex-1 sm:w-64">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama siswa..."
              className="w-full pl-9 pr-4 py-2 rounded-full border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#6342E8] transition"
            />
          </div>

          {/* Tombol Tambah Siswa */}
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="bg-[#6342E8] hover:bg-[#5233d6] text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-md shadow-[#6342E8]/25 transition hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer z-10"
          >
            <span className="text-base font-extrabold leading-none">+</span>
            Tambah Siswa
          </button>
        </div>
      </div>

      {/* Pesan Error Jika Fetch Gagal */}
      {errorMessage && (
        <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-between text-xs text-rose-600 font-semibold">
          <span>{errorMessage}</span>
          <button
            onClick={fetchStudents}
            className="underline hover:text-rose-800 transition cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Tabel Data Siswa */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#F8F9FD] text-slate-500 font-bold">
              <th className="py-3 px-4 rounded-l-xl">No</th>
              <th className="py-3 px-4">Nama Siswa</th>
              <th className="py-3 px-4">ID Siswa</th>
              <th className="py-3 px-4">Kelas</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center rounded-r-xl">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {isLoading ? (
              // Skeleton Loading Rows
              [...Array(4)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-4 px-4">
                    <div className="w-4 h-4 bg-slate-200 rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200" />
                      <div className="w-28 h-4 bg-slate-200 rounded" />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-24 h-4 bg-slate-200 rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-20 h-4 bg-slate-200 rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-20 h-6 bg-slate-200 rounded-full" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-12 h-4 bg-slate-200 rounded mx-auto" />
                  </td>
                </tr>
              ))
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-slate-400 font-medium"
                >
                  Tidak ada data siswa yang ditemukan.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, idx) => {
                const colors = getAvatarColor(idx);
                const className = student.classroom_id
                  ? classrooms.find((c) => c.id === student.classroom_id)?.name ||
                    "Kelas Utama"
                  : "Kelas Utama";

                return (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/60 transition"
                  >
                    <td className="py-4 px-4 text-slate-500">{idx + 1}</td>

                    {/* Nama Siswa dengan Avatar */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center font-bold text-xs shrink-0`}
                        >
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-extrabold text-slate-800">
                          {student.name}
                        </span>
                      </div>
                    </td>

                    {/* ID Siswa (Format Bersih & Ramah Pengguna) */}
                    <td className="py-4 px-4 text-slate-600 font-bold font-mono text-[11px]">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-600">
                        SK-{String(idx + 1).padStart(3, "0")}
                      </span>
                    </td>

                    {/* Nama Kelas Asli */}
                    <td className="py-4 px-4 text-slate-700 font-semibold">
                      {className}
                    </td>

                    {/* Status Badge — Klik untuk Quick Toggle */}
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => handleQuickToggleStatus(student)}
                        title="Klik untuk mengubah status aktif/nonaktif"
                        className="cursor-pointer transition hover:opacity-80"
                      >
                        {student.is_active ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] text-emerald-600 text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4E4] text-amber-600 text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Nonaktif
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Tombol Aksi */}
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Tombol Edit Siswa (PATCH /admin/students/:id) */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(student)}
                          className="text-slate-400 hover:text-[#6342E8] hover:bg-[#EFEFFD] p-1.5 rounded-lg transition cursor-pointer"
                          title="Edit Data Siswa"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>

                        {/* Tombol Riwayat Aktivitas (GET /admin/students/:id/history) */}
                        <button
                          type="button"
                          onClick={() => handleOpenHistoryModal(student)}
                          className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition cursor-pointer"
                          title="Lihat Riwayat Aktivitas Siswa"
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>

                        {/* Quick Toggle Status */}
                        <button
                          type="button"
                          onClick={() => handleQuickToggleStatus(student)}
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            student.is_active
                              ? "text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                              : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                          }`}
                          title={
                            student.is_active
                              ? "Ubah jadi Nonaktif"
                              : "Ubah jadi Aktif"
                          }
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
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
        <span>
          Menampilkan 1–{filteredStudents.length} dari {students.length} siswa
        </span>

        <div className="flex items-center gap-1.5">
          <button className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-400">
            &larr;
          </button>
          <button className="w-7 h-7 rounded-full bg-[#6342E8] text-white font-bold flex items-center justify-center">
            1
          </button>
          <button className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600">
            &rarr;
          </button>
        </div>
      </div>

      {/* Modal 1: Tambah Siswa Baru (POST /admin/students) */}
      {isAddModalOpen &&
        isMounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={handleCloseAddModal}
          >
            <div
              className={`bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-slate-100 my-auto ${jakarta.className}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#EFEFFD] flex items-center justify-center text-[#6342E8] text-base font-bold">
                    +
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-800 leading-tight">
                      Tambah Siswa Baru
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Daftarkan siswa baru ke dalam kelas
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  disabled={isSubmittingAdd}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-sm font-bold transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {addModalError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-600 font-semibold">
                  {addModalError}
                </div>
              )}

              <form onSubmit={handleCreateStudent} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Lengkap Siswa
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="Contoh: Siti Aisyah"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#6342E8] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Pilih Kelas
                  </label>
                  <select
                    value={selectedClassroomId}
                    onChange={(e) => setSelectedClassroomId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#6342E8] transition bg-white cursor-pointer"
                  >
                    {classrooms.length === 0 ? (
                      <option value="">Memuat kelas...</option>
                    ) : (
                      classrooms.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} {c.join_code ? `(${c.join_code})` : ""}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleCloseAddModal}
                    disabled={isSubmittingAdd}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingAdd || !newStudentName.trim()}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#6342E8] text-white text-xs font-bold hover:bg-[#5233d6] disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md shadow-[#6342E8]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmittingAdd ? (
                      <>
                        <svg
                          className="animate-spin h-3.5 w-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Menyimpan...
                      </>
                    ) : (
                      "Simpan Siswa"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

      {/* Modal 2: Edit Data Siswa (PATCH /admin/students/:id) */}
      {editingStudent &&
        isMounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={handleCloseEditModal}
          >
            <div
              className={`bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-slate-100 my-auto ${jakarta.className}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#EFEFFD] flex items-center justify-center text-[#6342E8] text-sm font-bold">
                    ✏️
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-800 leading-tight">
                      Edit Data Siswa
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Perbarui profil, kelas, atau status keaktifan
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  disabled={isSubmittingEdit}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-sm font-bold transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {editModalError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-600 font-semibold">
                  {editModalError}
                </div>
              )}

              <form onSubmit={handleUpdateStudent} className="space-y-4">
                {/* Input Nama */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Siswa
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Nama siswa..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#6342E8] transition"
                  />
                </div>

                {/* Dropdown Pilihan Kelas */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Kelas
                  </label>
                  <select
                    value={editClassroomId}
                    onChange={(e) => setEditClassroomId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#6342E8] transition bg-white cursor-pointer"
                  >
                    {classrooms.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.join_code ? `(${c.join_code})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pilihan Status Keaktifan */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Status Siswa
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setEditIsActive(true)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 cursor-pointer ${
                        editIsActive
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Aktif
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditIsActive(false)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 cursor-pointer ${
                        !editIsActive
                          ? "bg-amber-50 border-amber-300 text-amber-700 shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Nonaktif
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    disabled={isSubmittingEdit}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingEdit || !editName.trim()}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#6342E8] text-white text-xs font-bold hover:bg-[#5233d6] disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md shadow-[#6342E8]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmittingEdit ? (
                      <>
                        <svg
                          className="animate-spin h-3.5 w-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Menyimpan...
                      </>
                    ) : (
                      "Simpan Perubahan"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

      {/* MODAL LIHAT RIWAYAT AKTIVITAS SISWA (GET /admin/students/:id/history) */}
      {isMounted &&
        historyStudent &&
        createPortal(
          <div
            className={`fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 ${jakarta.className}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseHistoryModal();
            }}
          >
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
              {/* Header Modal */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EFEFFD] text-[#6342E8] flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-slate-800">
                        Riwayat Aktivitas Siswa
                      </h3>
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        ID: SK-{historyStudent.id.slice(0, 4).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {historyStudent.name} •{" "}
                      {classrooms.find(
                        (c) => c.id === historyStudent.classroom_id
                      )?.name || "Tanpa Kelas"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseHistoryModal}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Body Modal */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                {isLoadingHistory ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-3">
                    <svg
                      className="animate-spin h-8 w-8 text-[#6342E8]"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    <p className="text-xs font-semibold">
                      Memuat riwayat aktivitas siswa...
                    </p>
                  </div>
                ) : historyError ? (
                  <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-center">
                    <p className="text-xs font-bold text-rose-700 mb-2">
                      {historyError}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleOpenHistoryModal(historyStudent)}
                      className="px-4 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition cursor-pointer"
                    >
                      Coba Lagi
                    </button>
                  </div>
                ) : historyList.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-bold text-sm text-slate-700 mb-1">
                      Belum Ada Riwayat Aktivitas
                    </h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Siswa ini belum menyelesaikan tantangan menggambar atau sesi belajar di Sketchoo.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Ringkasan Singkat */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-2xl bg-[#F7F7FD] border border-[#E8E8FA] flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">
                          Total Aktivitas
                        </span>
                        <span className="font-extrabold text-sm text-[#6342E8]">
                          {historyList.length} Sesi
                        </span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-600">
                          Poin Terkumpul
                        </span>
                        <span className="font-extrabold text-sm text-emerald-700">
                          +{historyList.reduce((acc, h) => acc + (h.points_awarded ?? 0), 0)} Poin
                        </span>
                      </div>
                    </div>

                    {/* Daftar Card Aktivitas */}
                    <div className="space-y-3 pt-1">
                      {historyList.map((item) => {
                        const dateStr = item.created_at
                          ? new Date(item.created_at).toLocaleString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "-";

                        let badgeStyle = "bg-slate-100 text-slate-700";
                        let typeLabel = item.activity_type;

                        if (item.activity_type === "sketch_challenge") {
                          badgeStyle = "bg-[#EFEFFD] text-[#6342E8]";
                          typeLabel = "Tantangan Sketsa";
                        } else if (item.activity_type === "story") {
                          badgeStyle = "bg-amber-100 text-amber-800";
                          typeLabel = "Cerita Bergambar";
                        } else if (item.activity_type === "explore") {
                          badgeStyle = "bg-emerald-100 text-emerald-800";
                          typeLabel = "Eksplorasi";
                        }

                        return (
                          <div
                            key={item.id}
                            className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${badgeStyle}`}
                                >
                                  {typeLabel}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  {dateStr}
                                </span>
                              </div>
                              <h5 className="font-bold text-xs text-slate-800">
                                {item.title || "Aktivitas Belajar"}
                              </h5>
                              {item.result_summary &&
                                typeof item.result_summary === "object" &&
                                Object.keys(item.result_summary).length > 0 && (
                                  <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 rounded-xl p-2 font-mono border border-slate-100">
                                    {JSON.stringify(item.result_summary)}
                                  </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                              {item.score !== null && item.score !== undefined && (
                                <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                                  Skor: {item.score}
                                </span>
                              )}
                              <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold">
                                +{item.points_awarded ?? 0} Poin
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Footer Modal */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseHistoryModal}
                  className="py-2.5 px-6 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
