import { apiFetch } from "@/lib/api";

export interface SuperadminDashboardData {
  active_schools: number;
  active_school_memberships: number;
  active_sessions: number;
}

export interface SchoolItem {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SchoolListResponse {
  items: SchoolItem[];
  next_cursor: string | null;
}

export interface AdminMembershipItem {
  id: string;
  school_id: string;
  user_id: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface AdminListResponse {
  items: AdminMembershipItem[];
  next_cursor: string | null;
}

export const superadminService = {
  getDashboard: () => {
    return apiFetch<SuperadminDashboardData>("/superadmin/dashboard");
  },
  getSchools: (params?: { cursor?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.cursor) query.set("cursor", params.cursor);
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    return apiFetch<SchoolListResponse>(
      `/superadmin/schools${qs ? `?${qs}` : ""}`
    );
  },
  getAdmins: (params?: { cursor?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.cursor) query.set("cursor", params.cursor);
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    return apiFetch<AdminListResponse>(
      `/superadmin/admins${qs ? `?${qs}` : ""}`
    );
  },
};
