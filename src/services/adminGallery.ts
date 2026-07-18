import { supabase } from "../lib/supabase";

export type AdminGalleryItem = {
  id: number;
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

export type AdminGalleryInput = {
  judul: string;
  deskripsi: string | null;
  foto_url: string;
  image_position_x: number;
  image_position_y: number;
  tanggal: string;
  is_published: boolean;
};

function requireClient() {
  if (!supabase) throw new Error("Supabase admin client is unavailable.");
  return supabase;
}

export async function getAllGallery(): Promise<AdminGalleryItem[]> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("gallery")
    .select("*")
    .order("tanggal", { ascending: false })
    .returns<AdminGalleryItem[]>();

  if (error) throw new Error(`Unable to read gallery records: ${error.message}`);
  return data ?? [];
}

export async function createGallery(input: AdminGalleryInput): Promise<AdminGalleryItem> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("gallery")
    .insert(input)
    .select("*")
    .single<AdminGalleryItem>();

  if (error) throw new Error(`Unable to create gallery record: ${error.message}`);
  return data;
}

export async function updateGallery(id: number, input: AdminGalleryInput): Promise<AdminGalleryItem> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("gallery")
    .update(input)
    .eq("id", id)
    .select("*")
    .single<AdminGalleryItem>();

  if (error) throw new Error(`Unable to update gallery record: ${error.message}`);
  return data;
}

export async function deleteGallery(id: number): Promise<void> {
  const { error } = await requireClient()
    .schema("public")
    .from("gallery")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Unable to delete gallery record: ${error.message}`);
}
