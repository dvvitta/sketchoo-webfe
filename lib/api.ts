// lib/api.ts
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Backend berjalan di port 3000 dengan prefix api/v1
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

  // Ambil token JWT jika sudah login
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Backend membungkus error dalam { error: { message, code, details } }
    const errorMessage =
      data?.error?.message ||
      data?.message ||
      "Terjadi kesalahan pada server.";
    throw new Error(
      Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage
    );
  }

  return data as T;
}