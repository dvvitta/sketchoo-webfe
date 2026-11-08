import { apiFetch } from "@/lib/api";

// Sesuai dengan respons BE: GET /api/v1/admin/students
export interface StudentItem {
  id: string;
  school_id: string;
  classroom_id: string | null;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateStudentPayload {
  name?: string;
  classroom_id?: string;
  is_active?: boolean;
}

export interface StudentListResponse {
  items: StudentItem[];
  next_cursor: string | null;
}

// Sesuai dengan respons BE: GET /api/v1/admin/students/:student_id/progress
export interface StudentProgress {
  student_id: string;
  completed_activities: number;
  submitted_sketches: number;
  generated_stories: number;
  total_points: number;
  last_activity_at: string | null;
}

// Sesuai dengan respons BE: GET /api/v1/admin/students/:student_id/history
export interface StudentHistoryItem {
  id: string;
  activity_type: string;
  title: string | null;
  score: number | null;
  points_awarded: number | null;
  result_summary: Record<string, unknown> | string | null;
  created_at: string;
}

export interface StudentHistoryResponse {
  items: StudentHistoryItem[];
  next_cursor: string | null;
}

// Sesuai dengan respons BE: GET /api/v1/admin/sessions
export interface SessionItem {
  id: string;
  classroom_id: string | null;
  status: string;
  started_at: string | null;
  ended_at: string | null;
  device_label: string | null;
}

export interface SessionListResponse {
  items: SessionItem[];
  next_cursor: string | null;
}

// Sesuai dengan respons BE: GET /api/v1/admin/dashboard
export interface DashboardData {
  school_id: string;
  active_students: number;
  active_classrooms: number;
  recent_sessions: SessionItem[];
}

// Sesuai dengan respons BE: GET /api/v1/admin/classrooms
export interface ClassroomItem {
  id: string;
  school_id: string;
  name: string;
  join_code: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClassroomListResponse {
  items: ClassroomItem[];
  next_cursor: string | null;
}

export const siswaService = {
  // Daftar siswa: GET /api/v1/admin/students
  getStudents: (params?: { q?: string; classroom_id?: string; cursor?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.q) query.set("q", params.q);
    if (params?.classroom_id) query.set("classroom_id", params.classroom_id);
    if (params?.cursor) query.set("cursor", params.cursor);
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    return apiFetch<StudentListResponse>(`/admin/students${qs ? `?${qs}` : ""}`);
  },

  // Dashboard: GET /api/v1/admin/dashboard
  getDashboard: () => {
    return apiFetch<DashboardData>("/admin/dashboard");
  },

  // Daftar kelas: GET /api/v1/admin/classrooms
  getClassrooms: () => {
    return apiFetch<ClassroomListResponse>("/admin/classrooms");
  },

  // Buat kelas baru (untuk generate kode): POST /api/v1/admin/classrooms
  createClassroom: (name: string) => {
    return apiFetch<ClassroomItem>("/admin/classrooms", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  },

  // Update kelas (untuk regenerate join_code): PATCH /api/v1/admin/classrooms/:id
  updateClassroom: (classroomId: string, payload: { name?: string; is_active?: boolean }) => {
    return apiFetch<ClassroomItem>(`/admin/classrooms/${classroomId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  // Sesi belajar: GET /api/v1/admin/sessions
  getSessions: (params?: { cursor?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.cursor) query.set("cursor", params.cursor);
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    return apiFetch<SessionListResponse>(`/admin/sessions${qs ? `?${qs}` : ""}`);
  },

  // Progress siswa: GET /api/v1/admin/students/:student_id/progress
  getStudentProgress: (studentId: string) => {
    return apiFetch<StudentProgress>(`/admin/students/${studentId}/progress`);
  },

  // Tambah siswa baru: POST /api/v1/admin/students
  createStudent: (payload: { name: string; classroom_id: string }) => {
    return apiFetch<StudentItem>("/admin/students", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Perbarui data siswa: PATCH /api/v1/admin/students/:student_id
  updateStudent: (studentId: string, payload: UpdateStudentPayload) => {
    return apiFetch<StudentItem>(`/admin/students/${studentId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  // Riwayat aktivitas siswa: GET /api/v1/admin/students/:student_id/history
  getStudentHistory: (studentId: string, params?: { cursor?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.cursor) query.set("cursor", params.cursor);
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    return apiFetch<StudentHistoryResponse>(
      `/admin/students/${studentId}/history${qs ? `?${qs}` : ""}`
    );
  },
};
