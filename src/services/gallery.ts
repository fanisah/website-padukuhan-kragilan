import { supabase } from "../lib/supabase";

export type GalleryItem = {
  id: string;
  judul: string;
  deskripsi: string | null;
  foto_url: string;
  image_position_x: number | null;
  image_position_y: number | null;
  tanggal: string;
  is_published: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export async function getPublishedGallery(): Promise<GalleryItem[]> {
  if (!supabase) throw new Error("Supabase public client is unavailable.");

  const { data, error } = await supabase
    .schema("public")
    .from("gallery")
    .select("*")
    .eq("is_published", true)
    .order("tanggal", { ascending: false })
    .returns<GalleryItem[]>();

  if (error) throw new Error(`Unable to read published gallery: ${error.message}`);
  return data ?? [];
}
