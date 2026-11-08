"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import { authService } from "@/services/auth.service";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await authService.login({
        email,
        password,
      });

      // Simpan JWT access token, refresh token, nama, dan role pengguna
      localStorage.setItem("auth_token", response.access_token);
      if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
      }
      localStorage.setItem("user_name", response.user.name || "Administrator");
      localStorage.setItem("user_role", response.user.role || "admin");

      // Redirect otomatis berdasarkan role akun yang dikembalikan oleh backend /auth
      const userRole = response.user.role?.toLowerCase();
      if (userRole === "superadmin") {
        router.push("/superadmin/dashboard");
      } else {
        // Default role: admin sekolah / guru
        router.push("/admin/dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Gagal masuk. Periksa kembali email dan kata sandi Anda.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#D8CEFA] ${jakarta.className}`}
    >
      {/* Background Ilustrasi */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/login-bg.png"
          alt="Latar Login Sketchoo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Kontainer Utama */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-end lg:justify-between px-6 sm:px-12 py-8">
        
        {/* Spacer Maskot Harimau di Kiri */}
        <div className="hidden lg:block w-1/2" />

        {/* Card Form Login Putih Rounded di Kanan */}
        <div className="w-full max-w-[410px] bg-white/95 backdrop-blur-md rounded-[2.5rem] p-7 sm:p-9 shadow-2xl shadow-indigo-900/15 border border-white/90 relative">
          
          {/* Tombol Kembali ke Beranda */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#6A4BF7] transition-colors mb-4 group"
          >
            <span className="w-7 h-7 rounded-full bg-[#F4F1FD] flex items-center justify-center group-hover:bg-[#6A4BF7] group-hover:text-white transition-all shadow-sm">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </span>
            <span>Kembali ke Beranda</span>
          </Link>

          {/* Judul & Keterangan */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#5B3DF5] tracking-tight">
              Login Akun
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">
              Masuk ke portal manajemen SKETCHOO
            </p>
          </div>

          {/* Pesan Error Response Backend */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Email */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 ml-1">
                Email
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#8C7BDB] pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#F7F6FD] border border-[#E9E4FA] text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#6A4BF7] focus:ring-2 focus:ring-[#6A4BF7]/20 transition-all font-semibold"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 ml-1">
                Kata Sandi
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#8C7BDB] pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <circle cx="12" cy="16" r="1.5" />
                    <path d="M8 11V7a4 4 0 018 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-2xl bg-[#F7F6FD] border border-[#E9E4FA] text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#6A4BF7] focus:ring-2 focus:ring-[#6A4BF7]/20 transition-all font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-[#8C7BDB] hover:text-[#6A4BF7] transition p-0.5 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tombol Masuk dengan Indikator Loading */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#6A4BF7] to-[#7E57FA] hover:from-[#5A38F5] hover:to-[#7046FA] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-400/30 transition-all duration-200 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <span>Masuk</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
