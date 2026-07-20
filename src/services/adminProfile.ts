import { supabase } from "../lib/supabase";
import type { Profile } from "./profile";

export type AdminProfileInput = Partial<Omit<Profile, "id" | "updated_at">>;

function requireClient() {
  if (!supabase) throw new Error("Supabase admin client is unavailable.");
  return supabase;
}

export async function getProfileForAdmin(): Promise<Profile> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("profile")
    .select("*")
    .eq("id", 1)
    .single<Profile>();

  if (error) throw new Error(`Unable to read profile record: ${error.message}`);
  return data;
}

export async function updateProfile(input: AdminProfileInput): Promise<Profile> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("profile")
    .update(input)
    .eq("id", 1)
    .select("*")
    .single<Profile>();

  if (error) throw new Error(`Unable to update profile record: ${error.message}`);
  return data;
}
