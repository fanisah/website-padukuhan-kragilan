import { supabase } from "../lib/supabase";

export type News = {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string | null;
  isi: string | null;
  thumbnail_url: string | null;
  image_position: string | null;
  image_position_x: number | null;
  image_position_y: number | null;
  penulis: string | null;
  tanggal: string;
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

export async function getPublishedNewsBySlug(slug: string): Promise<News | null> {
  const normalizedSlug = slug.trim();
  if (!normalizedSlug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalizedSlug)) {
    return null;
  }
  if (!supabase) throw new Error("Supabase public client is unavailable.");

  const { data, error } = await supabase
    .schema("public")
    .from("news")
    .select("*")
    .eq("slug", normalizedSlug)
    .eq("is_published", true)
    .maybeSingle<News>();

  if (error) throw new Error(`Unable to read published news detail: ${error.message}`);
  return data;
}
