// lib/api.ts
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Backend URL default mengarah ke production backend jika env tidak diset
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://sketchoo-backend.vercel.app/api/v1";
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");

  // Ambil token JWT jika sudah login
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const formattedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const response = await fetch(`${baseUrl}${formattedEndpoint}`, {
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