import { supabase } from "../lib/supabase";

export type AdminUmkm = {
  id: number;
  nama: string;
  kategori: string;
  alamat: string | null;
  maps_url: string | null;
  instagram_url: string | null;
  whatsapp: string | null;
  deskripsi: string | null;
  foto_url: string | null;
  is_published: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminUmkmInput = {
  nama: string;
  kategori: string;
  alamat: string | null;
  maps_url: string | null;
  instagram_url: string | null;
  whatsapp: string | null;
  deskripsi: string | null;
  foto_url: string | null;
  is_published: boolean;
};

function requireClient() {
  if (!supabase) {
    throw new Error("Supabase admin client is unavailable.");
  }
  return supabase;
}

export async function getAllUmkm(): Promise<AdminUmkm[]> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("umkm")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<AdminUmkm[]>();

  if (error) throw new Error(`Unable to read UMKM records: ${error.message}`);
  return data ?? [];
}

export async function createUmkm(input: AdminUmkmInput): Promise<AdminUmkm> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("umkm")
    .insert(input)
    .select("*")
    .single<AdminUmkm>();

  if (error) throw new Error(`Unable to create UMKM record: ${error.message}`);
  return data;
}

export async function updateUmkm(
  id: number,
  input: AdminUmkmInput,
): Promise<AdminUmkm> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("umkm")
    .update(input)
    .eq("id", id)
    .select("*")
    .single<AdminUmkm>();

  if (error) throw new Error(`Unable to update UMKM record: ${error.message}`);
  return data;
}

export async function deleteUmkm(id: number): Promise<void> {
  const { error } = await requireClient()
    .schema("public")
    .from("umkm")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Unable to delete UMKM record: ${error.message}`);
}
