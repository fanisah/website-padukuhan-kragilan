import { supabase } from "../lib/supabase";
import type { AdminRole } from "../types/admin";

export type AdminUser = {
  user_id: string;
  email: string;
  role: AdminRole;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
};

function requireClient() {
  if (!supabase) throw new Error("Supabase admin client is unavailable.");
  return supabase;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("admin_profiles")
    .select("user_id, email, role, is_active, created_at, updated_at")
    .order("created_at", { ascending: true })
    .returns<AdminUser[]>();

  if (error) throw new Error(`Unable to read admin accounts: ${error.message}`);
  return data ?? [];
}

export async function updateAdminUser(
  userId: string,
  changes: Pick<AdminUser, "role" | "is_active">,
): Promise<AdminUser> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("admin_profiles")
    .update(changes)
    .eq("user_id", userId)
    .select("user_id, email, role, is_active, created_at, updated_at")
    .single<AdminUser>();

  if (error) throw new Error(`Unable to update admin account: ${error.message}`);
  return data;
}
