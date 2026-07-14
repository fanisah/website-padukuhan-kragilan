import { supabase } from "../lib/supabase";

export type News = {
  id: number;
  judul: string | null;
  ringkasan: string | null;
  isi: string | null;
  thumbnail_url: string | null;
  tanggal: string | null;
  is_published: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export async function getPublishedNews(): Promise<News[]> {
  if (!supabase) throw new Error("Supabase public client is unavailable.");

  const { data, error } = await supabase
    .schema("public")
    .from("news")
    .select("*")
    .eq("is_published", true)
    .order("tanggal", { ascending: false })
    .returns<News[]>();

  if (error) throw new Error(`Unable to read published news: ${error.message}`);
  return data ?? [];
}
