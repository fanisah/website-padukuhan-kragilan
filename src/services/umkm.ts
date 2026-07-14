import { supabase } from "../lib/supabase";

export type Umkm = {
  id: number;
  nama: string | null;
  kategori: string | null;
  deskripsi: string | null;
  foto_url: string | null;
  maps_url: string | null;
  instagram_url: string | null;
  is_published: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export async function getPublishedUmkm(): Promise<Umkm[]> {
  if (!supabase) throw new Error("Supabase public client is unavailable.");

  const { data, error } = await supabase
    .schema("public")
    .from("umkm")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .returns<Umkm[]>();

  if (error) throw new Error(`Unable to read published UMKM: ${error.message}`);
  return data ?? [];
}
