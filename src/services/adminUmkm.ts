import { supabase } from "../lib/supabase";

export type AdminUmkm = {
  id: string;
  slug: string;
  nama: string;
  kategori: string;
  alamat: string | null;
  maps_url: string | null;
  instagram_url: string | null;
  whatsapp: string | null;
  featured_products: string | null;
  shopee: string | null;
  operating_days: string | null;
  deskripsi: string | null;
  foto_url: string | null;
  image_position_x: number | null;
  image_position_y: number | null;
  is_published: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminUmkmInput = {
  slug: string;
  nama: string;
  kategori: string;
  alamat: string | null;
  maps_url: string | null;
  instagram_url: string | null;
  whatsapp: string | null;
  featured_products: string | null;
  shopee: string | null;
  operating_days: string | null;
  deskripsi: string | null;
  foto_url: string | null;
  image_position_x: number;
  image_position_y: number;
  is_published: boolean;
};

function requireClient() {
  if (!supabase) {
    throw new Error("Supabase admin client is unavailable.");
  }
  return supabase;
}

export function createUmkmSlug(name: string) {
  const slug = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "umkm";
}

async function ensureUniqueSlug(slug: string, currentId?: string) {
  let query = requireClient()
    .schema("public")
    .from("umkm")
    .select("id")
    .eq("slug", slug);

  if (currentId) query = query.neq("id", currentId);

  const { data, error } = await query.limit(1).returns<Array<{ id: string }>>();
  if (error) throw new Error(`Unable to validate UMKM slug: ${error.message}`);
  if ((data ?? []).length > 0) {
    throw new Error("Slug sudah digunakan oleh UMKM lain.");
  }
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
  await ensureUniqueSlug(input.slug);
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
  id: string,
  input: AdminUmkmInput,
): Promise<AdminUmkm> {
  await ensureUniqueSlug(input.slug, id);
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

export async function deleteUmkm(id: string): Promise<void> {
  const { error } = await requireClient()
    .schema("public")
    .from("umkm")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Unable to delete UMKM record: ${error.message}`);
}
