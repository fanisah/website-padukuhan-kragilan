import { supabase } from "../lib/supabase";

export type Umkm = {
  id: string;
  slug: string;
  nama: string;
  kategori: string | null;
  deskripsi: string | null;
  featured_products: string | null;
  shopee: string | null;
  operating_days: string | null;
  alamat: string | null;
  foto_url: string | null;
  image_position_x: number | null;
  image_position_y: number | null;
  maps_url: string | null;
  instagram_url: string | null;
  whatsapp: string | null;
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

export async function getPublishedUmkmBySlug(slug: string): Promise<Umkm | null> {
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) return null;
  if (!supabase) throw new Error("Supabase public client is unavailable.");

  const { data, error } = await supabase
    .schema("public")
    .from("umkm")
    .select("*")
    .eq("slug", normalizedSlug)
    .eq("is_published", true)
    .maybeSingle<Umkm>();

  if (error) throw new Error(`Unable to read published UMKM detail: ${error.message}`);
  return data;
}
