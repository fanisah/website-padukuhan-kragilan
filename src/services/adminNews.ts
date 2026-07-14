import { supabase } from "../lib/supabase";

export type AdminNews = {
  id: number;
  judul: string;
  slug: string;
  ringkasan: string | null;
  isi: string | null;
  thumbnail_url: string | null;
  penulis: string | null;
  tanggal: string;
  is_published: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminNewsInput = {
  judul: string;
  ringkasan: string | null;
  isi: string | null;
  thumbnail_url: string | null;
  penulis: string | null;
  tanggal: string;
  is_published: boolean;
};

function requireClient() {
  if (!supabase) throw new Error("Supabase admin client is unavailable.");
  return supabase;
}

export function createNewsSlug(title: string) {
  const slug = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "berita";
}

async function createUniqueNewsSlug(title: string, currentId?: number) {
  const baseSlug = createNewsSlug(title);
  let query = requireClient()
    .schema("public")
    .from("news")
    .select("id, slug")
    .like("slug", `${baseSlug}%`);

  if (currentId !== undefined) {
    query = query.neq("id", currentId);
  }

  const { data, error } = await query.returns<Array<{ id: number; slug: string }>>();
  if (error) {
    throw new Error(`Unable to validate news slug: ${error.message}`);
  }

  const usedSlugs = new Set((data ?? []).map((record) => record.slug));
  if (!usedSlugs.has(baseSlug)) return baseSlug;

  let suffix = 2;
  while (usedSlugs.has(`${baseSlug}-${suffix}`)) {
    suffix += 1;
  }
  return `${baseSlug}-${suffix}`;
}

async function withUniqueSlug(input: AdminNewsInput, currentId?: number) {
  return {
    ...input,
    slug: await createUniqueNewsSlug(input.judul, currentId),
  };
}

export async function getAllNews(): Promise<AdminNews[]> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("news")
    .select("*")
    .order("tanggal", { ascending: false })
    .returns<AdminNews[]>();

  if (error) throw new Error(`Unable to read news records: ${error.message}`);
  return data ?? [];
}

export async function createNews(input: AdminNewsInput): Promise<AdminNews> {
  const payload = await withUniqueSlug(input);
  const { data, error } = await requireClient()
    .schema("public")
    .from("news")
    .insert(payload)
    .select("*")
    .single<AdminNews>();

  if (error) throw new Error(`Unable to create news record: ${error.message}`);
  return data;
}

export async function updateNews(
  id: number,
  input: AdminNewsInput,
): Promise<AdminNews> {
  const payload = await withUniqueSlug(input, id);
  const { data, error } = await requireClient()
    .schema("public")
    .from("news")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single<AdminNews>();

  if (error) throw new Error(`Unable to update news record: ${error.message}`);
  return data;
}

export async function deleteNews(id: number): Promise<void> {
  const { error } = await requireClient()
    .schema("public")
    .from("news")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Unable to delete news record: ${error.message}`);
}
