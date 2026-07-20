import { supabase } from "../lib/supabase";

export type Potency = {
  id: string;
  judul: string | null;
  deskripsi: string | null;
  icon: string | null;
  image_url: string | null;
  urutan: number | null;
  is_published: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export async function getPublishedPotencies(): Promise<Potency[]> {
  if (!supabase) throw new Error("Supabase public client is unavailable.");

  const { data, error } = await supabase
    .schema("public")
    .from("potencies")
    .select("*")
    .eq("is_published", true)
    .order("urutan", { ascending: true })
    .returns<Potency[]>();

  if (error) throw new Error(`Unable to read published potencies: ${error.message}`);
  return data ?? [];
}
