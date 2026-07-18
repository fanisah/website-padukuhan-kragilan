import { supabase } from "../lib/supabase";

export type AdminAgenda = {
  id: number;
  judul: string;
  deskripsi: string | null;
  tanggal: string;
  jam: string | null;
  lokasi: string | null;
  gambar_url: string | null;
  image_position_x: number | null;
  image_position_y: number | null;
  is_published: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminAgendaInput = {
  judul: string;
  deskripsi: string | null;
  tanggal: string;
  jam: string | null;
  lokasi: string | null;
  gambar_url: string | null;
  image_position_x: number;
  image_position_y: number;
  is_published: boolean;
};

function requireClient() {
  if (!supabase) throw new Error("Supabase admin client is unavailable.");
  return supabase;
}

export async function getAllAgendas(): Promise<AdminAgenda[]> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("agendas")
    .select("*")
    .order("tanggal", { ascending: true })
    .returns<AdminAgenda[]>();

  if (error) throw new Error(`Unable to read agenda records: ${error.message}`);
  return data ?? [];
}

export async function createAgenda(input: AdminAgendaInput): Promise<AdminAgenda> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("agendas")
    .insert(input)
    .select("*")
    .single<AdminAgenda>();

  if (error) throw new Error(`Unable to create agenda record: ${error.message}`);
  return data;
}

export async function updateAgenda(id: number, input: AdminAgendaInput): Promise<AdminAgenda> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("agendas")
    .update(input)
    .eq("id", id)
    .select("*")
    .single<AdminAgenda>();

  if (error) throw new Error(`Unable to update agenda record: ${error.message}`);
  return data;
}

export async function deleteAgenda(id: number): Promise<void> {
  const { error } = await requireClient()
    .schema("public")
    .from("agendas")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Unable to delete agenda record: ${error.message}`);
}
